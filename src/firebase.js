// firebase.js

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3sN_rv6ERS2-rVBTKZRrpvtTFayMu80I",
    authDomain: "kito-vlog.firebaseapp.com",
    projectId: "kito-vlog",
    storageBucket: "kito-vlog.firebasestorage.app",
    messagingSenderId: "624959048355",
    appId: "1:624959048355:web:804f3e21c2eef0c6618d16"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app)
export { auth, provider};
