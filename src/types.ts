export interface EndpointMetadata {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  payloadTemplate?: any;
  withCredentials?: boolean;
}

export interface InteractionOption {
  label: string;
  value?: string;
  nextStepId?: string;
  triggerAction?: string;
  actionType?: 'api' | 'whatsapp' | 'link';
  externalLink?: string;
  payloadKey?: string;
  fixedPayload?: any;
}

export interface InteractionStep {
  id: string;
  message: string;
  options?: InteractionOption[];
  useResultsAsOptions?: boolean;
  inputTarget?: string;
  skipIf?: string; // Expression like "workflowState.reportName"
  dynamicOptionsConfig?: {
    labelKey: string;
    valueKey: string;
    nextStepId?: string;
    triggerAction?: string;
    actionType?: 'api' | 'whatsapp' | 'link';
    payloadKey?: string;
    fixedPayload?: any;
  };
}

export interface Intent {
  keywords: string[];
  nextStepId: string;
  description?: string;
  extractors?: {
    key: string;
    regex: string;
  }[];
}

export interface LLMProvider {
  name: string;
  provider: 'gemini' | 'claude' | 'openai';
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export interface ContextBinding {
  key: string;
  data: any;
}

export interface AppConfig {
  endpoints: EndpointMetadata[];
  actionLabel?: string;
  initialStepId?: string;
  fallbackStepId?: string;
  intents?: Intent[];
  llms?: LLMProvider[];
  contextBindings?: ContextBinding[];
  workflow?: InteractionStep[];
}

export interface User {
  id: string;
  name: string;
  role?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: number;
}
