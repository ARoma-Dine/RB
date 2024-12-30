import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResumeSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const navigateToTemplate = (template) => {
    navigate(`/${template}`, {
      state: { userId }, // Pass userId as state
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select Your Resume Template</h1>
      <div style={{ margin: "20px" }}>
        <button
          onClick={() => navigateToTemplate("template1")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: "#1a374d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Template 1
        </button>
        <button
          onClick={() => navigateToTemplate("template2")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: "#1a374d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Template 2
        </button>
        <button
          onClick={() => navigateToTemplate("template3")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#1a374d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Template 3
        </button>
      </div>
    </div>
  );
};

export default ResumeSelector;
