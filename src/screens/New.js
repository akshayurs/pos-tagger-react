import { useState } from "react";
import Header from "../components/Header";

function New() {
  const [inp, setInp] = useState("");
  const [data, setData] = useState({ tags: [] });
  return (
    <div className="new">
      <Header />
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await fetch(
            "http://localhost:5000/tag?sentence=" + inp.split(" ").join("+")
          );
          const resData = await res.json();
          setData(resData.data[0]);
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
            {data.tags.map((tag) => {
              return (
                <tr>
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
