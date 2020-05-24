// A wrapper for <Route> that redirects to the login

import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { LoginStatusContextType, LoginStatusContext } from '../contexts/LoginContext';

// screen if you're not yet authenticated.
export const PrivateRoute: React.ComponentType<any> = ({ component: Component, ...rest }) => {
  const login = useContext<LoginStatusContextType>(LoginStatusContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        login.loginStatus.isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
};
