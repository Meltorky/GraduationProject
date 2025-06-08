// // app/invoice/page.js
// "use client";

// import { useState, useEffect } from "react";
// import styles from "./Invoice.module.css";
// import { getToken } from "@/lib/auth"; // Adjust the import path based on your project structure
// import { useRouter } from "next/navigation";

// export default function InvoicePage() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [activeTab, setActiveTab] = useState("details");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const token = getToken();
//         if (!token) {
//           setError(
//             "Authentication required. Please login to view your invoices."
//           );
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(
//           "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Invoice/get-all-invoices-for-user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setInvoices(data);

//         // Select the first invoice by default if available
//         if (data && data.length > 0) {
//           setSelectedInvoice(data[0]);
//         }
//       } catch (err) {
//         setError(`Failed to fetch invoices: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//     });
//   };

//   //   const formatCurrency = (amount) => {
//   //     return new Intl.NumberFormat("ar-EG", {
//   //       style: "currency",
//   //       currency: "EGP",
//   //     }).format(amount);
//   //   };

//   const handleInvoiceSelect = (invoice) => {
//     setSelectedInvoice(invoice);
//     setActiveTab("details");
//   };

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loading}>
//           <div className={styles.loadingSpinner}></div>
//           <p>Loading your invoices...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.error}>
//           <svg
//             className={styles.errorIcon}
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M12 8V12"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M12 16H12.01"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <h2>Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.pageTitle}>My Invoices</h1>

//       {invoices.length === 0 ? (
//         <div className={styles.emptyState}>
//           <div className={styles.emptyIcon}>
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <h2>No Invoices Found</h2>
//           <p>
//             You don't have any invoices yet. They will appear here after you
//             make a purchase.
//           </p>
//         </div>
//       ) : (
//         <div className={styles.content}>
//           <div className={styles.invoiceList}>
//             <h2 className={styles.sectionTitle}>Invoice History</h2>
//             {invoices.map((invoice) => (
//               <div
//                 key={invoice.invoiceID}
//                 className={`${styles.invoiceCard} ${
//                   selectedInvoice?.invoiceID === invoice.invoiceID
//                     ? styles.selectedCard
//                     : ""
//                 }`}
//                 onClick={() => handleInvoiceSelect(invoice)}
//               >
//                 <div className={styles.invoiceCardHeader}>
//                   <div className={styles.orderNumber}>
//                     #{invoice.orderNumber}
//                   </div>
//                   <div className={styles.invoiceDate}>
//                     {formatDate(invoice.invoiceDate)}
//                   </div>
//                 </div>
//                 <div className={styles.invoiceCardBody}>
//                   <div className={styles.itemCount}>
//                     {invoice.invoiceDetails.length}{" "}
//                     {invoice.invoiceDetails.length === 1 ? "item" : "items"}
//                   </div>
//                   <div className={styles.invoiceTotal}>EGP {invoice.total}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {selectedInvoice && (
//             <div className={styles.invoiceDetail}>
//               <div className={styles.detailHeader}>
//                 <h2>Invoice #{selectedInvoice.orderNumber}</h2>
//                 <div className={styles.invoiceActions}>
//                   <button
//                     className={styles.actionButton}
//                     onClick={() => window.print()}
//                   >
//                     <svg
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 15V3M12 15L8 11M12 15L16 11M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     Download
//                   </button>
//                   <button
//                     className={styles.actionButton}
//                     onClick={() => window.print()}
//                   >
//                     <svg
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M17 17H17.01M17.4 14H18C18.7956 14 19.5587 14.3161 20.1213 14.8787C20.6839 15.4413 21 16.2044 21 17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H6.6M7 11V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V11"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     Print
//                   </button>
//                 </div>
//               </div>

//               <div className={styles.tabsContainer}>
//                 <div className={styles.tabs}>
//                   <button
//                     className={`${styles.tab} ${
//                       activeTab === "details" ? styles.activeTab : ""
//                     }`}
//                     onClick={() => setActiveTab("details")}
//                   >
//                     Details
//                   </button>
//                   <button
//                     className={`${styles.tab} ${
//                       activeTab === "summary" ? styles.activeTab : ""
//                     }`}
//                     onClick={() => setActiveTab("summary")}
//                   >
//                     Summary
//                   </button>
//                   <button
//                     className={styles.actionButtonViewOrder}
//                     onClick={() =>
//                       router.push(`/order/${selectedInvoice.orderNumber}`)
//                     }
//                   >
//                     View Order
//                   </button>
//                 </div>
//               </div>

