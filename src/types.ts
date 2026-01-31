export interface EndpointMetadata {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  payloadTemplate?: any;
  withCredentials?: boolean;
}

export interface AppConfig {
  endpoints: EndpointMetadata[];
  secrets?: {
    claudeApiKey?: string;
    geminiApiKey?: string;
    openaiApiKey?: string;
  };
  primaryModel?: 'claude' | 'gemini' | 'gpt';
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
