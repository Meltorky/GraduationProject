"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./payment-callback.module.css";
import { getToken } from "@/lib/auth"; // Adjust the import path as necessary

export default function PaymentCallback() {
  const [status, setStatus] = useState("Processing payment result...");
  const router = useRouter();
  const token = getToken(); // Using your existing getToken method

  useEffect(() => {
    async function checkPaymentStatus() {
      try {
        // Get the current URL from the API
        const urlResponse = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Payment/format-current-url"
        );
        const urlData = await urlResponse.json();

        if (!urlData.formattedUrl) {
          setStatus("Error: Could not retrieve current URL");
          return;
        }

        // Parse the URL to extract success and order values
        const url = urlData.formattedUrl;

        // Extract success value from "& success=true& is_auth="
        const successMatch = url.match(/& success=([^&]+)/);
        const success = successMatch
          ? successMatch[1].toLowerCase() === "true"
          : false;

        // Extract order value from "& order=320923820& created_at"
        const orderMatch = url.match(/& order=([^&]+)& created_at/);
        const orderValue = orderMatch ? orderMatch[1] : null;

        if (success && orderValue) {
          const webhookResponse = await fetch(
            "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Payment/webhook/success",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ transaction_id: orderValue }),
            }
          );

          const webhookData = await webhookResponse.json();

          if (webhookData.statusCode === 200 && webhookData.data?.orderNumber) {
            const orderNumber = webhookData.data.orderNumber;

            setStatus(
              "Payment successful! Redirecting to order confirmation..."
            );
            setTimeout(() => {
              // Clear the pending payment order
              localStorage.removeItem("pendingPaymentOrder");
              // Redirect to order page with the order number from the response
              router.push(`/order/${orderNumber}`);
            }, 2000);
          } else {
            setStatus(
              "Payment processed but order details could not be retrieved."
            );
            setTimeout(() => {
              router.push("/orders");
            }, 2000);
          }
        } else {
          setStatus(
            "Payment failed or was cancelled. Redirecting to checkout..."
          );
          setTimeout(() => {
            router.push("/checkout");
          }, 2000);
        }
      } catch (error) {
        console.error("Error processing payment callback:", error);
        setStatus("An error occurred while processing your payment.");
        setTimeout(() => {
          router.push("/checkout");
        }, 3000);
      }
    }

    // Run the check as soon as the component mounts
    checkPaymentStatus();
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>Payment Processing</h1>
      <p>{status}</p>
      <div className={styles.loader}></div>
    </div>
  );
}
