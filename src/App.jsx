import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import PersonalDetaills from "./pages/PersonalDetaills";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetaills />} />
      </Routes>
    </Router>
  );
};

export default App;
