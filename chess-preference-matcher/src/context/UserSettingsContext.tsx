import { createContext, useState, ReactNode, useEffect } from "react"
import { auth } from "../app/firebase"
import { User } from "firebase/auth"

import { db } from "../app/firebase"
import { getDoc, setDoc, doc } from "firebase/firestore"

type UserSettings = {
  id: string;
  openings: string[];
  timeControls: string[];
  variants: string[];
}

type UserMetadata = {
  user: User | null;
  userSettings: UserSettings | null;
  saveUserSettings: Function;
}

const UserSettingsContext = createContext<UserMetadata | undefined>(undefined)

function UserSettingsContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

  function saveUserSettings(settings: UserSettings) {
    if (user != null) {
      setUserSettings({
        id: user.uid,
        ...settings
      })
    }
  }

  useEffect(() => {
    writeUserSettings(userSettings)
  }, [userSettings])

  useEffect(() => {
    return auth.onAuthStateChanged(findUser)
  }, [])

  async function findUser(user: User | null) {
    setUser(user)

    if (user !== null) {
      const settings = await findUserSettings(user.uid)
      setUserSettings(settings)
    } else {
      setUserSettings(null)
    }
  }

  return (
    <UserSettingsContext.Provider value={{ user, userSettings, saveUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

async function findUserSettings(uid: string) {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    const data = docSnap.data()
    return { id: docSnap.id, ...data }
  } else {
    return null
  }
}

function writeUserSettings(userSettings: UserSettings | null | undefined) {
  if (userSettings != null) {
    setDoc(doc(db, "users", userSettings.id), userSettings)
  }
}

module.exports = {
  UserSettingsContextProvider,
  UserSettingsContext
}