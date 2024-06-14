'use client'

import { useState, useContext, useEffect } from "react"
import { update, get, uniqWith, isEqual } from "lodash"
const { UserSettingsContext } = require('../context/UserSettingsContext')

import ListItemText from "@material-ui/core/ListItemText"
import { UserSettings } from "../context/UserSettingsContext"
import MatchTableComponent from "./MatchTableComponent"
import { userCollection, getDocData } from "../app/firebase"
import { query, where, getDocs } from "firebase/firestore"

function getMatches(playerASettings, playerBSettings) {
  return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  return Object
    .keys(playerASettings)
    .map(key => playerASettings[key].filter(playerBSettings[key].includes))
    .map(intersection => intersection.length)
}

function MatchComponent(props: { otherUserSettings: UserSettings }) {
  const { otherUserSettings } = props 
  const { settings } = useContext(UserSettingsContext)
  const [matches, setMatches] = useState(getMatches(settings, otherUserSettings))

  useEffect(() => { setMatches(getMatches(settings, otherUserSettings))}, [settings])

  if (matches === null) {
    return <div></div>
  }
  return <MatchTableComponent matches={matches} />
}

function MatchComponents(props: { otherUserSettingsList: UserSettings[] }) {
  const { otherUserSettingsList } = props

  return <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    ></div>
}

async function findMatchesByAttribute(settings, attr) {
  console.log(`settings: ${JSON.stringify(settings)}  | attr: ${JSON.stringify(attr)}`);
  console.log(`userCollection:`, userCollection);
  console.log(`settings[attr]:`, settings[attr]);
  if (settings[attr].length === 0) {
    return []
  }
  return await Promise.all([0, 1].map(i => getDocData('users', i.toString())))
  // None of these and more work :( 
  // const q = query(userCollection, where(attr, 'array-contains-any', settings[attr]))
  // return await getDocs(userCollection)
  // return await getDocs(q)
  //   .then(snapshot => snapshot.docs.map(doc => doc.data())) // Ty Stack Overflow for showing how to access the query results: https://stackoverflow.com/questions/56828833/how-do-i-return-the-results-from-a-query-in-firestore 
}

async function findMatches(settings) {
  if (!settings) {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }
  return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  console.log(`SETTINGS KEYS: ${Object.keys(settings)}`)
  const results = await Promise.all(
    Object
      .keys(settings)
      // .filter(key => settings[key])
      .map(key => findMatchesByAttribute(settings, key))
  )
  return results
  return uniqWith(results.flat(), isEqual)
}

export default function MatchFinderComponent() {
  const { settings } = useContext(UserSettingsContext)
  // const [matches, setMatches] = useState()
  const matches = require('../data/users.json')

  useEffect(() => { 
    const fetchMatches = async () => { 
      console.log(`PASSING IN SETTINGS ${JSON.stringify(settings)}`)}
      // setMatches(require('../data/users.json')) }
      //setMatches(await findMatches(settings)) }
    fetchMatches()
  }, [settings])

  return <div><MatchComponents otherUserSettingsList={matches}/></div>
}