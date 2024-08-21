// contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getToken, saveToken, removeToken } from '../services/storage';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (token: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`;
                try {
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };
        checkAuth();
    }, []);

    const signIn = async (token: string) => {
        await saveToken(token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
            const response = await api.get('/users/me');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const signOut = async () => {
        await removeToken();
        api.defaults.headers.Authorization = '';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
