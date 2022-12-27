import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtgcPRatN9gCTni0RgLMLrmCFGYiLtIaU",
  authDomain: "track-expenses-359de.firebaseapp.com",
  projectId: "track-expenses-359de",
  storageBucket: "track-expenses-359de.appspot.com",
  messagingSenderId: "1030565075749",
  appId: "1:1030565075749:web:d0eff78f87e2e6443458cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
