import React from "react";
import { LoginStatus, initialLoginStatus } from "../hooks/useLogin";

export interface LoginStatusContextType {
  loginStatus: LoginStatus;
  loginFn: (username: string, token: string) => void;
  logoutFn: () => void;
}

const emptyContext: LoginStatusContextType = {
  loginStatus: initialLoginStatus,
  loginFn: (username: string, token: string) => { },
  logoutFn: () => { }
}

export const LoginStatusContext =
  React.createContext<LoginStatusContextType>(emptyContext);