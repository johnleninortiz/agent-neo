import React from 'react';
import type { AppConfig } from '../types';
interface AvatarProps {
    onClick: () => void;
    isOpen: boolean;
    userName?: string;
    state?: 'idle' | 'active' | 'thinking';
    isMaximized?: boolean;
    config?: AppConfig;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
