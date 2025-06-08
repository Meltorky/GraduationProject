// "use client";

// import { useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.css";
// import "datatables.net";
// import "datatables.net-responsive-dt";
// import styles from "../popularProducts/popularProducts.module.css";

// const ProductTable = ({ products }) => {
//   const tableRef = useRef();

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

//   // useEffect(() => {
//   //   const table = $(tableRef.current).DataTable({
//   //     responsive: true,
//   //     destroy: true, // Important for reinitialization
//   //   });

//   //   return () => {
//   //     table.destroy();
//   //   };
//   // }, [products]);

//   useEffect(() => {
//     const table = $(tableRef.current).DataTable({
//       responsive: true,
//       destroy: true, // Important for reinitialization
//       columns: [
//         { data: "name" }, // Product Name
//         {
//           data: "photos", // Image column - not sortable by default
//           sortable: false,
//         },
//         { data: "brandName" }, // Brand
//         { data: "categoryName" }, // Category
//         {
//           data: "price", // Price
//           render: function (data) {
//             return parseFloat(data); // Convert to number for proper sorting
//           },
//         },
//       ],
//       order: [[0, "asc"]], // Default sort by product name
//     });

//     return () => {
//       table.destroy();
//     };
//   }, [products]);

//   return (
//     <table ref={tableRef} className="display" style={{ width: "100%" }}>
//       <thead>
//         <tr>
//           <th>Product Name</th>
//           <th>Image</th>
//           <th>Brand</th>
//           <th>Category</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((prod) => (
//           <tr key={prod.id}>
//             <td>{prod.name}</td>
//             <td>
//               {prod.photos && prod.photos.length > 0 ? (
//                 <img
//                   src={fixGoogleDriveUrl(prod.photos[0].imageURL)}
//                   alt={prod.name}
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/images/error.png";
//                   }}
//                 />
//               ) : (
//                 <img
//                   src="/images/error.png"
//                   alt="No image available"
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//               )}
//             </td>
//             <td>{prod.brandName}</td>
//             <td>
//               {/* {prod.categoryName} */}
//               {prod.categoryName}
//               {prod.subCategoryName && ` • ${prod.subCategoryName}`}
//             </td>
//             <td>
//               {prod.price} EGP
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;
// export default ProductTable;

