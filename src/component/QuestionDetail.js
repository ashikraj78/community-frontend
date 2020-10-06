import React from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "./Header";
import Answer from "./Answer";

class QuestionDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      question: {},
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/api/questions/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((questionDetail) => {
        this.setState({ question: questionDetail.questions });
      });
  }

  render() {
    return (
      <div>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          handleLogout={this.props.handleLogout}
        />
        <div className="flex4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="bookmark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          {/* <img
            className="bookmark"
            src="/images/bookmark.svg"
            alt="bookamrk"
          ></img> */}
          <div className="container">
            <div className="question-detail">
              <h1>{this.state.question.title}</h1>
              <div className="flex">
                <div className="flex">
                  <p className="question-creator">
                    Asked by :{" "}
                    {this.state.question.author &&
                      this.state.question.author.username}
                  </p>
                  <p className="question-creator">
                    Created on : {this.state.question.createdAt}
                  </p>
                </div>
                <div>
                  <button onClick={this.deleteQuestion}>Delete</button>

                  <Link to={`/editQuestion/${this.state.question._id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              </div>
              <hr />
              <h3>Question Description :</h3>
              <p className="question-description">
                {this.state.question.description}
              </p>
            </div>

            {/* answers */}

            <Answer
              question={this.state.question}
              updateAnswer={this.updateAnswer}
            />
          </div>
        </div>

        <div className="container">
          <h2>Others answer</h2>
          <div>
            {this.state.question.answers &&
              this.state.question.answers.map((answer) => (
                <div className="answer flex4">
                  <img className="like" src="/images/like.svg" alt="like"></img>
                  <div className="answer-box">
                    <h3 className="answer-description" key={answer._id}>
                      {answer.text}
                    </h3>
                    <div className="flex">
                      <div className="flex">
                        <p className="answer-creator">
                          Answer by :{answer.author.username}
                        </p>
                        <p className="answer-creator">
                          Created on : {answer.createdAt}
                        </p>
                      </div>
                      <div className="answer-detail">
                        <button onClick={() => this.deleteAnswer(answer._id)}>
                          Delete
                        </button>
                        <Link to={`/editAnswer/${answer._id}`}>
                          <button>Edit</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // delete Questoin
  deleteQuestion = () => {
    fetch(`http://localhost:3000/api/questions/${this.props.match.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
      body: JSON.stringify({ question: this.state }),
    })
      .then((res) => res.json())
      .then((deleteQuestion) => {
        this.props.history.push("/");
      });
  };

  // delete Answer
  deleteAnswer = (id) => {
    fetch(`http://localhost:3000/api/answers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.authTokenFrontendForum,
      },
      body: JSON.stringify({ question: this.state }),
    })
      .then((res) => res.json())
      .then((deleteAnswer) => {
        fetch(
          `http://localhost:3000/api/questions/${this.props.match.params.id}`
        )
          .then((res) => res.json())
          .then((questionDetail) => {
            this.setState({ question: questionDetail.questions });
          });
      });
  };
  // update Answer
  updateAnswer = (newAddedAnswer) => {
    let question = this.state.question;
    question.answers.push(newAddedAnswer.answer);
    this.setState({ question });
  };
}
export default withRouter(QuestionDetail);
