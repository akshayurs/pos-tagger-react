import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./screens/Quiz";
import New from "./screens/New";
import Home from "./screens/Home";
import History from "./screens/History";
import Learn from "./screens/Learn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/learn" exact element={<Learn />} />
          <Route path="/history" exact element={<History />} />
          <Route path="/quiz" exact element={<Quiz />} />
          <Route path="/new" exact element={<New />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
