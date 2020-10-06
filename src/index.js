import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import AddQuestion from "./component/AddQuestion";
import QuestionDetail from "./component/QuestionDetail";
import EditQuestion from "./component/EditQuestion";
import EditAnswer from "./component/EditAnswer";

function NotFound() {
  return <h1>Page not found!</h1>;
}
function Private(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home
          isLoggedIn={props.isLoggedIn}
          handleLogout={props.handleLogout}
          userDetails={props.userDetails}
        />
      </Route>
      <Route path="/addQuestion">
        <AddQuestion
          isLoggedIn={props.isLoggedIn}
          handleLogout={props.handleLogout}
          userDetails={props.userDetails}
        />
      </Route>
      <Route path="/questions/:id">
        <QuestionDetail
          isLoggedIn={props.isLoggedIn}
          handleLogout={props.handleLogout}
          userDetails={props.userDetails}
        />
      </Route>
      <Route path="/editQuestion/:id">
        <EditQuestion
          isLoggedIn={props.isLoggedIn}
          handleLogout={props.handleLogout}
          userDetails={props.userDetails}
        />
      </Route>
      <Route path="/editAnswer/:id">
        <EditAnswer
          isLoggedIn={props.isLoggedIn}
          handleLogout={props.handleLogout}
          userDetails={props.userDetails}
        />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function Public(props) {
  return (
    <Switch>
      <Route path="/login">
        <Login updateLoggedInUser={props.updateLoggedInUser} />
      </Route>
      <Route path="/signup">
        <Signup updateLoggedInUser={props.updateLoggedInUser} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
class App extends React.Component {
  state = {
    isLoggedIn: false,
    userDetails: " ",
  };
  componentDidMount() {
    if (localStorage.authTokenFrontendForum) {
      this.setState({ isLoggedIn: true });
    }
  }
  updateLoggedInUser = (user) => {
    // console.log(user);
    this.setState({ isLoggedIn: true, userDetails: user });
  };
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.removeItem("authTokenFrontendForum");
  };
  render() {
    console.log(this.state.userDetails);
    return (
      <BrowserRouter>
        {this.state.isLoggedIn ? (
          <Private
            isLoggedIn={this.state.isLoggedIn}
            userDetails={this.state.userDetails}
            handleLogout={this.handleLogout}
          />
        ) : (
          <Public updateLoggedInUser={this.updateLoggedInUser} />
        )}
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
