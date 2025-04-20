"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import styles from "./PaymentHandler.module.css"; // Adjust the path as necessary
export default function PaymentHandler({ orderNumber }) {
  const token = getToken();
  const [pollingStarted, setPollingStarted] = useState(false);

  const startPayment = async () => {
    try {
      const res = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Payment/process-payment/${orderNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data?.data?.paymentUrl) {
        // Store orderNumber to track
        localStorage.setItem("pendingOrder", orderNumber);
        setPollingStarted(true);

        // Open external payment site in new tab
        window.open(data.data.paymentUrl, "_blank");
      } else {
        console.error("Invalid payment response:", data);
      }
    } catch (err) {
      console.error("Error starting payment:", err);
    }
  };

  return (
    <div>
      <button
        onClick={startPayment}
        className={styles.paynowButton}
      >
        Pay Now
      </button>
    </div>
  );
}
