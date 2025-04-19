// // components/ProductManager.js
// "use client";
// import { useState, useEffect } from "react";
// import styles from "./ProductManager.module.css";
// import Link from "next/link";
// import { getToken } from "/lib/auth";

// export default function ProductManager() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     Name: "",
//     Description: "",
//     Price: 0,
//     CategoryCode: "",
//     SubCategoryCode: "",
//     BrandCode: "",
//     StockQuantity: 0,
//     Photo: null,
//   });

//   const token = getToken();

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

//   // Fetch products when page changes
//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   // Effect to handle search term changes and update URL
//   useEffect(() => {
//     // Create a debounce timer to avoid too many API calls
//     const debounceTimer = setTimeout(() => {
//       // Update URL with search parameter
//       const url = new URL(window.location.href);

//       if (searchTerm.trim() === "") {
//         url.searchParams.delete("search");
//       } else {
//         url.searchParams.set("search", searchTerm);
//       }

//       // Update URL without causing a page reload
//       window.history.pushState({}, "", url);

//       // Recall the API with current page and search term
//       fetchProducts(currentPage);
//     }, 500); // 500ms delay to avoid calling API on every keystroke

//     // Cleanup timeout on each change
//     return () => clearTimeout(debounceTimer);
//   }, [searchTerm]);

//   async function fetchProducts(pageNumber) {
//     setLoading(true);
//     try {
//       // Create URL for API request
//       const url = new URL(
//         "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products"
//       );

//       // Add required parameters
//       url.searchParams.set("pagenum", pageNumber);
//       url.searchParams.set("Maxpagesize", 50);
//       url.searchParams.set("pagesize", 50);

//       // Add search parameter if search term exists
//       if (searchTerm && searchTerm.trim() !== "") {
//         url.searchParams.set("search", searchTerm);
//       }

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data.data);
//       setFilteredProducts(data.data);
//       setTotalPages(Math.ceil(data.totalCount / data.pageSize));
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   }

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     // No need to call fetchProducts here as the useEffect will handle it
//   };

//   async function handleDelete(productId) {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const response = await fetch(
//           `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/delete-product/${productId}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete product");
//         }

//         // Refresh products list
//         fetchProducts(currentPage);
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   }

//   function handleEdit(product) {
//     setCurrentProduct(product);
//     setFormData({
//       Name: product.name || "",
//       Description: product.description || "",
//       Price: product.price || 0,
//       CategoryCode: product.categoryName || "",
//       SubCategoryCode: product.subCategoryName || "",
//       BrandCode: product.brandName || "",
//       StockQuantity: product.stockQuantity || 0,
//       Photo: null,
//     });
//     setShowEditModal(true);
//   }

//   function handleAddNew() {
//     setFormData({
//       Name: "",
//       Description: "",
//       Price: 0,
//       CategoryCode: "",
//       SubCategoryCode: "",
//       BrandCode: "",
//       StockQuantity: 0,
//       Photo: null,
//     });
//     setShowAddModal(true);
//   }

//   function handleInputChange(e) {
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else if (type === "number") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: parseFloat(value),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   }
//   ///////////////////////////////////////////////////////////////////////
//   async function handleSubmit(e, isEdit = false) {
//     e.preventDefault();

//     // Check if we need to handle file upload
//     const hasFileUpload = formData.Photo !== null;

//     let requestBody;
//     let headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     if (hasFileUpload) {
//       // Use FormData for file uploads
//       const formDataObj = new FormData();

//       // Add all form fields to FormData
//       for (const key in formData) {
//         if (key === "Photo" && formData[key]) {
//           formDataObj.append("Photo", formData[key]);
//         } else {
//           formDataObj.append(key, formData[key]);
//         }
//       }

//       requestBody = formDataObj;
//       // Don't set Content-Type when sending FormData - browser will set it with correct boundary
//     } else {
//       // No file upload - use JSON
//       requestBody = JSON.stringify({
//         name: formData.Name,
//         description: formData.Description,
//         price: formData.Price,
//         categoryCode: formData.CategoryCode,
//         subCategoryCode: formData.SubCategoryCode,
//         brandCode: formData.BrandCode,
//         stockQuantity: formData.StockQuantity,
//       });

