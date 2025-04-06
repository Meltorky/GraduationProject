import Image from "next/image";
import styles from "../page.module.css";
import "@/styles/globals.css"; // Makes variables globally accessible
import { Banner } from "../Componantes/banner/banner"; // Import the Banner component

export default function Home() {
  return (
    <div className={styles.container}>
      <Banner />
    </div>
  );
}
