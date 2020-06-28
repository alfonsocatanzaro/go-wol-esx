import { useState } from "react";
import Axios from "axios";


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
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
  }

  const logoutFn = () => { 
    Axios.defaults.headers.common['Authorization'] = null; 
    delete Axios.defaults.headers.common['Authorization'];
    setLoginStatus(initialLoginStatus); }



  return { loginStatus, loginFn, logoutFn }
}

