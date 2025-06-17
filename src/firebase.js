import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace the config below with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDgtKP3T4nC_cBRo7JSVc08PdoAJ2lu_v0",
  authDomain: "school-website-aac31.firebaseapp.com",
  projectId: "school-website-aac31",
  storageBucket: "school-website-aac31.appspot.com", // fixed typo: was 'firebasestorage.app'
  messagingSenderId: "710096936742",
  appId: "1:710096936742:web:66959f5ee6e37a77682be7",
  measurementId: "G-57BP2B4QVR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
