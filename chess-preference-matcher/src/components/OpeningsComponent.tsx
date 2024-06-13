'use client'

import { useContext } from "react"
const { UserSettingsContext } = require('../context/UserSettingsContext')
import MultipleSelectComponent from './MultipleSelectComponent'

export default function OpeningsComponent() {
  const openingList = require('../data/openings.json')
  const { userSettings, setUserSettings } = useContext(UserSettingsContext)
  const saveToDb = (settings) => {
    setUserSettings(Object.assign(userSettings, { 'openings': settings }))
  }

  return <MultipleSelectComponent optionList={openingList} selectList={userSettings?.openings} saveToDb={saveToDb} />
}
