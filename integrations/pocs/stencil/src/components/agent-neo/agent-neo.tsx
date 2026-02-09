import { Component, h, Prop, State, Element } from '@stencil/core';
import type { AppConfig, Message, User, InteractionStep, InteractionOption } from '../../types';
import { presets } from '../../presets';
import { callEndpoint, callLLM } from '../../services/api';

@Component({
  tag: 'agent-neo',
  styleUrl: 'agent-neo.css',
  shadow: true
})
export class AgentNeo {
  @Element() hostEl!: HTMLElement;

  @Prop() config: AppConfig = { endpoints: [] } as AppConfig;
  @Prop() preset = 'default';
  @Prop() context = '';
  @Prop() user: User | null = null;

  @State() isOpen = false;
  @State() agentState: 'idle' | 'active' | 'thinking' = 'idle';
  @State() messages: Message[] = [];
  @State() input = '';
  @State() isTyping = false;
  @State() currentStep?: InteractionStep;
  @State() workflowState: Record<string, any> = {};
  @State() lastActionResult: any = null;
  @State() showOptions = true;
  @State() theme: 'dark' | 'light' | 'glass' = 'dark';
  @State() showThemeMenu = false;
  @State() showGreeting = false;

  private initialized = false;
  private greetingTimer?: number;
  private lastAutoExecutedStepId: string | null = null;
  private finalConfig: AppConfig = { endpoints: [] } as AppConfig;

  componentWillLoad() {
    try {
      const savedTheme = localStorage.getItem('neo-theme') as 'dark' | 'light' | 'glass' | null;
      if (savedTheme) this.theme = savedTheme;
    } catch {
      // ignore
    }
  }

  componentWillRender() {
    if (this.finalConfig !== this.computeFinalConfig()) {
      this.finalConfig = this.computeFinalConfig();
    }
    if (!this.initialized) {
      this.initializeMessages();
      this.initialized = true;
    }
  }

  componentDidRender() {
    if (this.isOpen) {
      this.agentState = this.isTyping ? 'thinking' : 'active';
    } else {
      this.agentState = 'idle';
    }

    if (!this.isOpen) {
      window.clearTimeout(this.greetingTimer);
      this.greetingTimer = window.setTimeout(() => {
        this.showGreeting = true;
      }, 2000);
    } else {
      this.showGreeting = false;
      window.clearTimeout(this.greetingTimer);
    }

    if (this.currentStep) {
      this.autoExecuteStepIfNeeded();
    }

    const container = this.hostEl.shadowRoot?.querySelector('.messages-container') as HTMLDivElement | null;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  private computeFinalConfig(): AppConfig {
    if (this.preset && presets[this.preset]) {
      const presetConfig = presets[this.preset];
      return {
        ...presetConfig,
        ...this.config,
        endpoints: [...(presetConfig.endpoints || []), ...(this.config.endpoints || [])],
        intents: [...(presetConfig.intents || []), ...(this.config.intents || [])]
      } as AppConfig;
    }
    return this.config;
  }

  private initializeMessages() {
    if (this.finalConfig.initialStepId) {
      this.messages = [];
      this.goToStep(this.finalConfig.initialStepId);
      return;
    }

    this.messages = [
      {
        id: 'msg-initial',
        text: `Hey ${this.user?.name || 'there'}! I'm ready to assist you.`,
        sender: 'agent',
        timestamp: Date.now()
      }
    ];
  }

  private addMessage(text: string, sender: 'agent' | 'user') {
    this.messages = [
      ...this.messages,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        text,
        sender,
        timestamp: Date.now()
      }
    ];
  }

