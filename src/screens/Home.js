import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";
import FadeIn from "react-fade-in/lib/FadeIn";

function Home() {
  const navigate = useNavigate();
  return (
    <FadeIn>
      <div className="home">
        <Header />

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
