import React from 'react';
import type { User, ApiResponse } from '../types';
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<ApiResponse<User>>;
    register: (email: string, password: string, role: 'agent' | 'human', userData: any) => Promise<ApiResponse<User>>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => Promise<ApiResponse<User>>;
}
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
