// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "bibliostore-79ac9-e0cc2.firebaseapp.com",
  databaseURL: "https://bibliostore-79ac9-e0cc2.firebaseio.com",
  projectId: "bibliostore-79ac9",
  storageBucket: "bibliostore-79ac9.appspot.com",
  messagingSenderId: "558627316273",
  appId: "1:558627316273:web:3057d5c9d5dcaf4aefab10",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
