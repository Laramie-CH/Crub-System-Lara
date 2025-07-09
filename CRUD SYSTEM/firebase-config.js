// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxAvQtiW8yIN3B75z8iAs7EIme4GrF4AM",
  authDomain: "fir-projects-c8009.firebaseapp.com",
  projectId: "fir-projects-c8009",
  storageBucket: "fir-projects-c8009.firebasestorage.app",
  messagingSenderId: "735284825938",
  appId: "1:735284825938:web:b1b91ab0c8d1209da7748b",
  measurementId: "G-3FNM5GPW76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };