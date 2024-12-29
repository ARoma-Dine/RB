import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import PersonalDetaills from "./pages/PersonalDetaills";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PersonalDetaills />} />
      </Routes>
    </Router>
  );
};

export default App;
