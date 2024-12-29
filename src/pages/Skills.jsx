import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../../firebase";

const Skills = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  // Log the userId to the console
  useEffect(() => {
    console.log("User ID: ", userId); // This will log the userId when the component mounts
  }, [userId]);

  const [formData, setFormData] = useState({
    skills: [],
    domainKnowledge: [],
    achievements: [],
  });

  // Function to handle input changes for array fields
  const handleInputChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedArray = [...prevData[field]];
      updatedArray[index] = value;
      return { ...prevData, [field]: updatedArray };
    });
  };

  // Function to add a new item to an array field
  const addNewItem = (field) => {
    if (formData[field].length < 6) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: [...prevData[field], ""],
      }));
    } else {
      alert(`You can only add up to 6 ${field}.`);
    }
  };

  // Function to remove an item from an array field
  const removeItem = (field, index) => {
    setFormData((prevData) => {
      const updatedArray = prevData[field].filter((_, i) => i !== index);
      return { ...prevData, [field]: updatedArray };
    });
  };

  // Save the data to Firebase
  const handleSave = async () => {
    if (!userId) {
      alert("User ID is required.");
      return;
    }

    const data = {
      skillsSection: {
        skills: formData.skills,
        domainKnowledge: formData.domainKnowledge,
        achievements: formData.achievements,
      },
    };

    try {
      const docRef = doc(db, "Resumers", userId);
      await updateDoc(docRef, data); // Save data to Firestore
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <main style={styles.main}>
      <h2 style={styles.heading}>Skills & Achievements</h2>
      <div style={styles.cardContainer}>
        <div style={styles.formSection}>
          <form style={styles.form}>
            {/* Skills Input */}
            <div style={styles.container}>
              <h3 style={styles.sectionHeading}>Skills</h3>
              {formData.skills.map((skill, index) => (
                <div key={index} style={styles.row}>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleInputChange(e, "skills", index)}
                    style={styles.input}
                    placeholder={`Skill ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("skills", index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addNewItem("skills")}
                style={styles.addButton}
              >
                Add Skill
              </button>
            </div>

            {/* Domain Knowledge Input */}
            <div style={styles.container}>
              <h3 style={styles.sectionHeading}>Domain Knowledge</h3>
              {formData.domainKnowledge.map((knowledge, index) => (
                <div key={index} style={styles.row}>
                  <input
                    type="text"
                    value={knowledge}
                    onChange={(e) =>
                      handleInputChange(e, "domainKnowledge", index)
                    }
                    style={styles.input}
                    placeholder={`Domain Knowledge ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("domainKnowledge", index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addNewItem("domainKnowledge")}
                style={styles.addButton}
              >
                Add Domain Knowledge
              </button>
            </div>

            {/* Achievements Input */}
            <div style={styles.container}>
              <h3 style={styles.sectionHeading}>Achievements</h3>
              {formData.achievements.map((achievement, index) => (
                <div key={index} style={styles.row}>
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      handleInputChange(e, "achievements", index)
                    }
                    style={styles.input}
                    placeholder={`Achievement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("achievements", index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addNewItem("achievements")}
                style={styles.addButton}
              >
                Add Achievement
              </button>
            </div>

            <button type="button" onClick={handleSave} style={styles.button}>
              Save & Next
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

const styles = {
  main: {
    padding: "20px",
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "#2c3e50",
    fontSize: "2.5em",
    marginBottom: "20px",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "8px",
    marginBottom: "-6px",
  },
  cardContainer: {
    display: "flex",
    width: "80%",
    maxWidth: "1600px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    overflow: "hidden",
    padding: "20px",
  },
  formSection: {
    flex: 0.7,
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  sectionHeading: {
    fontSize: "1.8em",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1.1em",
  },
  button: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2em",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  addButton: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "all 0.3s ease",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Skills;
