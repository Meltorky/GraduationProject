// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { setCookie } from "cookies-next";

// export default function GoogleBridgePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   useEffect(() => {
//     if (token) {
//       // Store token in cookies (adjust path and expiry as needed)
//       setCookie("token", token, { path: "/" });

//       // Redirect to home
//       router.push("/");
//     }
//   }, [token]);

//   return <p style={{fontWeight:"bolder",margin:"20px",fontSize:"3rem",color:"var(--primary)"}}>Redirecting...</p>;
// }

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { Suspense } from "react";

// Component that uses useSearchParams
function GoogleBridgeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Store token in cookies (adjust path and expiry as needed)
      setCookie("token", token, { path: "/" });
      // Redirect to home
      router.push("/");
    }
  }, [token]);

  return (
    <p
      style={{
        fontWeight: "bolder",
        margin: "20px",
        fontSize: "3rem",
        color: "var(--primary)",
      }}
    >
      Redirecting...
    </p>
  );
}

// Main page component with Suspense boundary
export default function GoogleBridgePage() {
  return (
    <Suspense
      fallback={
        <p
          style={{
            fontWeight: "bolder",
            margin: "20px",
            fontSize: "3rem",
            color: "var(--primary)",
          }}
        >
          Loading...
        </p>
      }
    >
      <GoogleBridgeContent />
    </Suspense>
  );
}
