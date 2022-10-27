// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtp0k0T1gt4XjGhs6zCRTk6yg_6wM-3zs",
  authDomain: "todo-firebase-app-993f6.firebaseapp.com",
  projectId: "todo-firebase-app-993f6",
  storageBucket: "todo-firebase-app-993f6.appspot.com",
  messagingSenderId: "231502337177",
  appId: "1:231502337177:web:ae3445279bad901ae71408",
  measurementId: "G-6GL2LDXDF7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const db = getDatabase();

export function writeFirebaseData(userId, path, data) {
  set(ref(db, `${path}/` + userId), data);
}