//       // Add Content-Type header for JSON
//       headers["Content-Type"] = "application/json";
//     }

//     console.log("Form Data:", requestBody);

//     const endpoint = isEdit
//       ? `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/update-product/${currentProduct.productID}`
//       : "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/add-product";

//     try {
//       const response = await fetch(endpoint, {
//         method: isEdit ? "PUT" : "POST",
//         body: requestBody,
//         headers: headers,
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to ${isEdit ? "update" : "add"} product, error: ${
//             response.statusText
//           }`
//         );
//       }

//       // Close modal and refresh products
//       isEdit ? setShowEditModal(false) : setShowAddModal(false);
//       fetchProducts(currentPage);
//     } catch (err) {
//       setError(err.message);
//     }
//   }
//   // Pagination handlers
//   function goToNextPage() {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   }

//   function goToPrevPage() {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   }

//   function goToPage(page) {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   }

//   // Generate pagination numbers
//   function getPaginationNumbers() {
//     const pages = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if there are few
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Show current page and some before/after
//       let startPage = Math.max(
//         1,
//         currentPage - Math.floor(maxVisiblePages / 2)
//       );
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//       // Adjust if we're near the end
//       if (endPage - startPage + 1 < maxVisiblePages) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1);
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }

//       // Add ellipses
//       if (startPage > 1) {
//         pages.unshift("...");
//         pages.unshift(1);
//       }

//       if (endPage < totalPages) {
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Product Manager</h1>

//       {/* Search and Add New */}
//       <div className={styles.actions}>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             // onChange={(e) => setSearchTerm(e.target.value)}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//         </div>
//         <button onClick={handleAddNew} className={styles.addButton}>
//           Add New Product
//         </button>
//       </div>

//       {loading ? (
//         <div className={styles.loading}>Loading products...</div>
//       ) : (
//         <>
//           {/* Products Table */}
//           <div className={styles.tableContainer}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>Category</th>
//                   <th>Stock</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <tr key={product.productID}>
//                       <td>{product.productID}</td>
//                       <td>
//                         {product.photos && product.photos.length > 0 ? (
//                           <img
//                             src={fixGoogleDriveUrl(product.photos[0].imageURL)}
//                             alt={product.name}
//                             className={styles.productImage}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "/placeholder-image.png";
//                             }}
//                           />
//                         ) : (
//                           <div className={styles.noImage}>No Image</div>
//                         )}
//                       </td>
//                       <td>{product.name}</td>
//                       <td>EGP {product.price.toFixed(2)}</td>
//                       <td>
//                         {product.categoryName} / {product.subCategoryName}
//                       </td>
//                       <td>{Math.abs(product.stockQuantity)}</td>
//                       <td className={styles.actions}>
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className={styles.editButton}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(product.productID)}
//                           className={styles.deleteButton}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className={styles.noProducts}>
//                       No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className={styles.pagination}>
//             <button
//               onClick={goToPrevPage}
//               disabled={currentPage === 1}
//               className={styles.pageButton}
//             >
//               &laquo; Prev
//             </button>

//             {getPaginationNumbers().map((page, index) => (
//               <button
//                 key={index}
//                 onClick={() =>
//                   typeof page === "number" ? goToPage(page) : null
//                 }
//                 className={`${styles.pageButton} ${
//                   currentPage === page ? styles.activePage : ""
//                 } ${typeof page !== "number" ? styles.ellipsis : ""}`}
//                 disabled={typeof page !== "number"}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages}
//               className={styles.pageButton}
//             >
//               Next &raquo;
//             </button>
//           </div>
//         </>
//       )}

