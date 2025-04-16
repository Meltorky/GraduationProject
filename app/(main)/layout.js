import "@/styles/globals.css"; // Import here, NOT in nested layouts
import styles from "../page.module.css";
import { Navigator } from "../Componantes/navigator/navigator";
import Footer from "../Componantes/footer/footer";

// app/auth/login/page.js;

export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <Navigator />
      </header>
      {children}
      <Footer />
    </div>
  );
}
