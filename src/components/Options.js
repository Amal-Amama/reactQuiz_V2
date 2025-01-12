import React from "react";

function Options({ question, dispatch, answers, questionIndex }) {
  // const hasAnswered = answer !== null; //hiya nefsha answers[questionIndex] !== undefined
  const haveAnAnswer = answers[questionIndex] !== undefined;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answers[questionIndex] === index ? "answer" : ""
          } ${
            haveAnAnswer
              ? index === question.correctOption ||
                (index === answers[questionIndex]) === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={
            answers[questionIndex] !== undefined
              ? () => {
                  dispatch({ type: "nextQuestion" });
                }
              : () => {
                  dispatch({ type: "newAnswer", payload: index });
                }
          }
          disabled={haveAnAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
