'use client'
import Image from "next/image";
import styles from "./page.module.css";
import OpeningsComponent from "../components/OpeningsComponent"
import NavBarComponent from "../components/NavBarComponent"
import { UserSettingsContextProvider } from "../context/UserSettingsContext"
import { useEffect } from "react"

export default function Home() {

  useEffect(() => console.log(JSON.stringify(OpeningsComponent)), [])

  return (
    <UserSettingsContextProvider>    
      <main className={styles.main}>
        <div className={styles.description}>
          <NavBarComponent />
          <OpeningsComponent />
        </div>
      </main>
    </UserSettingsContextProvider>
  );
}
