// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1KFervR81rJUUPPUuR37D-mMXtq4M1hs",
  authDomain: "chymera-b509c.firebaseapp.com",
  projectId: "chymera-b509c",
  storageBucket: "chymera-b509c.appspot.com",
  messagingSenderId: "389150751643",
  appId: "1:389150751643:web:605e7329ba9ac26b6abf3e",
  measurementId: "G-55GDBCFZ6L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);