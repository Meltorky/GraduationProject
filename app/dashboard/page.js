// // /app/dashboard/page.jsx
// "use client";

// import CategoryManager from "./categoryManager/categoryManager";
// import SubCategoryManager from "./subCategoryManager/subCategoryManager";

// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 style={{ fontSize: "5em", color: "red", fontWeight: "bolder" }}>
//         Admin Dashboard
//       </h1>
//       <div>Welcome to Admin Dashboard!</div>
//       <CategoryManager />
//       <SubCategoryManager />
//     </div>
//   );
// }

// /app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import CategoryManager from "./categoryManager/categoryManager";
import SubCategoryManager from "./subCategoryManager/subCategoryManager";
import BrandManager from "./brandManager/brandManager";
import styles from "./dashboard.module.css";
import Sidebar from "./sidebar/sidebar";
import Link from "next/link";

export default function DashboardPage() {
  const [activeComponent, setActiveComponent] = useState("welcome");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation items for the sidebar and mobile dropdown
  const navItems = [
    { id: "welcome", label: "Welcome" },
    { id: "categories", label: "Category Manager" },
    { id: "subcategories", label: "SubCategory Manager" },
    { id: "brands", label: "Brand Manager" },
  ];

  // Check if on mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle page selection in mobile dropdown
  const handleSelectChange = (e) => {
    setActiveComponent(e.target.value);
  };

  // Toggle mobile sidebar
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Render the active component based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case "categories":
        return <CategoryManager />;
      case "subcategories":
        return <SubCategoryManager />;
      case "brands":
        return <BrandManager />;
      case "welcome":
      default:
        return (
          <div className={styles.welcomeContainer}>
            <h2>Welcome to Admin Dashboard!</h2>
            <p>Select an option from the menu to manage your content.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Desktop Sidebar */}
      <Sidebar
        navItems={navItems}
        activeItem={activeComponent}
        onItemClick={setActiveComponent}
        isOpen={menuOpen}
      />

      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          {isMobile && (
            <div className={styles.mobileNav}>
              <button className={styles.menuButton} onClick={toggleMenu}>
                ☰
              </button>
              <select
                className={styles.mobileSelect}
                value={activeComponent}
                onChange={handleSelectChange}
              >
                {navItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <h1>Admin Dashboard</h1>
          <button className={styles.backButton}
            style={{
              backgroundColor: "#1a1a2e",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              fontWeight: "bolder",
              fontSize: "1em",
              color: "white",
              boderRadius: "20px",
              marginLeft: "auto",
            }}
          >
            {" "}
            <Link href="/">&lt; Back Home</Link>
          </button>
        </header>
        <div className={styles.contentArea}>{renderComponent()}</div>
      </main>
    </div>
  );
}
