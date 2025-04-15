// /app/dashboard/components/Sidebar.jsx
import styles from "../dashboard.module.css";

export default function Sidebar({ navItems, activeItem, onItemClick, isOpen }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <h2>Dashboard</h2>
      </div>
      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <button
                className={`${styles.navButton} ${
                  activeItem === item.id ? styles.active : ""
                }`}
                onClick={() => onItemClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
