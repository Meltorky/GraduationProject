// components/Footer/Footer.js
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div className={styles.companyInfo}>
            {/* <h2 className={styles.footerLogo}>YourCompany</h2> */}
            <div className={styles.logo}>
              <Link href="/">
                <img src="/images/freshCartLogo.png" alt="FreshCart Logo" />
              </Link>
            </div>{" "}
            <p className={styles.footerTagline}>
              Creating exceptional experiences since 2020
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className={styles.socialIcon}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className={styles.socialIcon}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className={styles.socialIcon}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className={styles.socialIcon}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/team">Our Team</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Services</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/services/web-development">Web Development</Link>
              </li>
              <li>
                <Link href="/services/app-development">App Development</Link>
              </li>
              <li>
                <Link href="/services/ui-design">UI/UX Design</Link>
              </li>
              <li>
                <Link href="/services/consulting">Consulting</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/resources/guides">Guides</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/support">Support</Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.footerColumn} ${styles.newsletterColumn}`}>
            <h3 className={styles.columnTitle}>Subscribe to our Newsletter</h3>
            <p className={styles.newsletterText}>
              Stay updated with our latest news and offers
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {currentYear} YourCompany. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
