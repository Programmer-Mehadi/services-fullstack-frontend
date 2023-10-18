import styles from "./page.module.css";
import HomePage from "./_home/Home";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  );
}
