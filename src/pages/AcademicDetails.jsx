import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { useLocation } from "react-router-dom";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../../firebase";
import { useNavigate } from "react-router-dom";

const AcademicDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [formData, setFormData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");
  const [branches, setBranches] = useState([]);

  const coursesAndBranches = {
    "B.Tech/B.E.": [
      "Computer Science and Engineering",
      "Mechanical Engineering",
      "Electrical and Electronics Engineering",
      "Civil Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Chemical Engineering",
      "Biotechnology",
      "Data Science",
      "Artificial Intelligence and Machine Learning",
      "Aerospace Engineering",
    ],
    "B.Sc.": [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Zoology",
      "Botany",
      "Biotechnology",
      "Computer Science",
      "Environmental Science",
      "Microbiology",
      "Statistics",
    ],
    "B.Com": [
      "Accounting and Finance",
      "Banking and Insurance",
      "Taxation",
      "International Business",
      "Business Analytics",
      "Marketing",
    ],
    "B.A.": [
      "English",
      "History",
      "Political Science",
      "Sociology",
      "Psychology",
      "Economics",
      "Philosophy",
      "Journalism and Mass Communication",
      "Public Administration",
    ],
    BCA: [
      "Computer Applications",
      "Software Development",
      "Information Systems",
      "Data Analytics",
      "Cybersecurity",
    ],
    BBA: [
      "Marketing",
      "Finance",
      "Human Resource Management",
      "Operations Management",
      "Information Technology",
      "Business Analytics",
      "Entrepreneurship",
      "International Business",
      "Healthcare Management",
    ],
    "B.Arch": [
      "Urban Design",
      "Landscape Architecture",
      "Sustainable Architecture",
      "Construction Management",
    ],
    "B.Des": [
      "Industrial Design",
      "Communication Design",
      "Product Design",
      "Fashion Design",
      "User Experience (UX) Design",
    ],
    "B.Pharm": [
      "Pharmaceutics",
      "Pharmacology",
      "Pharmaceutical Chemistry",
      "Pharmacy Practice",
      "Pharmacognosy",
    ],
    LLB: [
      "Corporate Law",
      "Constitutional Law",
      "Criminal Law",
      "Intellectual Property Rights",
      "International Law",
    ],
    "B.Ed": [
      "Curriculum and Instruction",
      "Educational Psychology",
      "Special Education",
      "Educational Technology",
      "Teacher Training",
    ],
    "B.F.A.": [
      "Painting",
      "Sculpture",
      "Applied Arts",
      "Photography",
      "Visual Arts",
    ],
    "B.J.M.C.": [
      "Broadcast Journalism",
      "Print Journalism",
      "Digital Media",
      "Public Relations",
      "Advertising",
    ],
    BDS: [
      "Orthodontics",
      "Prosthodontics",
      "Oral and Maxillofacial Surgery",
      "Pedodontics",
      "Periodontics",
    ],
    BPT: [
      "Orthopedics",
      "Neurology",
      "Sports Physiotherapy",
      "Cardiopulmonary",
    ],
    "B.V.Sc.": [
      "Animal Nutrition",
      "Veterinary Medicine",
      "Livestock Production Management",
      "Veterinary Surgery",
    ],
    "B.S.W.": [
      "Community Development",
      "Human Resource Management",
      "Medical and Psychiatric Social Work",
      "Rural Development",
    ],
    "B.H.M.": [
      "Hospitality Management",
      "Tourism Management",
      "Food and Beverage Management",
      "Event Management",
    ],
  };
  const handleCourseChange = (event) => {
    const selected = event.target.value;
    setSelectedCourse(selected);
    setBranches(coursesAndBranches[selected] || []);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/b35de59d-cccf-4dd3-b9d5-95b4b5001e1b/jSpX9Fd5pN.json",
    });

    return () => animation.destroy();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      SSC: {
        institutionName: formData.sscInstitutionName || "",
        boardName: formData.sscBoardName || "",
        state: formData.sscState || "",
        city: formData.sscCity || "",
        startYear: formData.sscStartDate || "",
        endYear: formData.sscEndDate || "",
        mathScore: formData.sscMathScore || "",
        physicsScore: formData.sscPhysicsScore || "",
        chemistryScore: formData.sscChemistryScore || "",
      },
      Intermediate: {
        institutionName: formData.interInstitutionName || "",
        boardName: formData.interBoardName || "",
        course: formData.interCourse || "",
        state: formData.interState || "",
        city: formData.interCity || "",
        startYear: formData.interStartDate || "",
        endYear: formData.interEndDate || "",
        mathScore: formData.interMathScore || "",
        physicsScore: formData.interPhysicsScore || "",
        chemistryScore: formData.interChemistryScore || "",
      },
      UnderGraduation: {
        institutionName: formData.ugInstitutionName || "",
        course: formData.ugCourse || "",
        branch: formData.ugBranch || "",
        state: formData.ugState || "",
        city: formData.ugCity || "",
        startYear: formData.ugStartDate || "",
        endYear: formData.ugEndDate || "",
      },
    };

    try {
      if (!userId) {
        throw new Error("User ID is required.");
      }

      const docRef = doc(collection(db, "Resumers"), userId);
      await updateDoc(docRef, { AcademicDetails: data }); // Save data to Firestore
      alert("Data saved successfully!");
      navigate("/skills", { state: { userId: userId } });
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <>
      <main style={styles.main}>
        <h2 style={styles.heading}>Academic Details</h2>
        <div style={styles.cardContainer}>
          <div style={styles.formSection}>
            <form
              id="registrationForm"
              onSubmit={handleSubmit}
              style={styles.form}
            >
              <h2 style={{ marginBottom: 4, fontSize: 22 }}>SSC Education</h2>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label
                    htmlFor="sscInstitutionName"
                    style={{ ...styles.label, minWidth: 630 }}
                  >
                    Institution Name
                  </label>
                  <label htmlFor="sscBoardName" style={styles.label}>
                    Board Name
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    type="text"
                    id="sscInstitutionName"
                    name="sscInstitutionName"
                    required
                    style={{ ...styles.input, minWidth: 620 }}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="sscBoardName"
                    name="sscBoardName"
                    required
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="sscState" style={{ ...styles.label }}>
                    State
                  </label>
                  <label htmlFor="sscCity" style={styles.label}>
                    City
                  </label>
                  <label htmlFor="sscStartDate" style={{ ...styles.label }}>
                    Start Year
                  </label>
                  <label htmlFor="sscEndDate" style={{ ...styles.label }}>
                    End Year
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscState"
                    name="sscState"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscCity"
                    name="sscCity"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscStartDate"
                    name="sscStartDate"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscEndDate"
                    name="sscEndDate"
                    required
                    style={{ ...styles.input }}
                  />
                </div>
                <div style={styles.row}>
                  <label htmlFor="sscMathScore" style={{ ...styles.label }}>
                    Mathematics Score (CGPA / Percentage)
                  </label>
                  <label htmlFor="sscPhysicsScore" style={styles.label}>
                    Physics Score (CGPA / Percentage)
                  </label>
                  <label htmlFor="sscChemistryScore" style={styles.label}>
                    Chemistry Score (CGPA / Percentage)
                  </label>
                </div>
                <div style={{ ...styles.row, marginBottom: 8 }}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscMathScore"
                    name="sscMathScore"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscPhysicsScore"
                    name="sscPhysicsScore"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="sscChemistryScore"
                    name="sscChemistryScore"
                    required
                    style={{ ...styles.input }}
                  />
                </div>
              </div>

              <h2 style={{ marginBottom: 4, fontSize: 22 }}>Intermediate</h2>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label
                    htmlFor="intermediateInstitutionName"
                    style={{ ...styles.label, minWidth: 450 }}
                  >
                    Institution Name
                  </label>
                  <label htmlFor="intermediateBoardName" style={styles.label}>
                    Board Name
                  </label>
                  <label htmlFor="intermediateCourse" style={styles.label}>
                    Course
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    type="text"
                    id="interInstitutionName"
                    name="interInstitutionName"
                    required
                    style={{ ...styles.input, minWidth: 450 }}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="interBoardName"
                    name="interBoardName"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <select
                    id="interCourse"
                    name="interCourse"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Select Course
                    </option>
                    <option value="MPC">MPC</option>
                    <option value="BiPC">BiPC</option>
                    <option value="CEC">CEC</option>
                    <option value="MEC">MEC</option>
                  </select>
                </div>
              </div>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="interState" style={{ ...styles.label }}>
                    State
                  </label>
                  <label htmlFor="interCity" style={styles.label}>
                    City
                  </label>
                  <label htmlFor="interStartDate" style={{ ...styles.label }}>
                    Start Year
                  </label>
                  <label htmlFor="interEndDate" style={{ ...styles.label }}>
                    End Year
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interState"
                    name="interState"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interCity"
                    name="interCity"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interStartDate"
                    name="interStartDate"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interEndDate"
                    name="interEndDate"
                    required
                    style={{ ...styles.input }}
                  />
                </div>
                <div style={styles.row}>
                  <label htmlFor="interMathScore" style={{ ...styles.label }}>
                    Mathematics Score (CGPA / Percentage)
                  </label>
                  <label htmlFor="interPhysicsScore" style={styles.label}>
                    Physics Score (CGPA / Percentage)
                  </label>
                  <label htmlFor="interChemistryScore" style={styles.label}>
                    Chemistry Score (CGPA / Percentage)
                  </label>
                </div>
                <div style={{ ...styles.row, marginBottom: 8 }}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interMathScore"
                    name="interMathScore"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interPhysicsScore"
                    name="interPhysicsScore"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interChemistryScore"
                    name="interChemistryScore"
                    required
                    style={{ ...styles.input }}
                  />
                </div>
              </div>

              <h2 style={{ marginBottom: 4, fontSize: 22 }}>
                Under Graduation
              </h2>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="ugInstitutionName" style={styles.label}>
                    Institution Name
                  </label>
                  <label htmlFor="ugCourse" style={styles.label}>
                    Course
                  </label>
                  <label htmlFor="ugBranch" style={styles.label}>
                    Branch
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    type="text"
                    id="ugInstitutionName"
                    name="ugInstitutionName"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <select
                    id="ugCourse"
                    name="ugCourse"
                    required
                    style={styles.input}
                    onChange={handleCourseChange}
                  >
                    <option value="" disabled selected>
                      Select Course
                    </option>
                    {Object.keys(coursesAndBranches).map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  <select
                    id="ugBranch"
                    name="ugBranch"
                    required
                    style={styles.input}
                    disabled={!selectedCourse}
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      {selectedCourse
                        ? "Select Branch"
                        : "Select a course first"}
                    </option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="ugState" style={{ ...styles.label }}>
                    State
                  </label>
                  <label htmlFor="ugCity" style={styles.label}>
                    City
                  </label>
                  <label htmlFor="ugStartDate" style={{ ...styles.label }}>
                    Start Year
                  </label>
                  <label htmlFor="ugEndDate" style={{ ...styles.label }}>
                    End year
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="ugState"
                    name="ugState"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="ugCity"
                    name="ugCity"
                    required
                    style={styles.input}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="ugStartDate"
                    name="ugStartDate"
                    required
                    style={{ ...styles.input }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="ugEndDate"
                    name="ugEndDate"
                    required
                    style={{ ...styles.input }}
                  />
                </div>
              </div>

              <button type="submit" style={styles.button}>
                Next
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
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
    flex: 1,
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    display: "block",
    color: "#2c3e50",
    fontSize: "1.2em",
    flex: 1,
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1.1em",
    flex: 1,
    padding: "8px",
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
};

export default AcademicDetails;
