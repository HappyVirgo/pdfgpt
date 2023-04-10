import React, { createContext, useState } from "react";

type UserType = {
  email: string;
  family_name?: string;
  given_name?: string;
  id: string;
  locale?: string;
  name: string;
  picture: string;
  verified_email?: boolean;
};

type TokenType = {
  refreshToken: string;
  accessToken: string;
  expires_in?: number;
};

type AuthContextType = {
  user?: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  tokens?: TokenType | null;
  setTokens: React.Dispatch<React.SetStateAction<TokenType | null>>;
};

const AuthContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
  tokens: null,
  setTokens: () => {},
};

export const AuthContext = createContext(AuthContextValue);

interface AuthContextProviderProps {
  children?: JSX.Element | Array<JSX.Element>;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [tokens, setTokens] = useState<TokenType | null>(null);
  return <AuthContext.Provider value={{ user, setUser, tokens, setTokens }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
