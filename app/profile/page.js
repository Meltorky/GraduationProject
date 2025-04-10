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

import { useEffect, useState } from "react";
import { getToken } from "/lib/auth";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

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

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {Object.entries(formData).map(([key, value]) => {
        if (key === "id") {
          return null; // Don't render anything for the "id" key
        }

        if (key === "email") {
          return (
            <div key={key} className="mb-4">
              <label className="block font-semibold">{key}</label>
              <input
                className="w-full border p-2 rounded bg-gray-100"
                type="email"
                name={key}
                value={value}
                disabled
              />
            </div>
          );
        }

        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize">{key}</label>
            <input
              className="w-full border p-2 rounded"
              type={key === "dateOfBirth" ? "date" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        );
      })}

      {isEditing ? (
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
