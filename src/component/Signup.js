import React from "react";

import { withRouter } from "react-router-dom";
import Layout from "./Layout";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
  };
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.state }),
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user.token) {
          this.props.history.push("/login");
        }
      });
  };
  render() {
    return (
      <Layout>
        <div className="flex2 container">
          <img
            className="signupImage"
            src="/images/signup.png"
            alt="signup"
          ></img>
          <form className="signupForm" onSubmit={this.handleSubmit}>
            <h1>SignUp</h1>
            <label htmlFor="username"> UserName</label>
            <input
              type="text"
              name="username"
              onChange={this.handleInput}
              className="username"
              minLength="3"
              // required
            />
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
              {" "}
              Signup
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Signup);
