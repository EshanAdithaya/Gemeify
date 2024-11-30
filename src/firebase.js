// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgyufFBpQ_Wo_JzB667rTB44Fm80UCG4E",
  authDomain: "i-chat-dd668.firebaseapp.com",
  projectId: "i-chat-dd668",
  storageBucket: "i-chat-dd668.appspot.com",
  messagingSenderId: "33761838371",
  appId: "1:33761838371:web:054622b8b69784db99f896",
  measurementId: "G-RFQM3ZF394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
