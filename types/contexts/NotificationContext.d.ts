import React from 'react';
import type { Notification } from '../types';
interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, 'id' | 'userId' | 'createdAt' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}
export declare const useNotifications: () => NotificationContextType;
export declare const NotificationProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
