// app/payment/[id]/paymentService.js

import { getToken } from "@/lib/auth"; // Adjust the import path as necessary

export async function initiatePayment(id) {
  const token = getToken(); // Using your existing getToken method
  try {
    const res = await fetch(
      `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Payment/process-payment/${id}`,
      {
        method: "POST",
      }
    );

    const result = await res.json();
    const paymentUrl = result?.data?.paymentUrl;

    if (paymentUrl) {
      window.open(paymentUrl, "_blank"); // open external website 1
      startPollingForPaymentStatus(); // start checking for url2
    }
  } catch (err) {
    console.error("Payment initiation failed:", err);
  }
}
