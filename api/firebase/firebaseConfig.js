// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey            : "AIzaSyAxGOFNiJcJHQx1jCCCA8V2go9u66Wwulw",
  authDomain        : "professional-portfolio-fcc10.firebaseapp.com",
  databaseURL       : "https://professional-portfolio-fcc10-default-rtdb.europe-west1.firebasedatabase.app",
  projectId         : "professional-portfolio-fcc10",
  storageBucket     : "professional-portfolio-fcc10.appspot.com",
  messagingSenderId : "380143095930",
  appId             : "1:380143095930:web:19f9f612954aa758ec6bc3",
  measurementId     : "G-FTV80C8V12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
