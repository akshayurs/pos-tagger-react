import { useEffect, useRef } from "react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Draggable, Droppable } from "react-drag-and-drop";
import FadeIn from "react-fade-in";
import { words } from "lodash-es";
// <Draggable type={["opt"]} data={tag} type="foo" data="bar">
//   <div>Drag me!</div>
// </Draggable type={["opt"]} data={tag}>

// <Droppable
//   types={["foo"]}
//   onDrop={(e) => {
//   }}
// >
//   <div>Drop here!</div>
// </Droppable>
function Question({
  data,
  selected,
  setSelected,
  setAnswers,
  answers,
  setIsFinished,
  isPreview,
}) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => setTime(time + 10), 100);
    return () => clearInterval(intervalId);
  }, [time]);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const sentence = data[selected];

  const [answersTemp, setAnswersTemp] = useState([]);
  const [toAnswer, setToAnswer] = useState(0);
  const selectedRef = useRef(selected);
  const shuffeledArr = useRef([]);

  useEffect(() => {
    shuffeledArr.current = sentence.tags.sort(() => {
      return Math.random() - 0.5;
    });
  }, [data]);
  function saveAnswers(answersTemp) {
    setAnswers(
      answers?.map((item, index) => {
        if (index == selected) {
          return {
            ...item,
            answered: true,
            answer: answersTemp,
            time: minutes * 60 + seconds,
          };
        }
        // console.log({ minutes, seconds, ans: minutes * 60 + seconds });
        return item;
      })
    );
  }

  useEffect(() => {
    if (selectedRef.current != selected) {
      selectedRef.current = selected;
    }
    setToAnswer(0);
  }, [selected]);
  useEffect(() => {
    if (answersTemp) saveAnswers(answersTemp);
  }, [answersTemp]);
  return (
    <div className="question">
      <FadeIn>
        <div className="top-container">
          <div className="top-question">
            <h1>Question {selected + 1}</h1>

            <button
              className="mark-btn"
              onClick={() => {
                setAnswers(
                  answers?.map((item, index) => {
                    if (index == selected) {
                      return {
                        ...item,
                        marked: !item.marked,
                      };
                    }
                    return item;
                  })
                );
              }}
            >
              {answers[selected].marked ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          </div>

          <table className="word-container" cellSpacing={12}>
            <tr className="top">
              {sentence?.sentence.split(" ").map((word) => {
                return <td key={word}>{word}</td>;
              })}
            </tr>
            <tr className="bottom">
              {sentence?.sentence.split(" ").map((word, index) => {
                return (
                  <td
                    key={index}
                    className={
                      (answersTemp[index] != null ? "answered" : "") +
                      (toAnswer == index ? "toanswer" : "")
                    }
                  >
                    <Droppable
                      types="opt"
                      onDrop={(e) => {
                        setAnswersTemp((prev) => {
                          prev = [...prev];
                          prev[index] = e.opt;
                          return prev;
                        });
                      }}
                    >
                      {isPreview &&
                        answers[selected].correcttags[index].tag_description !=
                          answers[selected].answer[index] && (
                          <div className="correct correct-ans">
                            {
                              answers[selected].correcttags[index]
                                .tag_description
                            }
                          </div>
                        )}
                      {isPreview && (
                        <div
                          className={
                            " entered-ans " +
                              answers[selected].correcttags[index]
                                .tag_description ==
                            answers[selected].answer[index]
                              ? "correct"
                              : "incorrect"
                          }
                        >
                          {answers[selected].answer[index] || "NULL"}
                        </div>
                      )}
                      {answersTemp[index] != null && answersTemp[index]}
                    </Droppable>
                  </td>
                );
              })}
            </tr>
          </table>
          {!isPreview && (
            <div className="options-container">
              {sentence?.tags.map((tag, index) => {
                return (
                  <Draggable
                    type={["opt"]}
                    key={index}
                    data={tag.tag_description}
                  >
                    <button
                      key={tag.tag_description + String(index)}
                      className="options"
                      onClick={() => {
                        setAnswersTemp((prev) => {
                          prev = [...prev];
                          prev[toAnswer] = tag.tag_description;

                          if (
                            toAnswer + 1 ==
                            sentence.sentence.split(" ").length
                          ) {
                            saveAnswers(prev);
                          }
                          return prev;
                        });

                        setToAnswer(toAnswer + 1);
                      }}
                    >
                      {tag.tag_description}
                    </button>
                  </Draggable>
                );
              })}
            </div>
          )}
        </div>

        <div className="nav-btn">
          {selected != 0 && (
            <button
              className="prev"
              onClick={() => {
                setSelected(selected - 1);
              }}
            >
              Prev
            </button>
          )}
          {selected != data.length - 1 && (
            <button
              className="next"
              onClick={() => {
                setSelected(selected + 1);
                let flag = true;
                answersTemp.forEach((item) => {
                  if (item == null) {
                    flag = false;
                  }
                });
                if (flag) {
                  saveAnswers(answersTemp);
                }
                setToAnswer(0);
                setAnswersTemp([null]);
              }}
            >
              Next
            </button>
          )}
          {selected == data.length - 1 && (
            <button
              className="next"
              onClick={() => {
                setIsFinished(true);
              }}
            >
              Submit
            </button>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export default Question;
