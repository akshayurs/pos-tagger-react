import Header from "../components/Header";
import { useEffect, useState } from "react";
function History() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("scores"));
    setScores(data);
  }, []);
  return (
    <div className="history">
      <Header title="History" />
      <div className="scores-container">
        {scores &&
          scores.map((score, index) => (
            <div className="score" key={index}>
              <div>{new Date(score.date).toLocaleString()}</div>
              <div>
                Score: {Math.round((score.correct / score.totalWord) * 100)}%
              </div>

              <div>Total Words: {score.totalWord}</div>
              <div>Correct Words: {score.correct}</div>
              <div>Incorrect Words: {score.incorrect}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default History;
