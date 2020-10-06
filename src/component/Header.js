import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  console.log(props);
  return (
    <header className="header">
      <div className="flex container">
        <NavLink to="/" exact>
          <img className="logo" src="/images/logo.png" alt="logo"></img>
        </NavLink>
        <input className="searchbar"></input>

        {!props.isLoggedIn ? (
          <div className="flex">
            <NavLink to="/signup">
              <div className="signupHeader">Signup</div>
            </NavLink>
            <NavLink to="/login">
              <div className="signupHeader">Login</div>
            </NavLink>
          </div>
        ) : (
          <div className="flex">
            <NavLink to="/login" className="flex">
              <div>welcome{props.userDetails.username}</div>
              <div className="signupHeader" onClick={props.handleLogout}>
                Logout
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
