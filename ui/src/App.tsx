import React from 'react';
import Home from './pages/Home';
import PrivatePage from './pages/PrivatePage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginStatusContext } from './contexts/LoginContext';
import { useLogin } from './hooks/useLogin';
import { PrivateRoute } from './components/PrivateRoute';

// TODO Hide navbar if not logged in
// TODO If not logged in redirect always to login page
function App() {
  const { loginStatus, loginFn, logoutFn } = useLogin();

  return (
    <Router>
      <LoginStatusContext.Provider value={{ loginStatus, loginFn, logoutFn }}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/privatepage">
              <PrivatePage />
            </PrivateRoute>
            <Route path="/" exact={true}>
              <Home />
            </Route>
          </Switch>
        </div>
      </LoginStatusContext.Provider>
    </Router>
  );
}

export default App;
