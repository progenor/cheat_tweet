// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cheat-tweet.firebaseapp.com",
  projectId: "cheat-tweet",
  storageBucket: "cheat-tweet.appspot.com",
  messagingSenderId: "903590777886",
  appId: "1:903590777886:web:788fc2771ac1e2b4240a0f",
  measurementId: "G-VWPC20Y8KP",
};

// Initialize Firebase
const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, storage, app };

const analytics = getAnalytics(app);
