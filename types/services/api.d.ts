import type { AppConfig, Message } from '../types';
export declare const deepMerge: (target: any, source: any) => any;
export declare const callEndpoint: (endpointName: string, config: AppConfig, payload?: any) => Promise<any>;
export declare const buildSystemPrompt: (userInput: string, config: AppConfig, toolResult: any, history: Message[], extraContext?: string) => string;
export declare const parseLLMResponse: (raw: string) => {
    message: string;
    action?: any;
};
export declare const callLLM: (userInput: string, config: AppConfig, toolExecutionResult?: any, history?: Message[], extraContext?: string) => Promise<{
    message: string;
    action?: any;
}>;
