import React, { useState } from "react";
import Axios from "axios";

export interface LoginStatusContextType {
  loginStatus: LoginStatus;
  loginFn: (username: string, token: string) => void;
  logoutFn: () => void;
}

export const initialLoginStatus: LoginStatus = {
  isLoggedIn: false,
  username: '',
  token: '',
}

const emptyContext: LoginStatusContextType = {
  loginStatus: initialLoginStatus,
  loginFn: (username: string, token: string) => { },
  logoutFn: () => { }
}

export const LoginStatusContext =
  React.createContext<LoginStatusContextType>(emptyContext);

export interface LoginStatus {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

export const useLoginContext = () => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(initialLoginStatus);
  const loginFn = (username: string, token: string) => {
    setLoginStatus({
      isLoggedIn: true,
      username: username,
      token: token
    });
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const logoutFn = () => {
    Axios.defaults.headers.common['Authorization'] = null;
    delete Axios.defaults.headers.common['Authorization'];
    setLoginStatus(initialLoginStatus);
  }

  return { loginStatus, loginFn, logoutFn }
}