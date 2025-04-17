// "use client";
// import { useState, useEffect } from "react";
// import styles from "./popularProducts.module.css";

// export const PopularProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50");
//         const { data } = await response.json();
//         setProducts(data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setProducts([]);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1>Popular Products</h1>
//       <div className={styles.productsGrid}>
//         {products.map((product, index) => (
//           <div key={index} className={styles.productItem}>
//             <h3>{product.name}</h3>
//             <p>Price: {product.price} EGP</p>
//             {product.photos?.[0]?.imageURL && (
//               <img
//                 src={product.photos[0].imageURL} // Use the imageURL directly
//                 alt={product.name}
//                 className={styles.productImage}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// "use client";
// import { useState, useEffect } from "react";
// import styles from "./popularProducts.module.css";

// const fixGoogleDriveUrl = (url) => {
//   if (url.includes("drive.google.com") && url.includes("open?id=")) {
//     const parts = url.split("id=");
//     if (parts.length > 1) {
//       const fileId = parts[1].split("&")[0]; // Handle any additional parameters
//       return `https://drive.google.com/uc?export=view&id=${fileId}`;
//     }
//   }
//   return url;
// };

// export const PopularProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50"
//         );
//         const data = await response.json();
//         console.log("API response:", data); // Debugging log
//         setProducts(data.data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <div className={styles.loading}>Loading products...</div>;

//   return (
//     <div className={styles.container}>
//       <h1>Popular Products</h1>

//       <div className={styles.productsGrid}>
//         {products.length > 0 ? (
//           products.map((product, index) => (
//             <div key={index} className={styles.productCard}>
//               {product.photos?.[0]?.imageURL && (
//                 <img
//                   src={fixGoogleDriveUrl(product.photos[0].imageURL)}
//                   alt={product.name}
//                   className={styles.productImage}
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//               )}
//               <h3>{product.name}</h3>
//               <p className={styles.price}>{product.price} EGP</p>
//               <div className={styles.category}>
//                 {product.categoryName}
//                 {product.subCategoryName && ` • ${product.subCategoryName}`}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className={styles.empty}>No products found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// "use client";
// import { useState, useEffect } from "react";
// import styles from "./popularProducts.module.css";

// const fixGoogleDriveUrl = (url) => {
//   if (url.includes("drive.google.com") && url.includes("open?id=")) {
//     const parts = url.split("id=");
//     if (parts.length > 1) {
//       const fileId = parts[1].split("&")[0];
//       return `https://drive.google.com/uc?export=view&id=${fileId}`;
//     }
//   }
//   return url;
// };

// export const PopularProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50"
//         );
//         const data = await response.json();
//         console.log("API response:", data);
//         setProducts(data.data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <div className={styles.loading}>Loading products...</div>;

//   return (
//     <div className={styles.container}>
//       <h1>Popular Products</h1>

//       <div className={styles.productsGrid}>
//         {products.length > 0 ? (
//           products.map((product, index) => {
//             const hasPhotos = product.photos && product.photos.length > 0;
//             const photoUrl = hasPhotos
//               ? fixGoogleDriveUrl(product.photos[0].imageURL)
//               : "/images/error.png";

//             return (
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
//                 <h3>{product.name}</h3>
//                 <p className={styles.price}>{product.price} EGP</p>
//                 <div className={styles.category}>
//                   {product.categoryName}
//                   {product.subCategoryName && ` • ${product.subCategoryName}`}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className={styles.empty}>No products found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// "use client";
// import { useState, useEffect } from "react";
// import styles from "./popularProducts.module.css";

// const fixGoogleDriveUrl = (url) => {
//   if (url.includes("drive.google.com") && url.includes("open?id=")) {
//     const parts = url.split("id=");
//     if (parts.length > 1) {
//       const fileId = parts[1].split("&")[0];
//       return `https://drive.google.com/uc?export=view&id=${fileId}`;
//     }
//   }
//   return url;
// };

// export const PopularProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50"
//         );
//         const data = await response.json();
//         console.log("API response:", data);
//         setProducts(data.data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <div className={styles.loading}>Loading products...</div>;

//   return (
//     <div className={styles.container}>
//       <h1>Popular Products</h1>

//       <div className={styles.productsGrid}>
//         {products.length > 0 ? (
//           products.map((product, index) => {
//             const hasPhotos = product.photos && product.photos.length > 0;
//             const rawUrl = hasPhotos ? product.photos[0].imageURL : null;
//             const photoUrl = hasPhotos
//               ? fixGoogleDriveUrl(rawUrl)
//               : "/images/defaultimage.png";

//             console.log(
//               `Product ${index} - original: ${rawUrl}, final: ${photoUrl}`
//             );

//             return (
//               <div key={index} className={styles.productCard}>
//                 <img
//                   src={photoUrl}
//                   alt={product.name}
//                   referrerPolicy="no-referrer"
//                   className={styles.productImage}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/images/error.png";
//                   }}
//                 />

//                 <h3>{product.name}</h3>
//                 <p className={styles.price}>{product.price} EGP</p>
//                 <div className={styles.category}>
//                   {product.categoryName}
//                   {product.subCategoryName && ` • ${product.subCategoryName}`}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className={styles.empty}>No products found</div>
//         )}
//       </div>
//     </div>
//   );
// };

"use client";
import { useState, useEffect } from "react";
import styles from "./popularProducts.module.css";

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

export const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=267&pagesize=267"
        );
        const data = await response.json();
        // setProducts(data.data || []);
        const filtered = (data.data || [])
          .filter(
            (product) =>
              product.photos &&
              product.photos.length > 0 &&
              Math.abs(product.stockQuantity) > 0
          )
          .sort(
            (a, b) => Math.abs(b.stockQuantity) - Math.abs(a.stockQuantity),
            (a, b) => b.rating - a.rating
          );

        setProducts(filtered);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  // Handle null rating and format rating display

  return (
    <div className={styles.container}>
      <h1 style={{fontWeight:"bolder",fontSize:"2rem",color:"var(--primary)"}}>Popular Products</h1>

      <div className={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product, index) => {
            const hasPhotos = product.photos && product.photos.length > 0;
            const rawUrl = hasPhotos ? product.photos[0].imageURL : null;
            const photoUrl = hasPhotos
              ? fixGoogleDriveUrl(rawUrl)
              : "/images/error.png";

            return (
              <div key={index} className={styles.productCard}>
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
                  {product.rating === null ? "no rating yet " : product.rating}
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
            );
          })
        ) : (
          <div className={styles.empty}>No products found</div>
        )}
      </div>
    </div>
  );
};
