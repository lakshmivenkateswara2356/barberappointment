// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7eiuVoSuwM2aeQ-PmPQepZPe75QTb-g8",
  authDomain: "barberappointment-86a42.firebaseapp.com",
  projectId: "barberappointment-86a42",
  storageBucket: "barberappointment-86a42.appspot.com",
  messagingSenderId: "570337059413",
  appId: "1:570337059413:web:21cd97bc77d977b540aadc"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);


