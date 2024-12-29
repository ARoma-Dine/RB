import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { signInWithGoogle, saveUserDetails } from "./../../firebase"; // Import from your firebase.js file
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("lottie-animation"), // Animation container
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/e9b8d251-fe13-4202-9004-ae516f6b855e/dRCwt4lR2W.json", // Animation JSON URL
    });
  }, []);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const user = await signInWithGoogle();

      // Check if the user exists in the Firestore database
      const userDocRef = doc(db, "users", user.uid); // Get reference to the user's document in Firestore
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // User exists, alert and navigate to personal details page
        alert("User exists");
        navigate("/personal-details", { state: { userId: user.uid } });
      } else {
        // User doesn't exist, create new user document
        await saveUserDetails(user);

        // After saving user details, navigate to the personal details page
        navigate("/personal-details", { state: { userId: user.uid } });
      }
    } catch (err) {
      console.error("Google Login error:", err);
      alert("Failed to login with Google. Please try again.");
    }
  };

  return (
    <>
      {/* Main Content */}
      <main style={styles.main}>
        <h2 style={styles.heading}>Login</h2>
        <div style={styles.cardContainer}>
          {/* Form Section */}
          <div style={styles.formSection}>
            <form action="/route/login" method="post" style={styles.form}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={styles.input}
              />
              <label htmlFor="password" style={styles.label}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                style={styles.input}
              />
              <button
                type="submit"
                style={{
                  ...styles.button,
                  ...(isHovered ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setIsHovered(true)} // Trigger hover state
                onMouseLeave={() => setIsHovered(false)} // Reset on mouse leave
              >
                Login
              </button>
              <button
                type="button"
                style={styles.googleButton}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    styles.googleButtonHover.boxShadow)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    styles.googleButton.boxShadow)
                }
                onClick={handleGoogleLogin}
              >
                <img
                  src="/search.png"
                  alt="Google Icon"
                  style={styles.googleIcon}
                />
                Continue with Google
              </button>
            </form>
          </div>

          {/* Animation Section */}
          <div style={styles.lottieContainer}>
            <div id="lottie-animation" style={styles.animation}></div>
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
  googleIcon: {
    width: "20px",
    height: "20px",
  },

  cardContainer: {
    display: "flex",
    width: "80%",
    maxWidth: "1200px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    overflow: "hidden",
    height: "fit-content",
    padding: "0",
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
    marginBottom: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Default shadow
    transition: "all 0.3s ease", // Smooth transition for hover effect
  },
  buttonHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
  },
  googleButton: {
    backgroundColor: "white",
    color: "#2c3e50",
    padding: "12px",
    border: "1px solid #2c3e50",
    borderRadius: "5px",
    fontSize: "1.2em",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease-in-out",
  },
  googleButtonHover: {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
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
  },
};

export default Login;
