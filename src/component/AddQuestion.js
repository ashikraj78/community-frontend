import React from "react";
import Header from "./Header";
import { withRouter } from "react-router-dom";

class AddQuestion extends React.Component {
  state = {
    title: "",
    description: "",
  };
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
      body: JSON.stringify({ question: this.state }),
    })
      .then((res) => res.json())
      .then((newAddedQuestion) => {
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          handleLogout={this.props.handleLogout}
        />
        <div className="flex2 container">
          <img
            className="addQuestionImage"
            src="/images/questions.svg"
            alt="add question"
          ></img>
          <form onSubmit={this.handleSubmit} className="addQuestionForm">
            <h1>Add New Questions</h1>
            <label htmlFor="title"> Title</label>
            <input
              className="addTitle"
              type="text"
              name="title"
              onChange={this.handleInput}
            />
            <label htmlFor="description"> Description</label>
            <textarea
              className="addDescription"
              type="text"
              name="description"
              onChange={this.handleInput}
            />
            <button type="submit" id="submit">
              Add Question
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(AddQuestion);
