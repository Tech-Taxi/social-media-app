import './App.css';
import Register from "./components/Register";
import HomeComponent from "./components/Home";
import User from "./components/User";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/me" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
