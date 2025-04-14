// /app/dashboard/page.jsx
"use client";

import CategoryManager from "./categoryManager/categoryManager";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: "5em", color: "red", fontWeight: "bolder" }}>
        Admin Dashboard
      </h1>
      <div>Welcome to Admin Dashboard!</div>
      <CategoryManager />
    </div>
  );
}
