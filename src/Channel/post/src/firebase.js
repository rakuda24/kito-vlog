// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3sN_rv6ERS2-rVBTKZRrpvtTFayMu80I",
  authDomain: "kito-vlog.firebaseapp.com",
  projectId: "kito-vlog",
  storageBucket: "kito-vlog.firebasestorage.app",
  messagingSenderId: "624959048355",
  appId: "1:624959048355:web:804f3e21c2eef0c6618d16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;