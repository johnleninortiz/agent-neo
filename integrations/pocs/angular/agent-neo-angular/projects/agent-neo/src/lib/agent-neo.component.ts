import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { AppConfig, Message, User, InteractionStep, InteractionOption } from './types';
import { presets } from './presets';
import { callEndpoint, callLLM } from './services/api';

interface HexagonDef {
  id: number;
  size: number;
  duration: number;
  reverse: boolean;
}

@Component({
  selector: 'agent-neo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-neo.component.html',
  styleUrls: ['./agent-neo.component.css']
})
export class AgentNeoComponent implements OnChanges, OnDestroy, AfterViewChecked {
  @Input() config: AppConfig = { endpoints: [] } as AppConfig;
  @Input() preset = 'default';
  @Input() context = '';
  @Input() user: User | null = null;

  @Output() onAction = new EventEmitter<{ name: string; data: any }>();

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  isOpen = false;
  agentState: 'idle' | 'active' | 'thinking' = 'idle';
  messages: Message[] = [];
  input = '';
  isTyping = false;
  currentStep?: InteractionStep;
  workflowState: Record<string, any> = {};
  lastActionResult: any = null;
  showOptions = true;
  theme: 'dark' | 'light' | 'glass' = 'dark';
  showThemeMenu = false;
  showGreeting = false;

  hexagons: HexagonDef[] = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: 90 - i * 14,
    duration: 10 + i * 2,
    reverse: i % 2 === 0
  }));

  private initialized = false;
  private greetingTimer?: number;
  private lastAutoExecutedStepId: string | null = null;
  finalConfig: AppConfig = { endpoints: [] } as AppConfig;

  constructor(private host: ElementRef<HTMLElement>) {
    console.log('AgentNeoComponent constructor');
    try {
      const savedTheme = localStorage.getItem('neo-theme') as 'dark' | 'light' | 'glass' | null;
      if (savedTheme) this.theme = savedTheme;
    } catch {
      // ignore
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['preset']) {
      this.finalConfig = this.computeFinalConfig();
      if (!this.initialized) {
        this.initializeMessages();
        this.initialized = true;
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.messagesContainer?.nativeElement) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.greetingTimer) {
      clearTimeout(this.greetingTimer);
    }
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    this.agentState = this.isOpen ? (this.isTyping ? 'thinking' : 'active') : 'idle';

    if (!this.isOpen) {
      clearTimeout(this.greetingTimer);
      this.greetingTimer = window.setTimeout(() => {
        this.showGreeting = true;
      }, 2000);
    } else {
      this.showGreeting = false;
      clearTimeout(this.greetingTimer);
    }
  }

  close(): void {
    this.isOpen = false;
    this.agentState = 'idle';
  }

  toggleThemeMenu(): void {
    this.showThemeMenu = !this.showThemeMenu;
  }

  setTheme(theme: 'dark' | 'light' | 'glass') {
    this.theme = theme;
    try {
      localStorage.setItem('neo-theme', theme);
    } catch {
      // ignore
    }
    this.showThemeMenu = false;
  }

  handleEnter() {
    this.handleSend();
  }

  handleQuickAction() {
    const actionLabel = this.finalConfig.actionLabel || 'Create Report';
    this.input = actionLabel;
    this.handleSend(actionLabel);
  }

  async handleOptionClick(option: InteractionOption, skipMessage = false) {
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

  async handleSend(manualInput?: string) {
    const textToSend = manualInput || this.input;
    if (!textToSend.trim()) return;

    const userInput = textToSend.trim();

    this.addMessage(userInput, 'user');

    if (!manualInput) {
      this.input = '';
    }

    this.isTyping = true;
    this.agentState = 'thinking';

    try {
      const current = this.currentStep;

      if (current && current.inputTarget) {
        const newState = { ...this.workflowState, [current.inputTarget]: userInput };
        this.workflowState = newState;

        if (current.triggerAction && current.actionType === 'api') {
          await this.executeApiAction(current.triggerAction, userInput, current.payloadKey, current.fixedPayload, undefined);
        }

        this.isTyping = false;
        this.agentState = this.isOpen ? 'active' : 'idle';

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
            this.agentState = this.isOpen ? 'active' : 'idle';
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
          this.agentState = this.isOpen ? 'active' : 'idle';
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
        this.agentState = this.isOpen ? 'active' : 'idle';
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
          this.agentState = this.isOpen ? 'active' : 'idle';
          this.goToStep(intent.nextStepId, extractedData);
          return;
        }
      }

      this.isTyping = false;
      this.agentState = this.isOpen ? 'active' : 'idle';
      if (this.finalConfig.fallbackStepId) {
        this.goToStep(this.finalConfig.fallbackStepId);
      } else {
        this.addMessage("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", 'agent');
      }
    } catch (error) {
      console.error(error);
      this.isTyping = false;
      this.agentState = this.isOpen ? 'active' : 'idle';
      this.addMessage('I encountered an error while processing your request. Please try again later.', 'agent');
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
    this.agentState = 'thinking';
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

      this.onAction.emit({ name: actionName, data: result || payload });
      this.host.nativeElement.dispatchEvent(
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
      this.agentState = this.isOpen ? 'active' : 'idle';
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
    this.autoExecuteStepIfNeeded();
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

  getHexPath(radius: number): string {
    const points = Array.from({ length: 6 }).map((_, i) => {
      const theta = (Math.PI / 3) * i - Math.PI / 2;
      return {
        x: 100 + radius * Math.cos(theta),
        y: 100 + radius * Math.sin(theta)
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
  }
}
