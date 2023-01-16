// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXxk9vVfONy4lPiRuQn1g4l5kP-DZv7v0",
  authDomain: "insta-2-435fb.firebaseapp.com",
  projectId: "insta-2-435fb",
  storageBucket: "insta-2-435fb.appspot.com",
  messagingSenderId: "1077295981116",
  appId: "1:1077295981116:web:024bbe033311f4a9d41939",
  measurementId: "G-BPSBNQFM1H"
};

// Initialize Firebase
const app =!getApps().length? initializeApp(firebaseConfig):getApp();

const db=getFirestore()

const storage=getStorage()

export {app,db,storage} 