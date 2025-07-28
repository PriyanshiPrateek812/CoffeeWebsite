import React from "react";
function Card(props) {
  return (
    <div className="card">
      <h1>Start making your coffee</h1>
      <button onClick={props.onNext}>
        <svg
          className="arrow-bounce"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 17L11 12L6 7M13 17L18 12L13 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
export default Card;
