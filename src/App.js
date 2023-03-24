import React from "react";
import About from "./Components/About"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </NoteState>

  );
}

export default App;
