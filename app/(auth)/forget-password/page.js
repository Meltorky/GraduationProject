"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

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
      setMessage("Email is incorrect !!.");
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h1 style={{ marginBlock: "1rem" }}>Forget Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.signinButton}>
          Send Reset Code
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "3rem", fontSize: "2rem", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
