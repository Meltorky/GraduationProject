import styles from "../auth.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <div className={styles.bodyStyles}>
      <div className={styles.imageStyles}>
        <img src="/images/signin.png" alt="Sign In Image" />
      </div>
      <div className={styles.bodys}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Sign in to FreshCart</h1>
            <p className={styles.formSubtitle}>
              Welcome back to FreshCart! Enter your email to get started.
            </p>
            <form className={styles.signinForm}>
              <input
                type="email"
                placeholder="Email"
                className={styles.formInput}
              />
              <input
                type="password"
                placeholder="******"
                className={styles.formInput}
              />
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#" className={styles.forgotPassword}>
                  Forgot password?
                  <span
                    style={{ color: "var(--primary)", fontWeight: "bolder" }}
                  >
                    Reset It
                  </span>
                </a>
              </div>
              <button
                type="submit"
                className={styles.signinButton}
              >
                Sign In
              </button>
            </form>
            <p className={styles.signupLink}>
              Don't have an account?{" "}
              <span style={{ fontWeight: "bolder", color:"var(--primary)"}}>
                <Link style={{ marginLeft: "-8px" }} href="/register">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
          /* <div className={styles.inputStyles}>
        <h2>Sign in to FreshCart</h2>
        <small style={{ opacity: 0.5 }}>
          Welcome back to FreshCart. Enter Your Email To get started
        </small>
        <form action="" className={styles.formStyles}>
          <input type="text" placeholder="Email" />
        </form>
      </div> */
  );
}
