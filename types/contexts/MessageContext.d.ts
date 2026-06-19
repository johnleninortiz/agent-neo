import React from 'react';
import type { Message, Conversation, MessageAttachment } from '../types';
interface MessageContextType {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    isLoading: boolean;
    sendMessage: (text: string, attachments?: MessageAttachment[], conversationId?: string) => Promise<void>;
    markAsRead: (conversationId: string) => void;
    createConversation: (participantId: string, jobId?: string) => Promise<string>;
    setActiveConversation: (conversation: Conversation | null) => void;
    unreadCount: number;
}
export declare const useMessages: () => MessageContextType;
export declare const MessageProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
