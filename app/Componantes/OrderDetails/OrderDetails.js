// components/OrderDetails.js
import { useState, useEffect } from "react";
import styles from "./OrderDetails.module.css";
import Image from "next/image";
import { getToken } from "/Lib/auth";

export default function OrderDetails({ orderNumber, onClose, token }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getToken(); // Using your existing getToken method

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
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
  }, [orderNumber, token]);

  if (loading) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.loading}>Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2>Error</h2>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
          <div className={styles.error}>{error}</div>
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Order Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.orderSummary}>
          <div className={styles.orderInfo}>
            <p>
              <span>Order Number:</span> {order.orderNumber}
            </p>
            <p>
              <span>Date:</span> {orderDate}
            </p>
            <p>
              <span>Order Status:</span>{" "}
              <span
                className={`${styles.status} ${
                  styles[order.orderStatus.toLowerCase()]
                }`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p>
              <span>Payment Status:</span>{" "}
              <span
                className={`${styles.status} ${
                  styles[order.paymentStatus.toLowerCase()]
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>
          </div>
          <div className={styles.totalPrice}>
            <h3>Total Amount</h3>
            <p>${order.totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Products</h3>
          <div className={styles.products}>
            {order.orderDetails.map((item, index) => (
              <div key={index} className={styles.productItem}>
                <div className={styles.productImage}>
                  {item.mainImage && (
                    <img
                      src={item.mainImage}
                      alt={item.productName}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h4>{item.productName}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.finalPrice.toFixed(2)}</p>
                </div>
                <div className={styles.productSubtotal}>
                  <p>Subtotal</p>
                  <p>${item.subTotal.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Shipping Information</h3>
          {order.shipping.map((shipping, index) => (
            <div key={index} className={styles.shippingInfo}>
              <div className={styles.addressInfo}>
                <p>
                  <span>Address:</span> {shipping.address}
                </p>
                <p>
                  <span>City:</span> {shipping.city}
                </p>
                <p>
                  <span>Country:</span> {shipping.country}
                </p>
                <p>
                  <span>Postal Code:</span> {shipping.postalCode}
                </p>
              </div>
              <div className={styles.deliveryInfo}>
                <p>
                  <span>Method:</span> {shipping.shippingMethod}
                </p>
                <p>
                  <span>Carrier:</span> {shipping.carrier}
                </p>
                <p>
                  <span>Tracking:</span> {shipping.trackingNumber}
                </p>
                <p>
                  <span>Status:</span>{" "}
                  <span
                    className={`${styles.status} ${
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
  );
}
