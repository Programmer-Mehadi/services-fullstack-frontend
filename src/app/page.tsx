import styles from "./page.module.css"
import HomePage from "./_home/Home"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - EleganceInteriors",
}

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  )
}
