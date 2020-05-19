import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginStatusContext } from './contexts/LoginContext'
import { useLogin } from './hooks/useLogin';

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
            <Route path="/" exact={true}>
              <Main />
            </Route>
          </Switch>
        </div>
      </LoginStatusContext.Provider>
    </Router>
  );
}

export default App;
