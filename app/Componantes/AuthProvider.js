// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { getToken } from "/lib/auth";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); //

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser({ token, ...decoded });
//       } catch (err) {
//         console.error("[AuthProvider] Failed to decode token");
//       }
//     }
//     setLoading(false); //  Done loading
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// componants/AuthPovider.js

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "/lib/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log("[AuthProvider] Token from cookies:", token);

    if (token && token !== "undefined") {
      try {
        const decoded = jwtDecode(token);
        console.log("[AuthProvider] Decoded user:", decoded);
        setUser({ token, ...decoded });
      } catch (err) {
        console.error("[AuthProvider] Failed to decode token:", err);
        setUser(null);
      }
    } else {
      console.log("[AuthProvider] No valid token found");
      setUser(null);
    }

    setLoading(false); // Only after finishing
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
