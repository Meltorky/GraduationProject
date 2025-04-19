// app/wishlist/[wishlistId]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./wishlist.module.css";
import { useParams } from "next/navigation";
import { getToken } from "@/lib/auth"; // Adjust the import path as necessary

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

export default function WishlistPage() {
  const { wishlistId } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchWishlist = async () => {
      const cartId = getCartId();
      const cartIdw = cartId + "w";
      console.log("cartId", cartIdw);
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Wishlist/get-wishlist-by-id/${cartIdw}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data); // Take the first wishlist from the array
        console.log("Fetched wishlist:", data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [wishlistId]);

  const removeFromWishlist = async (productId) => {
    const cartId = getCartId();
    const cartIdw = cartId + "w";
    console.log("cartId", cartIdw);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Wishlist/remove-item-from-wishlist?wishlistId=${cartIdw}&productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }

      // Update state after successful removal
      const updatedItems = wishlist.items.filter(
        (item) => item.productId !== productId
      );
      setWishlist({ ...wishlist, items: updatedItems });
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.wishlistContainer}>
        <h1>Wishlist</h1>
        <div className={styles.loading}>Loading your wishlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wishlistContainer}>
        <h1>Wishlist</h1>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  // Check if wishlist exists and has items
  const hasItems = wishlist && wishlist.items && wishlist.items.length > 0;

  return (
    <div className={styles.wishlistContainer}>
      <h1>My Wishlist</h1>

      {!hasItems ? (
        <div className={styles.emptyWishlist}>
          <p>Your wishlist is empty</p>
          <Link href="/products" className={styles.browseLink}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.items.map((item) => (
            <div key={item.productId} className={styles.wishlistItem}>
              <div className={styles.imageContainer}>
                {item.photo && (
                  <img
                    src={fixGoogleDriveUrl(item.photo) || "/images/error.png"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className={styles.productImage}
                  />
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{item.name}</h3>
                <p className={styles.price}>EGP {item.price}</p>
                <div className={styles.actions}>
                  <Link
                    href={`/single-product/${item.productId}`}
                    className={styles.viewButton}
                  >
                    View
                  </Link>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromWishlist(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
