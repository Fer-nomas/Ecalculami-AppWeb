// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPlgRXy2Y6kwxsjF0-mkcM8xe-AY-4_5I",
  authDomain: "ecalculami-app.firebaseapp.com",
  projectId: "ecalculami-app",
  storageBucket: "ecalculami-app.appspot.com",
  messagingSenderId: "1021683053731",
  appId: "1:1021683053731:web:0fb8bbb8d7a46ffa0d3b16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
