// app/payment/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./payment.module.css";
import { initiatePayment } from "./paymentService";

export default function PaymentPage() {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await initiatePayment(id);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Payment Details</h1>
        <p className={styles.orderInfo}>Order ID: {id}</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className={styles.paymentButton}
        >
          {isLoading ? (
            <span className={styles.loadingSpinner}>
              <svg
                className={styles.spinner}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className={styles.spinnerCircle}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className={styles.spinnerPath}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Proceed to Payment"
          )}
        </button>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            You will be redirected to our secure payment gateway
          </p>
        </div>
      </div>
    </div>
  );
}
