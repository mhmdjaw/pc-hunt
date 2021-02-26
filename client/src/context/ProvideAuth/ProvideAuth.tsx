import React, { createContext, useContext } from "react";
import { AuthContext } from "./auth-context-types";
import useProvideAuth from "./auth-provider";

interface ProvideAuthProps {
  children: JSX.Element;
}

const authContext = createContext<AuthContext | null>(null);

export const ProvideAuth: React.FC<ProvideAuthProps> = ({
  children,
}: ProvideAuthProps) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = (): AuthContext => {
  return useContext(authContext) as AuthContext;
};
