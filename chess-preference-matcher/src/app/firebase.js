import { getAuth, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { getDoc, setDoc, doc } from "firebase/firestore"

// TODO: Fix firebaseConfig here. On Vercel end. 
const firebaseConfig = require('../firebase_config.json')

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

function signIn() {
  signInWithPopup(auth, new GoogleAuthProvider())
}

function getDocRef(collectionName, uid) {
  return doc(db, collectionName, uid)
}

async function getDocData(collectionName, uid) {
  return (await getDoc(getDocRef(collectionName, uid)))?.data()
}

function setDocData(collectionName, uid, data) {
  if (uid && data) {
    setDoc(getDocRef(db, collectionName, uid), data)
  }
}

function onAuthStateChanged(...args) {
  return auth.onAuthStateChanged(...args)
}

module.exports = {
  signIn,
  signOut,
  getDocRef,
  getDocData,
  setDocData,
  onAuthStateChanged,
  User
}