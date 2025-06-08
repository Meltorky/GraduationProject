"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import "@/styles/globals.css"; // Makes variables globally accessible
import { Banner } from "../Componantes/banner/banner"; // Import the Banner component
import { Header } from "../Componantes/header/header"; // Import the Header component
import { PopularProducts } from "../Componantes/popularProducts/popularProducts"; // Import the Header component
import { RecommendationsPage } from "../Componantes/recommendedProducts/recommendedProducts"; // Import the Header component
import FeatureHighlights from "../Componantes/FeatureHighlights/FeatureHighlights";
import BannerButton from "../Componantes/BannerButton/BannerButton";

export default function Home() {
  const [showBanner, setShowBanner] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const handleResize = () => {
      setShowBanner(window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.container}>
      {showBanner && <Banner />}
      <RecommendationsPage />
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
