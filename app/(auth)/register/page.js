"use client";
import { useState } from "react";
import styles from "../auth.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "address",
    city: "city",
    country: "country",
    postalCode: "0000",
    phoneNumber: "+20000000000",
    gender: "female",
    dateOfBirth: "",
  });

  const [step, setStep] = useState("register"); // or "activate"
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      alert("Registered! Check your email for the code.");
      setStep("activate");
    } else {
      alert("Failed to register");
    }
  };

  const handleActivate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/active-account",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code }),
      }
    );

    if (res.ok) {
      alert("Activated! Logging in...");
      window.location.href = `/login?email=${form.email}`;
    } else {
      alert("Activation failed");
    }
  };

  return (
    <div className={styles.bodyStyles}>
      <div className={styles.imageStyles}>
        <img src="/images/signup.png" alt="Sign In Image" />
      </div>
      <div className={styles.bodys}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Get Start Shopping</h1>
            <p className={styles.formSubtitle}>
              Welcome back to FreshCart! Enter your email to get started.
            </p>
            {step === "register" ? (
              <form onSubmit={handleRegister}>
                {/* {Object.keys(form).map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      placeholder={field}
                      type={field === "password" ? "password" : "text"}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </div>
                ))} */}

                <a
                  href="https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/google-login"
                  className={styles.signinButtonGoogle}
                >
                  <FcGoogle style={{ width: "20px", height: "20px" }} />
                  Sign In with Google
                </a>
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
                <input
                  type="text"
                  placeholder="Name"
                  className={styles.formInput}
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.formInput}
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.formInput}
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  placeholder="Date Of Birth"
                  className={styles.formInput}
                  value={form.dateOfBirth}
                  name="dateOfBirth"
                  onChange={handleChange}
                />
                {/* <select
                  className={styles.formInput}
                  value={form.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select> */}
                <button
                  type="submit"
                  className={styles.signinButton}
                  style={{
                    marginTop: "10px",
                    paddingBlock: "16px",
                  }}
                >
                  Register
                </button>
              </form>
            ) : (
              <form onSubmit={handleActivate}>
                <h2 className={styles.formTitle}>Activate Account</h2>
                <p className={styles.formSubtitle}>
                  We sent a code to your email.
                </p>
                <input
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter activation code"
                  required
                  className={styles.formInput}
                />
                <button
                  type="submit"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    paddingBlock: "16px",
                  }}
                  className={styles.signinButton}
                >
                  Activate
                </button>
              </form>
            )}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* <form className={styles.signinForm}>
              <input
                type="text"
                placeholder="Name"
                className={styles.formInput}
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.formInput}
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.formInput}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.formInput}
              />
              <input
                type="date"
                placeholder="Date Of Birth"
                className={styles.formInput}
              />
              <select className={styles.formInput}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  paddingBlock: "16px",
                }}
                className={styles.signinButton}
              >
                Register
              </button>
            </form> */}
            <p className={styles.signupLink}>
              Already have an account?{" "}
              <span style={{ color: "var(--primary)", fontWeight: "bolder" }}>
                <Link style={{ marginLeft: "-8px" }} href="/login">
                  Sign In
                </Link>
              </span>
            </p>
            <p className={styles.signupLink} style={{ marginTop: "10px" }}>
              Activate your email address?{" "}
              <span style={{ color: "var(--primary)", fontWeight: "bolder" }}>
                <Link style={{ marginLeft: "-8px" }} href="/login">
                  Activate{" "}
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className={styles.inputStyles}>
        <h2>Sign in to FreshCart</h2>
        <small style={{ opacity: 0.5 }}>
          Welcome back to FreshCart. Enter Your Email To get started
        </small>
        <form action="" className={styles.formStyles}>
          <input type="text" placeholder="Email" />
        </form>
      </div> */}
    </div>
  );
}
