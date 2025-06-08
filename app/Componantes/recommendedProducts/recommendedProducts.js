"use client";

import { useState, useEffect } from "react";
import styles from "./recommendedProducts.module.css"; // Add your CSS import
import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

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

export const RecommendationsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getToken(); // or however you store your token

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("#######################################");

      // Get user_id from cookie
      const token = getToken("unique_name");
      const decoded = jwtDecode(token);
      const userId = decoded.unique_name;

      console.log("User ID from cookie:", userId);
      if (!userId) {
        throw new Error("User ID not found in cookies");
      }

      // Step 1: Get recommendation IDs
      const recommendationUrl = `https://mohamed-essam0-recommendation-engine-api.hf.space/recommend?user_id=${userId}&top_n=12`;

      const recommendationResponse = await fetch(recommendationUrl);

      if (!recommendationResponse.ok) {
        throw new Error(
          `Recommendation API failed: ${recommendationResponse.status}`
        );
      }

      const productIds = await recommendationResponse.json();

      // Step 2: Get product details using the IDs
      const productsUrl =
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-recommended-products";

      const productsResponse = await fetch(productsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productIds),
      });

      if (!productsResponse.ok) {
        // throw new Error(`Products API failed: ${productsResponse.status}`);
        console.log(`Products API failed: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      setProducts(productsData);
    } catch (err) {
      console.error("API Error:", err);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //   // Helper function to get cookie value
  //   const getCookie = (name) => {
  //     if (typeof document === "undefined") return null;

  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(";").shift();
  //     return null;
  //   };

  // Auto-fetch on component mount (optional)
  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Helper function to fix Google Drive URLs
  // const fixGoogleDriveUrl = (url) => {
  //   if (!url) return "/images/error.png";

  //   // Check if it's a Google Drive URL and convert it to direct link
  //   if (url.includes("drive.google.com")) {
  //     const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  //     if (fileId) {
  //       return `https://drive.google.com/uc?export=view&id=${fileId}`;
  //     }
  //   }
  //   return url;
  // };

  if (loading) {
    return <div className={styles.loading}>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.productsGrid}>
  //       {products.length > 0 ? (
  //         products.map((product, index) => {
  //           const hasPhotos = product.photos && product.photos.length > 0;
  //           const rawUrl = hasPhotos ? product.photos[0].imageURL : null;
  //           const photoUrl = hasPhotos
  //             ? fixGoogleDriveUrl(rawUrl)
  //             : "/images/error.png";

  //           return (
  //             <div>
  //               <h1
  //                 style={{
  //                   fontWeight: "bolder",
  //                   fontSize: "2rem",
  //                   color: "var(--primary)",
  //                 }}
  //               >
  //                 Recommended Products For You
  //               </h1>
  //               <div key={index} className={styles.productCard}>
  //                 <img
  //                   src={photoUrl}
  //                   alt={product.name}
  //                   className={styles.productImage}
  //                   onError={(e) => {
  //                     e.target.onerror = null;
  //                     e.target.src = "/images/error.png";
  //                   }}
  //                 />
  //                 <div className={styles.category}>
  //                   {product.categoryName}
  //                   {product.subCategoryName && ` • ${product.subCategoryName}`}
  //                 </div>
  //                 <h3 className={styles.name}>
  //                   {product.name.length > 50
  //                     ? product.name.substring(0, 20) + "..."
  //                     : product.name}
  //                 </h3>
  //                 <div className={styles.rating}>
  //                   {product.rating === null
  //                     ? "no rating yet "
  //                     : product.rating}
  //                   <span className={styles.star}>★</span>
  //                 </div>
  //                 <div>
  //                   <span className={styles.sold}>
  //                     {Math.abs(product.stockQuantity)} sold
  //                   </span>
  //                 </div>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     justifyContent: "space-between",
  //                     alignContent: "center",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <button
  //                     className={styles.addButtom}
  //                     onClick={() => {
  //                       window.open(
  //                         `/single-product/${product.productID}`,
  //                         "_blank"
  //                       );
  //                     }}
  //                   >
  //                     Buy
  //                   </button>
  //                   <p className={styles.price}>EGP {product.price}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })
  //       ) : (
  //         <div className={styles.empty}>No products found</div>
  //       )}
  //     </div>
  //   </div>
  // );
  if (products.length > 0) {
    return (
      <div className={styles.container}>
        <h1
          style={{
            fontWeight: "bolder",
            fontSize: "2rem",
            color: "var(--primary)",
          }}
        >
          Recommended Products
        </h1>
        <div className={styles.productsGrid}>
          {products.map((product, index) => {
            const hasPhotos = product.photos && product.photos.length > 0;
            const rawUrl = hasPhotos ? product.photos[0].imageURL : null;
            const photoUrl = hasPhotos
              ? fixGoogleDriveUrl(rawUrl)
              : "/images/error.png";

            return (
              <div key={index}>
                <div className={styles.productCard}>
                  <img
                    src={photoUrl}
                    alt={product.name}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/error.png";
                    }}
                  />
                  <div className={styles.category}>
                    {product.categoryName}
                    {product.subCategoryName && ` • ${product.subCategoryName}`}
                  </div>
                  <h3 className={styles.name}>
                    {product.name.length > 50
                      ? product.name.substring(0, 20) + "..."
                      : product.name}
                  </h3>
                  <div className={styles.rating}>
                    {product.rating === null
                      ? "no rating yet "
                      : product.rating}
                    <span className={styles.star}>★</span>
                  </div>
                  <div>
                    <span className={styles.sold}>
                      {Math.abs(product.stockQuantity)} sold
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className={styles.addButtom}
                      onClick={() => {
                        window.open(
                          `/single-product/${product.productID}`,
                          "_blank"
                        );
                      }}
                    >
                      Buy
                    </button>
                    <p className={styles.price}>EGP {product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null; // or return <div></div> if you prefer an empty div
};
