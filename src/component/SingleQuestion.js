import React from "react";
import { Link } from "react-router-dom";

function SingleQuestion(props) {
  return (
    <div className="flex2 question">
      <img className="logo" src="./images/pp6.png" alt="authorimage"></img>
      <div className="questionText">
        <Link
          className="questionHeading"
          to={`/questions/${props.question._id}`}
        >
          {props.question.title}
        </Link>
        {/* <p className="reply">latest reply from Manish 5 minutes ago</p> */}
        <p>{props.question.description}</p>
      </div>
    </div>
  );
}
export default SingleQuestion;
