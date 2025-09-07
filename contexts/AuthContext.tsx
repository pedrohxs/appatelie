import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (credentials.username && credentials.password.length >= 4) {
        const mockUser: User = {
          id: '1',
          username: credentials.username,
          email: credentials.username.includes('@') ? credentials.username : undefined,
        };
        
        setUser(mockUser);
        return { success: true, user: mockUser };
      } else {
        return { success: false, message: 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, message: 'Erro de conexão' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}