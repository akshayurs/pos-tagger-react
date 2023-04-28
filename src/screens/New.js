import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";

function New() {
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ tags: [] });
  console.log(data);
  return (
    <div className="new">
      {loading && <Loading />}
      <Header />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const res = await fetch(
            "http://localhost:5000/tag?sentence=" + inp.split(" ").join("+")
          );
          const resData = await res.json();
          setData(resData.data[0]);
          setLoading(false);
        }}
        method="get"
      >
        <input
          type="text"
          onChange={(e) => {
            setInp(e.target.value);
          }}
          placeholder="Enter a sentence"
        />
        <input type="submit" value="Submit" />
      </form>
      <div className="sentence">{data.sentence}</div>
      {data.tags.length != 0 && (
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>POS</th>
            </tr>
          </thead>
          <tbody>
            {data.tags.map((tag, ind) => {
              console.log(tag.word);
              return (
                <tr key={ind}>
                  <td>{tag.word}</td>
                  <td>{tag.tag_description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default New;
