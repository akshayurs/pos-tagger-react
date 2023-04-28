import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function Learn() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/random?amount=20");
      const data = await res.json();
      setData(data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="learn">
      <Header title="Learn" />
      <div className="learn-container">
        {data.map((item, index1) => {
          return (
            <div className="learn-item" key={index1}>
              <div className="learn-question">
                {index1 + 1}. {item.sentence}
              </div>
              <table className="learn-answer">
                <tr>
                  <th>Word</th>
                  <th>Tag</th>
                </tr>
                {item.tags.map((tag, index) => {
                  return (
                    <tr className="learn-answer-item" key={index}>
                      <td className="learn-answer-word">{tag.word} :</td>
                      <td className="learn-answer-pos">
                        {tag.tag_description}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          );
        })}
        <button
          className="back"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Learn;
