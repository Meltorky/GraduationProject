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

import { useEffect, useState } from "react";
import styles from "./products.module.css";
import { useRouter } from "next/navigation";
import CascadingSelector from "../CascadingSelect/CascadingSelect";

const ProductTable = ({ products }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <CascadingSelector
          categoryCode={filters.categoryCode}
          subCategoryCode={filters.subCategoryCode}
          setFilters={setFilters}
        />
      </div>
      <div className={styles.productTableContainer}>
        {/* Search and sort controls */}
        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
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
                  <div className={styles.productBrand}>
                    {product.brandName || "No brand"}
                  </div>
                  <div className={styles.productActions}>
                    <div className={styles.productPrice}>
                      EGP {product.price || "0"}
                    </div>
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
