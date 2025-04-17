// // /app/profile/page.js
// "use client";

// import styles from "./profile.module.css";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getToken } from "/lib/auth";
// import { jwtDecode } from "jwt-decode";
// import {
//   FaHome,
//   FaCity,
//   FaGlobe,
//   FaMapPin,
//   FaPhone,
//   FaVenusMars,
//   FaBirthdayCake,
// } from "react-icons/fa";

// export default function ProfilePage() {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = getToken();
//     console.log("[ProfilePage] Token from cookies:", token);

//     if (!token || token === "undefined") {
//       console.log("[ProfilePage] No token found, redirecting to login...");
//       router.push("/login");
//       return;
//     }

//     let decoded;
//     try {
//       decoded = jwtDecode(token);
//       console.log("[ProfilePage] Decoded token:", decoded);
//     } catch (err) {
//       console.error("[ProfilePage] Invalid token:", err);
//       router.push("/unauthorized");
//       return;
//     }

//     if (decoded.role !== "Customer") {
//       console.warn("[ProfilePage] Role is not Customer:", decoded.role);
//       router.push("/unauthorized");
//       return;
//     }

//     // Fetch profile data
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(
//           "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/profile",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch profile");

//         const data = await res.json();
//         console.log("[ProfilePage] Profile data:", data);
//         setProfileData(data);
//       } catch (error) {
//         console.error("[ProfilePage] Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [router]);

//   if (loading) return <div>Loading profile...</div>;

//   if (!profileData) return <div>Failed to load profile.</div>;

// //   return (
// //     <div>
// //       <h1>Customer Profile</h1>
// //       <pre>{JSON.stringify(profileData, null, 2)}</pre>
// //     </div>
// //   );

// const customer = profileData;
// return (
//   <div className={styles.container}>
//     <h1>Customer Profile</h1>
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <h2>{customer.name}</h2>
//         <p>{customer.email}</p>
//       </div>
//       <div className={styles.details}>
//         <div className={styles.item}>
//           <FaHome className={styles.icon} />
//           <span className={styles.label}>Address:</span>
//           <span className={styles.value}>{customer.address}</span>
//         </div>
//         <div className={styles.item}>
//           <FaCity className={styles.icon} />
//           <span className={styles.label}>City:</span>
//           <span className={styles.value}>{customer.city}</span>
//         </div>
//         <div className={styles.item}>
//           <FaGlobe className={styles.icon} />
//           <span className={styles.label}>Country:</span>
//           <span className={styles.value}>{customer.country}</span>
//         </div>
//         <div className={styles.item}>
//           <FaMapPin className={styles.icon} />
//           <span className={styles.label}>Postal Code:</span>
//           <span className={styles.value}>{customer.postalCode}</span>
//         </div>
//         <div className={styles.item}>
//           <FaPhone className={styles.icon} />
//           <span className={styles.label}>Phone:</span>
//           <span className={styles.value}>{customer.phoneNumber}</span>
//         </div>
//         <div className={styles.item}>
//           <FaVenusMars className={styles.icon} />
//           <span className={styles.label}>Gender:</span>
//           <span className={styles.value}>
//             {customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1)}
//           </span>
//         </div>
//         <div className={styles.item}>
//           <FaBirthdayCake className={styles.icon} />
//           <span className={styles.label}>Date of Birth:</span>
//           <span className={styles.value}>
//             {new Date(customer.dateOfBirth).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

"use client";

import Link from "next/link";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { getToken } from "/lib/auth";
import { jwtDecode } from "jwt-decode";
import { removeToken } from "/lib/auth";
import { useRouter } from "next/navigation"; // Add this at top
import {
  FaHome,
  FaCity,
  FaGlobe,
  FaMapPin,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaUser,
  FaEnvelope,
  faArrowLeft,
} from "react-icons/fa";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Inside component

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

  useEffect(() => {
    const fetchData = async () => {
      if (!token) router.push("/login"); // Redirect to the home page
      try {
        const res = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        console.log("[Profile] Data:", data);
        setUserData(data);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        console.error("[Profile] Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/edit-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setUserData(formData);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("[Profile] Update error:", err);
      alert("Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!formData) return <div>Profile not found.</div>;

  const displayNameMap = {
    name: "Full Name",
    email: "Email Address",
    address: "Street Address",
    city: "City",
    country: "Country",
    postalCode: "Postal Code",
    phoneNumber: "Phone Number",
    gender: "Gender",
    dateOfBirth: "Date of Birth",
    // Add other key mappings as needed
  };

  const displayIconMap = {
    name: <FaUser />,
    email: <FaEnvelope />,
    address: <FaHome />,
    city: <FaCity />,
    country: <FaGlobe />,
    postalCode: <FaMapPin />,
    phoneNumber: <FaPhone />,
    gender: <FaVenusMars />,
    dateOfBirth: <FaBirthdayCake />,
    // Add other key mappings as needed
  };

  // delete the account
  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/delete-account",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Account deleted successfully.");
        removeToken(); // remove from cookies
        router.push("/login"); // or redirect to main: router.push("/")
      } else {
        alert("You Can't Delete Your Account Since You Ordered Before !");
      }
    } catch (error) {
      console.error("[Delete Account] Error:", error);
      alert("Error deleting account.");
    }
  };

  // handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?"); // Add confirmation
    if (confirmLogout) {
      removeToken(); // Remove the token from cookies
      router.push("/login"); // Redirect to the login page after logout
      alert("You have been logged out successfully."); // Add alert
    } else {
      alert("Logout cancelled.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.card} style={{ padding: "40px", margin: "40px" }}>
        <div className={styles.divHeader}>
          <h1 className={styles.header}>Profile Details</h1>
          <Link
            href="/"
            style={{
              marginTop: "-30px",
              marginLeft: "100px",
              marginRight: "1px",
            }}
          >
            <button
              className={styles.button}
              style={{ backgroundColor: "var(--primary)" }}
            >
              &lt; Back To Home
            </button>
          </Link>
        </div>

        {Object.entries(formData).map(([key, value]) => {
          const displayName = displayNameMap[key] || key; // Use display name or original key
          const displayIcon = displayIconMap[key]; // Use display name or original key

          if (key === "id") {
            return null; // Don't render anything for the "id" key
          }

          if (key === "email") {
            return (
              <div key={key} className={styles.item}>
                <span className={styles.icon}>{displayIcon}</span>
                <label className={styles.label}>{displayName}</label>
                <input
                  className={styles.input}
                  type="email"
                  name={key}
                  value={value}
                  disabled
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "var(--primary)",
                  }}
                />
              </div>
            );
          }

          return (
            <div key={key} className={styles.item}>
              <span className={styles.icon}>{displayIcon}</span>
              <label className={styles.label}>{displayName}</label>
              <input
                className="w-full border p-2 rounded"
                type={key === "dateOfBirth" ? "date" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  borderColor: "var(--primary)",
                }}
              />
            </div>
          );
        })}

        {isEditing ? (
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className={styles.button}
              style={{ backgroundColor: "var(--secondary)" }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={styles.button}
              style={{ backgroundColor: "var(--gray)" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={styles.button}
            style={{ backgroundColor: "var(--primary)" }}
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={handleLogout}
          className={styles.button}
          style={{ backgroundColor: "var(--accent)" }}
        >
          Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          className={styles.button}
          style={{ backgroundColor: "var(--accent)" }}
          hidden={isAdmin}
          alert={isAdmin ? "Admin cannot delete their account" : ""}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
