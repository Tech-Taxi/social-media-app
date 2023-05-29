import './App.css';
import Register from "./components/Register";
import HomeComponent from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route exact path="/home" element={<HomeComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
