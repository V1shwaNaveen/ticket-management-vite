import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Configuration from "./Components/Configuration";
import Home from "./Components/Home";
import UserValues from "./Components/UserValues";
import StatusUpdate from "./Components/StatusUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Configuration" element={<Configuration />} />
        <Route path="/UserValues" element={<UserValues/>}/>
        <Route path="/StatusUpdate" element={<StatusUpdate/>}/>
      </Routes>
    </Router>
  );
}

export default App;
