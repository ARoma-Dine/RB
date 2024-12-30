import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase imports
import { useLocation } from "react-router-dom";

const Template3 = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "Resumers", userId); // Update with your Firebase path
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.error("No document found!");
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  // Destructure the necessary fields with fallback values
  const {
    personalDetails = {},
    skillsSection = {},
    academicDetails = {},
    internships = [],
  } = data;

  // Safely access nested properties
  const { SSC = {}, Intermediate = {}, UnderGraduation = {} } = academicDetails;
  const {
    course: undergradCourse,
    institutionName: undergradInstitution,
    startYear: undergradStart,
    endYear: undergradEnd,
  } = UnderGraduation;
  const {
    course: interCourse,
    institutionName: interInstitution,
    startYear: interStart,
    endYear: interEnd,
  } = Intermediate;
  const {
    course: sscCourse,
    institutionName: sscInstitution,
    startYear: sscStart,
    endYear: sscEnd,
  } = SSC;

  const styles = {
    asterisk: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
    },
    body: {
      backgroundColor: "#fff",
      padding: "0.5in",
    },
    resume: {
      width: "8.5in",
      height: "11in",
      margin: "0 auto",
      backgroundColor: "white",
      display: "grid",
      gridTemplateColumns: "2.5in 1fr",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    leftColumn: {
      backgroundColor: "#f8f9fa",
      padding: "0.5in",
    },
    rightColumn: {
      padding: "0.5in",
    },
    name: {
      fontSize: "16pt",
      fontWeight: "bold",
      marginBottom: "4pt",
    },
    jobTitle: {
      fontSize: "12pt",
      color: "#444",
      marginBottom: "15pt",
    },
    contactInfo: {
      marginBottom: "20pt",
      fontSize: "10pt",
    },
    contactItem: {
      marginBottom: "8pt",
      display: "flex",
      alignItems: "center",
      gap: "8pt",
    },
    sectionTitle: {
      fontSize: "12pt",
      fontWeight: "bold",
      margin: "15pt 0 10pt 0",
      color: "#333",
      textTransform: "uppercase",
    },
    skillsList: {
      listStyle: "none",
      fontSize: "10pt",
    },
    skillsItem: {
      marginBottom: "6pt",
      color: "#444",
    },
    resumeObjective: {
      marginBottom: "20pt",
      lineHeight: 1.4,
      fontSize: "10pt",
    },
    experienceItem: {
      marginBottom: "15pt",
    },
    jobTitleHeader: {
      fontWeight: "bold",
      marginBottom: "3pt",
      fontSize: "11pt",
      textTransform: "uppercase",
    },
    companyInfo: {
      fontStyle: "italic",
      color: "#444",
      marginBottom: "6pt",
      fontSize: "10pt",
    },
    jobDuties: {
      listStyle: "disc",
      marginLeft: "15pt",
      fontSize: "10pt",
    },
    jobDutyItem: {
      marginBottom: "6pt",
      lineHeight: 1.3,
    },
    educationItem: {
      marginBottom: "12pt",
      fontSize: "10pt",
    },
    degree: {
      fontWeight: "bold",
    },
    university: {
      color: "#444",
      marginTop: "2pt",
    },
    year: {
      color: "#666",
      marginTop: "2pt",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.resume}>
        <div style={styles.leftColumn}>
          <div style={styles.name}>
            {personalDetails.firstName} {personalDetails.lastName}
          </div>
          <div style={styles.jobTitle}>{personalDetails.designation}</div>

          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <span>📧</span>
              <span>{personalDetails.email}</span>
            </div>
            <div style={styles.contactItem}>
              <span>📞</span>
              <span>{personalDetails.phone}</span>
            </div>
            <div style={styles.contactItem}>
              <span>📍</span>
              <span>
                {personalDetails.address?.addressLine},{" "}
                {personalDetails.address?.city}
              </span>
            </div>
            <div style={styles.contactItem}>
              <span>💼</span>
              <span>linkedin.com/in/yourprofile</span>
            </div>
          </div>

          <div style={styles.sectionTitle}>SKILLS</div>
          <ul style={styles.skillsList}>
            {skillsSection.skills?.map((skill, index) => (
              <li key={index} style={styles.skillsItem}>
                {skill}
              </li>
            ))}
          </ul>

          <div style={styles.sectionTitle}>EDUCATION</div>

          {/* Display SSC Education */}
          {sscCourse && (
            <div style={styles.educationItem}>
              <div style={styles.degree}>{sscCourse}</div>
              <div style={styles.university}>{sscInstitution}</div>
              <div style={styles.year}>
                {sscStart} - {sscEnd}
              </div>
            </div>
          )}

          {/* Display Intermediate Education */}
          {interCourse && (
            <div style={styles.educationItem}>
              <div style={styles.degree}>{interCourse}</div>
              <div style={styles.university}>{interInstitution}</div>
              <div style={styles.year}>
                {interStart} - {interEnd}
              </div>
            </div>
          )}

          {/* Display UnderGraduation Education */}
          {undergradCourse && (
            <div style={styles.educationItem}>
              <div style={styles.degree}>{undergradCourse}</div>
              <div style={styles.university}>{undergradInstitution}</div>
              <div style={styles.year}>
                {undergradStart} - {undergradEnd}
              </div>
            </div>
          )}

          <div style={styles.sectionTitle}>AWARDS</div>
          {skillsSection.achievements?.map((achievement, index) => (
            <div key={index} style={styles.educationItem}>
              <div style={styles.degree}>{achievement}</div>
            </div>
          ))}
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.sectionTitle}>RESUME OBJECTIVE</div>
          <div style={styles.resumeObjective}>
            Administrative Assistant with 6+ years of experience organizing
            presentations, preparing facility reports, and maintaining the
            utmost confidentiality.
          </div>

          <div style={styles.sectionTitle}>EXPERIENCE</div>
          {internships?.map((internship, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.jobTitleHeader}>{internship.title}</div>
              <div style={styles.companyInfo}>
                {internship.company}, {internship.location} /{" "}
                {internship.startDate} - {internship.endDate}
              </div>
              <ul style={styles.jobDuties}>
                <li style={styles.jobDutyItem}>{internship.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Template3;
