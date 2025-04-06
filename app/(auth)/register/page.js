import styles from "../auth.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.bodyStyles}>
      <div className={styles.imageStyles}>
        <img src="/images/signup.png" alt="Sign In Image" />
      </div>
      <div className={styles.bodys}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Get Start Shopping</h1>
            <p className={styles.formSubtitle}>
              Welcome back to FreshCart! Enter your email to get started.
            </p>
            <form className={styles.signinForm}>
              <input
                type="text"
                placeholder="Name"
                className={styles.formInput}
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.formInput}
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.formInput}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.formInput}
              />
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  paddingBlock: "16px",
                }}
                className={styles.signinButton}
              >
                Register
              </button>
            </form>
            <p className={styles.signupLink}>
              Already have an account?{" "}
              <span style={{ color: "var(--primary)", fontWeight: "bolder" }}>
                <Link style={{ marginLeft: "-8px" }} href="/login">
                  Sign In
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className={styles.inputStyles}>
        <h2>Sign in to FreshCart</h2>
        <small style={{ opacity: 0.5 }}>
          Welcome back to FreshCart. Enter Your Email To get started
        </small>
        <form action="" className={styles.formStyles}>
          <input type="text" placeholder="Email" />
        </form>
      </div> */}
    </div>
  );
}
