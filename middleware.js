// middleware.js
import { NextResponse } from "next/server";

// Simple JWT decoder function that doesn't require external libraries
function decodeJWT(token) {
  try {
    // JWT tokens are base64url encoded and have 3 parts separated by dots
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export function middleware(request) {
  console.log("Middleware running on path:", request.nextUrl.pathname);

  // Get the token from cookies - CHANGED from "jwt" to "token" to match your auth system
  const token = request.cookies.get("token")?.value;
  console.log("Token found:", token ? "Yes" : "No");

  // Admin-only routes
  const adminRoutes = ["/dashboard", "/profile", "/admin"];
  const currentPath = request.nextUrl.pathname;

  // Check if current path is an admin route
  const isAdminRoute = adminRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );

  console.log("Is admin route:", isAdminRoute);

  if (isAdminRoute) {
    // No token - redirect to login
    if (!token) {
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Decode token to check role
    const decoded = decodeJWT(token);
    console.log("Decoded token:", decoded);

    if (!decoded) {
      console.log("User is not admin, redirecting to unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (decoded.role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("User is admin, allowing access");
  }

  return NextResponse.next();
}

// Configure middleware to run on these routes
export const config = {
  matcher: [
    "/dashboard",
    // "/dashboard/:path*",
    "/admin",
    "/profile",
    "/login",
  ],
};

// lefew35865@clubemp.com
// besecab627@anlocc.com
// revahi6260@clubemp.com   //++
