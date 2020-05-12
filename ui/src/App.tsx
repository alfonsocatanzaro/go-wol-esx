import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
