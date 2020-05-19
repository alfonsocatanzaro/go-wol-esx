import { useState } from "react";


export interface LoginStatus {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

export const initialLoginStatus: LoginStatus = {
  isLoggedIn: false,
  username: '',
  token: '',
}


export const useLogin = () => {

  const [loginStatus, setLoginStatus] = useState<LoginStatus>(initialLoginStatus);

  const loginFn = (username: string, token: string) => {
    setLoginStatus({
      isLoggedIn: true,
      username: username,
      token: token
    });
  }

  const logoutFn = () => { setLoginStatus(initialLoginStatus) }

  return { loginStatus, loginFn, logoutFn }
}

