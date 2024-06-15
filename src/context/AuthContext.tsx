import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../helpers/localstorage';

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
    const [userData, setUserData] = useState(() => getFromLocalStorage('userData') || '');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getFromLocalStorage('authToken');
        if (token && userData) {
            setIsAuthenticated(true);
        }
    }, [userData]);

    const authProviderValue = {
        isAuthenticated,
        userData,
        login: async (credentials: Credentials) => {
            try {
                const response = await api('post', '/Auth', credentials);
                const { token } = response.data.token;
                saveToLocalStorage('authToken', token);
                saveToLocalStorage('userData', response.data.userData);
                setUserData(response.data.userData);
                setIsAuthenticated(true);
                navigate('/home');
            } catch (error) {
                console.error("Error during login:", error);
            }
        },
        logout: () => {
            removeFromLocalStorage('authToken');
            removeFromLocalStorage('userData');
            setUserData('');
            setIsAuthenticated(false);
            navigate('/');
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