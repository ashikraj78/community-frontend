import React from "react";
import Header from "./Header";
import { withRouter } from "react-router-dom";

class EditQuestion extends React.Component {
  state = {
    title: "",
    description: "",
  };
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  componentDidMount() {
    fetch(`http://localhost:3000/api/questions/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((editQuestion) => {
        this.setState({
          title: editQuestion.questions.title,
          description: editQuestion.questions.description,
        });
      });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/questions/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
      body: JSON.stringify({ question: this.state }),
    })
      .then((res) => res.json())
      .then((newAddedQuestion) => {
        this.props.history.push(`/questions/${this.props.match.params.id}`);
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
            <h1>Edit the Question</h1>
            <label htmlFor="title"> Title</label>
            <input
              className="addTitle"
              type="text"
              name="title"
              onChange={this.handleInput}
              value={this.state.title}
            />
            <label htmlFor="description"> Description</label>
            <textarea
              className="addDescription"
              type="text"
              name="description"
              onChange={this.handleInput}
              value={this.state.description}
            />
            <button type="submit" id="submit">
              Edit Question
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(EditQuestion);
