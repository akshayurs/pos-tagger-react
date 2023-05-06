import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./screens/Quiz";
import New from "./screens/New";
import Home from "./screens/Home";
import History from "./screens/History";
import Learn from "./screens/Learn";
import { useState } from "react";
function App() {
  const [lang, setlang] = useState("en");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home lang={lang} setlang={setlang} />}
          />
          <Route
            path="/learn"
            exact
            element={<Learn lang={lang} setlang={setlang} />}
          />
          <Route
            path="/history"
            exact
            element={<History lang={lang} setlang={setlang} />}
          />
          <Route
            path="/quiz"
            exact
            element={<Quiz lang={lang} setlang={setlang} />}
          />
          <Route
            path="/new"
            exact
            element={<New lang={lang} setlang={setlang} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
