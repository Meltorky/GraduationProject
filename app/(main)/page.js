import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import "@/styles/globals.css"; // Makes variables globally accessible
import { Banner } from "../Componantes/banner/banner"; // Import the Banner component
import { Header } from "../Componantes/header/header"; // Import the Header component
import { PopularProducts } from "../Componantes/popularProducts/popularProducts"; // Import the Header component
import FeatureHighlights from "../Componantes/FeatureHighlights/FeatureHighlights";
import BannerButton from "../Componantes/BannerButton/BannerButton";

export default async function Home() {
  return (
    <div className={styles.container}>
      <Banner />
      <PopularProducts />
      <BannerButton href="/products">
        Super Value Deals - Save more with Smarket
      </BannerButton>
      <FeatureHighlights />
    </div>
  );
}

export function loader() {
  return getSlowPosts();
}
