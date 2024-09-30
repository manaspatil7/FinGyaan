// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ7u6EX9jvGxNiMpFHrTewDtUY7L7JyNY",
  authDomain: "codeissance2024.firebaseapp.com",
  projectId: "codeissance2024",
  storageBucket: "codeissance2024.appspot.com",
  messagingSenderId: "404858035295",
  appId: "1:404858035295:web:e7910f57b48ff6c45c0fea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore

// Export auth and db
export { auth, db };
