"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";


export default function ActivatePage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleActivate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/active-account",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();
      console.log("[Activation Response]", data);

      if (res.ok) {
        setSuccess("Account activated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError("Activation failed. Please check your email and code.");
      }
    } catch (err) {
      console.error("[Activation Error]", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div style={{ paddingInline: "2rem", width: "40%" ,marginTop:" 4rem"}}>
      <h2 className={styles.formTitle}>Activate Your Account</h2>
      <form onSubmit={handleActivate}>
        <div>
          <br />
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.formInput}
            style={{ width: "90%", marginLeft: "-1px" }}
          />
        </div>
        <br />
        <div>
          <br />
          <input
            type="text"
            value={code}
            required
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code"
            className={styles.formInput}
            style={{
              marginTop: "-15px",
              marginBottom: "20px",
              width: "90%",
              marginLeft: "-1px",
            }}
          />
        </div>
        <br />
        <button
          className={styles.signinButton}
          style={{ width: "40%" }}
          type="submit"
        >
          Activate Account
        </button>
      </form>

      {error && (
        <p
          style={{
            color: "red",
            fontWeight: "bolder",
            fontSize: "3rem",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "green",
            fontWeight: "bolder",
            fontSize: "3rem",
            marginTop: "10px",
          }}
        >
          {success}
        </p>
      )}
    </div>
  );
}
