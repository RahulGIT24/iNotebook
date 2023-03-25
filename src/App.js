import React from "react";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Alert from "./Components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        {/* <Alert /> */}
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
