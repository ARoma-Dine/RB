import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import PersonalDetaills from "./pages/PersonalDetaills";
import AcademicDetails from "./pages/AcademicDetails";
import ResumeSelector from "./pages/ResumeSelector";
import Template1 from "./pages/Template1";
import Template2 from "./pages/Template2";
import Template3 from "./pages/Template3";
import Skills from "./pages/Skills";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetaills />} />
        <Route path="/academic-details" element={<AcademicDetails />} />
        <Route path="/resume" element={<ResumeSelector />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/template1" element={<Template1 />} />
        <Route path="/template2" element={<Template2 />} />
        <Route path="/template3" element={<Template3 />} />
      </Routes>
    </Router>
  );
};

export default App;
