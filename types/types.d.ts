export interface EndpointMetadata {
    name: string;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    description: string;
    payloadTemplate?: any;
    withCredentials?: boolean;
    handler?: string | ((payload: any) => Promise<any> | any);
}
export interface InteractionOption {
    label: string;
    value?: any;
    nextStepId?: string;
    triggerAction?: string;
    actionType?: 'api' | 'whatsapp' | 'link';
    externalLink?: string;
    payloadKey?: string;
    fixedPayload?: any;
    stateUpdate?: Record<string, any>;
}
export interface InteractionStep {
    id: string;
    message: string;
    options?: InteractionOption[];
    useResultsAsOptions?: boolean;
    inputTarget?: string;
    skipIf?: string;
    nextStepId?: string;
    triggerAction?: string;
    actionType?: 'api' | 'whatsapp' | 'link';
    payloadKey?: string;
    fixedPayload?: any;
    dynamicOptionsConfig?: {
        labelKey: string;
        valueKey: string;
        nextStepId?: string;
        triggerAction?: string;
        actionType?: 'api' | 'whatsapp' | 'link';
        payloadKey?: string;
        fixedPayload?: any;
    };
    delay?: number;
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
    provider: 'gemini' | 'claude' | 'openai' | 'api-llm';
    apiKey: string;
    model?: string;
    baseUrl?: string;
}
export interface ContextBinding {
    key: string;
    data: any;
}
export interface AvatarConfig {
    type: 'image' | 'video' | 'nexus';
    source?: string;
    styles?: React.CSSProperties;
}
export interface AppConfig {
    agentName?: string;
    systemRole?: string;
    avatar?: AvatarConfig;
    endpoints: EndpointMetadata[];
    actionLabel?: string;
    initialStepId?: string;
    fallbackStepId?: string;
    intents?: Intent[];
    llms?: LLMProvider[];
    contextBindings?: ContextBinding[];
    workflow?: InteractionStep[];
    showStopButton?: boolean;
    showFrequentActions?: boolean;
    frequentAction?: InteractionOption;
    greeting?: string;
    keepAlive?: boolean;
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
