import React from "react";

export interface LoginStatus {
  isLoggedIn: boolean;
  username: string;
  token: string;
  refreshToken: string
}

export const initialLoginStatus: LoginStatus = {
  isLoggedIn: false,
  username: '',
  token: '',
  refreshToken: ''
}

export const LoginStatusContext = React.createContext(initialLoginStatus);