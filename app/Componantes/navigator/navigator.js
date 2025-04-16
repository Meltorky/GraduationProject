"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigator.module.css";
import { useState } from "react";
import CartSidebar from "../CartSidebar/CartSidebar.jsx"; // Import the cart sidebar component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "/Lib/auth"; // Adjust the import path as necessary

export const Navigator = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle cart sidebar
  const toggleCart = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsCartOpen((prevState) => !prevState);
  };

  const token = getToken();

  const getCartId = () => {
    if (!token) return null;

    try {
      // Assuming token is JWT, extract nameid from payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.nameid;
    } catch (error) {
      console.error("Error extracting cartId from token:", error);
      return null;
    }
  };
  const cartId = getCartId();

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
          <Link href={`/wishlist/${cartId}`} className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                width: "30px",
                height: "30px",
                color: "var(--gray)",
              }}
            />
          </Link>
          <Link href="/profile" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{
                width: "30px",
                height: "30px",
                color: "var(--gray)",
              }}
            />
          </Link>
          <Link href="/invoice" className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faBox}
              style={{
                width: "30px",
                height: "30px",
                color: "var(--gray)",
              }}
            />{" "}
          </Link>
          <a href="#" onClick={toggleCart} className={styles.iconHover}>
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{
                width: "30px",
                height: "30px",
                color: "var(--gray)",
              }}
            />{" "}
          </a>
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
          <a href="#" onClick={toggleCart}>
            Cart
          </a>
          <Link href="/pages">Pages</Link>
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          {/* Cart Sidebar component */}
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};
