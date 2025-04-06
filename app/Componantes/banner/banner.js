"use client";

import { useState, useEffect } from "react";
import styles from "./banner.module.css"; // Create Banner.module.css

export const Banner = ({ interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/images/slide2.jpg", "/images/slide1.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className={styles.banner}>
      <div className={styles["banner-content"]}>
        <h5>Free Shipping - orders over £500</h5>
        <h2>
          We deliver all<span>Groceries</span>
        </h2>
        <h2>to your doorstep</h2>
        <p>
          Get the freshest groceries delivered to your home, Save time, Keep calm, Skip the
          lines. and enjoy the commerance of quick, effective delivery.
          <br />
        </p>
        <button className={styles["banner-button"]}>Show Now</button>
      </div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={styles["banner-image"]}
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        />
      ))}
    </div>
  );
};
