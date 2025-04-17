// components/InvoiceManager/InvoiceManager.js
"use client";

import { useState, useEffect } from "react";
import styles from "./InvoiceManager.module.css";
import { getToken } from "/Lib/auth";

export default function InvoiceManager() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Default to 5 pages initially
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const token = getToken();

  useEffect(() => {
    fetchInvoices(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (invoices.length > 0) {
      const filtered = invoices.filter(
        (invoice) =>
          invoice.orderNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.invoiceID.toString().includes(searchTerm)
      );
      setFilteredInvoices(filtered);
    }
  }, [searchTerm, invoices]);

  const fetchInvoices = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Invoice/get-all-invoices?pagenum=${pageNum}&Maxpagesize=50&pagesize=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const data = await response.json();
      setInvoices(data);
      setFilteredInvoices(data);

      // If we get a full page of results, assume there are more pages
      if (data.length === 50) {
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

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  const closeInvoiceDetails = () => {
    setShowInvoiceDetails(false);
    setSelectedInvoice(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderPagination = () => {
    // Only show pagination if we have invoices
    if (!invoices.length) return null;

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
        disabled={currentPage === totalPages || invoices.length < 50}
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
        disabled={currentPage === totalPages || invoices.length < 50}
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

  const renderInvoiceDetails = () => {
    if (!selectedInvoice) return null;

    return (
      <div className={styles.invoiceDetailsOverlay}>
        <div className={styles.invoiceDetailsModal}>
          <div className={styles.invoiceDetailsHeader}>
            <h2>Invoice #{selectedInvoice.invoiceID}</h2>
            <button
              className={styles.closeButton}
              onClick={closeInvoiceDetails}
            >
              ×
            </button>
          </div>

          <div className={styles.invoiceDetailsContent}>
            <div className={styles.invoiceDetailsSummary}>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Invoice Date:</div>
                <div className={styles.detailValue}>
                  {formatDate(selectedInvoice.invoiceDate)}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Order Number:</div>
                <div className={styles.detailValue}>
                  {selectedInvoice.orderNumber}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Subtotal:</div>
                <div className={styles.detailValue}>
                  EGP {selectedInvoice.totalBeforeDiscount.toFixed(2)}
                </div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Shipping:</div>
                <div className={styles.detailValue}>
                  EGP {selectedInvoice.shippingValue.toFixed(2)}
                </div>
              </div>
              {selectedInvoice.totalDiscount > 0 && (
                <div className={styles.detailGroup}>
                  <div className={styles.detailLabel}>
                    Discount ({selectedInvoice.discountPercent}%):
                  </div>
                  <div className={styles.detailValue}>
                    -EGP {selectedInvoice.totalDiscount.toFixed(2)}
                  </div>
                </div>
              )}
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>Total:</div>
                <div className={`${styles.detailValue} ${styles.totalValue}`}>
                  EGP {selectedInvoice.total.toFixed(2)}
                </div>
              </div>
            </div>

            <h3 className={styles.invoiceDetailsSubtitle}>Invoice Items</h3>
            <div className={styles.invoiceItemsTable}>
              <div className={styles.invoiceItemHeader}>
                <div className={styles.invoiceItemCell}>Product ID</div>
                <div className={styles.invoiceItemCell}>Price</div>
                <div className={styles.invoiceItemCell}>Quantity</div>
                {selectedInvoice.invoiceDetails.some(
                  (item) => item.discountPercent > 0
                ) && <div className={styles.invoiceItemCell}>Discount</div>}
                <div className={styles.invoiceItemCell}>Final Price</div>
                <div className={styles.invoiceItemCell}>Subtotal</div>
              </div>

              {selectedInvoice.invoiceDetails.map((item, index) => (
                <div key={index} className={styles.invoiceItemRow}>
                  <div className={styles.invoiceItemCell}>{item.productID}</div>
                  <div className={styles.invoiceItemCell}>
                    EGP {item.price.toFixed(2)}
                  </div>
                  <div className={styles.invoiceItemCell}>{item.quantity}</div>
                  {selectedInvoice.invoiceDetails.some(
                    (item) => item.discountPercent > 0
                  ) && (
                    <div className={styles.invoiceItemCell}>
                      {item.discountPercent > 0
                        ? `${item.discountPercent}%`
                        : "-"}
                    </div>
                  )}
                  <div className={styles.invoiceItemCell}>
                    EGP {item.finalPrice.toFixed(2)}
                  </div>
                  <div className={styles.invoiceItemCell}>
                    EGP {item.subTotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.invoiceTotals}>
              <div className={styles.invoiceTotalRow}>
                <div className={styles.invoiceTotalLabel}>Subtotal:</div>
                <div className={styles.invoiceTotalValue}>
                  EGP {selectedInvoice.totalBeforeDiscount.toFixed(2)}
                </div>
              </div>
              {selectedInvoice.totalDiscount > 0 && (
                <div className={styles.invoiceTotalRow}>
                  <div className={styles.invoiceTotalLabel}>
                    Discount ({selectedInvoice.discountPercent}%):
                  </div>
                  <div className={styles.invoiceTotalValue}>
                    -EGP {selectedInvoice.totalDiscount.toFixed(2)}
                  </div>
                </div>
              )}
              <div className={styles.invoiceTotalRow}>
                <div className={styles.invoiceTotalLabel}>Shipping:</div>
                <div className={styles.invoiceTotalValue}>
                  EGP {selectedInvoice.shippingValue.toFixed(2)}
                </div>
              </div>
              <div
                className={`${styles.invoiceTotalRow} ${styles.invoiceGrandTotal}`}
              >
                <div className={styles.invoiceTotalLabel}>Total:</div>
                <div className={styles.invoiceTotalValue}>
                  EGP {selectedInvoice.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className={styles.invoiceActions}>
              <button className={styles.printButton} onClick={window.print}>
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.invoiceManager}>
      <h1 className={styles.title}>Invoice Management</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by Invoice ID or Order Number..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Loading invoices...</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <>
          {renderPagination()}
          <br/>
          <div className={styles.invoicesTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Invoice #</div>
              <div className={styles.headerCell}>Order #</div>
              <div className={styles.headerCell}>Date</div>
              <div className={styles.headerCell}>Subtotal</div>
              <div className={styles.headerCell}>Shipping</div>
              <div className={styles.headerCell}>Discount</div>
              <div className={styles.headerCell}>Total</div>
              <div className={styles.headerCell}>Actions</div>
            </div>

            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <div key={invoice.invoiceID} className={styles.invoiceRow}>
                  <div className={styles.cell}>{invoice.invoiceID}</div>
                  <div className={styles.cell}>{invoice.orderNumber}</div>
                  <div className={styles.cell}>
                    {formatDate(invoice.invoiceDate)}
                  </div>
                  <div className={styles.cell}>
                    EGP {invoice.totalBeforeDiscount.toFixed(2)}
                  </div>
                  <div className={styles.cell}>
                    EGP {invoice.shippingValue.toFixed(2)}
                  </div>
                  <div className={styles.cell}>
                    {invoice.discountPercent > 0
                      ? `${
                          invoice.discountPercent
                        }% (-$${invoice.totalDiscount.toFixed(2)})`
                      : "-"}
                  </div>
                  <div className={styles.cell}>
                    EGP {invoice.total.toFixed(2)}
                  </div>
                  <div className={styles.cell}>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetails(invoice)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No invoices found</div>
            )}
          </div>

          {renderPagination()}
        </>
      )}

      {showInvoiceDetails && renderInvoiceDetails()}
    </div>
  );
}
