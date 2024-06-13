import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth"

// TODO: Fix firebaseConfig here. On Vercel end. 
const firebaseConfig = {
  apiKey: "abcdefgh",
  authDomain: "abcdefgh",
  projectId: "abcdefgh",
  storageBucket: "abcdefgh",
  messagingSenderId: "abcdefgh",
  appId: "abcdefgh"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

const googleSignIn = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
}

const logOut = () => {
  signOut(auth)
}

module.exports = {
  db,
  auth,
  googleSignIn,
  logOut
}