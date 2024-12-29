import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import PersonalDetaills from "./pages/PersonalDetaills";
import AcademicDetails from "./pages/AcademicDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetaills />} />
        <Route path="/academic-details" element={<AcademicDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
