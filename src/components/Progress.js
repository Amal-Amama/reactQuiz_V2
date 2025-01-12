import React from "react";

function Progress({ numQuestions, index, points, maxPossiblePoints, answers }) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answers[index] !== undefined)}
        max={numQuestions}
      />
      <p>
        Question
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong> {points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
