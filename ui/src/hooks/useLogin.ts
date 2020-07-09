import { useState, useContext } from "react";
import { LoginStatusContextType, LoginStatusContext } from '../contexts/useLoginContext';
import Axios from "axios";

export const useLogin = () => {
  const loginContext = useContext<LoginStatusContextType>(LoginStatusContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const login = (username: string, password: string) => {
    (async () => {
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_URL}/api/login`,
          { username, password },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setErrorMessage('');
        loginContext.loginFn(username, response.data);

      } catch (error) {
        if (error.response?.status === 401) {
          setErrorMessage('Wrong username or password!');
        } else {
          setErrorMessage(error.message);
        }
      }
    })();
  };
  const clearErrorMessage = () => {
    setErrorMessage('');
  }
  return { login, errorMessage, clearErrorMessage };
}