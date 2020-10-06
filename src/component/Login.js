import React from "react";
import { withRouter } from "react-router-dom";

import Layout from "./Layout";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.state }),
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user.token) {
          this.props.updateLoggedInUser(user);
          this.props.history.push("/");
          localStorage.setItem("authTokenFrontendForum", user.token);
        }
      });
  };

  render() {
    return (
      <Layout>
        <div className="flex2 container">
          <img className="loginImage" src="/images/login.png" alt="login"></img>
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleInput}
              className="email"
              required
            />
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleInput}
              className="password"
              required
            />
            <button type="submit" id="submit">
              Login
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Login);
