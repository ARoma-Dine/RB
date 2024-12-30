import React, { useEffect, useState } from "react";
import "./Template1.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Template1 = () => {
  const [resumeData, setResumeData] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    // Fetch the resume data from Firebase
    const fetchResumeData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "Resumers", userId); // Update with your Firebase path
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setResumeData(docSnap.data());
      }
    };

    fetchResumeData();
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="resume-container">
      <div className="resume">
        <div className="left-column">
          <img
            src={resumeData.socialLinks?.photoURL || "default-photo-url"} // Use optional chaining
            alt="Profile"
            className="profile-img"
          />
          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="section-title">CONTACT</h2>
            <div>{resumeData.personalDetails?.phone}</div>
            <div>{resumeData.personalDetails?.email}</div>
            <div>{resumeData.personalDetails?.address?.addressLine}</div>
            <div>{resumeData.socialLinks?.linkedinLink}</div>
          </div>
          <div className="education-section">
            <h2 className="section-title">EDUCATION</h2>
            <div className="education-item">
              <div>
                {resumeData.academicDetails?.SSC?.startYear} -{" "}
                {resumeData.academicDetails?.SSC?.endYear}
              </div>
              <div>{resumeData.academicDetails?.SSC?.institutionName}</div>
              <ul>
                <li>Math: {resumeData.academicDetails?.SSC?.mathScore}</li>
                <li>
                  Physics: {resumeData.academicDetails?.SSC?.physicsScore}
                </li>
                <li>
                  Chemistry: {resumeData.academicDetails?.SSC?.chemistryScore}
                </li>
              </ul>
            </div>
            {/* Other education items */}
          </div>

          {/* Other sections */}
        </div>

        <div className="right-column">
          <h1 className="name">
            {resumeData.personalDetails?.firstName}{" "}
            <span className="highlighted-name">
              {resumeData.personalDetails?.lastName}
            </span>
          </h1>
          <div className="job-title">
            {resumeData.personalDetails?.designation}
          </div>

          <div className="profile-section">
            <h2 className="right-section-title">PROFILE</h2>
            <p className="profile-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud exercitation.
            </p>
          </div>

          {/* Work Experience Section */}
          <div className="work-experience-section">
            <h2 className="right-section-title">WORK EXPERIENCE</h2>
            {resumeData.internships?.map((internship, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <div className="company-name">{internship.company}</div>
                  <div className="date">
                    {internship.startDate} - {internship.endDate}
                  </div>
                </div>
                <div className="job-position">{internship.title}</div>
                <ul className="responsibilities">
                  <li>{internship.description}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Reference Section */}
          <div className="reference-section">
            <h2 className="right-section-title">REFERENCE</h2>
            <div className="reference-grid">
              {resumeData.certifications?.map((certification, index) => (
                <div key={index} className="reference-item">
                  <div className="reference-name">{certification.name}</div>
                  <div className="reference-position">
                    {certification.organization}
                  </div>
                  <div className="reference-contact">
                    <div>Email: {certification.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
