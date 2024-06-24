import React, { useState } from "react";
import Login from "../src/Pages/Login";
import Register from "../src/Pages/Register";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="App">
      {isRegister ? (
        <Register toggleForm={toggleForm} />
      ) : (
        <Login toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
