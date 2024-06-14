'use client'
import Image from "next/image";
import styles from "./page.module.css";
import OpeningsComponent from "../components/OpeningsComponent"
import TimeControlsComponent from "../components/TimeControlsComponent"
import VariantsComponent from "../components/VariantsComponent"
import NavBarComponent from "../components/NavBarComponent"
import { UserSettingsContextProvider } from "../context/UserSettingsContext"
import MatchFinderComponent from "../components/MatchesComponent"
import populateFirebase from "./populateFirebase"
import MatchTableComponent from "../components/MatchTableComponent"
import { Box } from '@mui/material'

populateFirebase()

export default function Home() {
  return (
    <UserSettingsContextProvider>    
      <main className={styles.main}>
        <div className={styles.description}>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <NavBarComponent />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <OpeningsComponent />
            <TimeControlsComponent />
            <VariantsComponent />
          </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <MatchTableComponent />
          </Box>
          </div>
        </div>
      </main>
    </UserSettingsContextProvider>
  );
}
