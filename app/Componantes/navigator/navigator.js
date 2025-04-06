import Link from "next/link";
import Image from "next/image";
import styles from "./navigator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

export const Navigator = () => {
return (
  <nav className={styles.navigation}>
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <span>USD $</span>
        <span>English</span>
      </div>
      <div className={styles.topBarRight}>
        <span>Support</span>
        <span>Delivery</span>
        <span>Warranty</span>
      </div>
    </div>

    <div className={styles.mainNav}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/images/freshCartLogo.png" alt="FreshCart Logo" />
        </Link>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for products" />
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.navIcons}>
        <div className={styles.notification}>
          <span className={styles.notificationBadge}>1</span>
          <img src="/notification-icon.png" alt="Notification" />
        </div>
        <Link href="/signup">
          <img src="/signup-icon.png" alt="Sign Up" />
        </Link>
        <Link href="/orders">
          <img src="/orders-icon.png" alt="My Orders" />
        </Link>
        <Link href="/cart">
          <img src="/cart-icon.png" alt="Shopping Cart" />
        </Link>
      </div>
    </div>

    <div className={styles.bottomNav}>
      <div className={styles.navLinks}>
        <Link href="/categories" className={styles.hamburger}>
          <FontAwesomeIcon icon={faBorderAll} />
          All Categories
        </Link>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/stores">Stores</Link>
        <Link href="/mega-menu">Mega menu</Link>
        <Link href="/pages">Pages</Link>
        <Link href="/account">Account</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/docs">Docs</Link>
      </div>
    </div>
  </nav>
);
};
