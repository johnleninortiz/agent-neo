import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Loader2, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppConfig, Message, User, InteractionStep, InteractionOption } from '../types';
import { callLLM, callEndpoint } from '../services/api';

interface ChatWindowProps {
  onClose: () => void;
  config: AppConfig;
  context?: string;
  user?: User;
  onStateChange?: (state: 'idle' | 'active' | 'thinking') => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, config, context, user, onStateChange }) => {
  const initializedRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    // If we have an initial workflow step, let that provide the welcome message
    if (config.initialStepId) return [];
    
    // Otherwise provide a default greeting
    return [{
      id: 'msg-initial',
      text: `Hey ${user?.name || 'there'}! I'm ready to assist you.`,
      sender: 'agent',
      timestamp: Date.now(),
    }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Sync state with parent
  useEffect(() => {
    if (onStateChange) {
        onStateChange(isTyping ? 'thinking' : 'active');
    }
  }, [isTyping, onStateChange]);

  const [currentStep, setCurrentStep] = useState<InteractionStep | undefined>();
  const [workflowState, setWorkflowState] = useState<Record<string, any>>({});
  const [lastActionResult, setLastActionResult] = useState<any>(null);
  const [showOptions, setShowOptions] = useState(true);

  // Theme support
  const [theme, setTheme] = useState<'dark' | 'light' | 'glass'>(() => {
    return (localStorage.getItem('neo-theme') as any) || 'dark';
  });
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Save theme
  const toggleTheme = (newTheme: 'dark' | 'light' | 'glass') => {
    setTheme(newTheme);
    localStorage.setItem('neo-theme', newTheme);
    setShowThemeMenu(false);
  };

  // Buffer ref for dynamic options logic
  const stepRef = useRef<InteractionStep | undefined>(undefined);
  const lastResultRef = useRef<any>(null);
  const lastAutoExecutedStepIdRef = useRef<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper for variable interpolation
  const interpolate = useCallback((text: string, state: Record<string, any>): string => {
    if (!text) return text;
    let result = text;
    
    // User interpolation
    result = result.replace(/\{\{\s*userName\s*\}\}/g, user?.name || 'there');
    // Agent Name interpolation
    result = result.replace(/\{\{\s*agentName\s*\}\}/g, config.agentName || 'Neo');
    
    // State interpolation
    for (const key in state) {
      result = result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), state[key]);
    }

    // Action Result interpolation (Use Ref for freshness)
    const actionRes = lastResultRef.current;
    if (actionRes) {
      if (Array.isArray(actionRes)) {
        result = result.replace(/\{\{\s*result\.length\s*\}\}/g, actionRes.length.toString());
        result = result.replace(/\{\{\s*result\[(\d+)\]\.(\w+)\s*\}\}/g, (_, index, key) => {
            return actionRes[parseInt(index)] ? actionRes[parseInt(index)][key] || '' : '';
        });
      } else {
        result = result.replace(/\{\{\s*result\.(\w+)\s*\}\}/g, (_, key) => {
          return actionRes[key] || '';
        });
      }
    }
    
    return result;
  }, [user]); // Removed lastActionResult dep since we use Ref

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

  // Helper to set nested properties for API payloads
  const setNestedProperty = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  const executeApiAction = async (actionName: string, value?: any, payloadKey?: string, fixedPayload?: any, originalInput?: string) => {
    setIsTyping(true);
    try {
      let payload = fixedPayload ? JSON.parse(JSON.stringify(fixedPayload)) : {};

      // Interpolate payload values
      const interpolateObject = (obj: any): any => {
          if (typeof obj === 'string') return interpolate(obj, workflowState);
          if (typeof obj === 'object' && obj !== null) {
              for (const key in obj) {
                  obj[key] = interpolateObject(obj[key]);
              }
          }
          return obj;
      };
      payload = interpolateObject(payload);

      if (payloadKey && value !== undefined) {
        setNestedProperty(payload, payloadKey, value);
      } else if (value !== undefined && !payloadKey) {
        payload = { ...payload, type: value };
      }

      const result = await callEndpoint(actionName, config, payload);
      setLastActionResult(result); // Trigger render update
      lastResultRef.current = result; // Store for immediate access
      
      // Feed result back to LLM for summarization if original input exists
      if (originalInput) {
        // We'll implemented callLLM in services/api to handle result context
         const fullContext = context ? `${context}\nResult Context: ${JSON.stringify(result).substring(0, 1000)}...` : undefined;
         // Note: For now we reuse the standard callLLM but practically we might want a specialized call
         // Ideally callLLM signature should support 'result' explicitly or we append it to context
         const llmResponse = await callLLM(originalInput, config, result, messages, fullContext);
         
         addMessage(llmResponse.message, 'agent');
         if (llmResponse.action) {
             await executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, originalInput);
         }

          if (actionName === 'generateReportPdf') {
              setCurrentStep({
                  id: 'activity_log_suggestion',
                  message: '', 
                  options: [
                      { label: 'Show activity log', actionType: 'link', externalLink: '/settings/activity-log' }
                  ]
              } as any);
              setShowOptions(true);
          }
          
          if (actionName === 'openReport') {
             // Handle virtual openReport action
             const reportId = payload?.id || value;
             if (reportId) {
                 setCurrentStep({
                    id: 'open_report_action',
                    message: "I've generated a link for you:",
                    options: [
                        { label: `Open Report #${reportId}`, actionType: 'link', externalLink: `/reporting/${reportId}` }
                    ]
                 } as any);
                 setShowOptions(true);
                 addMessage(`🔗 Report #${reportId} ready to open.`, 'agent');
                 // Don't recursive call LLM for this client action
                 return;
             }
          }
      } else {
        addMessage("✅ Action completed successfully!", 'agent');
      }

    } catch (error: any) {
      addMessage(`❌ Action failed: ${error.message}`, 'agent');
    } finally {
      setIsTyping(false);
    }
  };

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
      
      // Create a deep copy to modify options dynamically without affecting config
      const stepClone = JSON.parse(JSON.stringify(step)) as InteractionStep;
      
      // Dynamic Options Generation (Use Ref)
      const actionRes = lastResultRef.current;
      if (stepClone.useResultsAsOptions && Array.isArray(actionRes)) {
          const dConfig = stepClone.dynamicOptionsConfig;
          if (dConfig) {
              const dynamicOptions: InteractionOption[] = actionRes.map((item: any) => ({
                  label: item[dConfig.labelKey],
                  value: item[dConfig.valueKey],
                  nextStepId: dConfig.nextStepId,
                  triggerAction: dConfig.triggerAction,
                  actionType: dConfig.actionType,
                  payloadKey: dConfig.payloadKey,
                  fixedPayload: dConfig.fixedPayload
              }));
              stepClone.options = [...(stepClone.options || []), ...dynamicOptions];
          }
      }

      // Interpolate Option Labels
      if (stepClone.options) {
          stepClone.options = stepClone.options.map(opt => ({
              ...opt,
              label: interpolate(opt.label, updatedState),
              externalLink: opt.externalLink ? interpolate(opt.externalLink, updatedState) : undefined
          }));
      }

      setCurrentStep(stepClone);
      stepRef.current = stepClone;
      setShowOptions(true);
      addMessage(interpolate(step.message, updatedState), 'agent');
    }
  }, [config.workflow, workflowState, addMessage, interpolate]); // Removed lastActionResult dep

  // Initial step
  useEffect(() => {
    if (config.initialStepId && !initializedRef.current) {
        initializedRef.current = true;
        goToStep(config.initialStepId);
    }
  }, [config.initialStepId, goToStep]);

  // Auto-execute steps that have a triggerAction but no inputTarget (e.g. middleware steps)
  useEffect(() => {
      if (currentStep && currentStep.triggerAction && !currentStep.inputTarget && currentStep.actionType === 'api') {
          // Prevent infinite loop if already executed for this step ID
          if (lastAutoExecutedStepIdRef.current === currentStep.id) {
              return;
          }
          
          lastAutoExecutedStepIdRef.current = currentStep.id;

          const execute = async () => {
              await executeApiAction(currentStep.triggerAction!, undefined, currentStep.payloadKey, currentStep.fixedPayload);
              if (currentStep.nextStepId) {
                  setTimeout(() => {
                      goToStep(currentStep.nextStepId!);
                  }, 500);
              }
          };
          execute();
      }
  }, [currentStep, executeApiAction, goToStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showOptions]);

  const handleOptionClick = async (option: InteractionOption) => {
    // 1. Log option choice
    addMessage(option.label, 'user');
    setShowOptions(false); 

    // Actions
    if (option.triggerAction && option.actionType === 'api') {
        // If triggerAction is present, execute it
         await executeApiAction(option.triggerAction, option.value, option.payloadKey, option.fixedPayload);
    } else if (option.actionType === 'whatsapp') {
        window.open(`https://wa.me/${option.externalLink || '573025688681'}`, '_blank');
        addMessage("Opening WhatsApp to connect you with our help desk... 🚀", 'agent');
    } else if (option.actionType === 'link' && option.externalLink) {
        window.open(option.externalLink, '_blank');
    }

    // 4. Navigate
    if (option.nextStepId) {
       // Wait slightly for UI/UX but after API is confirmed done
       setTimeout(() => {
        const stateUpdate = {
             ...(option.payloadKey && option.value ? { [option.payloadKey]: option.value } : {}),
             ...(option.stateUpdate || {})
        };
        goToStep(option.nextStepId!, stateUpdate);
      }, 400); // Reduced delay
    }
  };

  const handleQuickAction = () => {
      // Just a default 'Create Report' action for now or derived from config
      // In Angular it was: this.api.createReport(this.config) which seems hardcoded to a service method
      // We will assume it tries to find an endpoint named 'createReport' or similar
      // For now, let's leave it generic or implement a specific 'create report' intent manually if needed
      // But better: use the 'actionLabel' from config and maybe a convention? 
      // The Angular code did: await this.api.createReport(this.config); which was checking intents
      // Let's simluate a message "Create Report" to trigger intent matching
      const actionLabel = config.actionLabel || 'Create Report';
      setInput(actionLabel);
      handleSend(actionLabel);
  };
  
  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    const userInput = textToSend.trim();
    if (!manualInput) {
        addMessage(userInput, 'user');
        setInput('');
    }
    
    setIsTyping(true);

    try {
      // 0. Input Capture (Deterministic Flow)
      if (currentStep && currentStep.inputTarget) {
          // Save input to workflow state
          const newState = { ...workflowState, [currentStep.inputTarget]: userInput };
          setWorkflowState(newState);

          // If step has an action, execute it
          if (currentStep.triggerAction && currentStep.actionType === 'api') {
              // Use the captured input as value if payloadKey matches inputTarget or is separate
              const value = userInput;
              await executeApiAction(
                  currentStep.triggerAction, 
                  value, 
                  currentStep.payloadKey, 
                  currentStep.fixedPayload, 
                  undefined // No LLM feedback loop for deterministic steps typically
              );
          }

          setIsTyping(false);

          // Navigate to next step
          if (currentStep.nextStepId) {
             goToStep(currentStep.nextStepId, { [currentStep.inputTarget]: userInput });
          }
          return;
      }

      // 1. Intent Matching & Extraction
      if (config.intents) {
        let bestMatch = { intent: null as any, score: 0 };
        const normalizedInput = userInput.toLowerCase();
        
        for (const intent of config.intents) {
           let score = 0;
           for (const keyword of intent.keywords) {
               if (normalizedInput.includes(keyword.toLowerCase())) score++;
           }
           if (score > bestMatch.score) {
               bestMatch = { intent, score };
           }
        }

        if (bestMatch.score > 0 && bestMatch.intent) {
            const intent = bestMatch.intent;
            let extractedData: Record<string, any> = {};
            if (intent.extractors) {
                intent.extractors.forEach((ex: any) => {
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

      // 2. LLM Fallback
      if (config.llms && config.llms.length > 0) {
        // Build combined context
        const fullContext = context ? `${context}\n${Object.entries(workflowState).map(([k, v]) => `${k}: ${v}`).join('\n')}` : undefined;
        // Pass result as well? 
        const llmResponse = await callLLM(userInput, config, lastActionResult, messages, fullContext);
        setIsTyping(false);
        addMessage(llmResponse.message, 'agent');
        
        if (llmResponse.action) {
          executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, userInput);
        }
      } else {
        setIsTyping(false);
        if (config.fallbackStepId) {
            goToStep(config.fallbackStepId);
        } else {
            addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
        }
      }
    } catch (error: any) {
      console.error(error);
      setIsTyping(false);
      addMessage("I encountered an error while processing your request. Please try again later.", 'agent');
    }
  };

  return (
    <div className="chat-container glass-morphism-dark agent-neo-font" data-theme={theme}>
      <div className="chat-header">
        <div className="header-info">
          <div className="status-indicator"></div>
          <span className="header-title">{config.agentName || 'Neo Agent'}</span>
        </div>
        <div className="header-controls">
            {/* Theme Selector */}
            <div className="theme-selector-container">
                <button 
                    onClick={() => setShowThemeMenu(!showThemeMenu)}
                    className="close-btn"
                    title="Change Theme"
                >
                    <Palette size={18} />
                </button>
                
                <AnimatePresence>
                    {showThemeMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            className="theme-dropdown"
                        >
                            <span className="theme-label">Theme</span>
                            {[
                                { id: 'dark', label: 'Dark Moon', color: '#1f2937' },
                                { id: 'light', label: 'Light Day', color: '#ffffff' },
                                { id: 'glass', label: 'Pure Glass', color: '#e5e7eb' }
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleTheme(t.id as any)}
                                    className="theme-option"
                                >
                                    <div 
                                      className="theme-color-indicator" 
                                      style={{ background: t.color }}
                                    ></div>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button onClick={onClose} className="close-btn">
              <X size={22} />
            </button>
        </div>
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
            <span>{config.agentName || 'Neo '} is thinking...</span>
          </div>
        )}

        <AnimatePresence>
          {currentStep?.options && showOptions && !isTyping && (
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

        {/* Quick Actions Suggestion */}
        <div className="actions-suggestion">
           <span className="actions-label">Frequent Actions</span>
           <button className="action-button" onClick={handleQuickAction}>
             <span style={{ marginRight: '8px' }}>⚡</span>
             {config.actionLabel || 'Create Report'}
           </button>
        </div>

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
          onClick={() => handleSend()}
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
