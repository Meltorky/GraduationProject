import "@/styles/globals.css"; // Import here, NOT in nested layouts
import styles from "./auth.module.css";
import Link from "next/link";
import { AuthProvider } from "../Componantes/AuthProvider";

// app/auth/login/page.js;

export default function AuthLayout({ children }) {
  return (
    <div>
      <header className="header">
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link style={{ marginLeft: "-8px" }} href="/">
              <img src="/images/freshcartLogo.png" alt="FreshCart Logo" />
            </Link>
          </div>
          {/* <div className="auth-links">
            <span>Already have an account?           
              <Link href="/login">Login</Link>
            </span>
          </div> */}
        </div>
      </header>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
