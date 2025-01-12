import React from "react";
import Options from "./Options";

function Question({ question, dispatch, answers, questionIndex }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answers={answers}
        questionIndex={questionIndex}
      />
    </div>
  );
}

export default Question;
