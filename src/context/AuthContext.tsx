import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface Admin {
    id: string;
    email: string;
}

interface AuthContextType {
    admin: Admin | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setAdmin(data);
        } catch {
            localStorage.removeItem('token');
            setAdmin(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchMe();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('token', token);
        await fetchMe();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
