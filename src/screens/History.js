import Header from "../components/Header";
import { useEffect, useState } from "react";
function History() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("scores"))[0];
    let temp = [1, 2, 4, 4, 44, 4, 4, 4, 4, 4].map(() => data);
    setScores(temp);
  }, []);
  return (
    <div className="history">
      <Header title="History" />
      <div className="scores-container">
        {scores &&
          scores.map((score) => (
            <div className="score">
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
