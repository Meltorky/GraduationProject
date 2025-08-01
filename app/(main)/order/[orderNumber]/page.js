// // app/order/[orderNumber]/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import styles from "./order.module.css";
// import { getToken } from "@/lib/auth"; // Adjust the import path as necessary
// import Link from "next/link";

// export default function OrderDetailsPage({ params }) {
//   const router = useRouter();
//   const { orderNumber } = params;
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = getToken(); // Using your existing getToken method

//   // handle images
//   const fixGoogleDriveUrl = (url) => {
//     if (url.includes("drive.google.com") && url.includes("open?id=")) {
//       const parts = url.split("id=");
//       if (parts.length > 1) {
//         const fileId = parts[1].split("&")[0];
//         const googleDriveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         return `/api/imageproxy?url=${encodeURIComponent(googleDriveUrl)}`;
//       }
//     }
//     return url;
//   };

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         // Get token from localStorage or your auth state management

//         const response = await fetch(
//           `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Order/get-order-by-id-for-user?orderNumber=${orderNumber}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch order details");
//         }

//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderNumber) {
//       fetchOrderDetails();
//     }
//   }, [orderNumber]);

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loadingSpinner}>
//           <div className={styles.spinner}></div>
//           <p>Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.errorContainer}>
//           <h2>Error Loading Order</h2>
//           <p>{error}</p>
//           <button className={styles.backButton} onClick={() => router.back()}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!order) return null;

//   // Format date
//   const orderDate = new Date(order.orderDate).toLocaleString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <button className={styles.backButton}>
//           <Link href={"/invoice"}>← Back to Orders</Link>
//         </button>
//         <h1 className={styles.title}>Order Details</h1>
//       </div>
//   <div id="printableArea">
//       <div className={styles.orderContainer}>
//         <div className={styles.orderHeader}>
//           <div className={styles.orderHeaderLeft}>
//             <h2>Order #{order.orderNumber}</h2>
//             <p className={styles.date}>{orderDate}</p>
//           </div>
//           <div className={styles.orderHeaderRight}>
//             <div className={styles.statusBadges}>
//               <span
//                 className={`${styles.badge} ${
//                   styles[order.orderStatus.toLowerCase()]
//                 }`}
//               >
//                 {order.orderStatus}
//               </span>
//               <span
//                 className={`${styles.badge} ${
//                   styles[order.paymentStatus.toLowerCase()]
//                 }`}
//               >
//                 {order.paymentStatus}
//               </span>
//             </div>
//             <div className={styles.totalAmount}>
//               <p>Total Amount</p>
//               <h3>EGP {order.totalAmount.toFixed(2)}</h3>
//             </div>
//           </div>
//         </div>

