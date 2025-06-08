// app/privacy-policy/page.js
import styles from "./privacy.module.css";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Your Company",
  description:
    "Learn about how we collect, use, and protect your personal information",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 17, 2025";

  return (
    <div className={styles.privacyContainer}>
      <section className={styles.privacyHeader}>
        <h1 className={styles.pageTitle}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
      </section>

      <div className={styles.privacyContent}>
        <div className={styles.tableOfContents}>
          <div className={styles.tocHeader}>
            <h2>Contents</h2>
          </div>
          <ul className={styles.tocList}>
            <li>
              <a href="#introduction">1. Introduction</a>
            </li>
            <li>
              <a href="#information-we-collect">2. Information We Collect</a>
            </li>
            <li>
              <a href="#how-we-use-information">
                3. How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#sharing-information">4. Sharing Your Information</a>
            </li>
            <li>
              <a href="#cookies">5. Cookies and Similar Technologies</a>
            </li>
            <li>
              <a href="#data-security">6. Data Security</a>
            </li>
            <li>
              <a href="#your-rights">7. Your Rights and Choices</a>
            </li>
            <li>
              <a href="#children">8. Children's Privacy</a>
            </li>
            <li>
              <a href="#changes">9. Changes to This Privacy Policy</a>
            </li>
            <li>
              <a href="#contact-us">10. Contact Us</a>
            </li>
          </ul>
        </div>

        <div className={styles.policySection}>
          <section id="introduction" className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p>
              At Your Company ("we," "our," or "us"), we respect your privacy
              and are committed to protecting your personal information. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree
              with the terms of this Privacy Policy, please do not access the
              site or use our services.
            </p>
          </section>

          <section id="information-we-collect" className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>

            <h3 className={styles.subsectionTitle}>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul>
              <li>Register on our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Fill out a form</li>
              <li>Contact us</li>
              <li>Use our services</li>
            </ul>
            <p>
              The personal information we collect may include your name, email
              address, phone number, billing address, and other information you
              choose to provide.
            </p>

            <h3 className={styles.subsectionTitle}>
              Automatically Collected Information
            </h3>
            <p>
              When you visit our website, we may automatically collect certain
              information about your device, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages you view</li>
              <li>Time and date of your visit</li>
            </ul>
          </section>

          <section id="how-we-use-information" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              3. How We Use Your Information
            </h2>
            <p>
              We may use the information we collect for various purposes,
              including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Understand and analyze how you use our services</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you, either directly or through one of our
                partners
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
              <li>
                For compliance purposes, including enforcing our Terms of
                Service
              </li>
            </ul>
          </section>

          <section id="sharing-information" className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Sharing Your Information</h2>
            <p>
              We may share your information with third parties in certain
              situations, including:
            </p>
            <ul>
              <li>
                <strong>Business Partners:</strong> We may share your
                information with our business partners to offer you certain
                products, services, or promotions.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party vendors, service providers,
                contractors, or agents who perform services for us.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information where required to do so by law or in response to
                valid requests by public authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer
                your information in connection with a merger, sale of company
                assets, financing, or acquisition of all or a portion of our
                business.
              </li>
            </ul>
          </section>

          <section id="cookies" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              5. Cookies and Similar Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent.
            </p>
            <p>We use cookies for:</p>
            <ul>
              <li>Keeping you signed in</li>
              <li>Understanding how you use our website</li>
              <li>Improving user experience</li>
              <li>Analytics purposes</li>
            </ul>
          </section>

          <section id="data-security" className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section id="your-rights" className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Your Rights and Choices</h2>
            <p>
              Depending on where you are located, you may have certain rights
              regarding your personal information, including:
            </p>
            <ul>
              <li>
                The right to access personal information we hold about you
              </li>
              <li>
                The right to request that we correct any personal information we
                hold about you
              </li>
              <li>
                The right to request that we delete any personal information we
                hold about you
              </li>
              <li>The right to opt-out of marketing communications</li>
              <li>The right to withdraw consent</li>
              <li>The right to data portability</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              information provided in the "Contact Us" section.
            </p>
          </section>

          <section id="children" className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Children's Privacy</h2>
            <p>
              Our services are not intended for use by children under the age of
              13. We do not knowingly collect personally identifiable
              information from children under 13. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact us.
            </p>
          </section>

          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date at the top of this Privacy
              Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>

          <section id="contact-us" className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong>                         Contact@smarket.com


              </p>
              <p>
                <strong>Phone:</strong>             +20 123-4567-890

              </p>
              <p>
                <strong>Address:</strong>             FCDS Business Avenue,
              Alexandria, EG 21532
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
