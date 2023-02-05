// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZwZsDUtHTXBJYBmm5n1Obxm6jLWA4390",
  authDomain: "rentcar-e6d55.firebaseapp.com",
  projectId: "rentcar-e6d55",
  storageBucket: "rentcar-e6d55.appspot.com",
  messagingSenderId: "1061599003987",
  appId: "1:1061599003987:web:0b777355ef38df31f0cda6",
  measurementId: "G-TT7LC1NB8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);