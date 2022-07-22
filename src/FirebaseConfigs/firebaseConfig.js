// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ilfpZBdM5QhKwxx9Vo61WVF8C4UmF2Y",
  authDomain: "ecommerce-72100.firebaseapp.com",
  projectId: "ecommerce-72100",
  storageBucket: "ecommerce-72100.appspot.com",
  messagingSenderId: "386852866844",
  appId: "1:386852866844:web:d991cd045ab2d195d888d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// 3 chezain firebase mai ja kar activate karin or import kara kar variable mai save kara kar export kar dia.