//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>
//             <span className={styles.sectionIcon}>📦</span> Order Items
//           </h3>
//           <div className={styles.productsTable}>
//             <div className={styles.tableHeader}>
//               <div className={styles.productCol}>Product</div>
//               <div className={styles.quantityCol}>Quantity</div>
//               <div className={styles.priceCol}>Price</div>
//               <div className={styles.subtotalCol}>Subtotal</div>
//             </div>
//             {order.orderDetails.map((item, index) => (
//               <div key={index} className={styles.tableRow}>
//                 <div className={styles.productCol}>
//                   <div className={styles.productInfo}>
//                     <div className={styles.productImage}>
//                       {item.mainImage && (
//                         <img
//                           src={
//                             fixGoogleDriveUrl(item.mainImage) ||
//                             "/images/error.png"
//                           }
//                           alt={item.productName}
//                           width={70}
//                           height={70}
//                         />
//                       )}
//                     </div>
//                     <div className={styles.productName}>{item.productName}</div>
//                   </div>
//                 </div>
//                 <div className={styles.quantityCol}>{item.quantity}</div>
//                 <div className={styles.priceCol}>
//                   EGP {item.finalPrice.toFixed(2)}
//                 </div>
//                 <div className={styles.subtotalCol}>
//                   EGP {item.subTotal.toFixed(2)}
//                 </div>
//               </div>
//             ))}
//             <div className={styles.tableFooter}>
//               <div className={styles.orderTotal}>
//                 <div className={styles.totalLabel}>Order Total:</div>
//                 <div className={styles.totalValue}>
//                   EGP {order.totalAmount.toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>
//             <span className={styles.sectionIcon}>🚚</span> Shipping Information
//           </h3>
//           {order.shipping.map((shipping, index) => (
//             <div key={index} className={styles.shippingCard}>
//               <div className={styles.shippingCardColumn}>
//                 <h4>Delivery Address</h4>
//                 <p>
//                   <strong>Address:</strong> {shipping.address}
//                 </p>
//                 <p>
//                   <strong>City:</strong> {shipping.city}
//                 </p>
//                 <p>
//                   <strong>Country:</strong> {shipping.country}
//                 </p>
//                 <p>
//                   <strong>Postal Code:</strong> {shipping.postalCode}
//                 </p>
//               </div>
//               <div className={styles.shippingCardColumn}>
//                 <h4>Shipping Details</h4>
//                 <p>
//                   <strong>Method:</strong> {shipping.shippingMethod}
//                 </p>
//                 <p>
//                   <strong>Carrier:</strong> {shipping.carrier}
//                 </p>
//                 <p>
//                   <strong>Tracking:</strong>{" "}
//                   <span className={styles.trackingNumber}>
//                     {shipping.trackingNumber}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`${styles.badge} ${
//                       styles[shipping.shippingStatus.toLowerCase()]
//                     }`}
//                   >
//                     {shipping.shippingStatus}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className={styles.actions}>
//           <button
//             className={`${styles.actionButton} ${styles.printButton}`}
//             onClick={() => window.print()}
//           >
//             Print Order
//           </button>
//           <button
//             className={`${styles.actionButton} ${styles.contactButton}`}
//             // onClick={() => router.push("/contactus")}
//           >
//           <Link href="/contactus" target="_blank" rel="noopener noreferrer">
//             <span>Contact Support</span>
//           </Link>
//           </button>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }
// app/order/[orderNumber]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./order.module.css";
import { getToken } from "@/lib/auth"; // Adjust the import path as necessary
import Link from "next/link";

