import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { getDoc, setDoc, doc } from "firebase/firestore"

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

function getDocRef(collectionName, uid) {
  return doc(db, collectionName, uid)
}

async function getDocData(collectionName, uid) {
  return (await getDoc(getDocRef(collectionName, uid)))?.data()
}

function setDocData(collectionName, uid, data) {
  setDoc(getDocRef(db, collectionName, uid), data)
}

function onAuthStateChanged(...args) {
  auth.onAuthStateChanged(...args)
}

module.exports = {
  db,
  auth,
  googleSignIn,
  logOut,
  getDocRef,
  getDocData,
  setDocData,
  onAuthStateChanged
}