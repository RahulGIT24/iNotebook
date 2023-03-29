import React, { useState } from "react";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import DarkState from "./context/darkmode/DarkState";

function App() {
  const [alert, setAlert] = useState(null);
  const renderAlert = (type, message) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <NoteState>
      <DarkState>
        <Router>
          <Navbar renderAlert={renderAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/"
                element={<Home renderAlert={renderAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup renderAlert={renderAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login renderAlert={renderAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </DarkState>
    </NoteState>
  );
}

export default App;
