import Image from "next/image";
import styles from "../page.module.css";
import "@/styles/globals.css"; // Makes variables globally accessible
import { Banner } from "../Componantes/banner/banner"; // Import the Banner component
import { Header } from "../Componantes/header/header"; // Import the Header component
import { PopularProducts } from "../Componantes/popularProducts/popularProducts"; // Import the Header component

export default async function Home() {
  return (
    <div className={styles.container}>
      <Banner />
      <PopularProducts/>
    </div>
  );
}


export function loader() {
  return getSlowPosts();
}
