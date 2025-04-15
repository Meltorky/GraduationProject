import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./single-product.module.css";
import { getToken } from "/lib/auth";

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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

const ProductReviews = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // decode JWT token to get user info
  function decodeToken(token) {
    if (!token) return null;
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  }
  // consts will use them to delete review
  const token = getToken();
  const decoded = decodeToken(token);
  const currentUserId = decoded?.nameid;

  // Function to handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/ProductReview/delete-product-review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        window.location.reload(); // Reload the current page
      } else {
        console.error("Failed to delete review");
      }
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  // Fetch reviews directly from the API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/ProductReview/get-product-review/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Handle loading state
  if (loading) {
    return <div className={styles.loadingReviews}>Loading reviews...</div>;
  }

  // Handle error state
  if (error) {
    return <div className={styles.reviewError}>{error}</div>;
  }

  // Render reviews
  return (
    <div className={styles.reviewsSection}>
      <h2 style={{ marginLeft: "-1px" }}>Customer Reviews</h2>

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.reviewId} className={styles.review}>
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
            {/* Show delete if user owns this review */}
            {review.customerId === currentUserId && (
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteReview(review.reviewId)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ProductReviews;
