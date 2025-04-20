// "use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "../auth.module.css";

// export default function ResetPasswordPage() {
//   const [code, setCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const defaultEmail = searchParams.get("email") || "";
//   const [email, setEmail] = useState(defaultEmail);

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();

//     // Validate password before sending
//     if (!validatePassword(password)) {
//       setPasswordError(
//         "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
//       );
//       return;
//     } else {
//       setPasswordError("");
//     }

//     setMessage("Resetting password...");

//     try {
//       const res = await fetch(
//         "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/reset-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password, code }),
//         }
//       );

//       if (!res.ok) throw new Error("Reset failed");

//       setMessage("Password reset successful. Redirecting to login...");
//       setTimeout(() => router.push("/login"), 2000);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to reset password.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px" }}>
//       <h1 style={{ marginBlock: "1rem" }}>Reset Password</h1>
//       <form onSubmit={handleReset}>
//         <input
//           type="email"
//           placeholder="Your Email"
//           required
//           value={email}
//           disabled
//           className={styles.formInput}
//         />
//         <input
//           type="text"
//           placeholder="Enter Reset Code"
//           required
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           className={styles.formInput}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.formInput}
//         />
//         {passwordError && (
//           <p style={{ color: "red", fontSize: "1rem", marginTop: "2rem" }}>
//             {passwordError}
//           </p>
//         )}
//         <button type="submit" className={styles.signinButton}>
//           Reset Password
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "../auth.module.css";

// Component that uses useSearchParams
function ResetPasswordContent() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(defaultEmail);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // Validate password before sending
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    setMessage("Resetting password...");

    try {
      const res = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, code }),
        }
      );

      if (!res.ok) throw new Error("Reset failed");

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h1 style={{ marginBlock: "1rem" }}>Reset Password</h1>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          disabled
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="Enter Reset Code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formInput}
        />
        {passwordError && (
          <p style={{ color: "red", fontSize: "1rem", marginTop: "2rem" }}>
            {passwordError}
          </p>
        )}
        <button type="submit" className={styles.signinButton}>
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

// Main page component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div style={{ maxWidth: "500px" }}>
          <h1 style={{ marginBlock: "1rem" }}>Loading Reset Password...</h1>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
