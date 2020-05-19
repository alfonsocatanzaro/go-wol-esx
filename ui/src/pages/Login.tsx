import React, { useState, FormEvent, useContext } from 'react';
import './Login.css';
import Axios from 'axios';
import { LoginStatusContextType, LoginStatusContext } from '../contexts/LoginContext';

// TODO il already login redirect to home

const Login: React.FC = () => {
  const [username, setUsername] = useState('alfonso');
  const [password, setPassword] = useState('password');
  const login = useContext<LoginStatusContextType>(LoginStatusContext);

  function Login(e: FormEvent) {
    e.preventDefault();

    (async () => {
      const users = await Axios.post(
        '/api/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      login.loginFn(username, users.data);
    })();
  }

  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin" onSubmit={(e) => Login(e)}>
              <div className="form-label-group">
                <input
                  type="text"
                  id="inputUsername"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
                <label htmlFor="inputUsername">Username</label>
              </div>

              <div className="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="inputPassword">Password</label>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember password
                </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                Sign in
              </button>
              <hr className="my-4" />
              <p>{login.loginStatus.token}</p>
              {/* 
              <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                <i className="fab fa-google mr-2"></i> Sign in with Google
              </button>
              <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                <i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