//       {/* Add Product Modal */}
//       {showAddModal && (
//         <div className={styles.modalBackdrop}>
//           <div className={styles.modal}>
//             <h2>Add New Product</h2>
//             <form onSubmit={(e) => handleSubmit(e, false)}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={formData.Name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Description:</label>
//                 <textarea
//                   name="Description"
//                   value={formData.Description}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Price:</label>
//                 <input
//                   type="number"
//                   name="Price"
//                   value={formData.Price}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Category Code:</label>
//                 <input
//                   type="text"
//                   name="CategoryCode"
//                   value={formData.CategoryCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Sub-Category Code:</label>
//                 <input
//                   type="text"
//                   name="SubCategoryCode"
//                   value={formData.SubCategoryCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Brand Code:</label>
//                 <input
//                   type="text"
//                   name="BrandCode"
//                   value={formData.BrandCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Stock Quantity:</label>
//                 <input
//                   type="number"
//                   name="StockQuantity"
//                   value={formData.StockQuantity}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Photo:</label>
//                 <input
//                   type="file"
//                   name="Photo"
//                   onChange={handleInputChange}
//                   accept="image/*"
//                 />
//               </div>

//               <div className={styles.modalButtons}>
//                 <button type="submit" className={styles.saveButton}>
//                   Add Product
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className={styles.cancelButton}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Product Modal */}
//       {showEditModal && currentProduct && (
//         <div className={styles.modalBackdrop}>
//           <div className={styles.modal}>
//             <h2>Edit Product</h2>
//             <form onSubmit={(e) => handleSubmit(e, true)}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={formData.Name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Description:</label>
//                 <textarea
//                   name="Description"
//                   value={formData.Description}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Price:</label>
//                 <input
//                   type="number"
//                   name="Price"
//                   value={formData.Price}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Category Code:</label>
//                 <input
//                   type="text"
//                   name="CategoryCode"
//                   value={formData.CategoryCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Sub-Category Code:</label>
//                 <input
//                   type="text"
//                   name="SubCategoryCode"
//                   value={formData.SubCategoryCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Brand Code:</label>
//                 <input
//                   type="text"
//                   name="BrandCode"
//                   value={formData.BrandCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Stock Quantity:</label>
//                 <input
//                   type="number"
//                   name="StockQuantity"
//                   value={formData.StockQuantity}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Photo:</label>
//                 <input
//                   type="file"
//                   name="Photo"
//                   onChange={handleInputChange}
//                   accept="image/*"
//                 />
//                 {currentProduct.photos && currentProduct.photos.length > 0 && (
//                   <div className={styles.currentImage}>
//                     <p>Current image:</p>
//                     <img
//                       src={fixGoogleDriveUrl(currentProduct.photos[0].imageURL)}
//                       alt={currentProduct.name}
//                       className={styles.formProductImage}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/placeholder-image.png";
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className={styles.modalButtons}>
//                 <button type="submit" className={styles.saveButton}>
//                   Update Product
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className={styles.cancelButton}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// components/ProductManager.js
"use client";
import { useState, useEffect } from "react";
import styles from "./ProductManager.module.css";
import Link from "next/link";
import { getToken } from "/lib/auth";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Price: 0,
    CategoryCode: "",
    SubCategoryCode: "",
    BrandCode: "",
    StockQuantity: 0,
    Photo: null,
  });

  const token = getToken();
  console.log("Auth token available:", !!token);

  const fixGoogleDriveUrl = (url) => {
    const backendBaseUrl =
      "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net";

    if (!url) return "/placeholder-image.png";

    // Handle Google Drive links
    if (url.includes("drive.google.com") && url.includes("open?id=")) {
      const parts = url.split("id=");
      if (parts.length > 1) {
        const fileId = parts[1].split("&")[0];
        const googleDriveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        return `/api/imageproxy?url=${encodeURIComponent(googleDriveUrl)}`;
      }
    }

    // Handle local backend images from wwwroot (e.g. "/Images/...")
    if (url.startsWith("/Images/")) {
      return encodeURI(`${backendBaseUrl}${url}`);
    }

    // Default fallback
    return url;
  };

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Effect to handle search term changes and update URL
  useEffect(() => {
    // Create a debounce timer to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      // Update URL with search parameter
      const url = new URL(window.location.href);

      if (searchTerm.trim() === "") {
        url.searchParams.delete("search");
      } else {
        url.searchParams.set("search", searchTerm);
      }

      // Update URL without causing a page reload
      window.history.pushState({}, "", url);

      // Recall the API with current page and search term
      fetchProducts(currentPage);
    }, 500); // 500ms delay to avoid calling API on every keystroke

    // Cleanup timeout on each change
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  async function fetchProducts(pageNumber) {
    console.log(
      "Fetching products for page:",
      pageNumber,
      "with search term:",
      searchTerm
    );
    setLoading(true);
    try {
      // Create URL for API request
      const url = new URL(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products"
      );

      // Add required parameters
      url.searchParams.set("pagenum", pageNumber);
      url.searchParams.set("Maxpagesize", 50);
      url.searchParams.set("pagesize", 50);

      // Add search parameter if search term exists
      if (searchTerm && searchTerm.trim() !== "") {
        url.searchParams.set("search", searchTerm);
      }

      console.log("Fetching products from URL:", url.toString());

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Products fetched successfully:", data.data.length, "items");
      setProducts(data.data);
      setFilteredProducts(data.data);
      setTotalPages(Math.ceil(data.totalCount / data.pageSize));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setLoading(false);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search term changed to:", e.target.value);
    // No need to call fetchProducts here as the useEffect will handle it
  };

  async function handleDelete(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with ID:", productId);
      try {
        const response = await fetch(
          `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/delete-product/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete product: ${response.status} ${response.statusText}`
          );
        }

        console.log("Product deleted successfully");
        // Refresh products list
        fetchProducts(currentPage);
      } catch (err) {
        console.error("Error deleting product:", err);
        setError(err.message);
      }
    }
  }

  function handleEdit(product) {
    console.log("Editing product:", product);
    setCurrentProduct(product);
    setFormData({
      productID: product.productID || "",
      Name: product.name || "",
      Description: product.description || "",
      Price: product.price || 0,
      CategoryCode: product.categoryName || "",
      SubCategoryCode: product.subCategoryName || "",
      BrandCode: product.brandName || "",
      StockQuantity: product.stockQuantity || 0,
      Photo: product.photos[0]?.imageURL || null,
    });
    setShowEditModal(true);
  }

  function handleAddNew() {
    console.log("Opening add new product modal");
    setFormData({
      Name: "",
      Description: "",
      Price: 0,
      CategoryCode: "",
      SubCategoryCode: "",
      BrandCode: "",
      StockQuantity: 0,
      Photo: null,
    });
    setShowAddModal(true);
  }

  function handleInputChange(e) {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      console.log("File selected:", files[0]?.name || "No file");
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "number") {
      console.log(`Changed ${name} to:`, parseFloat(value));
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      console.log(`Changed ${name} to:`, value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e, isEdit = false) {
    e.preventDefault();
    console.log(
      `${isEdit ? "Updating" : "Adding"} product with data:`,
      formData
    );

    try {
      // Create FormData for file uploads
      const formDataObj = new FormData();

      // Add all form fields to FormData
      for (const key in formData) {
        if (key === "Photo" && formData[key]) {
          console.log("Adding photo to request:", formData[key].name);
          formDataObj.append("Photo", formData[key]);
        } else {
          console.log(`Adding ${key} to request:`, formData[key]);
          formDataObj.append(key, formData[key]);
        }
      }

      // Explicitly add productID to the form data when editing
      if (isEdit && currentProduct) {
        formDataObj.append("productId", currentProduct.productID);
        console.log("Adding productID to request:", currentProduct.productID);
      }

      // Set up headers with token
      const headers = {
        Authorization: `Bearer ${token}`,
        // Do not set Content-Type when using FormData - browser will set it with boundary
      };

      const endpoint = isEdit
        ? `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/update-product/`
        : "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/add-product";

      console.log("Sending request to:", endpoint);

      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: formDataObj,
        headers: headers,
      });

      const responseText = await response.text();
      console.log("API Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEdit ? "update" : "add"} product: ${response.status} ${
            response.statusText
          }`
        );
      }

      console.log(`Product ${isEdit ? "updated" : "added"} successfully`);

      // Close modal and refresh products
      isEdit ? setShowEditModal(false) : setShowAddModal(false);
      fetchProducts(currentPage);
    } catch (err) {
      console.error(`Error ${isEdit ? "updating" : "adding"} product:`, err);
      setError(err.message);
    }
  }

  // Pagination handlers
  function goToNextPage() {
    if (currentPage < totalPages) {
      console.log("Moving to next page:", currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      console.log("Moving to previous page:", currentPage - 1);
      setCurrentPage((prev) => prev - 1);
    }
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      console.log("Moving to page:", page);
      setCurrentPage(page);
    }
  }

  // Generate pagination numbers
  function getPaginationNumbers() {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show current page and some before/after
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipses
      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Manager</h1>

      {/* Search and Add New */}
      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAddNew} className={styles.addButton}>
          Add New Product
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <>
          {/* Products Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.productID}>
                      <td>{product.productID}</td>
                      <td>
                        {product.photos && product.photos.length > 0 ? (
                          <img
                            src={fixGoogleDriveUrl(product.photos[0].imageURL)}
                            alt={product.name}
                            className={styles.productImage}
                            onError={(e) => {
                              console.log(
                                "Image failed to load:",
                                product.photos[0].imageURL
                              );
                              e.target.onerror = null;
                              e.target.src = "/placeholder-image.png";
                            }}
                          />
                        ) : (
                          <div className={styles.noImage}>No Image</div>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>EGP {product.price.toFixed(2)}</td>
                      <td>
                        {product.categoryName} / {product.subCategoryName}
                      </td>
                      <td>{Math.abs(product.stockQuantity)}</td>
                      <td className={styles.actions}>
                        <button
                          onClick={() => handleEdit(product)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.productID)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.noProducts}>
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              &laquo; Prev
            </button>

            {getPaginationNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" ? goToPage(page) : null
                }
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.activePage : ""
                } ${typeof page !== "number" ? styles.ellipsis : ""}`}
                disabled={typeof page !== "number"}
              >
                {page}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next &raquo;
            </button>
          </div>
        </>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Add New Product</h2>
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Price:</label>
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category Code:</label>
                <input
                  type="text"
                  name="CategoryCode"
                  value={formData.CategoryCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Sub-Category Code:</label>
                <input
                  type="text"
                  name="SubCategoryCode"
                  value={formData.SubCategoryCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Brand Code:</label>
                <input
                  type="text"
                  name="BrandCode"
                  value={formData.BrandCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  name="StockQuantity"
                  value={formData.StockQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Photo:</label>
                <input
                  type="file"
                  name="Photo"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Edit Product</h2>
            <form onSubmit={(e) => handleSubmit(e, true)}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Price:</label>
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category Code:</label>
                <input
                  type="text"
                  name="CategoryCode"
                  value={formData.CategoryCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Sub-Category Code:</label>
                <input
                  type="text"
                  name="SubCategoryCode"
                  value={formData.SubCategoryCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Brand Code:</label>
                <input
                  type="text"
                  name="BrandCode"
                  value={formData.BrandCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  name="StockQuantity"
                  value={formData.StockQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Photo:</label>
                <input
                  type="file"
                  name="Photo"
                  onChange={handleInputChange}
                  accept="image/*"
                />
                {currentProduct.photos && currentProduct.photos.length > 0 && (
                  <div className={styles.currentImage}>
                    <p>Current image:</p>
                    <img
                      src={fixGoogleDriveUrl(currentProduct.photos[0].imageURL)}
                      alt={currentProduct.name}
                      className={styles.formProductImage}
                      onError={(e) => {
                        console.log("Form product image failed to load");
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
