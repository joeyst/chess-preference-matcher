'use client'
import { createContext, useState, ReactNode, useEffect } from "react"
import { getDocData, setDocData, onAuthStateChanged, User } from "../app/firebase"
import { update, get } from "lodash"

type UserSettings = {
  openings: string[];
  timeControls: string[];
  variants: string[];
}

function getDefaultUserSettings() {
  return { openings: [], timeControls: [], variants: [] }
}

type UserMetadata = {
  user: User | null;
  settings: UserSettings | null;
  setSettingsByAttribute: Function;
  saveSettingsToDb: Function;
}

const UserSettingsContext = createContext<UserMetadata | undefined>(undefined)

function UserSettingsContextProvider({ children }: { children: ReactNode }) {
  /*
  If user is null, set context to default. Allows search functionality but not saving preferences. 
  If user is logged in and new, set their database entry to default. Load their database data to the context. Update program context only, unless user hits save preferences button. 
  If user is logged in and already exists, load their preferences from the database. Update program context only, unless user hits save preferences button. 
  */
  const [user, setUser] = useState<User | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)

  function setSettingsByAttribute(attr, data) {
    setSettings(update(settings, attr, (_) => data))
  }

  async function saveSettingsToDbByArgument(settings) {
    await setDocData('users', user.uid, settings)
  }

  async function saveSettingsToDb() {
    saveSettingsToDbByArgument(settings)
  }

  useEffect(() => onAuthStateChanged(setUser), [])
  
  useEffect(() => { setLocalSettingsToFirebase() }, [user])

  async function setLocalSettingsToFirebase() {
    console.log(`Got user ${user}`)
    // If user is null, setting local context and returning. 
    if (user === null) {
      setSettings(getDefaultUserSettings())
      return
    }

    // Getting user's entry from database. 
    const data = await getDocData('users', user.uid)
    console.log(`Got data ${JSON.stringify(data)}`)

    // If the user doesn't have settings stored already, save default settings + set locally. 
    if (!data) {
      setSettings(getDefaultUserSettings())
      await saveSettingsToDbByArgument(getDefaultUserSettings())
    }
    
    // If the user has settings stored already, save from database to local. 
    else {
      setSettings(data)
    }
  }

  return (
    <UserSettingsContext.Provider value={{ user, settings, setSettingsByAttribute, saveSettingsToDb }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

module.exports = {
  UserSettingsContextProvider,
  UserSettingsContext
}