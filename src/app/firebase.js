import { getAuth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getFirestore, getDoc, setDoc, doc, collection } from "firebase/firestore"

// TODO: Fix firebaseConfig here. On Vercel end. 
//const firebaseConfig = require('../firebase_config.json')
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();
const userCollection = collection(db, 'users')

const { signOut, signInWithPopup, GoogleAuthProvider } = require('firebase/auth')

function signIn() {
  signInWithPopup(auth, new GoogleAuthProvider())
}

function getDocRef(collectionName, uid) {
  console.log(`getDocRef(${collectionName}, ${uid})`)
  return doc(db, collectionName, uid)
}

async function getDocData(collectionName, uid) {
  console.log(`getDocData(${collectionName}, ${uid})`)
  const docRef = doc(db, collectionName, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null 
  }
}

async function setDocData(collectionName, uid, data) {
  console.log(`setDocData(${collectionName}, ${uid})`)
  await setDoc(doc(db, collectionName, uid), data)
}

function onAuthStateChanged(...args) {
  return auth.onAuthStateChanged(...args)
}

module.exports = {
  signIn,
  signOut: () => signOut(auth),
  getDocData,
  setDocData,
  onAuthStateChanged,
  userCollection,
  User
}