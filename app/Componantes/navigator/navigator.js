"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigator.module.css";
import CartSidebar from "../CartSidebar/CartSidebar.jsx"; // Import the cart sidebar component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "/Lib/auth"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const Navigator = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle cart sidebar
  const toggleCart = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsCartOpen((prevState) => !prevState);
  };

  const token = getToken();

  // if admin, disable the buttom
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        if (decoded.role === "Admin") {
          setIsAdmin(true);
          console.log("Admin role detected:", decoded.role);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    } else {
      console.log("No token found.");
    }
  }, []);

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
          <span>£ EGP</span>
          <Link href="/privacy">
            <span>Privacy</span>
          </Link>
        </div>
        <div className={styles.topBarRight}>
          <Link href="/contactus">
            <span>Contact Us</span>
          </Link>
          <Link href="/about">
            <span>About</span>
          </Link>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/freshCartLogo.png" alt="FreshCart Logo" />
          </Link>
        </div>
        <div className={styles.searchBar}>
          <input type="text" disabled placeholder="❤ Welcome to Smarket ❤" />
          <button className={styles.searchButton}>
            <Link href={"/products"}>Serach</Link>
          </button>
        </div>
        <div className={styles.navIcons}>
          <Link href={`/wishlist/${cartId}`} className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg><p>Like</p>
          </Link>
          <Link href="/profile" className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg><p style={{fontSize:"0.93rem"}}>Profile</p>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg> */}
          </Link>
          <Link href="/invoice" className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <rect x="3" y="8" width="18" height="14" rx="2" />
              <path d="M12 8V22" />
              <path d="M19 8V5a2 2 0 0 0-2-2h-2.5" />
              <path d="M5 8V5a2 2 0 0 1 2-2h2.5" />
              <path d="M12 5V2" />
            </svg>
            <p>Order</p>
          </Link>
          <a onClick={toggleCart} className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="10" y1="11" x2="14" y2="11" />
            </svg><p>Cart</p>
          </a>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navLinks}>
          <Link href="/products" className={styles.hamburger}>
            <FontAwesomeIcon
              icon={faListUl}
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            All Products
          </Link>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <a onClick={toggleCart}>Cart</a>
          <Link href="/dashboard" hidden={!isAdmin}>
            Dashboard
          </Link>
          <Link href="/profile">Profile</Link>
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};
