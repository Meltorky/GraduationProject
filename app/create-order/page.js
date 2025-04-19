// /create-order/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CreateOrder.module.css";
import { getToken } from "/lib/auth";
import PaymentHandler from "../Componantes/PaymentHandler/PaymentHandler";

export default function CreateOrderPage() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");
  const cartTotal = searchParams.get("total");
  const token = getToken(); // Using your existing getToken method
  const [orderNumber, setOrderNumber] = useState(null);

  const [formData, setFormData] = useState({
    cartId: cartId || "",
    shippingDTO: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
      shippingMethod: "standard",
      useProfileAddress: true,
      updateProfileAddress: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user profile data when component mounts
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await response.json();

        // Auto-fill form with profile data if available
        if (profileData) {
          setFormData((prev) => ({
            ...prev,
            shippingDTO: {
              ...prev.shippingDTO,
              address: profileData.address || "",
              city: profileData.city || "",
              country: profileData.country || "",
              postalCode: profileData.postalCode || "",
            },
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          "Failed to load profile data. You can still enter shipping information manually."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const token = getToken();
      const response = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Order/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      setOrderNumber(result.orderNumber);

      console.log("Order created successfully:", result);
      setSuccess(true);

      // Redirect to success page or order confirmation page
      setTimeout(() => {
        window.location.href = `/order/${result.orderNumber}`;
      }, 50000);
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Failed to create your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.shippingDTO.address) {
    return (
      <div className={styles.loadingContainer}>Loading profile data...</div>
    );
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Complete Your Order</h1>
          <button className={styles.goback} onClick={goBack}>
            Cancel
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {success ? (
          <div className={styles.successMessage}>
            Your order has been successfully created! Redirecting...
            <PaymentHandler orderNumber={orderNumber} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order Summary</label>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Cart ID:</span>
                  <input
                    type="text"
                    value={formData.cartId}
                    disabled
                    className={styles.disabledInput}
                  />
                </div>
                {cartTotal && (
                  <div className={styles.summaryRow}>
                    <span>Total Amount:</span>
                    <input
                      type="text"
                      value={`EGP ${cartTotal}`}
                      disabled
                      className={styles.disabledInput}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shipping Method</label>
              <select
                name="shippingDTO.shippingMethod"
                value={formData.shippingDTO.shippingMethod}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
              </select>
              <div style={{ marginBlock: "10px" }}>
                <h3 style={{ color: "var(--accent)", fontSize: ".9rem" }}>
                  For Express : Delivery after 4 days for EGP 20
                </h3>
                <h3 style={{ color: "var(--accent)", fontSize: ".9rem" }}>
                  For Standard : Delivery after 2 days for EGP 40
                </h3>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input
                type="text"
                name="shippingDTO.address"
                value={formData.shippingDTO.address}
                onChange={handleChange}
                className={styles.input}
                placeholder="Street Address"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>City</label>
                <input
                  type="text"
                  name="shippingDTO.city"
                  value={formData.shippingDTO.city}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="City"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Postal Code</label>
                <input
                  type="text"
                  name="shippingDTO.postalCode"
                  value={formData.shippingDTO.postalCode}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Postal Code"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <input
                type="text"
                name="shippingDTO.country"
                value={formData.shippingDTO.country}
                onChange={handleChange}
                className={styles.input}
                placeholder="Country"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </form>
        )}
      </div>
    </Suspense>
  );
}
