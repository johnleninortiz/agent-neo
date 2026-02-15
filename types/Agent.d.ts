import React from 'react';
import type { AppConfig, User } from './types';
interface AgentProps {
    config: AppConfig;
    preset?: string;
    context?: string;
    user?: User;
    onAction?: (name: string, data: any) => void;
}
declare const Agent: React.FC<AgentProps>;
export default Agent;
