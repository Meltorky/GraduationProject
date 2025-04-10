import Link from "next/link";
import Image from "next/image";
import styles from "./navigator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";

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
          <Link href="/notifications" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faBell}
              style={{
                width: "25px",
                height: "25px",
                color: "var(--gray)",
              }}
            />
          </Link>
          <Link href="/signup" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{
                width: "25px",
                height: "25px",
                color: "var(--gray)",
              }}
            />
          </Link>
          <Link href="/orders" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faBox}
              style={{
                width: "25px",
                height: "25px",
                color: "var(--gray)",
              }}
            />{" "}
          </Link>
          <Link href="/cart" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{
                width: "25px",
                height: "25px",
                color: "var(--gray)",
              }}
            />{" "}
          </Link>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navLinks}>
          <Link href="/categories" className={styles.hamburger}>
            <FontAwesomeIcon
              icon={faListUl}
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            All Categories
          </Link>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/pages">Pages</Link>
          <Link href="/account">Account</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};
