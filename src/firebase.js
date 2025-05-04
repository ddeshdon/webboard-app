import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";      // Realtime DB (optional)
import { getAnalytics } from "firebase/analytics";    // Analytics (optional)

const firebaseConfig = {
  apiKey:            "AIzaSyCVAZRe_JFb33z-3L77AVMUurYIc_cy2Ls",
  authDomain:        "web-board-businessapp.firebaseapp.com",
  databaseURL:       "https://web-board-businessapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "web-board-businessapp",
  storageBucket:     "web-board-businessapp.appspot.com",
  messagingSenderId: "901385635515",
  appId:             "1:901385635515:web:0a0076257cafc1e549cb9e",
  measurementId:     "G-SPN4S67M5S",
};


// Initialize
const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const rtdb = getDatabase(app);     // remove if not using
getAnalytics(app);                        // remove if not using
