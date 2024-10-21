import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Home from "./home"; // Assuming Home is another component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
