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
function App() {
  const { loginStatus, loginFn, logoutFn } = useLogin();

  return (
    <Router>
      <LoginStatusContext.Provider value={{ loginStatus, loginFn, logoutFn }}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" exact={true} component={Home} />
            <PrivateRoute path="/privatepage" component={PrivatePage} />
          </Switch>
        </div>
      </LoginStatusContext.Provider>
    </Router>
  );
}

export default App;
