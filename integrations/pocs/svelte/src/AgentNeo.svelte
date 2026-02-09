<svelte:options tag="agent-neo" />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { AppConfig, Message, User, InteractionStep, InteractionOption } from './types';
  import { presets } from './presets';
  import { callEndpoint, callLLM } from './services/api';

  export let config: AppConfig = { endpoints: [] } as AppConfig;
  export let preset = 'default';
  export let context = '';
  export let user: User | null = null;

  let isOpen = false;
  let agentState: 'idle' | 'active' | 'thinking' = 'idle';
  let messages: Message[] = [];
  let input = '';
  let isTyping = false;
  let currentStep: InteractionStep | undefined;
  let workflowState: Record<string, any> = {};
  let lastActionResult: any = null;
  let showOptions = true;
  let theme: 'dark' | 'light' | 'glass' = 'dark';
  let showThemeMenu = false;
  let showGreeting = false;

  let initialized = false;
  let greetingTimer: number | undefined;
  let lastAutoExecutedStepId: string | null = null;
  let finalConfig: AppConfig = { endpoints: [] } as AppConfig;

  let messagesContainer: HTMLDivElement | null = null;
  let hostEl: HTMLElement;

  const computeFinalConfig = () => {
    if (preset && presets[preset]) {
      const presetConfig = presets[preset];
      return {
        ...presetConfig,
        ...config,
        endpoints: [...(presetConfig.endpoints || []), ...(config.endpoints || [])],
        intents: [...(presetConfig.intents || []), ...(config.intents || [])]
      } as AppConfig;
    }
    return config;
  };

  const initializeMessages = () => {
    if (finalConfig.initialStepId) {
      messages = [];
      goToStep(finalConfig.initialStepId);
      return;
    }

    messages = [
      {
        id: 'msg-initial',
        text: `Hey ${user?.name || 'there'}! I'm ready to assist you.`,
        sender: 'agent',
        timestamp: Date.now()
      }
    ];
  };

  const addMessage = (text: string, sender: 'agent' | 'user') => {
    messages = [
      ...messages,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        text,
        sender,
        timestamp: Date.now()
      }
    ];
  };

  const interpolate = (text: string, state: Record<string, any>): string => {
    if (!text) return text;
    let result = text;

    result = result.replace(/\{\{\s*userName\s*\}\}/g, user?.name || 'there');
    result = result.replace(/\{\{\s*agentName\s*\}\}/g, finalConfig.agentName || 'Neo');

    for (const key in state) {
      result = result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), state[key]);
    }

    const actionRes = lastActionResult;
    if (actionRes) {
      if (Array.isArray(actionRes)) {
        result = result.replace(/\{\{\s*result\.length\s*\}\}/g, actionRes.length.toString());
        result = result.replace(/\{\{\s*result\[(\d+)\]\.([\w]+)\s*\}\}/g, (_, index, key) => {
          return actionRes[parseInt(index, 10)] ? actionRes[parseInt(index, 10)][key] || '' : '';
        });
      } else {
        result = result.replace(/\{\{\s*result\.([\w]+)\s*\}\}/g, (_, key) => {
          return actionRes[key] || '';
        });
      }
    }

    return result;
  };

  const setNestedProperty = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  const executeApiAction = async (
    actionName: string,
    value?: any,
    payloadKey?: string,
    fixedPayload?: any,
    originalInput?: string,
    triggeredActions: string[] = []
  ) => {
    if (triggeredActions.includes(actionName)) {
      console.warn(`Tool recursion detected for ${actionName}. Skipping.`);
      return;
    }
    const currentTriggeredActions = [...triggeredActions, actionName];

    isTyping = true;
    try {
      let payload = fixedPayload ? JSON.parse(JSON.stringify(fixedPayload)) : {};

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

      const result = await callEndpoint(actionName, finalConfig, payload);
      lastActionResult = result;

      hostEl.dispatchEvent(
        new CustomEvent('onAction', {
          detail: { name: actionName, data: result || payload },
          bubbles: true,
          composed: true
        })
      );

      if (originalInput) {
        const fullContext = context
          ? `${context}\nResult Context: ${JSON.stringify(result).substring(0, 1000)}...`
          : undefined;
        const llmResponse = await callLLM(originalInput, finalConfig, result, messages, fullContext);

        addMessage(llmResponse.message, 'agent');
        if (llmResponse.action) {
          await executeApiAction(
            llmResponse.action.name,
            undefined,
            undefined,
            llmResponse.action.payload,
            originalInput,
            currentTriggeredActions
          );
        }

        if (actionName === 'generateReportPdf') {
          currentStep = {
            id: 'activity_log_suggestion',
            message: '',
            options: [{ label: 'Show activity log', actionType: 'link', externalLink: '/settings/activity-log' }]
          } as any;
          showOptions = true;
        }

        if (actionName === 'createReport') {
          const reportId = result?.id || result?.reportId;
          currentStep = {
            id: 'post_create_suggestion',
            message: '',
            options: [
              { label: 'Open Report', triggerAction: 'openReport', actionType: 'api', value: reportId, payloadKey: 'id' },
              { label: 'Manage Access/Permissions', triggerAction: 'manageAccess', actionType: 'api', value: reportId, payloadKey: 'id' }
            ]
          } as any;
          showOptions = true;
        }
      } else {
        addMessage('✅ Action completed successfully!', 'agent');
      }
    } catch (error: any) {
      addMessage(`❌ Action failed: ${error.message}`, 'agent');
    } finally {
      isTyping = false;
    }
  };

  const goToStep = (stepId: string, stateUpdate: Record<string, any> = {}) => {
    const updatedState = { ...workflowState, ...stateUpdate };
    workflowState = updatedState;

    const step = finalConfig.workflow?.find((s) => s.id === stepId);
    if (!step) return;

    if (step.skipIf) {
      try {
        const shouldSkip = !!updatedState[step.skipIf.replace('workflowState.', '')];
        if (shouldSkip) {
          const nextStepId = step.options?.[0]?.nextStepId;
          if (nextStepId) {
            goToStep(nextStepId, updatedState);
            return;
          }
        }
      } catch (e) {
        console.warn('Skip evaluation failed:', e);
      }
    }

    const stepClone = JSON.parse(JSON.stringify(step)) as InteractionStep;

    if (stepClone.useResultsAsOptions && Array.isArray(lastActionResult)) {
      const dConfig = stepClone.dynamicOptionsConfig;
      if (dConfig) {
        const dynamicOptions: InteractionOption[] = lastActionResult.map((item: any) => ({
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

    if (stepClone.options) {
      stepClone.options = stepClone.options.map((opt) => ({
        ...opt,
        label: interpolate(opt.label, updatedState),
        value: typeof opt.value === 'string' ? interpolate(opt.value, updatedState) : opt.value,
        externalLink: opt.externalLink ? interpolate(opt.externalLink, updatedState) : undefined
      }));
    }

    currentStep = stepClone;
    showOptions = true;
    addMessage(interpolate(step.message, updatedState), 'agent');
  };

  const autoExecuteStepIfNeeded = () => {
    if (!currentStep) return;

    if (lastAutoExecutedStepId !== currentStep.id) {
      lastAutoExecutedStepId = null;
    }

    if (currentStep.triggerAction && !currentStep.inputTarget && currentStep.actionType === 'api') {
      if (lastAutoExecutedStepId === currentStep.id) return;

      lastAutoExecutedStepId = currentStep.id;

      const execute = async () => {
        await executeApiAction(currentStep!.triggerAction!, undefined, currentStep!.payloadKey, currentStep!.fixedPayload);
        if (currentStep?.nextStepId) {
          setTimeout(() => {
            goToStep(currentStep!.nextStepId!);
          }, 500);
        }
      };
      execute();
    }
  };

  const handleOptionClick = async (option: InteractionOption, skipMessage = false) => {
    const current = currentStep;

    const immediateStateUpdate: Record<string, any> = {};
    if (option.payloadKey && option.value !== undefined) {
      immediateStateUpdate[option.payloadKey] =
        typeof option.value === 'string' ? interpolate(option.value, workflowState) : option.value;
    }
    if (option.stateUpdate) {
      for (const key in option.stateUpdate) {
        const val = option.stateUpdate[key];
        immediateStateUpdate[key] = typeof val === 'string' ? interpolate(val, workflowState) : val;
      }
    }
    if (Object.keys(immediateStateUpdate).length > 0) {
      workflowState = { ...workflowState, ...immediateStateUpdate };
    }

    if (current?.inputTarget) {
      const val = option.value !== undefined ? option.value : option.label;
      await handleSend(val);
      return;
    }

    if (!skipMessage) {
      addMessage(option.label, 'user');
    }
    showOptions = false;

    if (option.triggerAction && option.actionType === 'api') {
      await executeApiAction(option.triggerAction, option.value, option.payloadKey, option.fixedPayload);
    } else if (option.actionType === 'whatsapp') {
      window.open(`https://wa.me/${option.externalLink || '573025688681'}`, '_blank');
      addMessage('Opening WhatsApp to connect you with our help desk... 🚀', 'agent');
    } else if (option.actionType === 'link' && option.externalLink) {
      window.open(option.externalLink, '_blank');
    }

    if (option.nextStepId) {
      setTimeout(() => {
        const stateUpdate: Record<string, any> = {};

        if (option.payloadKey && option.value !== undefined) {
          stateUpdate[option.payloadKey] = typeof option.value === 'string' ? interpolate(option.value, workflowState) : option.value;
        }

        if (option.stateUpdate) {
          for (const key in option.stateUpdate) {
            const val = option.stateUpdate[key];
            stateUpdate[key] = typeof val === 'string' ? interpolate(val, workflowState) : val;
          }
        }

        goToStep(option.nextStepId!, stateUpdate);
      }, 400);
    }
  };

  const handleQuickAction = () => {
    const actionLabel = finalConfig.actionLabel || 'Create Report';
    input = actionLabel;
    handleSend(actionLabel);
  };

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    const userInput = textToSend.trim();

    addMessage(userInput, 'user');

    if (!manualInput) {
      input = '';
    }

    isTyping = true;

    try {
      const current = currentStep;

      if (current && current.inputTarget) {
        const newState = { ...workflowState, [current.inputTarget]: userInput };
        workflowState = newState;

        if (current.triggerAction && current.actionType === 'api') {
          await executeApiAction(current.triggerAction, userInput, current.payloadKey, current.fixedPayload, undefined);
        }

        isTyping = false;

        if (current.nextStepId) {
          goToStep(current.nextStepId, { [current.inputTarget]: userInput });
        }
        return;
      }

      const normalizedInput = userInput.toLowerCase();

      if (current?.options) {
        for (const option of current.options) {
          const similarity = getSimilarity(normalizedInput, option.label.toLowerCase());
          if (similarity >= 0.95) {
            isTyping = false;
            handleOptionClick(option, true);
            return;
          }
        }
      }

      if (finalConfig.intents) {
        let bestStrictMatch = { intent: null as any, score: 0 };

        for (const intent of finalConfig.intents) {
          for (const keyword of intent.keywords) {
            const similarity = getSimilarity(normalizedInput, keyword.toLowerCase());
            if (similarity >= 0.95 && similarity > bestStrictMatch.score) {
              bestStrictMatch = { intent, score: similarity };
            }
          }
        }

        if (bestStrictMatch.intent) {
          const intent = bestStrictMatch.intent;
          const extractedData: Record<string, any> = {};
          if (intent.extractors) {
            intent.extractors.forEach((ex: any) => {
              const match = userInput.match(new RegExp(ex.regex, 'i'));
              if (match && match[1]) {
                extractedData[ex.key] = match[1].trim();
              }
            });
          }
          isTyping = false;
          goToStep(intent.nextStepId, extractedData);
          return;
        }
      }

      if (finalConfig.llms && finalConfig.llms.length > 0) {
        const fullContext = context
          ? `${context}\n${Object.entries(workflowState)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n')}`
          : undefined;
        const llmResponse = await callLLM(userInput, finalConfig, lastActionResult, messages, fullContext);
        isTyping = false;
        addMessage(llmResponse.message, 'agent');

        if (llmResponse.action) {
          executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, userInput, []);
        }
        return;
      }

      if (finalConfig.intents) {
        let bestMatch = { intent: null as any, score: 0 };

        for (const intent of finalConfig.intents) {
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
          const extractedData: Record<string, any> = {};
          if (intent.extractors) {
            intent.extractors.forEach((ex: any) => {
              const match = userInput.match(new RegExp(ex.regex, 'i'));
              if (match && match[1]) {
                extractedData[ex.key] = match[1].trim();
              }
            });
          }
          isTyping = false;
          goToStep(intent.nextStepId, extractedData);
          return;
        }
      }

      isTyping = false;
      if (finalConfig.fallbackStepId) {
        goToStep(finalConfig.fallbackStepId);
      } else {
        addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
      }
    } catch (error) {
      console.error(error);
      isTyping = false;
      addMessage('I encountered an error while processing your request. Please try again later.', 'agent');
    }
  };

  const getSimilarity = (s1: string, s2: string): number => {
    const longer = s1.length < s2.length ? s2 : s1;
    const shorter = s1.length < s2.length ? s1 : s2;
    if (longer.length === 0) return 1.0;

    const editDistance = (a: string, b: string): number => {
      const costs = [] as number[];
      for (let i = 0; i <= a.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= b.length; j++) {
          if (i === 0) costs[j] = j;
          else if (j > 0) {
            let newValue = costs[j - 1];
            if (a.charAt(i - 1) !== b.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
        if (i > 0) costs[b.length] = lastValue;
      }
      return costs[b.length];
    };

    return (longer.length - editDistance(longer.toLowerCase(), shorter.toLowerCase())) / longer.length;
  };

  const toggleTheme = (newTheme: 'dark' | 'light' | 'glass') => {
    theme = newTheme;
    try {
      localStorage.setItem('neo-theme', newTheme);
    } catch {
      // ignore
    }
    showThemeMenu = false;
  };

  const createHexagonPath = (cx: number, cy: number, r: number) => {
    const points = Array.from({ length: 6 }).map((_, i) => {
      const theta = (Math.PI / 3) * i - Math.PI / 2;
      return {
        x: cx + r * Math.cos(theta),
        y: cy + r * Math.sin(theta)
      };
    });

    const getPoint = (i: number) => points[(i + 6) % 6];
    const lerp = (p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) => ({
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    });

    const reduction = 0.15;
    let d = '';

    for (let i = 0; i < 6; i++) {
      const curr = getPoint(i);
      const next = getPoint(i + 1);

      if (i === 0) {
        const start = lerp(curr, next, reduction);
        d += `M ${start.x},${start.y} `;
      }

      const lineEnd = lerp(curr, next, 1 - reduction);
      d += `L ${lineEnd.x},${lineEnd.y} `;

      const nextStart = lerp(next, getPoint(i + 2), reduction);
      d += `Q ${next.x},${next.y} ${nextStart.x},${nextStart.y} `;
    }

    return d + 'Z';
  };

  onMount(() => {
    hostEl = document.querySelector('agent-neo') as HTMLElement;
    try {
      const savedTheme = localStorage.getItem('neo-theme') as 'dark' | 'light' | 'glass' | null;
      if (savedTheme) theme = savedTheme;
    } catch {
      // ignore
    }
  });

  $: finalConfig = computeFinalConfig();

  $: if (!initialized && finalConfig) {
    initializeMessages();
    initialized = true;
  }

  $: if (isOpen) {
    agentState = isTyping ? 'thinking' : 'active';
  } else {
    agentState = 'idle';
  }

  $: if (!isOpen) {
    clearTimeout(greetingTimer);
    greetingTimer = window.setTimeout(() => {
      showGreeting = true;
    }, 2000);
  } else {
    showGreeting = false;
    clearTimeout(greetingTimer);
  }

  $: if (currentStep) {
    autoExecuteStepIfNeeded();
  }

  $: if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

  :host {
    display: block;
    font-family: 'Outfit', sans-serif;
    --agent-primary: #6366f1;
    --agent-primary-hover: #4f46e5;
    --agent-bg: rgba(17, 24, 39, 0.8);
    --agent-text: #ffffff;
    --agent-text-secondary: #9ca3af;
    --agent-border: rgba(255, 255, 255, 0.1);
    --agent-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    --agent-msg-bg: rgba(255, 255, 255, 0.05);
    --agent-input-bg: rgba(255, 255, 255, 0.05);
    --agent-pill-bg: rgba(99, 102, 241, 0.1);
    --agent-pill-text: #818cf8;
    --agent-pill-border: rgba(99, 102, 241, 0.3);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  [data-theme='light'] {
    --agent-primary: #4f46e5;
    --agent-primary-hover: #4338ca;
    --agent-bg: rgba(255, 255, 255, 0.85);
    --agent-text: #1f2937;
    --agent-text-secondary: #6b7280;
    --agent-border: rgba(0, 0, 0, 0.1);
    --agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    --agent-msg-bg: rgba(0, 0, 0, 0.05);
    --agent-input-bg: rgba(0, 0, 0, 0.05);
    --agent-pill-bg: rgba(79, 70, 229, 0.1);
    --agent-pill-text: #4f46e5;
    --agent-pill-border: rgba(79, 70, 229, 0.2);
  }

  [data-theme='glass'] {
    --agent-primary: #2563eb;
    --agent-primary-hover: #1d4ed8;
    --agent-bg: rgba(255, 255, 255, 0.3);
    --agent-text: #111827;
    --agent-text-secondary: #4b5563;
    --agent-border: rgba(255, 255, 255, 0.3);
    --agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    --agent-msg-bg: rgba(255, 255, 255, 0.4);
    --agent-input-bg: rgba(255, 255, 255, 0.4);
    --agent-pill-bg: rgba(37, 99, 235, 0.1);
    --agent-pill-text: #2563eb;
    --agent-pill-border: rgba(37, 99, 235, 0.2);
  }

  .agent-neo-root {
    position: relative;
  }

  .glass-morphism-dark {
    background: var(--agent-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--agent-border);
    box-shadow: var(--agent-shadow);
    border-radius: 16px;
    color: var(--agent-text);
  }

  .chat-container {
    position: fixed;
    bottom: 100px;
    right: 24px;
    width: 380px;
    height: 500px;
    display: flex;
    flex-direction: column;
    z-index: 9998;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .chat-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--agent-border);
  }

  .header-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
  }

  .header-title {
    color: var(--agent-text);
    font-weight: 600;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--agent-text-secondary);
    cursor: pointer;
    transition: color 0.2s;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    color: var(--agent-text);
    background: rgba(255, 255, 255, 0.1);
  }

  .header-controls {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .theme-selector-container {
    position: relative;
  }

  .theme-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border-radius: 12px;
    background: var(--agent-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--agent-border);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transform-origin: top right;
  }

  .theme-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
    margin-bottom: 4px;
    padding-left: 8px;
    color: var(--agent-text);
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    width: 100%;
    border: none;
    background: none;
    color: var(--agent-text);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    text-align: left;
    transition: background 0.2s;
  }

  .theme-option:hover {
    background: rgba(125, 125, 125, 0.15);
  }

  .theme-color-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
  }

  .message {
    max-width: 80%;
    padding: 8px 14px;
    border-radius: 40px;
    color: var(--agent-text);
    font-size: 14px;
    line-height: 1.25;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    white-space: pre-wrap;
    text-align: left;
  }

  .user-message {
    align-self: flex-end;
    background-color: var(--agent-primary);
    color: white;
    border-bottom-right-radius: 14px;
  }

  .agent-message {
    align-self: flex-start;
    background-color: var(--agent-msg-bg);
    border-bottom-left-radius: 14px;
  }

  .typing-indicator {
    align-self: flex-start;
    color: var(--agent-text-secondary);
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 4px 0;
  }

  .option-pill {
    background: var(--agent-pill-bg);
    border: 1px solid var(--agent-pill-border);
    color: var(--agent-pill-text);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .option-pill:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  .actions-suggestion {
    margin-top: 16px;
    padding: 0 4px;
  }

  .actions-label {
    display: block;
    font-size: 12px;
    color: var(--agent-text-secondary);
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .action-button {
    width: 100%;
    background: linear-gradient(90deg, var(--agent-primary) 0%, #a855f7 100%);
    border: none;
    border-radius: 12px;
    padding: 12px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s, transform 0.2s;
    font-size: 15px;
  }

  .action-button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .input-area {
    padding: 16px;
    display: flex;
    gap: 8px;
  }

  .chat-input {
    flex: 1;
    background-color: var(--agent-input-bg);
    border: 1px solid var(--agent-border);
    border-radius: 12px;
    padding: 10px 16px;
    color: var(--agent-text);
    outline: none;
    transition: border-color 0.2s;
  }

  .chat-input:focus {
    border-color: var(--agent-primary);
  }

  .send-btn {
    background-color: var(--agent-primary);
    border: none;
    border-radius: 12px;
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .send-btn:hover {
    background-color: var(--agent-primary-hover);
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .floating-avatar {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    cursor: pointer;
    z-index: 9999;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background: transparent;
  }

  .floating-avatar:hover {
    transform: scale(1.1);
  }

  .glass-morphism {
    background: transparent;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 32px;
  }

  .greeting-bubble {
    position: fixed !important;
    bottom: 100px !important;
    right: 24px !important;
    max-width: 250px;
    padding: 12px 16px;
    border-radius: 12px;
    border-bottom-right-radius: 4px;
    color: #1f2937;
    font-size: 14px;
    z-index: 9998;
    pointer-events: none;
    opacity: 0;
    transform: translateX(20px) scale(0.8);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .greeting-bubble.show {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  .nexus-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 999px;
    overflow: hidden;
  }

  .nexus-svg {
    display: block;
    width: 100%;
    height: 100%;
    padding: 4px;
    overflow: visible;
    shape-rendering: geometricPrecision;
  }

  .nexus-hex {
    transform-origin: 50% 50%;
    transform-box: fill-box;
    vector-effect: non-scaling-stroke;
    opacity: 1;
  }

  .nexus-hex.thinking.cw {
    animation: spin-cw var(--spin) linear infinite;
  }

  .nexus-hex.thinking.ccw {
    animation: spin-ccw var(--spin) linear infinite;
  }

  @keyframes spin-cw {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes spin-ccw {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }

  @keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.01); }
  }

  .nexus-wrap.thinking {
    animation: pulse 0.35s ease-in-out infinite alternate;
  }
</style>

<div bind:this={hostEl} class="agent-neo-root">
  {#if showGreeting && !isOpen}
    <div class={`greeting-bubble glass-morphism ${showGreeting ? 'show' : ''}`}>
      Hello there, {user?.name || 'there'}! I'm your assistant. How can I help you today?
    </div>
  {/if}

  <div class="floating-avatar glass-morphism" on:click={() => (isOpen = !isOpen)}>
    <div class={`nexus-wrap ${agentState === 'thinking' ? 'thinking' : ''}`}>
      <svg viewBox="0 0 200 200" class="nexus-svg">
        {#each Array(6) as _, i}
          <path
            class={`nexus-hex ${agentState === 'thinking' ? 'thinking' : ''} ${i % 2 === 0 ? 'cw' : 'ccw'}`}
            d={createHexagonPath(100, 100, 90 - i * 14)}
            fill="none"
            stroke={agentState === 'idle' ? '#9CA3AF' : i % 2 === 0 ? '#06B6D4' : '#3B82F6'}
            stroke-width={agentState === 'idle' ? 1.2 : 1.6}
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
            style={`--spin:${10 + i * 2}s; --delay:${i * 0.05}s;`}
          ></path>
        {/each}
      </svg>
    </div>
  </div>

  {#if isOpen}
    <div class="chat-container glass-morphism-dark" data-theme={theme}>
      <div class="chat-header">
        <div class="header-info">
          <div class="status-indicator"></div>
          <span class="header-title">{finalConfig.agentName || 'Neo Agent'}</span>
        </div>
        <div class="header-controls">
          <div class="theme-selector-container">
            <button class="close-btn" title="Change Theme" on:click={() => (showThemeMenu = !showThemeMenu)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="13.5" cy="6.5" r=".5"></circle>
                <circle cx="17.5" cy="10.5" r=".5"></circle>
                <circle cx="8.5" cy="7.5" r=".5"></circle>
                <circle cx="6.5" cy="12.5" r=".5"></circle>
                <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5 0-1.1.9-2 2-2h3a3 3 0 0 0 0-6h-1"></path>
              </svg>
            </button>
            {#if showThemeMenu}
              <div class="theme-dropdown">
                <span class="theme-label">Theme</span>
                {#each [
                  { id: 'dark', label: 'Dark Moon', color: '#1f2937' },
                  { id: 'light', label: 'Light Day', color: '#ffffff' },
                  { id: 'glass', label: 'Pure Glass', color: '#e5e7eb' }
                ] as t}
                  <button class="theme-option" on:click={() => toggleTheme(t.id)}>
                    <div class="theme-color-indicator" style={`background: ${t.color}`}></div>
                    <span>{t.label}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
          <button class="close-btn" on:click={() => (isOpen = false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="messages-container" bind:this={messagesContainer}>
        {#each messages as msg}
          <div class={`message ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}>
            {msg.text}
          </div>
        {/each}

        {#if isTyping}
          <div class="typing-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <span>{finalConfig.agentName || 'Neo '} is thinking...</span>
          </div>
        {/if}

        {#if currentStep?.options && showOptions && !isTyping}
          <div class="options-container">
            {#each currentStep.options as opt}
              <button class="option-pill" on:click={() => handleOptionClick(opt)}>{opt.label}</button>
            {/each}
          </div>
        {/if}

        <div class="actions-suggestion">
          <span class="actions-label">Frequent Actions</span>
          <button class="action-button" on:click={() => handleQuickAction()}>
            <span style="margin-right: 8px;">⚡</span>
            {finalConfig.actionLabel || 'Create Report'}
          </button>
        </div>
      </div>

      <div class="input-area">
        <input
          class="chat-input"
          type="text"
          bind:value={input}
          on:keypress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button class="send-btn" on:click={() => handleSend()} disabled={isTyping}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  {/if}
</div>
