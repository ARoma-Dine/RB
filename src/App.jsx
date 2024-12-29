import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import PersonalDetaills from "./pages/PersonalDetaills";
import Skills from "./pages/Skills";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetaills />} />
        <Route path="/skill-achievements" element={<Skills />} />
      </Routes>
    </Router>
  );
};

export default App;
