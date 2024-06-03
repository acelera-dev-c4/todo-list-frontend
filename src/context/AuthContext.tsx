import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { saveToLocalStorage, removeFromLocalStorage } from '../helpers/localstorage';

interface AuthContextType {
    isAuthenticated: boolean;
    userData: any;
    login: (credentials: Credentials) => Promise<void>,
    logout: () => void;
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
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const authProviderValue = {
        isAuthenticated,
        userData,
        login: async (credentials: Credentials) => {
            try {
                const response = await api('post', '/Auth', credentials);
                const { token } = response.data.token;
                saveToLocalStorage('authToken', token);
                setUserData(response.data.userData);
                setIsAuthenticated(true);
                navigate('/home');
            } catch (error) {
                console.error("Error during login:", error);
            }
        },
        logout: () => {
            removeFromLocalStorage('authToken');
            setIsAuthenticated(false);
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