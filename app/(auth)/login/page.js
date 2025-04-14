"use client";
import { useState } from "react";
import styles from "../auth.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { login } from "/lib/auth";
import { useAuth } from "/app/Componantes/AuthProvider";
import { setToken } from "/lib/auth"; // Import your setToken method

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      setUser({ token: data.token }); // or decode and store user info here
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed");
    }

    // In your middleware.js, add this check for the login route
    if (currentPath === "/login" && token) {
      const decoded = decodeJWT(token);
      return NextResponse.redirect(
        new URL(decoded?.role === "Admin" ? "/dashboard" : "/", request.url)
      );
    }
  };

  // googleLoginWindow = window.open()
  // googleLoginWindow = window.open()
  // googleLoginWindow = window.open()

  // Google login button click handler

  // googleLoginWindow = window.open()
  // googleLoginWindow = window.open()
  // googleLoginWindow = window.open()
  return (
    <div className={styles.bodyStyles}>
      <div className={styles.imageStyles}>
        <img src="/images/signin.png" alt="Sign In Image" />
      </div>
      <div className={styles.bodys}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Sign in to FreshCart</h1>
            <p className={styles.formSubtitle}>
              Welcome back to FreshCart! Enter your email to get started.
            </p>
            <form onSubmit={handleSubmit} className={styles.signinForm}>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="******"
                className={styles.formInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" /> Remember Me
                </label>
                {/* <a href="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                  <span
                    style={{ color: "var(--primary)", fontWeight: "bolder" }}
                  >
                    Reset It
                  </span>
                </a> */}
                <Link href="/forget-password" className={styles.forgotPassword}>
                  Forgot password?
                  <span
                    style={{ color: "var(--primary)", fontWeight: "bolder" }}
                  >
                    Reset It
                  </span>
                </Link>
              </div>
              <button type="submit" className={styles.signinButton}>
                Sign In
              </button>
              <p
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                or
              </p>
              <a
                href="https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/google-login"
                className={styles.signinButtonGoogle}
              >
                <FcGoogle style={{ width: "20px", height: "20px" }} />
                Sign In with Google
              </a>
            </form>
            <p className={styles.signupLink}>
              Don't have an account?{" "}
              <span style={{ fontWeight: "bolder", color: "var(--primary)" }}>
                <Link style={{ marginLeft: "-8px" }} href="/register">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
