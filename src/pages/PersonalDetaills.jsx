import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { useLocation } from "react-router-dom";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../../firebase";

const PersonalDetaills = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [formData, setFormData] = useState({});

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
      personalDetails: {
        firstName: formData.firstName || "",
        middleName: formData.middleName || "",
        lastName: formData.lastName || "",
        designation: formData.designation || "",
        email: formData.email || "",
        phone: formData.phone || "",
        address: {
          addressLine: formData.addressLine || "",
          country: formData.country || "",
          state: formData.state || "",
          city: formData.city || "",
          pincode: formData.pincode || "",
        },
        socialLinks: {
          gitHub: formData.gitHub || "",
          gitHubLink: formData.gitHubLink || "",
          linkedin: formData.linkedin || "",
          linkedinLink: formData.linkedinLink || "",
        },
      },
    };

    try {
      if (!userId) {
        throw new Error("User ID is required.");
      }

      const docRef = doc(collection(db, "Resumers"), userId);
      await updateDoc(docRef, data); // Save data to Firestore
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <>
      <main style={styles.main}>
        <h2 style={styles.heading}>Personal Details</h2>
        <div style={styles.cardContainer}>
          <div style={styles.lottieContainer}>
            <div id="lottie-animation" style={styles.animation}></div>
          </div>
          <div style={styles.formSection}>
            <form
              id="registrationForm"
              onSubmit={handleSubmit}
              style={styles.form}
            >
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="firstName" style={styles.label}>
                    First Name:
                  </label>
                  <label htmlFor="middleName" style={styles.label}>
                    Middle Name:
                  </label>
                  <label htmlFor="lastName" style={styles.label}>
                    Last Name:
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label htmlFor="designation" style={styles.label}>
                Current designation:
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                required
                style={styles.input}
                onChange={handleChange}
              />

              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={styles.input}
                onChange={handleChange}
              />
              <label htmlFor="phone" style={styles.label}>
                Phone Number:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                style={styles.input}
                onChange={handleChange}
              />
              <div style={styles.container}>
                <div style={styles.row}>
                  <label
                    htmlFor="gitHub"
                    style={{ ...styles.label, maxWidth: 200 }}
                  >
                    GitHub ID:
                  </label>
                  <label htmlFor="gitHubLink" style={styles.label}>
                    GitHub Link:
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="gitHub"
                    name="gitHub"
                    required
                    style={{ ...styles.input, maxWidth: 200 }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="gitHubLink"
                    name="gitHubLink"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.row}>
                  <label
                    htmlFor="linkedin"
                    style={{ ...styles.label, maxWidth: 200 }}
                  >
                    Linkedin ID:
                  </label>
                  <label htmlFor="linkedinLink" style={styles.label}>
                    Linkedin Link:
                  </label>
                </div>
                <div style={{ ...styles.row, marginBottom: 8 }}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    required
                    style={{ ...styles.input, maxWidth: 200 }}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="linkedinLink"
                    name="linkedinLink"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <h2 style={{ marginBottom: 4, fontSize: 22 }}>
                Residence Address
              </h2>
              <div style={styles.container}>
                <div style={styles.row}>
                  <label htmlFor="addressLine" style={styles.label}>
                    Address Line:
                  </label>
                  <label htmlFor="country" style={styles.label}>
                    Country:
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    type="text"
                    id="addressLine"
                    name="addressLine"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                </div>
                <div style={styles.row}>
                  <label htmlFor="state" style={styles.label}>
                    State:
                  </label>
                  <label htmlFor="city" style={styles.label}>
                    City/Sector:
                  </label>
                  <label htmlFor="pincode" style={styles.label}>
                    Pincode:
                  </label>
                </div>
                <div style={styles.row}>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="state"
                    name="state"
                    required
                    style={styles.input}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="city"
                    name="city"
                    required
                    style={styles.input}
                  />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    style={styles.input}
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
  lottieContainer: {
    flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  animation: {
    width: "100%",
    maxWidth: "400px",
    height: "500px",
    fontSize: "400px",
  },
};

export default PersonalDetaills;
