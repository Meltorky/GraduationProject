// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./AuthProvider";

// const ProtectedRoute = ({ children }) => {
//   const auth = useAuth() || {}; // Fix null
//   const { user, loading = true } = auth;
//   const router = useRouter();

//   useEffect(() => {
//     console.log("[ProtectedRoute] loading:", loading);
//     console.log("[ProtectedRoute] user:", user);

//     if (!loading && !user) {
//       console.log("[ProtectedRoute] No user, redirecting to login...");
//       router.push("/login");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div>Checking login...</div>;
//   }

//   if (!user) {
//     return null;
//   }

//   return children;
// };

// export default ProtectedRoute;
