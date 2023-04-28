import { useEffect, useState } from "react";

function QuizHeader({ setIsFinished, isPreview }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => setTime(time + 10), 100);
    return () => clearInterval(intervalId);
  }, [time]);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  return (
    <div className="quizheader">
      <h1>POS Quiz</h1>
      {!isPreview && (
        <div className="time">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      )}

      <button
        className="finish"
        onClick={() => {
          setIsFinished(true);
        }}
      >
        Finish
      </button>
    </div>
  );
}

export default QuizHeader;
