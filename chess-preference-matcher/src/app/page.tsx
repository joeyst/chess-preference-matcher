'use client'
import Image from "next/image";
import styles from "./page.module.css";
import OpeningsComponent from "../components/OpeningsComponent"
import TimeControlsComponent from "../components/TimeControlsComponent"
import VariantsComponent from "../components/VariantsComponent"
import NavBarComponent from "../components/NavBarComponent"
import { UserSettingsContextProvider } from "../context/UserSettingsContext"

export default function Home() {
  return (
    <UserSettingsContextProvider>    
      <main className={styles.main}>
        <div className={styles.description}>
          <NavBarComponent />
          <div style={{ // Styling source: https://usamabhatti.hashnode.dev/react-center-a-component-horizontally-and-vertically 
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          <OpeningsComponent />
          <TimeControlsComponent />
          <VariantsComponent />
          </div>
        </div>
      </main>
    </UserSettingsContextProvider>
  );
}
