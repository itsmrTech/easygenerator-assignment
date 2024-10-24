// src/contexts/AuthContext.tsx
import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  signin: (user: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const signin = (user: string) => setUser(user);
  const signout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
