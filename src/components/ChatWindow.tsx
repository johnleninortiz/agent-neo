import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Palette, Maximize, Minimize, Square, Paperclip, X, Plus, Clock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import type { AppConfig, Message, User, InteractionStep, InteractionOption, Attachment, Conversation } from '../types';
import { callLLM, callEndpoint } from '../services/api';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// ... (keep getSimilarity helper) ...

// Helper for string similarity (Levenshtein distance based)
const getSimilarity = (s1: string, s2: string): number => {
    const longer = s1.length < s2.length ? s2 : s1;
    const shorter = s1.length < s2.length ? s1 : s2;
    if (longer.length === 0) return 1.0;
    
    const editDistance = (a: string, b: string): number => {
        const costs = [];
        for (let i = 0; i <= a.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= b.length; j++) {
                if (i === 0) costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (a.charAt(i - 1) !== b.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) costs[b.length] = lastValue;
        }
        return costs[b.length];
    };

    return (longer.length - editDistance(longer.toLowerCase(), shorter.toLowerCase())) / longer.length;
};

interface ChatWindowProps {
  onClose: () => void;
  config: AppConfig;
  context?: string;
  user?: User;
  onStateChange?: (state: 'idle' | 'active' | 'thinking') => void;
  onAction?: (name: string, data: any) => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, config, context, user, onStateChange, onAction, isMaximized, onToggleMaximize }) => {
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

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const stored = localStorage.getItem('agent-neo-conversations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const [selectedLlmIndex, setSelectedLlmIndex] = useState(0);
  const [currentConversationId, setCurrentConversationId] = useState<string>(() => `conv-${Date.now()}`);

  // Auto-sync current chat to history
  useEffect(() => {
    // Only save the conversation if the user has actually participated
    const hasUserMessage = messages.some(m => m.sender === 'user');
    if (hasUserMessage) {
      setConversations(prev => {
        const existingIndex = prev.findIndex(c => c.id === currentConversationId);
        
        const firstUserMsg = messages.find(m => m.sender === 'user')?.text;
        let title = 'New Chat';
        if (firstUserMsg) {
             title = firstUserMsg.substring(0, 30) + (firstUserMsg.length > 30 ? '...' : '');
        } else if (prev[existingIndex] && prev[existingIndex].title && prev[existingIndex].title !== 'New Chat') {
             title = prev[existingIndex].title!;
        }

        const updatedConv: Conversation = {
          id: currentConversationId,
          title,
          messages: [...messages],
          timestamp: prev[existingIndex]?.timestamp || Date.now(),
          llmIndex: selectedLlmIndex
        };
        
        if (existingIndex >= 0) {
          const newConvs = [...prev];
          newConvs[existingIndex] = updatedConv;
          return newConvs;
        } else {
          return [updatedConv, ...prev];
        }
      });
    }
  }, [messages, currentConversationId, selectedLlmIndex]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('agent-neo-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sync state with parent
  useEffect(() => {
    if (onStateChange) {
        onStateChange((isTyping || isAutoRunning) ? 'thinking' : 'active');
    }
  }, [isTyping, isAutoRunning, onStateChange]);

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
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopSignalRef = useRef(false); // To interrupt api loops
  
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

  const addMessage = useCallback((text: string, sender: 'agent' | 'user', attachments?: Attachment[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        sender,
        timestamp: Date.now(),
        attachments
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

  const executeApiAction = useCallback(async (actionName: string, value?: any, payloadKey?: string, fixedPayload?: any, originalInput?: string, triggeredActions: string[] = [], accumulatedResults: Record<string, any> = {}) => {
    // Check for stop signal
    if (stopSignalRef.current) {
        console.warn('Execution stopped by user.');
        return null;
    }

    // Recursion protection: Don't trigger the same action twice in a single LLM response chain
    if (triggeredActions.includes(actionName)) {
        console.warn(`Tool recursion detected for ${actionName}. Skipping.`);
        return;
    }
    const currentTriggeredActions = [...triggeredActions, actionName];

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

      const rawResult = await callEndpoint(actionName, config, payload);
      let result = rawResult;
      let toolAttachments: Attachment[] | undefined = undefined;

      // Extract Base64 from MCP nested JSON strings to prevent token bloat
      if (result && result.content && Array.isArray(result.content) && result.content[0]?.type === 'text') {
          try {
              const parsedText = JSON.parse(result.content[0].text);
              if (parsedText && parsedText.screenshot) {
                  toolAttachments = [{
                      id: `screenshot-${Date.now()}`,
                      name: 'screenshot.png',
                      file: new File([""], "screenshot.png", { type: "image/png" }),
                      base64Url: parsedText.screenshot,
                      mimeType: 'image/png'
                  }];
                  
                  delete parsedText.screenshot;
                  result = {
                      ...result,
                      content: [
                          {
                              ...result.content[0],
                              text: JSON.stringify(parsedText)
                          },
                          ...result.content.slice(1)
                      ]
                  };
              }
          } catch (e) {
              // Not JSON or no screenshot
          }
      } else if (result && result.screenshot) {
          // Fallback native tools
          toolAttachments = [{
              id: `screenshot-${Date.now()}`,
              name: 'screenshot.png',
              file: new File([""], "screenshot.png", { type: "image/png" }),
              base64Url: result.screenshot,
              mimeType: 'image/png'
          }];
          
          result = { ...result };
          delete result.screenshot;
      }

      setLastActionResult(result); // Trigger render update
      lastResultRef.current = result; // Store for immediate access
      
      // Notify parent of action success
      if (onAction) {
          onAction(actionName, result || payload);
      }

      // Feed result back to LLM for summarization if original input exists
      if (originalInput) {
         const newAccumulated = { ...accumulatedResults, [actionName]: result };

         const fullContext = context ? `${context}\nResult Context: ${JSON.stringify(newAccumulated).substring(0, 1000)}...` : undefined;
         const llmResponse = await callLLM(originalInput, config, newAccumulated, messages, fullContext, toolAttachments, selectedLlmIndex);
         
         addMessage(llmResponse.message, 'agent', toolAttachments);
         if (llmResponse.action) {
             await executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, originalInput, currentTriggeredActions, newAccumulated);
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
          
          if (actionName === 'createReport') {
              // Extract reportId if present
              const reportId = result?.id || result?.reportId;
              setCurrentStep({
                  id: 'post_create_suggestion',
                  message: '',
                  options: [
                      { label: 'Open Report', triggerAction: 'openReport', actionType: 'api', value: reportId, payloadKey: 'id' },
                      { label: 'Manage Access/Permissions', triggerAction: 'manageAccess', actionType: 'api', value: reportId, payloadKey: 'id' }
                  ]
              } as any);
              setShowOptions(true);
          }
      } else {
        addMessage("✅ Action completed successfully!", 'agent');
      }
      
      return result; // Return result for caller to use

    } catch (error: any) {
      addMessage(`❌ Action failed: ${error.message}`, 'agent');
      return null;
    } finally {
      setIsTyping(false);
    }
  }, [config, messages, workflowState, addMessage, interpolate, onAction, context]);

  const goToStep = useCallback((stepId: string, stateUpdate: Record<string, any> = {}) => {
    // 1. Manage Stop Signal Lifecycle based on Step ID
    if (stepId === 'stop_flow') {
        stopSignalRef.current = true;
        setIsAutoRunning(false);
    } else if (stepId === 'win_start' || stepId === 'assist_start') {
        // Reset signal when starting a new automation flow
        stopSignalRef.current = false;
    }

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
              value: typeof opt.value === 'string' ? interpolate(opt.value, updatedState) : opt.value,
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
      if (!currentStep) return;

      // If we moved to a different step, reset the auto-execution blocker.
      // this allows A -> B -> A flows to re-trigger automated actions.
      if (lastAutoExecutedStepIdRef.current !== currentStep.id) {
          lastAutoExecutedStepIdRef.current = null;
      }

      // Case A: Step has an action to execute
      if (currentStep.triggerAction && !currentStep.inputTarget && currentStep.actionType === 'api') {
          // Prevent infinite loop if already executed for this step ID in this visit
          if (lastAutoExecutedStepIdRef.current === currentStep.id) {
              return;
          }
          
          lastAutoExecutedStepIdRef.current = currentStep.id;

          const execute = async () => {
              // Check stop signal before starting delay
              if (stopSignalRef.current) return;

              if (currentStep.delay) {
                  await new Promise(resolve => setTimeout(resolve, currentStep.delay));
              }
              
              // Check stop signal after delay
              if (stopSignalRef.current) return;

              const result = await executeApiAction(currentStep.triggerAction!, undefined, currentStep.payloadKey, currentStep.fixedPayload);
              
              // Check stop signal after execution (CRITICAL fix for race condition)
              if (stopSignalRef.current) {
                  console.log('Stop signal detected after execution. Aborting auto-advance.');
                  return;
              }

              // Check if result mandates a next step override
              if (result && result.nextStepId) {
                  scheduleAutoAdvance(result.nextStepId, 500);
              } else if (currentStep.nextStepId) {
                  scheduleAutoAdvance(currentStep.nextStepId, 500);
              }
          };
          execute();
      } 
      // Case B: Step has NO action, but HAS a next step (informational/delay step)
      else if (!currentStep.triggerAction && !currentStep.inputTarget && currentStep.nextStepId && (!currentStep.options || currentStep.options.length === 0)) {
           // Prevent infinite loop
           if (lastAutoExecutedStepIdRef.current === currentStep.id) {
              return;
           }
           lastAutoExecutedStepIdRef.current = currentStep.id;

           const delay = currentStep.delay || 1000; // Default to 1s if not specified
           
           // Check stop signal before scheduling
           if (stopSignalRef.current) return;
           
           scheduleAutoAdvance(currentStep.nextStepId, delay);
      }
  }, [currentStep, executeApiAction, goToStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showOptions, isMaximized]);

  // const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // REMOVED DUPLICATE

  const cancelAutoAdvance = () => {
      if (autoAdvanceTimerRef.current) {
          clearTimeout(autoAdvanceTimerRef.current);
          autoAdvanceTimerRef.current = null;
      }
      setIsAutoRunning(false);
  };

  const scheduleAutoAdvance = (stepId: string, delay: number = 500, stateUpdate: Record<string, any> = {}) => {
      // If we are stopped, do NOT schedule anything
      if (stopSignalRef.current) {
          console.log('Attempted to schedule auto-advance while stopped. Ignoring.');
          return;
      }

      cancelAutoAdvance(); // Clears timer but we set running to true immediately after
      setIsAutoRunning(true);
      autoAdvanceTimerRef.current = setTimeout(() => {
          if (stopSignalRef.current) return; // Final fallback check
          goToStep(stepId, stateUpdate);
      }, delay);
  };
  
  const handleStop = async () => {
      console.log('Stopping auto-play...');
      
      // 1. Set signal FIRST to block any pending execution
      stopSignalRef.current = true;
      
      // 2. Kill any timers
      cancelAutoAdvance();
      
      // 3. Update UI State
      setIsAutoRunning(false);
      setIsTyping(false);
      
      // 4. Simulate user typing "stop" to trigger the generic stop intent logic
      // This creates a natural flow where the agent responds to the "stop" command
      await handleSend("stop"); 
  };

  const handleOptionClick = async (option: InteractionOption, skipMessage = false) => {
    cancelAutoAdvance(); // User interacted, stop auto-pilot
    // Ensure stop signal is reset if user manually interacts? 
    stopSignalRef.current = false;
    
    const current = stepRef.current || currentStep;
    
    // Special Case: If the current step has an inputTarget, treat options as quick-reply inputs
    if (current?.inputTarget) {
        const val = option.value !== undefined ? option.value : option.label;
        await handleSend(val);
        return;
    }

    // 1. Log option choice
    if (!skipMessage) {
        addMessage(option.label, 'user');
    }
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

    // 4. Navigate or Submit
    if (option.nextStepId) {
        const stateUpdate: Record<string, any> = {};
        
        // Handle payloadKey/value interpolation
        if (option.payloadKey && option.value !== undefined) {
            stateUpdate[option.payloadKey] = typeof option.value === 'string' ? interpolate(option.value, workflowState) : option.value;
        }

        // Handle explicit stateUpdate interpolation
        if (option.stateUpdate) {
            for (const key in option.stateUpdate) {
                const val = option.stateUpdate[key];
                stateUpdate[key] = typeof val === 'string' ? interpolate(val, workflowState) : val;
            }
        }

        scheduleAutoAdvance(option.nextStepId, 400, stateUpdate);
    } else if (option.value && !option.triggerAction) {
        // NEW: If no navigation is provided but a value exists, treat it as a message submission
        // We skip option matching in the recursive call to prevent infinite loop if label == value
        // We skip logging in handleSend because we already logged the option label above
        await handleSend(option.value as string, true, true);
    }
  };

  const handleQuickAction = () => {
      cancelAutoAdvance();
      
      // If a custom frequent action is defined, use it
      if (config.frequentAction) {
          handleOptionClick(config.frequentAction);
          return;
      }

      // Default behavior: Send the action label as text
      const actionLabel = config.actionLabel || 'Create Report';
      setInput(actionLabel);
      handleSend(actionLabel);
  };
  
  const handleSend = async (manualInput?: string, skipOptionMatching = false, skipLog = false) => {
    cancelAutoAdvance(); // User interacted, stop auto-pilot
    const textToSend = manualInput || input;
    // Allow send if there is text OR there are attachments
    if (!textToSend.trim() && pendingAttachments.length === 0) return;

    const userInput = textToSend.trim();
    
    // Process attachments to Base64
    const processedAttachments: Attachment[] = [];
    if (!skipLog) {
        for (const attachment of pendingAttachments) {
            if (attachment.file) {
                // Skip converting full PDF binary to Base64 to prevent WebGL/Memory crashes
                if (attachment.isPdf) {
                    processedAttachments.push(attachment);
                    continue;
                }

                const base64Url = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(attachment.file!);
                });
                processedAttachments.push({
                    ...attachment,
                    base64Url
                });
            } else {
                processedAttachments.push(attachment);
            }
        }
        
        // Always log the user message (whether typed or clicked) unless suppressed
        setMessages((prev) => [
            ...prev,
            {
                id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                text: userInput,
                sender: 'user',
                timestamp: Date.now(),
                attachments: processedAttachments.length > 0 ? processedAttachments : undefined
            },
        ]);
    }
    
    if (!manualInput) {
        setInput('');
        setPendingAttachments([]);
    }
    
    setIsTyping(true);

    try {
      const current = stepRef.current || currentStep;

      // 0. Input Capture (Deterministic Flow)
      console.log('Checking input capture:', { 
          currentStepId: current?.id, 
          inputTarget: current?.inputTarget, 
          userInput 
      });

      if (current && current.inputTarget) {
          // Save input to workflow state
          const newState = { ...workflowState, [current.inputTarget]: userInput };
          setWorkflowState(newState);

          console.log('Input saved, checking actions...', current.triggerAction);

          // If step has an action, execute it
          if (current.triggerAction && current.actionType === 'api') {
              // Use the captured input as value if payloadKey matches inputTarget or is separate
              const value = userInput;
              await executeApiAction(
                  current.triggerAction, 
                  value, 
                  current.payloadKey, 
                  current.fixedPayload, 
                  undefined // No LLM feedback loop for deterministic steps typically
              );
          }

          setIsTyping(false);

          // Navigate to next step
          if (current.nextStepId) {
             goToStep(current.nextStepId, { [current.inputTarget]: userInput });
          }
          return;
      }

      // 1. Strict Intent Matching (95%+ similarity)
      const normalizedInput = userInput.toLowerCase();
      
      // Check available options first (context-aware)
      // skipOptionMatching is true when called from handleOptionClick to prevent recursion
      if (current?.options && !skipOptionMatching) {
        for (const option of current.options) {
            const similarity = getSimilarity(normalizedInput, option.label.toLowerCase());
            if (similarity >= 0.95) {
                setIsTyping(false);
                handleOptionClick(option, true);
                return;
            }
        }
      }

      if (config.intents) {
        let bestStrictMatch = { intent: null as any, score: 0 };
        
        for (const intent of config.intents) {
           // Regex Priority Check
           if (intent.extractors && intent.extractors.length > 0) {
               const allMatch = intent.extractors.every((ex: any) => new RegExp(ex.regex, 'i').test(userInput));
               if (allMatch) {
                   bestStrictMatch = { intent, score: 1.1 }; // Priority over keywords
                   break;
               }
           }

           for (const keyword of intent.keywords) {
               const similarity = getSimilarity(normalizedInput, keyword.toLowerCase());
               if (similarity >= 0.95 && similarity > bestStrictMatch.score) {
                   bestStrictMatch = { intent, score: similarity };
               }
           }
        }

        if (bestStrictMatch.intent) {
            const intent = bestStrictMatch.intent;
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

      // 2. LLM Prioritization
      if (config.llms && config.llms.length > 0) {
        const fullContext = context ? `${context}\n${Object.entries(workflowState).map(([k, v]) => `${k}: ${v}`).join('\n')}` : undefined;
        const llmResponse = await callLLM(userInput, config, lastActionResult, messages, fullContext, processedAttachments, selectedLlmIndex);
        setIsTyping(false);
        addMessage(llmResponse.message, 'agent');
        
        if (llmResponse.action) {
          executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, userInput, []);
        }
        return;
      }

      // 3. Fuzzy Intent Fallback (Only if LLM is unavailable or failed)
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
            // (Data extraction logic nested here)
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

      // 4. Default Fallback
      setIsTyping(false);
      if (config.fallbackStepId) {
          goToStep(config.fallbackStepId);
      } else {
          addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
      }
    } catch (error: any) {
      console.error(error);
      setIsTyping(false);
      addMessage("I encountered an error while processing your request. Please try again later.", 'agent');
    }
  };

  const handleNewChat = () => {
      // Create new ID
      setCurrentConversationId(`conv-${Date.now()}`);
      
      // Reset messages to the initial state (either empty for workflow, or default greeting)
      setMessages(() => {
        if (config.initialStepId) return [];
        return [{
          id: `msg-initial-${Date.now()}`,
          text: `Hey ${user?.name || 'there'}! I'm ready to assist you.`,
          sender: 'agent',
          timestamp: Date.now(),
        }];
      });
      setInput('');
      if (config.initialStepId) goToStep(config.initialStepId);
  };

  const loadConversation = (id: string) => {
      const targetConv = conversations.find(c => c.id === id);
      if (!targetConv) return;
      
      setCurrentConversationId(targetConv.id);
      setMessages(targetConv.messages);
      if (targetConv.llmIndex !== undefined) setSelectedLlmIndex(targetConv.llmIndex);
      setShowHistoryMenu(false);
  };

  return (
    <div className={`chat-container glass-morphism-dark agent-neo-font ${isMaximized ? 'maximized' : ''}`} data-theme={theme}>
      <div className="chat-header">
        <div className="header-info">
          <div className="status-indicator"></div>
          <span className="header-title">{config.agentName || 'Neo Agent'}</span>
        </div>
        <div className="header-controls">
            
            {/* STOP BUTTON - Only visible when busy/auto-running AND explicitly enabled */}
            {(isAutoRunning || isTyping) && config.showStopButton && (
                <button 
                  onClick={handleStop}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  title="Stop Auto-Play / Cancel"
                >
                  <Square size={18} fill="currentColor" />
                </button>
            )}

            {/* Maximize Button */}
            {onToggleMaximize && (
                <button 
                    onClick={onToggleMaximize}
                    className="close-btn"
                    title={isMaximized ? "Restore" : "Maximize"}
                    style={{ marginRight: '4px' }}
                >
                    {isMaximized ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
            )}

            {/* New Chat Button */}
            <button 
                onClick={handleNewChat}
                className="close-btn"
                title="Start a new chat"
            >
                <Plus size={18} />
            </button>

            {/* History Selector */}
            <div className="theme-selector-container">
                <button 
                    onClick={() => { setShowHistoryMenu(!showHistoryMenu); setShowThemeMenu(false); setShowProviderMenu(false); }}
                    className="close-btn"
                    title="Conversation History"
                >
                    <Clock size={18} />
                </button>
                <AnimatePresence>
                    {showHistoryMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            className="theme-dropdown"
                            style={{ minWidth: '220px', maxHeight: '300px', overflowY: 'auto' }}
                        >
                            <span className="theme-label">History</span>
                            {conversations.length === 0 ? (
                                <div style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--text-secondary)' }}>No previous chats.</div>
                            ) : (
                                conversations.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => loadConversation(c.id)}
                                        className="theme-option"
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 12px' }}
                                    >
                                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{c.title}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            {new Date(c.timestamp).toLocaleDateString()} {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </button>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Provider Selector */}
            {config.llms && config.llms.length > 0 && (
                <div className="theme-selector-container">
                    <button 
                        onClick={() => { setShowProviderMenu(!showProviderMenu); setShowThemeMenu(false); setShowHistoryMenu(false); }}
                        className="close-btn"
                        title="Select LLM Provider"
                    >
                        <UserIcon size={18} />
                    </button>
                    <AnimatePresence>
                        {showProviderMenu && (
                            <motion.div 
                                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                className="theme-dropdown"
                            >
                                <span className="theme-label">Agent Brain</span>
                                {config.llms.map((_llm, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedLlmIndex(idx); setShowProviderMenu(false); }}
                                        className="theme-option"
                                        style={{ opacity: selectedLlmIndex === idx ? 1 : 0.7 }}
                                    >
                                        <div 
                                          className="theme-color-indicator" 
                                          style={{ background: selectedLlmIndex === idx ? '#10b981' : 'transparent', border: selectedLlmIndex === idx ? 'none' : '1px solid var(--border-color)' }}
                                        ></div>
                                        <span>Agent {String.fromCharCode(65 + idx)}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
      </div>

      <div ref={scrollRef} className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}
          >
            {msg.attachments && msg.attachments.length > 0 && (
                <div className="message-attachments" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {msg.attachments.map(att => (
                        <div key={att.id} style={{ maxWidth: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                            {att.mimeType.startsWith('image/') || att.thumbnailUrl ? (
                                <div style={{ position: 'relative' }}>
                                    <img src={att.thumbnailUrl || att.base64Url} alt={att.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    {att.isPdf && (
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', padding: '2px 4px', textAlign: 'center' }}>PDF Document</div>
                                    )}
                                </div>
                            ) : (
                                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.1)', fontSize: '12px' }}>📄 {att.name}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {msg.sender === 'user' ? (
                <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
            ) : (
                <div className="msg-markdown" style={{ fontSize: '14px', lineHeight: '1.6', width: '100%', overflowX: 'auto' }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline ? (
                                    <SyntaxHighlighter
                                        {...props}
                                        style={vscDarkPlus as any}
                                        language={match ? match[1] : 'text'}
                                        PreTag="div"
                                        customStyle={{ borderRadius: '6px', margin: '8px 0', fontSize: '13px', background: '#1e1e1e' }}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props} style={{ background: 'rgba(128,128,128,0.25)', padding: '2px 4px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>
                                        {children}
                                    </code>
                                );
                            },
                            p: ({node, ...props}) => <p style={{ margin: '8px 0' }} {...props} />,
                            ul: ({node, ...props}) => <ul style={{ paddingLeft: '20px', margin: '8px 0', listStyleType: 'disc' }} {...props} />,
                            ol: ({node, ...props}) => <ol style={{ paddingLeft: '20px', margin: '8px 0', listStyleType: 'decimal' }} {...props} />,
                            li: ({node, ...props}) => <li style={{ marginBottom: '4px' }} {...props} />,
                            a: ({node, ...props}) => <a style={{ color: '#3b82f6', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" {...props} />
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
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
        {config.showFrequentActions && (
          <div className="actions-suggestion">
             <span className="actions-label">Frequent Actions</span>
             <button className="action-button" onClick={handleQuickAction}>
               <span style={{ marginRight: '8px' }}>⚡</span>
               {config.frequentAction?.label || config.actionLabel || 'Create Report'}
             </button>
          </div>
        )}

      </div>


      <div className="input-area-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 15px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        
        {pendingAttachments.length > 0 && (
            <div className="attachment-preview-bar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {pendingAttachments.map(att => (
                    <div key={att.id} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        {att.thumbnailUrl ? (
                             <img src={att.thumbnailUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : att.file && att.mimeType.startsWith('image/') ? (
                             <img src={URL.createObjectURL(att.file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', fontSize: '24px' }}>📄</div>
                        )}
                        <button 
                            onClick={() => setPendingAttachments(prev => prev.filter(p => p.id !== att.id))}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '2px', cursor: 'pointer' }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
        )}

        <div className="input-area" style={{ padding: 0, border: 'none', background: 'transparent' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="attach-btn"
            style={{ padding: '8px', color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <input 
             type="file" 
             multiple 
             ref={fileInputRef} 
             style={{ display: 'none' }} 
             accept="image/*,application/pdf,text/plain"
             onChange={async (e) => {
                 if (e.target.files) {
                     const filesArray = Array.from(e.target.files);
                     const newAtts: Attachment[] = [];
                     
                     for (const file of filesArray) {
                         const att: Attachment = {
                             id: `att-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,
                             file,
                             mimeType: file.type,
                             name: file.name
                         };
                         
                         if (file.type === 'application/pdf') {
                             att.isPdf = true;
                             try {
                                 const arrayBuffer = await file.arrayBuffer();
                                 const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                                 const page = await pdf.getPage(1);
                                 const viewport = page.getViewport({ scale: 1.0 });
                                 const canvas = document.createElement('canvas');
                                 const ctx = canvas.getContext('2d');
                                 canvas.height = viewport.height;
                                 canvas.width = viewport.width;
                                 if (ctx) {
                                     await page.render({ canvasContext: ctx, viewport }).promise;
                                     att.thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
                                 }
                             } catch (err) {
                                 console.error("PDF Thumbnail Generation Failed:", err);
                             }
                         }
                         newAtts.push(att);
                     }
                     setPendingAttachments(prev => [...prev, ...newAtts]);
                 }
                 e.target.value = ''; // Reset
             }}
          />
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