//               {activeTab === "details" && (
//                 <div className={styles.detailContent}>
//                   <div className={styles.invoiceInfo}>
//                     <div className={styles.infoCard}>
//                       <h3>Invoice Information</h3>
//                       <div className={styles.infoRow}>
//                         <span className={styles.infoLabel}>Order Number:</span>
//                         <span className={styles.infoValue}>
//                           #{selectedInvoice.orderNumber}
//                         </span>
//                       </div>
//                       <div className={styles.infoRow}>
//                         <span className={styles.infoLabel}>Date:</span>
//                         <span className={styles.infoValue}>
//                           {formatDate(selectedInvoice.invoiceDate)}
//                         </span>
//                       </div>
//                       <div className={styles.infoRow}>
//                         <span className={styles.infoLabel}>Invoice ID:</span>
//                         <span className={styles.infoValue}>
//                           {selectedInvoice.invoiceID}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className={styles.productsTable}>
//                     <h3>Products</h3>
//                     <table className={styles.table}>
//                       <thead>
//                         <tr>
//                           <th>Product</th>
//                           <th>Price</th>
//                           <th>Quantity</th>
//                           <th>Discount</th>
//                           <th>Subtotal</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedInvoice.invoiceDetails.map((item, index) => (
//                           <tr key={index}>
//                             <td className={styles.productName}>
//                               {item.productName}
//                             </td>
//                             <td>{item.price}</td>
//                             <td>{item.quantity}</td>
//                             <td>{item.discountPercent}%</td>
//                             <td>EGP {item.subTotal}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className={styles.totals}>
//                     <div className={styles.totalsWrapper}>
//                       <div className={styles.totalRow}>
//                         <span>Subtotal:</span>
//                         <span>EGP {selectedInvoice.totalBeforeDiscount}</span>
//                       </div>
//                       <div className={styles.totalRow}>
//                         <span>Shipping Fee:</span>
//                         <span>EGP {selectedInvoice.shippingValue}</span>
//                       </div>
//                       {selectedInvoice.discountPercent > 0 && (
//                         <div className={styles.totalRow}>
//                           <span>
//                             Discount ({selectedInvoice.discountPercent}%):
//                           </span>
//                           <span>- EGP {selectedInvoice.totalDiscount}</span>
//                         </div>
//                       )}
//                       <div
//                         className={`${styles.totalRow} ${styles.grandTotal}`}
//                       >
//                         <span>Total:</span>
//                         <span>EGP {selectedInvoice.total}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "summary" && (
//                 <div className={styles.summaryContent}>
//                   <div className={styles.summaryCard}>
//                     <h3>Payment Summary</h3>
//                     <div className={styles.summaryRow}>
//                       <svg
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M21 12C21 13.6569 20.6188 15.2806 19.9046 16.7381C19.1903 18.1956 18.1652 19.4438 16.8995 20.3698C15.6338 21.2957 14.1659 21.8661 12.6257 22.0269C11.0855 22.1877 9.53457 21.9344 8.10432 21.2921C6.67406 20.6498 5.41073 19.6391 4.4324 18.358C3.45407 17.0768 2.89058 15.5665 2.79524 13.9882C2.6999 12.4099 3.07965 10.832 3.88391 9.43879C4.68818 8.04563 5.88953 6.87355 7.33781 6.03855"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M21 5L11 15L8 12"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className={styles.summaryInfo}>
//                         <h4>Order completed</h4>
//                         <p>
//                           Invoice issued on{" "}
//                           {formatDate(selectedInvoice.invoiceDate)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className={styles.summaryRow}>
//                       <svg
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17V15"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M22 12H10M10 12L13 9M10 12L13 15"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className={styles.summaryInfo}>
//                         <h4>
//                           {selectedInvoice.invoiceDetails.length} items
//                           purchased
//                         </h4>
//                         <p>Total amount: EGP {selectedInvoice.total}</p>
//                       </div>
//                     </div>
//                     <div className={styles.divider}></div>
//                     <div className={styles.summaryItems}>
//                       {selectedInvoice.invoiceDetails.map((item, index) => (
//                         <div key={index} className={styles.summaryItem}>
//                           <div className={styles.summaryItemInfo}>
//                             <span className={styles.summaryItemName}>
//                               {item.productName}
//                             </span>
//                             <span className={styles.summaryItemQuantity}>
//                               x{item.quantity}
//                             </span>
//                           </div>
//                           <span className={styles.summaryItemPrice}>
//                             EGP {item.subTotal}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// app/invoice/page.js
"use client";

