// components/OrderManager/OrderManager.js
"use client";

import { useState, useEffect } from "react";
import styles from "./OrderManager.module.css";
import { getToken } from "@/lib/auth";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Default to 5 pages initially (can adjust based on API response)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const token = getToken();

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (orders.length > 0) {
      const filtered = orders.filter((order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const fetchOrders = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Order/get-all-orders?pagenum=${pageNum}&Maxpagesize=50&pagesize=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);

      // Since the API might not return total pages info,
      // we'll assume there are more pages if we get a full page of results
      if (data.length === 50) {
        // There are likely more pages
        setTotalPages(Math.max(totalPages, currentPage + 1));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const renderPagination = () => {
    // Only show pagination if we have orders
    if (!orders.length) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // First page
    pages.push(
      <button
        key="first"
        className={styles.paginationButton}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
    );

    // Previous page
    pages.push(
      <button
        key="prev"
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            currentPage === i ? styles.activePage : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next page
    pages.push(
      <button
        key="next"
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || orders.length < 50}
      >
        &raquo;
      </button>
    );

    // Last page
    pages.push(
      <button
        key="last"
        className={styles.paginationButton}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || orders.length < 50}
      >
        Last
      </button>
    );

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </div>
        <div className={styles.paginationControls}>{pages}</div>
      </div>
    );
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div className={styles.orderDetailsOverlay}>
        <div className={styles.orderDetailsModal}>
          <div className={styles.orderDetailsHeader}>
            <h2>Order #{selectedOrder.orderNumber}</h2>
            <button className={styles.closeButton} onClick={closeOrderDetails}>
              ×
            </button>
          </div>

          <div className={styles.orderDetailsContent}>
            <div className={styles.orderDetailsSummary}>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Date:</div>
                <div className={styles.detailValue}>
                  {new Date(selectedOrder.orderDate).toLocaleDateString()}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Status:</div>
                <div
                  className={`${styles.detailValue} ${styles.status} ${
                    styles[selectedOrder.orderStatus.toLowerCase()]
                  }`}
                >
                  {selectedOrder.orderStatus}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Payment:</div>
                <div
                  className={`${styles.detailValue} ${styles.payment} ${
                    styles[selectedOrder.paymentStatus.toLowerCase()]
                  }`}
                >
                  {selectedOrder.paymentStatus}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Total Amount:</div>
                <div className={styles.detailValue}>
                  EGP {selectedOrder.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>

            <h3 className={styles.orderDetailsSubtitle}>Order Items</h3>
            <div className={styles.orderItemsTable}>
              <div className={styles.orderItemHeader}>
                <div className={styles.orderItemCell}>Product ID</div>
                <div className={styles.orderItemCell}>Quantity</div>
                <div className={styles.orderItemCell}>Price</div>
                <div className={styles.orderItemCell}>Subtotal</div>
              </div>

              {selectedOrder.orderDetails.map((item, index) => (
                <div key={index} className={styles.orderItemRow}>
                  <div className={styles.orderItemCell}>{item.productID}</div>
                  <div className={styles.orderItemCell}>{item.quantity}</div>
                  <div className={styles.orderItemCell}>
                    EGP {item.finalPrice.toFixed(2)}
                  </div>
                  <div className={styles.orderItemCell}>
                    EGP {item.subTotal.toFixed(2)}
                  </div>
                </div>
              ))}

              <div className={styles.orderItemTotal}>
                <div className={styles.orderItemTotalLabel}>Total</div>
                <div className={styles.orderItemTotalValue}>
                  EGP {selectedOrder.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.orderManager}>
      <h1 className={styles.title}>Order Management</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by Order Number..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <>
          {renderPagination()}
          <br />
          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Order #</div>
              <div className={styles.headerCell}>Date</div>
              <div className={styles.headerCell}>Status</div>
              <div className={styles.headerCell}>Payment</div>
              <div className={styles.headerCell}>Total</div>
              <div className={styles.headerCell}>Items</div>
              <div className={styles.headerCell}>Actions</div>
            </div>

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.orderNumber} className={styles.orderRow}>
                  <div className={styles.cell}>{order.orderNumber}</div>
                  <div className={styles.cell}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                  <div className={`${styles.cell} ${styles.statusCell}`}>
                    <span
                      className={`${styles.status} ${
                        styles[order.orderStatus.toLowerCase()]
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className={`${styles.cell} ${styles.paymentCell}`}>
                    <span
                      className={`${styles.payment} ${
                        styles[order.paymentStatus.toLowerCase()]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className={styles.cell}>
                    EGP {order.totalAmount.toFixed(2)}
                  </div>
                  <div className={styles.cell}>{order.orderDetails.length}</div>
                  <div className={styles.cell}>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No orders found</div>
            )}
          </div>

          {renderPagination()}
        </>
      )}

      {showOrderDetails && renderOrderDetails()}
    </div>
  );
}
