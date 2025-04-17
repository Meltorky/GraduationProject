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

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          product.categoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.subCategoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  async function fetchProducts(pageNumber) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=${pageNumber}&Maxpagesize=50&pagesize=50`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.data);
      setFilteredProducts(data.data);
      setTotalPages(Math.ceil(data.totalCount / data.pageSize));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
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
          throw new Error("Failed to delete product");
        }

        // Refresh products list
        fetchProducts(currentPage);
      } catch (err) {
        setError(err.message);
      }
    }
  }

  function handleEdit(product) {
    setCurrentProduct(product);
    setFormData({
      Name: product.name || "",
      Description: product.description || "",
      Price: product.price || 0,
      CategoryCode: product.categoryName || "",
      SubCategoryCode: product.subCategoryName || "",
      BrandCode: product.brandName || "",
      StockQuantity: product.stockQuantity || 0,
      Photo: null,
    });
    setShowEditModal(true);
  }

  function handleAddNew() {
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
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e, isEdit = false) {
    e.preventDefault();

    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === "Photo" && formData[key]) {
        formDataObj.append("Photo", formData[key]);
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    const endpoint = isEdit
      ? `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/update-product/${currentProduct.productID}`
      : "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/add-product";

    try {
      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: formDataObj,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? "update" : "add"} product`);
      }

      // Close modal and refresh products
      isEdit ? setShowEditModal(false) : setShowAddModal(false);
      fetchProducts(currentPage);
    } catch (err) {
      setError(err.message);
    }
  }

  // Pagination handlers
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                            src={product.photos[0].imageURL}
                            alt={product.name}
                            className={styles.productImage}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-image.png";
                            }}
                          />
                        ) : (
                          <div className={styles.noImage}>No Image</div>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        {product.categoryName} / {product.subCategoryName}
                      </td>
                      <td>{product.stockQuantity}</td>
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
                      src={currentProduct.photos[0].imageURL}
                      alt={currentProduct.name}
                      className={styles.formProductImage}
                      onError={(e) => {
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
