import React, { createContext, useState, ReactNode } from "react";

interface Auth {
  user?: { username: string };
  token?: string;
  roles?: string[];
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProvideProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProvideProps) => {
  const [auth, setAuth] = useState<Auth>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

