import Link from "next/link";
import styless from "../app/(auth)/auth.module.css";

export default function NotFound() {
  // Define styles as a constant object
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "80px",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "1rem",
    },
    text: {
      fontSize: "1.2rem",
      color: "#666",
    },
    signinButton: {
      backgroundColor: "var(--primary)" /* Green button */,
      color: "white",
      padding: "12px 30px",
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "bolder",
      cursor: "pointer",
      transition: 'background-color 0.3s', // Fixed syntax
      width: "100%",
    },
    spanOfButton: {
      marginTop: "60px",
      paddingLeft: "-50px",
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.heading}>Something Wrong Here !</h1>
        <p style={styles.text}>We can not find the page you're looking for.</p>
        <p style={styles.text}>
          Check out our help center or head back to home
        </p>
        <div style={styles.spanOfButton}>
          <Link
            style={{
              ...styles.signinButton,
              backgroundColor: "var(--black)",
              marginInlineStart: "-0.5px",
            }}
            href="/register"
          >
            Contact Us
          </Link>
          <Link style={styles.signinButton} href="http://localhost:3000">
            Back Home
          </Link>
        </div>
      </div>
      <div>
        <img src="/images/error.png" alt="" />
      </div>
    </div>
  );
}
