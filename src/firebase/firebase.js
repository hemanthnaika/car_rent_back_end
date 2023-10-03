// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore} from "firebase/firestore"; 
import { getStorage} from "firebase/storage";






const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "car-rent-1302d.firebaseapp.com",
  projectId: "car-rent-1302d",
  storageBucket: "car-rent-1302d.appspot.com",
  messagingSenderId: "449928863810",
  appId: "1:449928863810:web:f489ec64c24ed2a55a4ddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app);