export default function OrderDetailsPage({ params }) {
  const router = useRouter();
  const { orderNumber } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getToken(); // Using your existing getToken method

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

  // Function to print only the printableArea div
  const handlePrint = () => {
    const printableContent = document.getElementById("printableArea");
    if (!printableContent) return;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Get all stylesheets from the current page
    const stylesheets = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          // Handle cross-origin stylesheets
          return "";
        }
      })
      .join("\n");

    // Also get external stylesheets
    const externalStyles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    )
      .map((link) => `<link rel="stylesheet" href="${link.href}">`)
      .join("\n");

    // Write the HTML structure to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order?.orderNumber || orderNumber}</title>
          ${externalStyles}
          <style>
            ${stylesheets}
            
            /* Additional print-specific styles */
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            
            /* Hide any elements you don't want to print */
            .no-print {
              display: none !important;
            }
            
            /* Ensure good print layout */
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              
              /* Force page breaks where needed */
              .page-break {
                page-break-before: always;
              }
            }
          </style>
        </head>
        <body>
          ${printableContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for styles to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        // Get token from localStorage or your auth state management

        const response = await fetch(
          `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Order/get-order-by-id-for-user?orderNumber=${orderNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrderDetails();
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Error Loading Order</h2>
          <p>{error}</p>
          <button className={styles.backButton} onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  // Format date
  const orderDate = new Date(order.orderDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.container}>
      <div className={`${styles.header} no-print`}>
        <button className={styles.backButton}>
          <Link href={"/invoice"}>← Back to Orders</Link>
        </button>
        <h1 className={styles.title}>Order Details</h1>
      </div>

      <div id="printableArea">
        <div className={styles.orderContainer}>
          <div className={styles.orderHeader}>
            <div className={styles.orderHeaderLeft}>
              <h2>Order #{order.orderNumber}</h2>
              <p className={styles.date}>{orderDate}</p>
            </div>
            <div className={styles.orderHeaderRight}>
              <div className={styles.statusBadges}>
                {/* <span
                  className={`${styles.badge} ${
                    styles[order.orderStatus.toLowerCase()]
                  }`}
                >
                  {order.orderStatus}
                </span>
                <span
                  className={`${styles.badge} ${
                    styles[order.paymentStatus.toLowerCase()]
                  }`}
                >
                  {order.paymentStatus}
                </span> */}
                <span
                  className={`${styles.badge} ${
                    styles[order.orderStatus.toLowerCase()]
                  }`}
                >
                  {order.orderStatus}
                </span>
                <span
                  className={`${styles.badge} ${
                    styles[order.paymentStatus.toLowerCase()]
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className={styles.totalAmount}>
                <p>Total Amount</p>
                <h3>EGP {order.totalAmount.toFixed(2)}</h3>
                {order.orderStatus.toLowerCase() === "pending" && (
                  <h4
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Payment Processing Failed. Please Contact Our Support Team
                    To Complete Your Payment
                  </h4>
                )}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📦</span> Order Items
            </h3>
            <div className={styles.productsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.productCol}>Product</div>
                <div className={styles.quantityCol}>Quantity</div>
                <div className={styles.priceCol}>Price</div>
                <div className={styles.subtotalCol}>Subtotal</div>
              </div>
              {order.orderDetails.map((item, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.productCol}>
                    <div className={styles.productInfo}>
                      <div className={styles.productImage}>
                        {item.mainImage && (
                          <img
                            src={
                              fixGoogleDriveUrl(item.mainImage) ||
                              "/images/error.png"
                            }
                            alt={item.productName}
                            width={70}
                            height={70}
                          />
                        )}
                      </div>
                      <div className={styles.productName}>
                        {item.productName}
                      </div>
                    </div>
                  </div>
                  <div className={styles.quantityCol}>{item.quantity}</div>
                  <div className={styles.priceCol}>
                    EGP {item.finalPrice.toFixed(2)}
                  </div>
                  <div className={styles.subtotalCol}>
                    EGP {item.subTotal.toFixed(2)}
                  </div>
                </div>
              ))}
              <div className={styles.tableFooter}>
                <div className={styles.orderTotal}>
                  <div className={styles.totalLabel}>Order Total:</div>
                  <div className={styles.totalValue}>
                    EGP {order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🚚</span> Shipping
              Information
            </h3>
            {order.shipping.map((shipping, index) => (
              <div key={index} className={styles.shippingCard}>
                <div className={styles.shippingCardColumn}>
                  <h4>Delivery Address</h4>
                  <p>
                    <strong>Address:</strong> {shipping.address}
                  </p>
                  <p>
                    <strong>City:</strong> {shipping.city}
                  </p>
                  <p>
                    <strong>Country:</strong> {shipping.country}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {shipping.postalCode}
                  </p>
                </div>
                <div className={styles.shippingCardColumn}>
                  <h4>Shipping Details</h4>
                  <p>
                    <strong>Method:</strong> {shipping.shippingMethod}
                  </p>
                  <p>
                    <strong>Carrier:</strong> {shipping.carrier}
                  </p>
                  <p>
                    <strong>Tracking:</strong>{" "}
                    <span className={styles.trackingNumber}>
                      {shipping.trackingNumber}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${styles.badge} ${
                        styles[shipping.shippingStatus.toLowerCase()]
                      }`}
                    >
                      {shipping.shippingStatus}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.actions} no-print`}>
        <button
          className={`${styles.actionButton} ${styles.printButton}`}
          onClick={handlePrint}
        >
          Print Order
        </button>
        <button className={`${styles.actionButton} ${styles.contactButton}`}>
          <Link href="/contactus" target="_blank" rel="noopener noreferrer">
            <span>Contact Support</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
