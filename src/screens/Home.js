import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useState } from "react";
function Home({ lang, setlang }) {
  const navigate = useNavigate();
  return (
    <FadeIn>
      <div className="home">
        <Header />
        <div className="select-lang">
          <label htmlFor="lang"> Select the language</label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => {
              setlang(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ko">Korean</option>
          </select>
        </div>
        <div className="content">
          <div className="main-container">
            <button
              onClick={() => {
                navigate("/learn");
              }}
            >
              Learn
            </button>
            <button
              onClick={() => {
                navigate("/quiz");
              }}
            >
              Take Quiz
            </button>
            <button
              onClick={() => {
                navigate("/new");
              }}
            >
              Custom sentence
            </button>
            <button
              onClick={() => {
                navigate("/history");
              }}
            >
              View History
            </button>
          </div>
          {/* <HomeSidebar /> */}
        </div>
      </div>
    </FadeIn>
  );
}

export default Home;
