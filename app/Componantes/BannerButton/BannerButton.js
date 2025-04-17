// components/BannerButton/EnhancedBannerButton.js
import Link from "next/link";
import styles from "./BannerButton.module.css";

export default function EnhancedBannerButton({ href, children }) {
  return (
    <div className={styles.bannerButtonContainer}>
      <button className={styles.bannerButton}>
        <Link href={href} className={styles.bannerLink}>
          {/* Tag/Sale icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          {children}
        </Link>
      </button>
    </div>
  );
}
