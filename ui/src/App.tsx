import React from 'react';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginStatusContext } from './contexts/useLoginContext';
import { useLoginContext } from './contexts/useLoginContext';
import ComputerList from './pages/ComputerList';
import ComputerAdd from './pages/ComputerAdd';
import ComputerEdit from './pages/ComputerEdit';

// TODO Hide navbar if not logged in
export default function App() {
  const { loginStatus, loginFn, logoutFn } = useLoginContext();

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
            <Route path="/computers/add">
              {loginStatus.isLoggedIn ? <ComputerAdd /> : <Redirect to="/login" />}
            </Route>
            <Route path="/computers/edit/:id">
              {loginStatus.isLoggedIn ? <ComputerEdit /> : <Redirect to="/login" />}
            </Route>
            <Route path="/computers">
              {loginStatus.isLoggedIn ? <ComputerList /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </LoginStatusContext.Provider>
    </Router>
  );
}

