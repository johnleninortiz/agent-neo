import React from 'react';
import type { AppConfig, User } from '../types';
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
declare const ChatWindow: React.FC<ChatWindowProps>;
export default ChatWindow;
