// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSr5zJNX0iYWz13tHaiLvFj_CBSDc1wp8",
  authDomain: "addictionmanagement-52bf0.firebaseapp.com",
  databaseURL: "https://addictionmanagement-52bf0-default-rtdb.firebaseio.com",
  projectId: "addictionmanagement-52bf0",
  storageBucket: "addictionmanagement-52bf0.firebasestorage.app",
  messagingSenderId: "305694781024",
  appId: "1:305694781024:web:4e3b39bcaf15927e44dd05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
