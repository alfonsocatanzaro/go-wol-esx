import React, { ReactElement, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginStatusContext, LoginStatusContextType } from '../contexts/useLoginContext'

export default function NavBar(): ReactElement {
  const login = useContext<LoginStatusContextType>(LoginStatusContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        {/* <a className="navbar-brand" href="/" >
          <img src="http://placehold.it/150x50?text=Logo" alt="" />
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/computers" activeClassName="active">
                Computers
              </NavLink>
            </li>
            {login.loginStatus.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#" onClick={() => login.logoutFn()}>
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <span className="nav-link">[{login.loginStatus.username}]</span>
                </li>
              </>
            ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" activeClassName="active">
                    Login
                </NavLink>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