"use client";
import { Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./products.module.css";
import { useRouter } from "next/navigation";
import CascadingSelector from "../CascadingSelect/CascadingSelect";
import { useSearchParams } from "next/navigation";

const ProductTable = ({ products }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const productsPerPage = 150; // 3x3 grid
  const [filters, setFilters] = useState({
    categoryCode: "",
    subCategoryCode: "",
  });

  // voiuce research
  const [searchValue, setSearchValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Fetch products if not provided as props
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (products && products.length) {
  //       setAllProducts(products);
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products-no-paginate"
  //         // "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50"
  //       );

  //       if (!response.ok) {
  //         throw new Error(`API error: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log("API Response:", data); // For debugging

  //       // Check the structure of the returned data
  //       const productsList = Array.isArray(data)
  //         ? data
  //         : data.data
  //         ? data.data
  //         : [];

  //       setAllProducts(productsList);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [products]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url =
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products-no-paginate";

      if (filters.categoryCode) {
        url += `?categoryCode=${filters.categoryCode}`;
        if (filters.subCategoryCode) {
          url += `&subCategoryCode=${filters.subCategoryCode}`;
        }
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const productsList = Array.isArray(data)
        ? data
        : data.data
        ? data.data
        : [];
      setAllProducts(productsList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Add this useEffect BEFORE your existing filtering useEffect
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (products && products.length && !filters.categoryCode) {
      setAllProducts(products);
    } else {
      fetchProducts();
    }
  }, [filters]);

  const fixGoogleDriveUrl = (url) => {
    if (!url) return "/images/error.png";

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

  // Filter products based on search term
  useEffect(() => {
    if (!allProducts.length) return;

    const filtered = allProducts.filter((product) => {
      // Handle potentially missing fields gracefully
      const searchableFields = [
        product.name,
        product.brandName,
        product.categoryName,
        product.subCategoryName,
      ].filter(Boolean);

      return searchableFields.some(
        (field) =>
          field && field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [allProducts, searchTerm]);

  // Sort filtered products
  useEffect(() => {
    if (!filteredProducts.length) return;

    const sorted = [...filteredProducts].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle potentially undefined values
      if (aValue === undefined) aValue = "";
      if (bValue === undefined) bValue = "";

      // Handle numeric fields
      if (sortField === "price") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedProducts(sorted);
  }, [filteredProducts, sortField, sortDirection]);

  // Paginate sorted products
  useEffect(() => {
    if (!sortedProducts.length) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setPaginatedProducts(sortedProducts.slice(startIndex, endIndex));
  }, [sortedProducts, currentPage]);

  const handleSort = (field) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, reset to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil((sortedProducts.length || 0) / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>Error: {error}</div>;
  }

  // Add this function inside your component (before the return statement)
  const handleSearchChange = (value) => {
    setSearchTerm(value);

    // Update URL without causing page reload (optional - remove if you don't want this)
    const newUrl = value
      ? `/products?search=${encodeURIComponent(value)}`
      : "/products";
    router.replace(newUrl, { scroll: false });
  };

  // voice search
  // Convert audio blob to MP3 (using Web Audio API approximation)
  const convertToMp3 = async (audioBlob) => {
    // For actual MP3 conversion, you'd typically need a library like lamejs
    // For now, we'll send the original audio format and let the server handle it
    // Most modern transcription services accept various audio formats
    return audioBlob;
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        await processAudio(audioBlob);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Process audio and send to transcription service
  const processAudio = async (audioBlob) => {
    setIsProcessing(true);

    try {
      // Convert to MP3 (simplified - you may want to use a proper MP3 encoder)
      const mp3Blob = await convertToMp3(audioBlob);

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", mp3Blob, "audio.mp3");

      // Send to transcription endpoint
      const response = await fetch(
        "https://mohamed-essam0-whisper-fastapi.hf.space/transcribe/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Assuming the API returns text in a 'text' field
        const transcribedText = (
          result.text ||
          result.transcription ||
          ""
        ).trim();
        setSearchTerm(transcribedText);
      } else {
        console.error("Transcription failed:", response.statusText);
        alert("Voice transcription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Error processing voice input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle recording
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* <div>
        <CascadingSelector
          categoryCode={filters.categoryCode}
          subCategoryCode={filters.subCategoryCode}
          setFilters={setFilters}
        />
      </div> */}
      <div className={styles.productTableContainer}>
        {/* Search and sort controls */}
        <div className={styles.controlsContainer}>
          {/* <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          </div> */}

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              // onKeyPress={handleKeyPress}
              disabled={isProcessing}
              className={styles.searchInput}
            />

            <button
              className={`${styles.micButton} ${
                isRecording ? styles.recording : ""
              }`}
              onClick={handleMicClick}
              disabled={isProcessing}
              title={isRecording ? "Stop recording" : "Start voice search"}
            >
              {isProcessing ? (
                // Processing spinner
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className={styles.spinner}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      dur="2s"
                      values="0 31.416;15.708 15.708;0 31.416"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="2s"
                      values="0;-15.708;-31.416"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              ) : (
                // Microphone icon
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill={isRecording ? "red" : "currentColor"}
                >
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              )}
            </button>
          </div>

          <div className={styles.sortContainer}>
            <span className={styles.sortLabel}>Sort by:</span>
            <button
              onClick={() => handleSort("name")}
              className={`${styles.sortButton} ${
                sortField === "name" ? styles.active : ""
              }`}
            >
              Name{" "}
              {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("price")}
              className={`${styles.sortButton} ${
                sortField === "price" ? styles.active : ""
              }`}
            >
              Price{" "}
              {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("brandName")}
              className={`${styles.sortButton} ${
                sortField === "brandName" ? styles.active : ""
              }`}
            >
              Brand{" "}
              {sortField === "brandName" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </div>

        {/* Products count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <p className={styles.resultsInfo}>
            Showing {paginatedProducts.length} of {sortedProducts.length}{" "}
            products
          </p>
          {/* Empty state */}
          {paginatedProducts.length === 0 && (
            <div className={styles.emptyState}>No products found</div>
          )}
          <div style={{ marginTop: "-35px" }}>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNum = i + 1;
                  } else {
                    // Show pages around current page
                    const startPage = Math.max(1, currentPage - 2);
                    const endPage = Math.min(totalPages, startPage + 4);

                    if (endPage - startPage < 4) {
                      // Adjust startPage if we're near the end
                      pageNum = Math.max(1, totalPages - 4) + i;
                    } else {
                      pageNum = startPage + i;
                    }
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${styles.pageButton} ${
                        currentPage === pageNum ? styles.activePage : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Grid layout */}
        <div className={styles.productGrid}>
          {paginatedProducts.map((product) => {
            const hasPhotos = product.photos && product.photos.length > 0;
            const photoUrl = hasPhotos
              ? fixGoogleDriveUrl(product.photos[0].imageURL)
              : "/images/error.png";

            return (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={photoUrl}
                    alt={product.name || "Product"}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/error.png";
                    }}
                  />
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productCategory}>
                    {product.categoryName || "Uncategorized"}
                    {product.subCategoryName && ` • ${product.subCategoryName}`}
                  </div>
                  <h3
                    className={styles.productName}
                    title={product.name || "Unnamed Product"}
                  >
                    {product.name || "Unnamed Product"}
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
                  <div className={styles.productActions}>
                    <button
                      className={styles.addButton}
                      // onClick={() =>
                      //   router.push(`/single-product/${product.productID}`)
                      // }
                      onClick={() => {
                        window.open(
                          `/single-product/${product.productID}`,
                          "_blank"
                        );
                      }}
                    >
                      Buy
                    </button>
                    <div className={styles.productPrice}>
                      EGP {product.price || "0"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {paginatedProducts.length === 0 && (
          <div className={styles.emptyState}>No products found</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                // Show all pages if 5 or fewer
                pageNum = i + 1;
              } else {
                // Show pages around current page
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, startPage + 4);

                if (endPage - startPage < 4) {
                  // Adjust startPage if we're near the end
                  pageNum = Math.max(1, totalPages - 4) + i;
                } else {
                  pageNum = startPage + i;
                }
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`${styles.pageButton} ${
                    currentPage === pageNum ? styles.activePage : ""
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
