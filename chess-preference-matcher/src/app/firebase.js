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
  if (uid) {
    console.log(`uid: ${uid} | type(uid): ${typeof uid}`)
    return doc(db, collectionName, uid)
  }
}

async function getDocData(collectionName, uid) {
  if (uid) {
    console.log(JSON.stringify({uid}))
    return (await getDoc(getDocRef(collectionName, uid)))?.data()
  }
}

function setDocData(collectionName, uid, data) {
  if (uid && data) {
    console.log(JSON.stringify({collectionName, uid, data}))
    setDoc(doc(db, collectionName, uid), data)
  }
}

function onAuthStateChanged(...args) {
  return auth.onAuthStateChanged(...args)
}

module.exports = {
  signIn,
  signOut,
  getDocData,
  setDocData,
  onAuthStateChanged,
  User
}