import { useState, useEffect } from "react";
import styles from "./Invoice.module.css";
import { getToken } from "@/lib/auth"; // Adjust the import path based on your project structure
import { useRouter } from "next/navigation";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError(
            "Authentication required. Please login to view your invoices."
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Invoice/get-all-invoices-for-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setInvoices(data);

        // Select the first invoice by default if available
        if (data && data.length > 0) {
          setSelectedInvoice(data[0]);
        }
      } catch (err) {
        setError(`Failed to fetch invoices: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Function to print only the selected invoice content
  const handlePrintInvoice = () => {
    const printableContent = document.getElementById('printableInvoiceArea');
    if (!printableContent || !selectedInvoice) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get all stylesheets from the current page
    const stylesheets = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          // Handle cross-origin stylesheets
          return '';
        }
      })
      .join('\n');

    // Also get external stylesheets
    const externalStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => `<link rel="stylesheet" href="${link.href}">`)
      .join('\n');

    // Write the HTML structure to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice #${selectedInvoice.orderNumber}</title>
          ${externalStyles}
          <style>
            ${stylesheets}
            
            /* Additional print-specific styles */
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              background: white;
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
              
              /* Make sure tables fit properly */
              table {
                page-break-inside: avoid;
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

  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
    setActiveTab("details");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <svg
            className={styles.errorIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.pageTitle} no-print`}>My Invoices</h1>

      {invoices.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>No Invoices Found</h2>
          <p>
            You don't have any invoices yet. They will appear here after you
            make a purchase.
          </p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={`${styles.invoiceList} no-print`}>
            <h2 className={styles.sectionTitle}>Invoice History</h2>
            {invoices.map((invoice) => (
              <div
                key={invoice.invoiceID}
                className={`${styles.invoiceCard} ${
                  selectedInvoice?.invoiceID === invoice.invoiceID
                    ? styles.selectedCard
                    : ""
                }`}
                onClick={() => handleInvoiceSelect(invoice)}
              >
                <div className={styles.invoiceCardHeader}>
                  <div className={styles.orderNumber}>
                    #{invoice.orderNumber}
                  </div>
                  <div className={styles.invoiceDate}>
                    {formatDate(invoice.invoiceDate)}
                  </div>
                </div>
                <div className={styles.invoiceCardBody}>
                  <div className={styles.itemCount}>
                    {invoice.invoiceDetails.length}{" "}
                    {invoice.invoiceDetails.length === 1 ? "item" : "items"}
                  </div>
                  <div className={styles.invoiceTotal}>EGP {invoice.total}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedInvoice && (
            <div className={styles.invoiceDetail}>
              <div className={`${styles.detailHeader} no-print`}>
                <h2>Invoice #{selectedInvoice.orderNumber}</h2>
                <div className={styles.invoiceActions}>
                  <button
                    className={styles.actionButton}
                    onClick={handlePrintInvoice}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15V3M12 15L8 11M12 15L16 11M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Download
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={handlePrintInvoice}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 17H17.01M17.4 14H18C18.7956 14 19.5587 14.3161 20.1213 14.8787C20.6839 15.4413 21 16.2044 21 17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H6.6M7 11V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Print
                  </button>
                </div>
              </div>

              <div className={`${styles.tabsContainer} no-print`}>
                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "details" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    Details
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "summary" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("summary")}
                  >
                    Summary
                  </button>
                  <button
                    className={styles.actionButtonViewOrder}
                    onClick={() =>
                      router.push(`/order/${selectedInvoice.orderNumber}`)
                    }
                  >
                    View Order
                  </button>
                </div>
              </div>

              <div id="printableInvoiceArea">
                {/* Print-only header for invoice */}
                <div className="print-only" style={{ display: 'none' }}>
                  <h1 style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                    Invoice #{selectedInvoice.orderNumber}
                  </h1>
                  <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                    <strong>Date: {formatDate(selectedInvoice.invoiceDate)}</strong>
                  </div>
                </div>

                {activeTab === "details" && (
                  <div className={styles.detailContent}>
                    <div className={styles.invoiceInfo}>
                      <div className={styles.infoCard}>
                        <h3>Invoice Information</h3>
                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Order Number:</span>
                          <span className={styles.infoValue}>
                            #{selectedInvoice.orderNumber}
                          </span>
                        </div>
                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Date:</span>
                          <span className={styles.infoValue}>
                            {formatDate(selectedInvoice.invoiceDate)}
                          </span>
                        </div>
                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Invoice ID:</span>
                          <span className={styles.infoValue}>
                            {selectedInvoice.invoiceID}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.productsTable}>
                      <h3>Products</h3>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedInvoice.invoiceDetails.map((item, index) => (
                            <tr key={index}>
                              <td className={styles.productName}>
                                {item.productName}
                              </td>
                              <td>{item.price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.discountPercent}%</td>
                              <td>EGP {item.subTotal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.totals}>
                      <div className={styles.totalsWrapper}>
                        <div className={styles.totalRow}>
                          <span>Subtotal:</span>
                          <span>EGP {selectedInvoice.totalBeforeDiscount}</span>
                        </div>
                        <div className={styles.totalRow}>
                          <span>Shipping Fee:</span>
                          <span>EGP {selectedInvoice.shippingValue}</span>
                        </div>
                        {selectedInvoice.discountPercent > 0 && (
                          <div className={styles.totalRow}>
                            <span>
                              Discount ({selectedInvoice.discountPercent}%):
                            </span>
                            <span>- EGP {selectedInvoice.totalDiscount}</span>
                          </div>
                        )}
                        <div
                          className={`${styles.totalRow} ${styles.grandTotal}`}
                        >
                          <span>Total:</span>
                          <span>EGP {selectedInvoice.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "summary" && (
                  <div className={styles.summaryContent}>
                    <div className={styles.summaryCard}>
                      <h3>Payment Summary</h3>
                      <div className={styles.summaryRow}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12C21 13.6569 20.6188 15.2806 19.9046 16.7381C19.1903 18.1956 18.1652 19.4438 16.8995 20.3698C15.6338 21.2957 14.1659 21.8661 12.6257 22.0269C11.0855 22.1877 9.53457 21.9344 8.10432 21.2921C6.67406 20.6498 5.41073 19.6391 4.4324 18.358C3.45407 17.0768 2.89058 15.5665 2.79524 13.9882C2.6999 12.4099 3.07965 10.832 3.88391 9.43879C4.68818 8.04563 5.88953 6.87355 7.33781 6.03855"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 5L11 15L8 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className={styles.summaryInfo}>
                          <h4>Order completed</h4>
                          <p>
                            Invoice issued on{" "}
                            {formatDate(selectedInvoice.invoiceDate)}
                          </p>
                        </div>
                      </div>
                      <div className={styles.summaryRow}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 7V17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12H10M10 12L13 9M10 12L13 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className={styles.summaryInfo}>
                          <h4>
                            {selectedInvoice.invoiceDetails.length} items
                            purchased
                          </h4>
                          <p>Total amount: EGP {selectedInvoice.total}</p>
                        </div>
                      </div>
                      <div className={styles.divider}></div>
                      <div className={styles.summaryItems}>
                        {selectedInvoice.invoiceDetails.map((item, index) => (
                          <div key={index} className={styles.summaryItem}>
                            <div className={styles.summaryItemInfo}>
                              <span className={styles.summaryItemName}>
                                {item.productName}
                              </span>
                              <span className={styles.summaryItemQuantity}>
                                x{item.quantity}
                              </span>
                            </div>
                            <span className={styles.summaryItemPrice}>
                              EGP {item.subTotal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}