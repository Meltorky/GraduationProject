// CartSidebar.jsx
import { useState, useEffect } from "react";
import styles from "./CartSidebar.module.css";
import { getToken } from "@/lib/auth";

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  // handle images
  const fixGoogleDriveUrl = (url) => {
    if (url.includes("drive.google.com") && url.includes("open?id=")) {
      const parts = url.split("id=");
      if (parts.length > 1) {
        const fileId = parts[1].split("&")[0];
        const googleDriveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        return `/api/imageproxy?url=${encodeURIComponent(googleDriveUrl)}`;
      }
    }
    return url;
  };

  // Extract cartId from token in cookies
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

  // Fetch cart items when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    setIsLoading(true);
    const cartId = getCartId();

    if (!cartId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/get-cart-by-id/${cartId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  //   const updateQuantity = async (productId, newQuantity) => {
  //     if (newQuantity < 1) return;

  //     const cartId = getCartId();
  //     if (!cartId) return;

  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/update-quantity?cartId=${cartId}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             productId,
  //             quantity: newQuantity,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         // Update local state
  //         setCartItems((prevItems) =>
  //           prevItems.map((item) =>
  //             item.productId === productId
  //               ? { ...item, quantity: newQuantity }
  //               : item
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error updating quantity:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // Remove item from cart
  //   const removeItem = async (productId) => {
  //     const cartId = getCartId();
  //     if (!cartId) return;

  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/remove-item?cartId=${cartId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             productId,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         // Remove item from local state
  //         setCartItems((prevItems) =>
  //           prevItems.filter((item) => item.productId !== productId)
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error removing item:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // Update item quantity using query parameters
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const cartId = getCartId();

    if (!cartId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/update-quantity?cartId=${cartId}&productId=${productId}&quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // No body needed as all parameters are in the query
        }
      );

      if (response.ok) {
        // Update local state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart using query parameters
  const removeItem = async (productId) => {
    const cartId = getCartId();
    if (!cartId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/remove-item?cartId=${cartId}&productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // No body needed as all parameters are in the query
        }
      );

      if (response.ok) {
        // Remove item from local state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.cartHeader}>
        <h2>Your Cart</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <div className={styles.cartContent}>
        {isLoading ? (
          <div className={styles.loading}>Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className={styles.cartItems}>
              {cartItems.map((item) => (
                <li key={item.productId} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img
                      src={fixGoogleDriveUrl(item.photo) || "/images/error.png"}
                      alt={item.name}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      EGP {item.price.toFixed(2)}
                    </p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.productId)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>EGP {cartTotal.toFixed(2)}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => {
                  const cartId = getCartId();
                  if (cartId) {
                    // Navigate to the create-order page with cartId and total as query parameters
                    window.location.href = `/create-order?cartId=${cartId}&total=${cartTotal.toFixed(
                      2
                    )}`;
                  } else {
                    alert("You need to be logged in to checkout");
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
