"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending reset email...");

    try {
      const res = await fetch(
        `https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/send-email-forget-password?email=${email}`
      );

      if (!res.ok) throw new Error("Failed to send reset email");

      setMessage("Reset code sent to your email.");
      // setTimeout(() => router.push("/reset-password"), 2000); // Navigate after a delay
    setTimeout(
      () => router.push(`/reset-password?email=${encodeURIComponent(email)}`),
      2000
    );

    } catch (err) {
      console.error(err);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Code</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
