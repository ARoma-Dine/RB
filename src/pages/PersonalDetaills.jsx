import React, { useEffect, useState } from "react";
import lottie from "lottie-web";

const PersonalDetaills = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Load Lottie animation
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/b35de59d-cccf-4dd3-b9d5-95b4b5001e1b/jSpX9Fd5pN.json",
    });

    // Cleanup animation when component unmounts
    return () => animation.destroy();
  }, []);

  const handlePasswordChange = () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpass").value;
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
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
              action="/route/user_reg"
              method="post"
              style={styles.form}
            >
              <label htmlFor="name" style={styles.label}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={styles.input}
              />

              <label htmlFor="phone" style={styles.label}>
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                style={styles.input}
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
              />

              <label htmlFor="dob" style={styles.label}>
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                style={styles.input}
              />

              <button type="submit" style={styles.button}>
                Next
              </button>
            </form>
          </div>

          {/* Lottie Animation Section */}
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
    maxWidth: "400px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#2c3e50",
    fontSize: "1.2em",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
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
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Default shadow
    transition: "all 0.3s ease", // Smooth transition for hover effect
  },
  buttonHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
  },
  errorMessage: {
    color: "red",
    fontSize: "1em",
    display: "block",
    textAlign: "center",
    marginBottom: "10px",
  },
  lottieContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  animation: {
    width: "100%",
    maxWidth: "400px",
    height: "500px",
    fontSize: "400px",
  },
};

export default PersonalDetaills;
