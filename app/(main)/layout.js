import "@/styles/globals.css"; // Import here, NOT in nested layouts
import styles from "../page.module.css";
import { Navigator } from "../Componantes/navigator/navigator";

// app/auth/login/page.js;

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navigator />
        </header>
        {children}
      </body>
    </html>
  );
}
