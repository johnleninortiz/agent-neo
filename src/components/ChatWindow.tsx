import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppConfig, Message, User, InteractionStep, InteractionOption } from '../types';
import { callLLM, callEndpoint } from '../services/api';

interface ChatWindowProps {
  onClose: () => void;
  config: AppConfig;
  context?: string;
  user?: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, config, context, user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-initial',
      text: `Hi ${user?.name || 'there'}! I'm ready to assist you.`,
      sender: 'agent',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<InteractionStep | undefined>();
  const [workflowState, setWorkflowState] = useState<Record<string, any>>({});
  const [lastActionResult, setLastActionResult] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper for variable interpolation
  const interpolate = useCallback((text: string, state: Record<string, any>): string => {
    if (!text) return text;
    let result = text;
    for (const key in state) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), state[key]);
    }
    return result;
  }, []);

  const addMessage = useCallback((text: string, sender: 'agent' | 'user') => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        sender,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const goToStep = useCallback((stepId: string, stateUpdate: Record<string, any> = {}) => {
    const updatedState = { ...workflowState, ...stateUpdate };
    setWorkflowState(updatedState);

    const step = config.workflow?.find(s => s.id === stepId);
    if (step) {
      // Check for skip condition
      if (step.skipIf) {
        try {
          // Simple evaluation of skipIf (e.g. "workflowState.reportName")
          const shouldSkip = !!updatedState[step.skipIf.replace('workflowState.', '')];
          if (shouldSkip) {
            console.log(`Skipping step ${stepId} because ${step.skipIf} is present.`);
            const nextStepId = step.options?.[0]?.nextStepId;
            if (nextStepId) {
              goToStep(nextStepId, updatedState);
              return;
            }
          }
        } catch (e) {
          console.warn("Skip evaluation failed:", e);
        }
      }

      setCurrentStep(step);
      addMessage(interpolate(step.message, updatedState), 'agent');
    }
  }, [config.workflow, workflowState, addMessage, interpolate]);

  // Initial step
  useEffect(() => {
    if (config.initialStepId && !currentStep && messages.length === 1) {
      goToStep(config.initialStepId);
    }
  }, [config.initialStepId, currentStep, messages.length, goToStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const executeApiAction = async (actionName: string, payload: any) => {
    setIsTyping(true);
    try {
      const result = await callEndpoint(actionName, config, payload);
      setLastActionResult(result);
      addMessage("✅ Action completed successfully!", 'agent');
    } catch (error: any) {
      addMessage(`❌ Action failed: ${error.message}`, 'agent');
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: InteractionOption) => {
    // 1. Log option choice
    addMessage(option.label, 'user');

    // 2. Clear current step while processing
    setCurrentStep(undefined);

    // 3. Handle Actions
    if (option.triggerAction) {
      if (option.actionType === 'api') {
        const payload = { ...option.fixedPayload };
        if (option.payloadKey && option.value) {
          payload[option.payloadKey] = option.value;
        }
        executeApiAction(option.triggerAction, payload);
      } else if (option.actionType === 'whatsapp') {
        window.open(`https://wa.me/${option.externalLink}`, '_blank');
      } else if (option.actionType === 'link') {
        window.open(option.externalLink, '_blank');
      }
    }

    // 4. Navigate
    if (option.nextStepId) {
      setTimeout(() => {
        const stateUpdate = option.payloadKey && option.value ? { [option.payloadKey]: option.value } : {};
        goToStep(option.nextStepId!, stateUpdate);
      }, 500);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    addMessage(userInput, 'user');
    setInput('');
    setIsTyping(true);

    try {
      // 1. Intent Matching & Extraction
      if (config.intents) {
        for (const intent of config.intents) {
          const matched = intent.keywords.some(k => userInput.toLowerCase().includes(k.toLowerCase()));
          if (matched) {
            let extractedData: Record<string, any> = {};
            if (intent.extractors) {
              intent.extractors.forEach(ex => {
                const match = userInput.match(new RegExp(ex.regex, 'i'));
                if (match && match[1]) {
                  extractedData[ex.key] = match[1].trim();
                }
              });
            }
            
            setIsTyping(false);
            goToStep(intent.nextStepId, extractedData);
            return;
          }
        }
      }

      // 2. LLM Fallback
      if (config.llms && config.llms.length > 0) {
        // Build combined context
        const fullContext = context ? `${context}\n${Object.entries(workflowState).map(([k, v]) => `${k}: ${v}`).join('\n')}` : undefined;
        const llmResponse = await callLLM(userInput, config, lastActionResult, messages, fullContext);
        setIsTyping(false);
        addMessage(llmResponse.message, 'agent');
        
        if (llmResponse.action) {
          executeApiAction(llmResponse.action.name, llmResponse.action.payload);
        }
      } else {
        setIsTyping(false);
        addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
      }
    } catch (error: any) {
      console.error(error);
      setIsTyping(false);
      addMessage("I encountered an error while processing your request. Please try again later.", 'agent');
    }
  };

  return (
    <div className="chat-container glass-morphism-dark agent-neo-font">
      <div className="chat-header">
        <div className="header-info">
          <div className="status-indicator"></div>
          <span className="header-title">Neo Agent</span>
        </div>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <Loader2 size={16} className="animate-spin" />
            <span>Neo is thinking...</span>
          </div>
        )}

        <AnimatePresence>
          {currentStep?.options && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="options-container"
            >
              {currentStep.options.map((opt, i) => (
                <button 
                  key={i} 
                  className="option-pill"
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button
          onClick={handleSend}
          className="send-btn"
          disabled={isTyping}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