  private interpolate(text: string, state: Record<string, any>): string {
    if (!text) return text;
    let result = text;

    result = result.replace(/\{\{\s*userName\s*\}\}/g, this.user?.name || 'there');
    result = result.replace(/\{\{\s*agentName\s*\}\}/g, this.finalConfig.agentName || 'Neo');

    for (const key in state) {
      result = result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), state[key]);
    }

    const actionRes = this.lastActionResult;
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
  }

  private setNestedProperty(obj: any, path: string, value: any) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  private async executeApiAction(
    actionName: string,
    value?: any,
    payloadKey?: string,
    fixedPayload?: any,
    originalInput?: string,
    triggeredActions: string[] = []
  ) {
    if (triggeredActions.includes(actionName)) {
      console.warn(`Tool recursion detected for ${actionName}. Skipping.`);
      return;
    }
    const currentTriggeredActions = [...triggeredActions, actionName];

    this.isTyping = true;
    try {
      let payload = fixedPayload ? JSON.parse(JSON.stringify(fixedPayload)) : {};

      const interpolateObject = (obj: any): any => {
        if (typeof obj === 'string') return this.interpolate(obj, this.workflowState);
        if (typeof obj === 'object' && obj !== null) {
          for (const key in obj) {
            obj[key] = interpolateObject(obj[key]);
          }
        }
        return obj;
      };
      payload = interpolateObject(payload);

      if (payloadKey && value !== undefined) {
        this.setNestedProperty(payload, payloadKey, value);
      } else if (value !== undefined && !payloadKey) {
        payload = { ...payload, type: value };
      }

      const result = await callEndpoint(actionName, this.finalConfig, payload);
      this.lastActionResult = result;

      this.hostEl.dispatchEvent(
        new CustomEvent('onAction', {
          detail: { name: actionName, data: result || payload },
          bubbles: true,
          composed: true
        })
      );

      if (originalInput) {
        const fullContext = this.context
          ? `${this.context}\nResult Context: ${JSON.stringify(result).substring(0, 1000)}...`
          : undefined;
        const llmResponse = await callLLM(originalInput, this.finalConfig, result, this.messages, fullContext);

        this.addMessage(llmResponse.message, 'agent');
        if (llmResponse.action) {
          await this.executeApiAction(
            llmResponse.action.name,
            undefined,
            undefined,
            llmResponse.action.payload,
            originalInput,
            currentTriggeredActions
          );
        }

        if (actionName === 'generateReportPdf') {
          this.currentStep = {
            id: 'activity_log_suggestion',
            message: '',
            options: [{ label: 'Show activity log', actionType: 'link', externalLink: '/settings/activity-log' }]
          } as any;
          this.showOptions = true;
        }

        if (actionName === 'createReport') {
          const reportId = result?.id || result?.reportId;
          this.currentStep = {
            id: 'post_create_suggestion',
            message: '',
            options: [
              { label: 'Open Report', triggerAction: 'openReport', actionType: 'api', value: reportId, payloadKey: 'id' },
              { label: 'Manage Access/Permissions', triggerAction: 'manageAccess', actionType: 'api', value: reportId, payloadKey: 'id' }
            ]
          } as any;
          this.showOptions = true;
        }
      } else {
        this.addMessage('✅ Action completed successfully!', 'agent');
      }
    } catch (error: any) {
      this.addMessage(`❌ Action failed: ${error.message}`, 'agent');
    } finally {
      this.isTyping = false;
    }
  }

  private goToStep(stepId: string, stateUpdate: Record<string, any> = {}) {
    const updatedState = { ...this.workflowState, ...stateUpdate };
    this.workflowState = updatedState;

    const step = this.finalConfig.workflow?.find((s) => s.id === stepId);
    if (!step) return;

    if (step.skipIf) {
      try {
        const shouldSkip = !!updatedState[step.skipIf.replace('workflowState.', '')];
        if (shouldSkip) {
          const nextStepId = step.options?.[0]?.nextStepId;
          if (nextStepId) {
            this.goToStep(nextStepId, updatedState);
            return;
          }
        }
      } catch (e) {
        console.warn('Skip evaluation failed:', e);
      }
    }

    const stepClone = JSON.parse(JSON.stringify(step)) as InteractionStep;

    if (stepClone.useResultsAsOptions && Array.isArray(this.lastActionResult)) {
      const dConfig = stepClone.dynamicOptionsConfig;
      if (dConfig) {
        const dynamicOptions: InteractionOption[] = this.lastActionResult.map((item: any) => ({
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
        label: this.interpolate(opt.label, updatedState),
        value: typeof opt.value === 'string' ? this.interpolate(opt.value, updatedState) : opt.value,
        externalLink: opt.externalLink ? this.interpolate(opt.externalLink, updatedState) : undefined
      }));
    }

    this.currentStep = stepClone;
    this.showOptions = true;
    this.addMessage(this.interpolate(step.message, updatedState), 'agent');
  }

  private autoExecuteStepIfNeeded() {
    if (!this.currentStep) return;

    if (this.lastAutoExecutedStepId !== this.currentStep.id) {
      this.lastAutoExecutedStepId = null;
    }

    if (this.currentStep.triggerAction && !this.currentStep.inputTarget && this.currentStep.actionType === 'api') {
      if (this.lastAutoExecutedStepId === this.currentStep.id) return;

      this.lastAutoExecutedStepId = this.currentStep.id;

      const execute = async () => {
        await this.executeApiAction(this.currentStep!.triggerAction!, undefined, this.currentStep!.payloadKey, this.currentStep!.fixedPayload);
        if (this.currentStep?.nextStepId) {
          setTimeout(() => {
            this.goToStep(this.currentStep!.nextStepId!);
          }, 500);
        }
      };
      execute();
    }
  }

  private async handleOptionClick(option: InteractionOption, skipMessage = false) {
    const current = this.currentStep;

    const immediateStateUpdate: Record<string, any> = {};
    if (option.payloadKey && option.value !== undefined) {
      immediateStateUpdate[option.payloadKey] =
        typeof option.value === 'string' ? this.interpolate(option.value, this.workflowState) : option.value;
    }
    if (option.stateUpdate) {
      for (const key in option.stateUpdate) {
        const val = option.stateUpdate[key];
        immediateStateUpdate[key] = typeof val === 'string' ? this.interpolate(val, this.workflowState) : val;
      }
    }
    if (Object.keys(immediateStateUpdate).length > 0) {
      this.workflowState = { ...this.workflowState, ...immediateStateUpdate };
    }

    if (current?.inputTarget) {
      const val = option.value !== undefined ? option.value : option.label;
      await this.handleSend(val);
      return;
    }

    if (!skipMessage) {
      this.addMessage(option.label, 'user');
    }
    this.showOptions = false;

    if (option.triggerAction && option.actionType === 'api') {
      await this.executeApiAction(option.triggerAction, option.value, option.payloadKey, option.fixedPayload);
    } else if (option.actionType === 'whatsapp') {
      window.open(`https://wa.me/${option.externalLink || '573025688681'}`, '_blank');
      this.addMessage('Opening WhatsApp to connect you with our help desk... 🚀', 'agent');
    } else if (option.actionType === 'link' && option.externalLink) {
      window.open(option.externalLink, '_blank');
    }

    if (option.nextStepId) {
      setTimeout(() => {
        const stateUpdate: Record<string, any> = {};

        if (option.payloadKey && option.value !== undefined) {
          stateUpdate[option.payloadKey] = typeof option.value === 'string' ? this.interpolate(option.value, this.workflowState) : option.value;
        }

        if (option.stateUpdate) {
          for (const key in option.stateUpdate) {
            const val = option.stateUpdate[key];
            stateUpdate[key] = typeof val === 'string' ? this.interpolate(val, this.workflowState) : val;
          }
        }

        this.goToStep(option.nextStepId!, stateUpdate);
      }, 400);
    }
  }

  private handleQuickAction() {
    const actionLabel = this.finalConfig.actionLabel || 'Create Report';
    this.input = actionLabel;
    this.handleSend(actionLabel);
  }

  private async handleSend(manualInput?: string) {
    const textToSend = manualInput || this.input;
    if (!textToSend.trim()) return;

    const userInput = textToSend.trim();

    this.addMessage(userInput, 'user');

    if (!manualInput) {
      this.input = '';
    }

    this.isTyping = true;

    try {
      const current = this.currentStep;

      if (current && current.inputTarget) {
        const newState = { ...this.workflowState, [current.inputTarget]: userInput };
        this.workflowState = newState;

        if (current.triggerAction && current.actionType === 'api') {
          await this.executeApiAction(current.triggerAction, userInput, current.payloadKey, current.fixedPayload, undefined);
        }

        this.isTyping = false;

        if (current.nextStepId) {
          this.goToStep(current.nextStepId, { [current.inputTarget]: userInput });
        }
        return;
      }

      const normalizedInput = userInput.toLowerCase();

      if (current?.options) {
        for (const option of current.options) {
          const similarity = this.getSimilarity(normalizedInput, option.label.toLowerCase());
          if (similarity >= 0.95) {
            this.isTyping = false;
            this.handleOptionClick(option, true);
            return;
          }
        }
      }

      if (this.finalConfig.intents) {
        let bestStrictMatch = { intent: null as any, score: 0 };

        for (const intent of this.finalConfig.intents) {
          for (const keyword of intent.keywords) {
            const similarity = this.getSimilarity(normalizedInput, keyword.toLowerCase());
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
          this.isTyping = false;
          this.goToStep(intent.nextStepId, extractedData);
          return;
        }
      }

      if (this.finalConfig.llms && this.finalConfig.llms.length > 0) {
        const fullContext = this.context
          ? `${this.context}\n${Object.entries(this.workflowState)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n')}`
          : undefined;
        const llmResponse = await callLLM(userInput, this.finalConfig, this.lastActionResult, this.messages, fullContext);
        this.isTyping = false;
        this.addMessage(llmResponse.message, 'agent');

        if (llmResponse.action) {
          this.executeApiAction(llmResponse.action.name, undefined, undefined, llmResponse.action.payload, userInput, []);
        }
        return;
      }

      if (this.finalConfig.intents) {
        let bestMatch = { intent: null as any, score: 0 };

        for (const intent of this.finalConfig.intents) {
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
          this.isTyping = false;
          this.goToStep(intent.nextStepId, extractedData);
          return;
        }
      }

      this.isTyping = false;
      if (this.finalConfig.fallbackStepId) {
        this.goToStep(this.finalConfig.fallbackStepId);
      } else {
        this.addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
      }
    } catch (error) {
      console.error(error);
      this.isTyping = false;
      this.addMessage('I encountered an error while processing your request. Please try again later.', 'agent');
    }
  }

  private getSimilarity(s1: string, s2: string): number {
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
  }

  private toggleTheme(newTheme: 'dark' | 'light' | 'glass') {
    this.theme = newTheme;
    try {
      localStorage.setItem('neo-theme', newTheme);
    } catch {
      // ignore
    }
    this.showThemeMenu = false;
  }

  private renderAnimatedNexus() {
    const hexagons = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: 90 - i * 14,
      duration: 10 + i * 2,
      reverse: i % 2 === 0
    }));

    const getStrokeColor = (index: number) => {
      if (this.agentState === 'idle') return '#9CA3AF';
      return index % 2 === 0 ? '#06B6D4' : '#3B82F6';
    };

    const strokeWidth = this.agentState === 'idle' ? 3 : 4;

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

    return (
      <div class="nexus-wrap">
        <svg viewBox="0 0 200 200" class="nexus-svg">
          {hexagons.map((hex) => {
            const rotation = this.agentState === 'thinking'
              ? `${hex.reverse ? 'spin-cw' : 'spin-ccw'} ${hex.duration}s linear infinite`
              : 'none';
            const pulse = this.agentState === 'thinking'
              ? `pulse 0.2s ease-in-out ${hex.id * 0.05}s infinite alternate`
              : 'none';
            return (
              <path
                class="nexus-hex"
                d={createHexagonPath(100, 100, hex.size)}
                fill="none"
                stroke={getStrokeColor(hex.id)}
                stroke-width={strokeWidth as any}
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
                style={{ animation: `${rotation}, ${pulse}` }}
              ></path>
            );
          })}
        </svg>
      </div>
    );
  }

  render() {
    return (
      <div class="agent-neo-root">
        {this.showGreeting && !this.isOpen ? (
          <div class={`greeting-bubble glass-morphism ${this.showGreeting ? 'show' : ''}`}>
            Hello there, {this.user?.name || 'there'}! I'm your assistant. How can I help you today?
          </div>
        ) : null}

        <div class="floating-avatar glass-morphism" onClick={() => (this.isOpen = !this.isOpen)}>
          {this.renderAnimatedNexus()}
        </div>

        {this.isOpen ? (
          <div class="chat-container glass-morphism-dark" data-theme={this.theme}>
            <div class="chat-header">
              <div class="header-info">
                <div class="status-indicator"></div>
                <span class="header-title">{this.finalConfig.agentName || 'Neo Agent'}</span>
              </div>
              <div class="header-controls">
                <div class="theme-selector-container">
                  <button class="close-btn" title="Change Theme" onClick={() => (this.showThemeMenu = !this.showThemeMenu)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="13.5" cy="6.5" r=".5"></circle>
                      <circle cx="17.5" cy="10.5" r=".5"></circle>
                      <circle cx="8.5" cy="7.5" r=".5"></circle>
                      <circle cx="6.5" cy="12.5" r=".5"></circle>
                      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5 0-1.1.9-2 2-2h3a3 3 0 0 0 0-6h-1"></path>
                    </svg>
                  </button>
                  {this.showThemeMenu ? (
                    <div class="theme-dropdown">
                      <span class="theme-label">Theme</span>
                      {[
                        { id: 'dark', label: 'Dark Moon', color: '#1f2937' },
                        { id: 'light', label: 'Light Day', color: '#ffffff' },
                        { id: 'glass', label: 'Pure Glass', color: '#e5e7eb' }
                      ].map((t) => (
                        <button class="theme-option" onClick={() => this.toggleTheme(t.id as any)}>
                          <div class="theme-color-indicator" style={{ background: t.color }}></div>
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <button class="close-btn" onClick={() => (this.isOpen = false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div class="messages-container">
              {this.messages.map((msg) => (
                <div class={`message ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}>
                  {msg.text}
                </div>
              ))}
              {this.isTyping ? (
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
                  <span>{this.finalConfig.agentName || 'Neo '} is thinking...</span>
                </div>
              ) : null}

              {this.currentStep?.options && this.showOptions && !this.isTyping ? (
                <div class="options-container">
                  {this.currentStep.options.map((opt) => (
                    <button class="option-pill" onClick={() => this.handleOptionClick(opt)}>{opt.label}</button>
                  ))}
                </div>
              ) : null}

              <div class="actions-suggestion">
                <span class="actions-label">Frequent Actions</span>
                <button class="action-button" onClick={() => this.handleQuickAction()}>
                  <span style={{ marginRight: '8px' }}>⚡</span>
                  {this.finalConfig.actionLabel || 'Create Report'}
                </button>
              </div>
            </div>

            <div class="input-area">
              <input
                class="chat-input"
                type="text"
                value={this.input}
                onInput={(e: any) => (this.input = e.target.value)}
                onKeyPress={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') this.handleSend();
                }}
                placeholder="Type a message..."
              />
              <button class="send-btn" onClick={() => this.handleSend()} disabled={this.isTyping}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
