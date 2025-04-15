// CartToggleButton.jsx
import { useState, useEffect } from "react";
import styles from "./cartToggleButton.module.css";
import CartSidebar from "../CartSidebar/CartSidebar";

const CartToggleButton = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const getCartId = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.nameid;
    } catch (error) {
      console.error("Error extracting cartId from token:", error);
      return null;
    }
  };

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      const cartId = getCartId();
      if (!cartId) return;

      try {
        const response = await fetch(
          `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/get-cart?cartId=${cartId}`
        );
        if (response.ok) {
          const data = await response.json();
          // Calculate total number of items
          const count =
            data.items?.reduce((total, item) => total + item.quantity, 0) || 0;
          setItemCount(count);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();

    // Set up interval to periodically refresh cart count
    const intervalId = setInterval(fetchCartCount, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <button className={styles.cartButton} onClick={() => setIsCartOpen(true)}>
        <svg
          className={styles.cartIcon}
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
      </button>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartToggleButton;
