import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AuthService from '../services/AuthService';
import { useLocation } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    username: string | null;
    login: (credentials: { username: string, password: string }) => void;
    signup: (credentials: { username: string, password: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => {
        const token = AuthService.getAccessToken();
        const expired = token && AuthService.isTokenExpired(token);

        if (expired) return null;
        return token;
    });
    const [username, setUsername] = useState<string | null>(AuthService.getUsername());
    const location = useLocation();

    useEffect(() => {
        const setAuth = () => {
            const token = AuthService.getAccessToken();
            const username = AuthService.getUsername();
            const expired = token && AuthService.isTokenExpired(token);

            if (expired) {
                AuthService.logout();
                setToken(null);
                setUsername(null);
            } else if (token && username) {
                setToken(token);
                setUsername(username);
            }
        }

        setAuth();
    }, [location]);

    const login = async (credentials: { username: string, password: string }) => {
        try {
            const response = await AuthService.login({ username: credentials.username, password: credentials.password });

            setToken(response.token);
            setUsername(response.username);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const signup = async (credentials: { username: string, password: string }) => {
        try {
            await AuthService.signup({ username: credentials.username, password: credentials.password });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        AuthService.logout();
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};