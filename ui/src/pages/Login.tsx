import React, { useState, FormEvent } from 'react';
import './Login.css';
import { LoginStatusContext } from '../contexts/useLoginContext';
import { Redirect } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
  const [username, setUsername] = useState('alfonso');
  const [password, setPassword] = useState('password');
  const { login, errorMessage, clearErrorMessage } = useLogin();



  function Login(e: FormEvent) {
    e.preventDefault();
    login(username, password);
  }

  const loginpage = (
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
              {errorMessage && (
                <div className="alert alert-danger fade show" role="alert">
                  {errorMessage}
                  <button type="button" className="close" aria-label="Close" onClick={() => clearErrorMessage()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <LoginStatusContext.Consumer>
      {loginCtx => (
        loginCtx.loginStatus.isLoggedIn ?
          <Redirect to="/computers" /> :
          loginpage
      )}
    </LoginStatusContext.Consumer>

  );
};

export default Login;
