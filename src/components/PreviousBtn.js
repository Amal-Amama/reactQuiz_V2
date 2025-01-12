import React from "react";

function PreviousBtn({ dispatch, index }) {
  if (index === 0) return;
  return (
    <button
      className="btn btn-previous"
      onClick={() => dispatch({ type: "PreviousQuestion" })}
    >
      Previous
    </button>
  );
}

export default PreviousBtn;
