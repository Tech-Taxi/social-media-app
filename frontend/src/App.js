import "./App.css";
import Register from "./components/Register";
import HomeComponent from "./components/Home";
import SpecificUser from "./components/SpecificUser";
import User from "./components/User";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [dark, setDark] = useState(localStorage.theme === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <div className="App">
      <button
        className="fixed px-3 py-3 rounded-full right-5 bottom-5 dark:bg-slate-600 dark:text-white bg-gray-100 shadow-md z-50"
        onClick={() => setDark(() => !dark)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/me" element={<User />} />
          <Route exact path={`/user/:id`} element={<SpecificUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
