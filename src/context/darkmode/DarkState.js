import { useState } from "react";
import DarkContext from "./darkContext";

const DarkState = (props) => {
  const [mode, setMode] = useState("light");
  const toogleBtn = () => {
    if (mode === "light") {
      document.body.style.backgroundColor = "#212529";
      document.body.style.color = "white";
      setMode("dark");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#212529";
    }
  };
  return (
    <DarkContext.Provider value={{ toogleBtn, mode }}>
      {props.children}
    </DarkContext.Provider>
  );
};

export default DarkState;
