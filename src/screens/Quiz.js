import { useEffect } from "react";
import Question from "../components/Question";
import QuizHeader from "../components/QuizHeader";
import SideBar from "../components/SideBar";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import Loading from "../components/Loading";
import Header from "../components/Header";
export const options = {
  plugins: {
    title: {
      display: true,
      // text: "",
    },
  },
  intractions: {
    intersect: false,
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Quiz() {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [incorrectTagsGlobal, setIncorrectTagsGlobal] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const labels = answers.map((i, index) => `Q${index + 1}`);

  const chartdata = {
    labels,
    datasets: [
      {
        label: "Incorrect",
        data: answers.map((i) => i.incorrectLocal),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total",
        data: answers.map((i) => i.answer.length - i.incorrectLocal),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const [score, setScore] = useState({
    correct: 0,
    totalWord: 0,
    incorrect: 0,
    total: 0,
  });
  function validate({ answers, data }) {
    let len = answers.length;
    let score = 0;
    let totalWord = 0;
    let corect = 0;
    let incorrect = 0;
    let incorrectTagsLocal = {};
    let newAnswer = [...answers];
    for (let i = 0; i < len; i++) {
      let flag = true;
      newAnswer[i].answer = [...answers[i].answer];
      let correctLocal = 0;
      let incorrectList = [];
      let incorrectLocal = 0;

      for (let j = 0; j < answers[i].answer.length; j++) {
        newAnswer[i].correcttags = [...data[i].tags];
        totalWord += 1;
        if (answers[i].answer[j] != data[i].tags[j]?.tag_description) {
          flag = false;
          incorrect += 1;
          incorrectList.push(j);
          incorrectLocal += 1;
          if (!incorrectTagsLocal[data[i].tags[j]?.tag_description])
            incorrectTagsLocal[data[i].tags[j]?.tag_description] = 0;
          incorrectTagsLocal[data[i].tags[j]?.tag_description]++;
        } else {
          correctLocal += 1;
          corect += 1;
        }
      }
      newAnswer[i].correctLocal = correctLocal;
      newAnswer[i].incorrectLocal = incorrectLocal;
      newAnswer[i].incorrectList = incorrectList;
      if (flag) score += 1;
    }
    setAnswers(newAnswer);

    setIncorrectTagsGlobal(incorrectTagsLocal);
    setScore({
      correct: corect,
      totalWord: totalWord,
      incorrect: incorrect,
      total: score,
    });
  }
  useEffect(() => {
    if (isFinished) {
      validate({ answers, data });
    }
  }, [isFinished]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch("http://localhost:5000/random?amount=10");
      const data = await res.json();
      setData(data.data);
      setAnswers(
        data.data.map((item) => {
          return {
            answered: false,
            marked: false,
            answer: item.tags.map((word) => null),
          };
        })
      );
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="quiz">
      {!isFinished && (
        <>
          <QuizHeader setIsFinished={setIsFinished} isPreview={isPreview} />
          <div className="bottom-container">
            <SideBar
              answers={answers}
              selected={selected}
              setSelected={setSelected}
              data={data}
              isPreview={isPreview}
            />
            <Question
              answers={answers}
              isPreview={isPreview}
              setIsFinished={setIsFinished}
              setAnswers={setAnswers}
              data={data}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </>
      )}

      {isFinished && (
        <div className="finished">
          <Header />
          <button
            className="review-btn"
            onClick={() => {
              setIsFinished(false);
              setIsPreview(true);
            }}
          >
            Review answers
          </button>
          <button
            className="review-btn"
            onClick={() => {
              let oldScores = localStorage.getItem("scores");
              if (!oldScores) {
                oldScores = [];
              } else {
                oldScores = JSON.parse(oldScores);
              }
              oldScores.push({ ...score, date: Date.now() });
              localStorage.setItem("scores", JSON.stringify(oldScores));
              alert("Data Saved");
            }}
          >
            Save Data
          </button>
          <h1>Total VS Incorrect (Each Question)</h1>
          <Bar options={options} data={chartdata} />
          <h1>Time Taken (Each Question)</h1>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Time",
                  data: answers.map((i) => i.time),
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
          <h1>Incorrect Tags</h1>
          <Bar
            options={options}
            data={{
              labels: Object.keys(incorrectTagsGlobal).map((i) => i),
              datasets: [
                {
                  label: "Incorrect Tags",
                  data: Object.keys(incorrectTagsGlobal).map(
                    (i) => incorrectTagsGlobal[i]
                  ),
                  backgroundColor: "rgb(255, 99, 132)",
                },
              ],
            }}
          />
          ;
        </div>
      )}
    </div>
  );
}

export default Quiz;
