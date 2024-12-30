import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const Template2 = () => {
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

  // Map Firebase data to template fields
  const {
    personalDetails,
    skillsSection,
    internships,
    AcademicDetails,
    certifications,
    projects,
  } = data;

  const name = `${personalDetails.firstName} ${personalDetails.lastName}`;
  const role = personalDetails.designation || "Professional";
  const contact = {
    address: `${personalDetails.address.addressLine}, ${personalDetails.address.city}, ${personalDetails.address.state}, ${personalDetails.address.country} - ${personalDetails.address.pincode}`,
    email: personalDetails.email,
    linkedin: personalDetails.socialLinks.linkedin || "Not Provided",
    linkedinLink: personalDetails.socialLinks.linkedinLink || "Not Provided",
  };
  const summary =
    "Dedicated and skilled professional with experience in academic, technical, and interpersonal domains. Passionate about leveraging skills for impactful outcomes.";
  const skills = skillsSection.skills || [];
  const experiences = internships.map((intern) => ({
    title: intern.title,
    company: intern.company,
    period: `${intern.startDate} - ${intern.endDate}`,
    achievements: [intern.description],
  }));
  const education = [
    {
      degree: "Undergraduate",
      school: AcademicDetails?.UnderGraduation?.institutionName,
      period: `${AcademicDetails?.UnderGraduation?.startYear} - ${AcademicDetails?.UnderGraduation?.endYear}`,
      details: [
        `Branch: ${AcademicDetails?.UnderGraduation?.branch}`,
        `Course: ${AcademicDetails?.UnderGraduation?.course}`,
      ],
    },
    {
      degree: "Intermediate",
      school: AcademicDetails?.Intermediate?.institutionName,
      period: `${AcademicDetails?.Intermediate?.startYear} - ${AcademicDetails?.Intermediate?.endYear}`,
      details: [
        `Board: ${AcademicDetails?.Intermediate?.boardName}`,
        `Course: ${AcademicDetails?.Intermediate?.course}`,
      ],
    },
    {
      degree: "SSC",
      school: AcademicDetails?.SSC?.institutionName,
      period: `${AcademicDetails?.SSC?.startYear} - ${AcademicDetails?.SSC?.endYear}`,
      details: [`Board: ${AcademicDetails?.SSC?.boardName}`],
    },
  ];
  const additionalInfo = {
    languages: skillsSection.domainKnowledge?.join(", ") || "N/A",
    certifications: certifications.map((cert) => cert.name).join(", "),
    awards: skillsSection.achievements?.join(", ") || "N/A",
  };
  const styles = {
    pageWrapper: {
      fontFamily: '"Arial", sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      width: "100%",
    },
    resumeContainer: {
      width: "100%",
      maxWidth: "900px",
      margin: "30px auto",
      background: "white",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      borderRadius: "10px",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "left",
      marginBottom: "30px",
    },
    headerH1: {
      fontSize: "2.8rem",
      color: "#0073e6",
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      margin: 0,
    },
    headerH2: {
      fontSize: "1.5rem",
      color: "#404040",
      marginTop: "5px",
      margin: "5px 0 0 0",
    },
    headerP: {
      fontSize: "1rem",
      color: "#606060",
      marginTop: "5px",
      borderTop: "1px solid #d3d3d3",
      paddingTop: "10px",
      margin: "5px 0 0 0",
    },
    sectionTitle: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#0073e6",
      borderTop: "2px solid #0073e6",
      borderBottom: "2px solid #0073e6",
      marginBottom: "20px",
      paddingBottom: "5px",
      paddingLeft: "13px",
      paddingTop: "3px",
      margin: "0 0 20px 0",
    },
    section: {
      marginBottom: "30px",
    },
    sectionP: {
      fontSize: "1rem",
      color: "#404040",
      lineHeight: 1.6,
      marginBottom: "10px",
      margin: "0 0 10px 0",
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      marginLeft: "5px",
    },
    skillsGridSpan: {
      display: "inline-block",
      fontSize: "0.95rem",
      marginLeft: "10px",
    },
    experience: {
      marginBottom: "20px",
    },
    experienceH3: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1.1rem",
      color: "#202020",
      fontWeight: "bold",
      marginBottom: "10px",
      margin: "0 0 10px 0",
    },
    experienceUl: {
      margin: "10px 0",
      paddingLeft: "20px",
      listStyleType: "disc",
    },
    experienceUlLi: {
      fontSize: "1rem",
      color: "#404040",
      marginBottom: "5px",
      lineHeight: "1.4",
    },
    educationP: {
      fontSize: "1rem",
      color: "#606060",
      marginTop: "5px",
      margin: "5px 0 0 0",
    },
    additionalInfoUl: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    additionalInfoLi: {
      fontSize: "1rem",
      color: "#404040",
      marginBottom: "5px",
    },
  };
  const downloadPDF = () => {
    const resumeContent = document.getElementById("resume-content"); // This ID should be assigned to the wrapper div of your resume
    const options = {
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(resumeContent).set(options).save();
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.resumeContainer} id="resume-content">
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.headerH1}>{name}</h1>
          <h2 style={styles.headerH2}>{role}</h2>
          <p style={styles.headerP}>
            {contact.address} | {contact.email} |{" "}
            <a
              href={contact.linkedinLink}
              style={{ ...styles.headerP, textDecoration: "none" }}
            >
              {contact.linkedin}
            </a>
          </p>
        </div>

        {/* Summary Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>SUMMARY</h2>
          <p style={styles.sectionP}>{summary}</p>
        </div>

        {/* Technical Skills Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>TECHNICAL SKILLS</h2>
          <div style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <span key={index} style={styles.skillsGridSpan}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Professional Experience Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>
          {experiences.map((experience, index) => (
            <div key={index} style={styles.experience}>
              <h3 style={styles.experienceH3}>
                {experience.title} at {experience.company}{" "}
                <span>{experience.period}</span>
              </h3>
              <ul style={styles.experienceUl}>
                {experience.achievements.map((achievement, i) => (
                  <li key={i} style={styles.experienceUlLi}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} style={styles.experience}>
              <h3 style={styles.experienceH3}>
                {edu.degree} from {edu.school} <span>{edu.period}</span>
              </h3>
              <p style={styles.educationP}>{edu.details.join(", ")}</p>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ADDITIONAL INFORMATION</h2>
          <ul style={styles.additionalInfoUl}>
            <li style={styles.additionalInfoLi}>
              <b>Languages</b>: {additionalInfo.languages}
            </li>
            <li style={styles.additionalInfoLi}>
              <b>Certifications</b>: {additionalInfo.certifications}
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "15px", // Adjusted margin
          padding: "8px 16px", // Adjusted padding
          background: "#0073e6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Download Resume as PDF
      </button>
    </div>
  );
};

export default Template2;
