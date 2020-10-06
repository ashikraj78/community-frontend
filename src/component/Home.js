import React from "react";
import Questions from "./Questions";
import Navlink from "./Navlink";
import Header from "./Header";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }
  componentDidMount() {
    fetch("api/questions")
      .then((res) => res.json())
      .then((allQuestions) => {
        this.setState({ questions: allQuestions.questions });
      });

    //handle error
  }
  render() {
    return (
      <div>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          handleLogout={this.props.handleLogout}
          userDetails={this.props.userDetails}
        />
        <div className="container flex2">
          <Questions questions={this.state.questions} />
          <Navlink />
        </div>
      </div>
    );
  }
}
export default Home;
