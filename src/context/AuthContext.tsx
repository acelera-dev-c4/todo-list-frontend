import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { saveTokenToLocalStorage, removeTokenToLocalStorage } from '../helpers/localstorage';

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
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const authProviderValue = {
        isAuthenticated,
        userData,
        login: async (credentials: Credentials) => {
            try {
                const response = await api('post', '/Auth', credentials);
                const { token } = response.data.token;
                saveTokenToLocalStorage(token);
                setIsAuthenticated(true);
                setUserData(response.data);
                navigate('/home');
            } catch (error) {
                console.error("Error during login:", error);
            }
        },
        logout: () => {
            removeTokenToLocalStorage();
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
