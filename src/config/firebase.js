/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth}from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbB1PQP0nBf_behEd00AIQAnHSC364jN8",
  authDomain: "appsportss-d3ec9.firebaseapp.com",
  projectId: "appsportss-d3ec9",
  storageBucket: "appsportss-d3ec9.appspot.com",
  messagingSenderId: "644699776290",
  appId: "1:644699776290:web:45f55f2d6e695b880fb17b",
  measurementId: "G-H33NTFFJYJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
const db = getFirestore(app);
export { db };