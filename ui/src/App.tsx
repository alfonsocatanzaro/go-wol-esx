import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/main">Main</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
