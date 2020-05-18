import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginStatusContext, initialLoginStatus } from './contexts/LoginContext'
// TODO Hide navbar if not logged in
// TODO If not logged in redirect always to login page
function App() {
  return (
    <Router>
      <LoginStatusContext.Provider value={initialLoginStatus}>
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
