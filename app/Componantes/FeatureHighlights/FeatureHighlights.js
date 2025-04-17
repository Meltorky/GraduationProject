// components/FeatureHighlights/FeatureHighlights.js
import React from "react";
import styles from "./FeatureHighlights.module.css";

const FeatureHighlights = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "10 minute grocery now",
      description:
        "Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
          <path d="M16.5 9.4L7.55 4.24" />
          <path d="M3.29 7L12 12l8.71-5" />
          <path d="M12 22V12" />
          <circle cx="18.5" cy="15.5" r="2.5" />
          <path d="M20.5 13.5L22 12" />
          <path d="M20.5 17.5L22 19" />
          <path d="M16.5 17.5L15 19" />
          <path d="M16.5 13.5L15 12" />
        </svg>
      ),
      title: "Best Prices & Offers",
      description:
        "Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      ),
      title: "Wide Assortment",
      description:
        "Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
        </svg>
      ),
      title: "Easy Returns",
      description:
        "Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked policy.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
