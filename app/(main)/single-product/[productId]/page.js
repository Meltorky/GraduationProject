"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./single-product.module.css";
import { getToken } from "/lib/auth";
import { useRouter } from "next/navigation";
import ProductReviews from "./productReviews"; // Adjust path as needed
import CartSidebar from "../../../Componantes/CartSidebar/CartSidebar"; // Adjust path as needed
import Image from "next/image";
import Link from "next/link";

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = getToken(); // or however you store your token

  // handle cart
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // review conts
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  // the claude code

  const [isSelected, setIsSelected] = useState(false);

  // const toggleSelection = () => {
  //   setIsSelected(!isSelected);
  // };

  // Extract nameId from token in cookies
  const [isInWishlist, setIsInWishlist] = useState(false);

  //////////////////////// Handle add to whishlist ////////////////////////////
  // Define the toggleSelection function properly as a function
  const toggleSelection = (productId) => {
    setIsSelected(!isSelected);

    // Your wishlist API call logic here
    const addToWishlist = async () => {
      const cartId = getCartId();
      const cartIdw = cartId + "w"; // Assuming you have a way to get the wishlist ID
      console.log("Adding to wish with ID:", cartIdw); //  Check this output

      try {
        const response = await fetch(
          `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Wishlist/add-to-wishlist?wishlistId=${cartIdw}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: productId }),
          }
        );

        // Optional: Show success message
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        // Optional: Show error message
        setIsSelected(false); // Revert UI state on error
      }
    };

    // Only call API if we're adding to wishlist (not removing)
    if (!isSelected) {
      addToWishlist();
    }
  };
  //////////////////////////////////////////////////////////////

  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState("250g");

  // Format date for reviews
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half-star">✩</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: "#ddd" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  // Handle quantity changes
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => count > 1 && setCount(count - 1);
  // the claude code

  const fetchProduct = async () => {
    try {
      console.log("Fetching product with ID:", productId); //  Check this output
      const res = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-product-by-id/${productId}`
      );

      const data = await res.json();
      console.log("Fetched product data:", data); //  Check this output

      if (data) {
        setProduct(data);
      } else {
        console.warn("No product data found");
        setProduct(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("productId from route:", productId);
    if (productId) {
      fetchProduct(); // ← this was missing!
    }
  }, [productId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!product) return <div className={styles.error}>Product not found.</div>;

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

  const hasPhotos = product.photos && product.photos.length > 0;
  const rawUrl = hasPhotos ? product.photos[0].imageURL : null;
  const photoUrl = hasPhotos
    ? fixGoogleDriveUrl(rawUrl)
    : "/images/defaultimage.png";

  // handle add review
  const handleSubmitReview = async () => {
    if (!token) router.push("/login"); // Redirect to the home page

    if (rating < 1 || rating > 5)
      return alert("Rating must be between 1 and 5");

    try {
      setSubmittingReview(true);

      const res = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/ProductReview/add-product-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.productID,
            rating: rating,
            reviewText: reviewText,
          }),
        }
      );
      window.location.reload(); // Reload the current page
      if (!res.ok) throw new Error("Failed to submit review");

      alert("Review submitted!");
      setReviewText("");
      setRating(5);
      // Optionally refetch product to show updated reviews
    } catch (err) {
      console.error("Error submitting review:", err);
      router.push("/login"); // Redirect to the home page
    } finally {
      setSubmittingReview(false);
    }
  };

  // handle car functions
  // Extract cartId from token
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
  // Add to cart function
  const addToCart = async () => {
    const cartId = getCartId();
    if (!cartId) {
      alert("You need to be logged in to add items to cart");
      return;
    }
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Cart/add-to-cart?cartId=${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            productId: parseInt(productId),
            quantity: count,
          }),
        }
      );

      if (response.ok) {
        // Open cart sidebar on successful add
        setIsCartOpen(true);
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // if (isLoading || !product) {
  //   return <div className={styles.loading}>Loading product...</div>;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.imageContainer}>
          <img
            src={photoUrl}
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/error.png";
            }}
          />
        </div>

        <div className={styles.productDetails}>
          <div className={styles.category}>
            {product.categoryName || "Category"}
          </div>
          <h1 className={styles.productName}>{product.name}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderStars(product.rating || 0)}
            </div>
            <div className={styles.reviewCount}>
              ({product.reviewCount || 0} reviews)
            </div>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>EGP {product.price}</span>
            <span className={styles.originalPrice}>
              EGP {(product.price * 1.1).toFixed(2)}
            </span>
            <span className={styles.discount}>10% Off</span>
          </div>

          <div
            style={{ marginTop: "-20px", marginBottom: "30px" }}
            className={styles.divider}
          ></div>

          {/* <div className={styles.sizeOptions}>
            <button
              className={`${styles.sizeOption} ${
                selectedSize === "250g" ? styles.active : ""
              }`}
              onClick={() => setSelectedSize("250g")}
            >
              250g
            </button>
            <button
              className={`${styles.sizeOption} ${
                selectedSize === "500g" ? styles.active : ""
              }`}
              onClick={() => setSelectedSize("500g")}
            >
              500g
            </button>
            <button
              className={`${styles.sizeOption} ${
                selectedSize === "1kg" ? styles.active : ""
              }`}
              onClick={() => setSelectedSize("1kg")}
            >
              1kg
            </button>
          </div> */}

          <div className={styles.quantitySelector}>
            <button className={styles.quantityButton} onClick={decrementCount}>
              -
            </button>
            <div className={styles.quantity}>{count}</div>
            <button className={styles.quantityButton} onClick={incrementCount}>
              +
            </button>
          </div>

          <div className={styles.actionButtons}>
            {/* Add to cart button */}
            <button className={styles.addToCartButton} onClick={addToCart}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1.66666L2.5 5.83332V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V5.83332L15 1.66666H5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 5.83334H17.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 9.16666C13.3333 10.0507 12.9821 10.8986 12.357 11.5237C11.7319 12.1488 10.884 12.5 10 12.5C9.11594 12.5 8.2681 12.1488 7.64298 11.5237C7.01786 10.8986 6.66666 10.0507 6.66666 9.16666"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add to cart
            </button>
            <button
              className={`${styles.wishlistButton} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => toggleSelection(product.productID)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3667 3.84166C16.9411 3.41583 16.4357 3.07803 15.8795 2.84757C15.3233 2.6171 14.7271 2.49847 14.1251 2.49847C13.523 2.49847 12.9268 2.6171 12.3706 2.84757C11.8144 3.07803 11.309 3.41583 10.8834 3.84166L10.0001 4.725L9.11676 3.84166C8.25707 2.98197 7.09064 2.49892 5.87509 2.49892C4.65954 2.49892 3.4931 2.98197 2.63342 3.84166C1.77373 4.70135 1.29069 5.86778 1.29069 7.08333C1.29069 8.29888 1.77373 9.46532 2.63342 10.325L3.51676 11.2083L10.0001 17.6917L16.4834 11.2083L17.3667 10.325C17.7926 9.89944 18.1304 9.39407 18.3608 8.83785C18.5913 8.28164 18.7099 7.68546 18.7099 7.08333C18.7099 6.48121 18.5913 5.88503 18.3608 5.32882C18.1304 4.7726 17.7926 4.26722 17.3667 3.84166Z"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* <button className={styles.compareButton}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66667 13.3333L3.33333 10L6.66667 6.66667"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 6.66667L16.6667 10L13.3333 13.3333"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 3.33333L8.33333 16.6667"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Product Code:</div>
            <div className={styles.infoValue}>{product.productID || "N/A"}</div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Availability:</div>
            <div className={styles.infoValue}>
              {product.stockQuantity > 0 ? "In Stock" : "In Stock"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontWeight: "bolder" }} className={styles.productInfo}>
        <h2>Description</h2>
        <p>{product.description || "No description available."}</p>

        <h2>Details</h2>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Brand:</div>
          <div className={styles.infoValue}>{product.brandName || "N/A"}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Category:</div>
          <div className={styles.infoValue}>
            {product.categoryName || "N/A"}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Subcategory:</div>
          <div className={styles.infoValue}>
            {product.subCategoryName || "N/A"}
          </div>
        </div>
      </div>

      <div className={styles.productReviews}>
        <ProductReviews />
        <h2>Leave a Review</h2>
        {/* {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerName}>
                  {review.customerName || "Anonymous"}
                </div>
                <div className={styles.reviewDate}>
                  {formatDate(review.reviewDate)}
                </div>
              </div>
              <div className={styles.reviewRating}>
                {renderStars(review.rating)}
              </div>
              <div className={styles.reviewText}>{review.reviewText}</div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )} */}
      </div>
      <div className={styles.reviewForm}>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className={styles.reviewInput}
        />
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={handleSubmitReview}
          disabled={submittingReview}
          className={styles.submitButton}
        >
          {submittingReview ? "Submitting..." : "Submit Review"}
        </button>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default SingleProductPage;
