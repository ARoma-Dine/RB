import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1DVWwj5PoJmRu2f0RgHOVN3X8YzH85Ag",
  authDomain: "finalstack-b6aea.firebaseapp.com",
  databaseURL: "https://finalstack-b6aea-default-rtdb.firebaseio.com",
  projectId: "finalstack-b6aea",
  storageBucket: "finalstack-b6aea.appspot.com",
  messagingSenderId: "975014453151",
  appId: "1:975014453151:web:ccf66bef9691b26e30a7aa",
  measurementId: "G-S4JTPQRBXB",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error.message);
    throw error;
  }
};

const saveUserDetails = async (user) => {
  try {
    const userRef = doc(db, "Resumers", user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    });
  } catch (error) {
    console.error("Error saving user details: ", error.message);
  }
};

export { signInWithGoogle, saveUserDetails };
export const storage = getStorage(app);

export { auth, db };
