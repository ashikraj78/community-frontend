import React from "react";
import Header from "./Header";
import { withRouter } from "react-router-dom";

class EditAnswer extends React.Component {
  state = {
    text: "",
  };
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  componentDidMount() {
    fetch(`http://localhost:3000/api/answers/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
    })
      .then((res) => res.json())
      .then((editAnswer) => {
        // console.log(editAnswer.answer.text);
        this.setState({
          text: editAnswer.answer.text,
        });
      });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/answers/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
      body: JSON.stringify({ answer: this.state }),
    })
      .then((res) => res.json())
      .then((editedAnswer) => {
        this.props.history.push(`/questions/${editedAnswer.answer.questionId}`);
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
            alt="edit answer"
          ></img>
          <form onSubmit={this.handleSubmit} className="addQuestionForm">
            <h1>Edit your answer</h1>

            <label htmlFor="description">Answer</label>
            <textarea
              className="addDescription"
              type="text"
              name="text"
              onChange={this.handleInput}
              value={this.state.text}
            />
            <button type="submit" id="submit">
              Edit Answer
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(EditAnswer);
