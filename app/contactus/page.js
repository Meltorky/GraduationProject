// app/contact/page.js
import React from "react";
import ContactForm from "./ContactForm";
import styles from "./contactus.module.css";

export const metadata = {
  title: "Contact Us | Your Company",
  description: "Get in touch with our team for any questions or inquiries",
};

export default function ContactPage() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHero}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>We'd love to hear from you</p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri, 9am-5pm</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Email</h3>
            <p>hello@yourcompany.com</p>
            <p>We'll respond within 24 hours</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Office</h3>
            <p>123 Business Avenue</p>
            <p>San Francisco, CA 94107</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Send us a message</h2>
          <ContactForm />
        </div>
      </div>
{/* 
      <div className={styles.mapSection}>
        <h2 className={styles.sectionTitle}>Find us</h2>
        <div className={styles.map}>
          <div className={styles.mapPlaceholder}>
            <p>Map integration would go here</p>
            <p>You can integrate Google Maps or another mapping service</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
