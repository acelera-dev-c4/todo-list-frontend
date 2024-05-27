import { createContext, useState, useContext, ReactNode } from 'react';
import api from '../api';
import { saveTokenToLocalStorage, removeTokenToLocalStorage } from '../utils/localstorage';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: Credentials) => Promise<void>,
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface Credentials {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const authProviderValue = {
        isAuthenticated,
        login: async (credentials: Credentials) => {
            return new Promise<void>(async (resolve, reject) => {
                try {
                    const response = await api('post', '/Auth', credentials);
                    const { token } = response.data.token;
                    saveTokenToLocalStorage(token);
                    setIsAuthenticated(true);
                    window.location.href = '/home';
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        logout: async () => {
            try {
                removeTokenToLocalStorage();
                setIsAuthenticated(false);
                window.location.href = '/';
            } catch (error) {
                console.error("Error during logout:", error);
            }
        },
    };

    return (
        <AuthContext.Provider value={authProviderValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};