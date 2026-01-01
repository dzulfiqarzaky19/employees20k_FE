import { createContext, useContext, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/features/login/hooks/useMe';

interface Admin {
  id: string;
  email: string;
}

interface AuthContextType {
  admin: Admin | null | undefined;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: admin, isLoading } = useMe();

  const login = (token: string) => {
    localStorage.setItem('token', token);

    queryClient.invalidateQueries({ queryKey: ['authUser'] });
  };

  const logout = () => {
    localStorage.removeItem('token');

    queryClient.setQueryData(['authUser'], null);
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
