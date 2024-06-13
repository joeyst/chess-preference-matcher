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
          <OpeningsComponent />
          <TimeControlsComponent />
          <VariantsComponent />
        </div>
      </main>
    </UserSettingsContextProvider>
  );
}
