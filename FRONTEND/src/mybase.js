import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCrDuTxYp_kt-k71cHECGSXokW5ngWhvYw",
   authDomain: "kw-yon.firebaseapp.com",
   projectId: "kw-yon",
   storageBucket: "kw-yon.appspot.com",
   messagingSenderId: "865484003110",
   appId: "1:865484003110:web:ea4f5b9947c16ac68ad3e7",
   measurementId: "G-HYVKLB3M6Q"
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export default firebase;