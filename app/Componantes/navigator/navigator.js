"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigator.module.css";
import CartSidebar from "../CartSidebar/CartSidebar.jsx"; // Import the cart sidebar component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "@/lib/auth"; // Adjust the import path as necessary
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
export const Navigator = () => {
  // handle search
  const [searchValue, setSearchValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push("/products");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // handle cart sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle cart sidebar
  const toggleCart = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsCartOpen((prevState) => !prevState);
  };

  const token = getToken();

  // if admin, disable the buttom
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        if (decoded.role === "Admin") {
          setIsAdmin(true);
          console.log("Admin role detected:", decoded.role);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    } else {
      console.log("No token found.");
    }
  }, []);

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        if (decoded.role === "Admin" && decoded.role === "Customer") {
          setIsUser(true);
          console.log("Admin role detected:", decoded.role);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    } else {
      console.log("No token found.");
    }
  }, []);

  const getCartId = () => {
    if (!token) return null;

    try {
      // Assuming token is JWT, extract nameid from payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.nameid;
    } catch (error) {
      console.error("Error extracting cartId from token:", error);
      return null;
    }
  };
  const cartId = getCartId();

  // handle voice search

  // Convert audio blob to MP3 (using Web Audio API approximation)
  const convertToMp3 = async (audioBlob) => {
    // For actual MP3 conversion, you'd typically need a library like lamejs
    // For now, we'll send the original audio format and let the server handle it
    // Most modern transcription services accept various audio formats
    return audioBlob;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        await processAudio(audioBlob);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Process audio and send to transcription service
  const processAudio = async (audioBlob) => {
    setIsProcessing(true);

    try {
      // Convert to MP3 (simplified - you may want to use a proper MP3 encoder)
      const mp3Blob = await convertToMp3(audioBlob);

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", mp3Blob, "audio.mp3");

      // Send to transcription endpoint
      const response = await fetch(
        "https://mohamed-essam0-whisper-fastapi.hf.space/transcribe/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Assuming the API returns text in a 'text' field
        const transcribedText = result.text || result.transcription || "";
        setSearchValue(transcribedText);
      } else {
        console.error("Transcription failed:", response.statusText);
        alert("Voice transcription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Error processing voice input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle recording
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span style={{ pointerEvents: "none", cursor: "default" }}>
            £ EGP
          </span>
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">
            <span>Privacy</span>
          </Link>
        </div>
        <div className={styles.topBarRight}>
          <Link href="/contactus" target="_blank" rel="noopener noreferrer">
            <span>Contact Us</span>
          </Link>
          <Link href="/about" target="_blank" rel="noopener noreferrer">
            <span>About</span>
          </Link>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/freshcartLogo.png" alt="FreshCart Logo" />
          </Link>
        </div>
        {/* <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Welcome to Smarket"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div> */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Welcome to Smarket"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            // onKeyPress={handleKeyPress}
            disabled={isProcessing}
          />

          <button
            className={`${styles.micButton} ${
              isRecording ? styles.recording : ""
            }`}
            onClick={handleMicClick}
            disabled={isProcessing}
            title={isRecording ? "Stop recording" : "Start voice search"}
          >
            {isProcessing ? (
              // Processing spinner
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className={styles.spinner}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="31.416"
                  strokeDashoffset="31.416"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    dur="2s"
                    values="0 31.416;15.708 15.708;0 31.416"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    dur="2s"
                    values="0;-15.708;-31.416"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            ) : (
              // Microphone icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isRecording ? "red" : "currentColor"}
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            )}
          </button>

          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className={styles.navIcons}>
          <Link href={`/wishlist/${cartId}`} className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p>Like</p>
          </Link>
          <Link href="/profile" className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <p style={{ fontSize: "0.93rem" }}>Profile</p>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg> */}
          </Link>
          <Link href="/invoice" className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <rect x="3" y="8" width="18" height="14" rx="2" />
              <path d="M12 8V22" />
              <path d="M19 8V5a2 2 0 0 0-2-2h-2.5" />
              <path d="M5 8V5a2 2 0 0 1 2-2h2.5" />
              <path d="M12 5V2" />
            </svg>
            <p>Order</p>
          </Link>
          <a onClick={toggleCart} className={styles.iconHover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="var(--primary)"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="10" y1="11" x2="14" y2="11" />
            </svg>
            <p>Cart</p>
          </a>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navLinks}>
          <Link href="/products" className={styles.hamburger}>
            <FontAwesomeIcon
              icon={faListUl}
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            All Products
          </Link>
          <Link href="/">Home</Link>
          <Link href="/login" hidden={!isUser}>
            Login
          </Link>
          <Link href="/register" hidden={!isUser}>
            Register
          </Link>
          <a onClick={toggleCart}>Cart</a>
          <Link href="/dashboard" hidden={!isAdmin}>
            Dashboard
          </Link>
          <Link href="/profile">Profile</Link>
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};
