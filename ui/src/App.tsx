import React from 'react';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginStatusContext } from './contexts/LoginContext';
import { useLogin } from './hooks/useLogin';
import Computers from './pages/Computers';

// TODO Hide navbar if not logged in
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
            <Route path="/" exact={true}>
              <Redirect to="/computers" />
            </Route>
            <Route path="/computers">
              {loginStatus.isLoggedIn ? <Computers /> : <Redirect to="/login" />}
              <Computers />
            </Route>
          </Switch>
        </div>
      </LoginStatusContext.Provider>
    </Router>
  );
}

export default App;
