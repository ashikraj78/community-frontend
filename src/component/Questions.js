import React from "react";
import SingleQuestion from "./SingleQuestion";

function Questions(props) {
  return (
    <main className="questionMain">
      <div className="flex filter">
        <button>Latest First</button>
        <button>Mark all as read</button>
      </div>

      {props.questions.map((question) => (
        <SingleQuestion key={question._id} question={question} />
      ))}
    </main>
  );
}
export default Questions;
