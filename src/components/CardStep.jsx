import React, { useEffect, useState, useRef, useMemo } from "react";
function parseDuration(timeStr) {
  const lower = timeStr.toLowerCase();
  const match = lower.match(/(\d+)\s*(second|minute)s?/);
  if (!match) return 1000;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  return unit === "minute" ? value * 60 * 1000 : value * 1000;
}
function CardStep(props) {
  const [showNext, setShowNext] = useState(false);
  const barRef = useRef(null);
  const duration = useMemo(() => parseDuration(props.time), [props.time]);
  useEffect(() => {
    const duration = parseDuration(props.time);
    const bar = document.querySelector(".bar");
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "100%";
      bar.style.backgroundColor = "#744030";
      setTimeout(() => {
        bar.style.transition = `width ${duration}ms linear`;
        bar.style.width = "0%";
      }, 10);
    }
    setShowNext(false);
    const timer = setTimeout(() => {
      setShowNext(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [props.step, props.time]);

  return (
    <div className="card">
      <h1>{props.step}</h1>

      <div className="timer-container">
        {!showNext ? (
          <div className="timer">
            <span className="label">{props.time}</span>
            <div
              className="bar"
              key={`step-${props.step}`} // ✅ updated
              ref={(el) => {
                if (el) {
                  el.style.transition = "none";
                  el.style.width = "100%";
                  el.style.backgroundColor = "#744030"; // make sure this is consistent across steps
                  setTimeout(() => {
                    el.style.transition = `width ${duration}ms linear`;
                    el.style.width = "0%";
                  }, 20);
                }
              }}
            ></div>
          </div>
        ) : (
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
        )}
      </div>

      <img src={props.imgURL} alt={props.step} />
    </div>
  );
}

export default CardStep;
