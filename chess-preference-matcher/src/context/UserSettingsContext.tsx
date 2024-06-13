'use client'
import { createContext, useState, ReactNode, useEffect } from "react"
import { getDocData, setDocData, onAuthStateChanged, User } from "../app/firebase"

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

  useEffect(() => onAuthStateChanged(setUser), [])
  useEffect(() => {if (user) setUserSettings(getDocData('users', user.uid))}, [user])
  useEffect(() => setDocData('users', user?.uid, userSettings), [userSettings])

  return (
    <UserSettingsContext.Provider value={{ user, userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

module.exports = {
  UserSettingsContextProvider,
  UserSettingsContext
}