// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./categoryManager.module.css";

// const API_BASE =
//   "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Category";

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({ name: "", categoryCode: "" });
//   const [isEditing, setIsEditing] = useState(false);

//   const fetchCategories = async () => {
//     const res = await fetch(`${API_BASE}/get-all-categories`);
//     const data = await res.json();
//     setCategories(data || []);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAdd = async () => {
//     await fetch(`${API_BASE}/add-category?name=${formData.name}`, {
//       method: "POST",
//     });
//     setFormData({ name: "", categoryCode: "" });
//     fetchCategories();
//   };

//   const handleEdit = (cat) => {
//     setFormData({ name: cat.name, categoryCode: cat.categoryCode });
//     setIsEditing(true);
//   };

//   const handleUpdate = async () => {
//     await fetch(
//       `${API_BASE}/update-category?categoryCode=${formData.categoryCode}&name=${formData.name}`,
//       {
//         method: "PUT",
//       }
//     );
//     setFormData({ name: "", categoryCode: "" });
//     setIsEditing(false);
//     fetchCategories();
//   };

//   const handleDelete = async (code) => {
//     await fetch(`${API_BASE}/delete-category/${code}`, {
//       method: "DELETE",
//     });
//     fetchCategories();
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Manage Categories</h2>

//       <div className={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Category Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         {isEditing ? (
//           <button onClick={handleUpdate}>Update</button>
//         ) : (
//           <button onClick={handleAdd}>Add</button>
//         )}
//       </div>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Category Code</th>
//             <th>Category Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((cat) => (
//             <tr key={cat.categoryCode}>
//               <td>{cat.categoryCode}</td>
//               <td>{cat.name}</td>
//               <td>
//                 <button onClick={() => handleEdit(cat)}>Edit</button>
//                 <button onClick={() => handleDelete(cat.categoryCode)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CategoryManager;

"use client";

import React, { useEffect, useState } from "react";
import styles from "./categoryManager.module.css";
import { getToken } from "/lib/auth";

const API_BASE =
  "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Category";

// // Helper to get token from cookies
// const getTokenFromCookies = () => {
//   const cookie = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token="));
//   return cookie ? cookie.split("=")[1] : null;
// };

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", categoryCode: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/get-all-categories`);
      const data = await res.json();
      //   setCategories(data);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/add-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      });
      setFormData({ name: "", categoryCode: "" });
      fetchCategories();
    } catch (err) {
      console.error("Add category error:", err);
    }
  };

  const handleUpdate = async () => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/update-category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryCode: formData.categoryCode,
          name: formData.name,
        }),
      });

      setFormData({ name: "", categoryCode: "" });
      setIsEditing(false);
      fetchCategories();
    } catch (err) {
      console.error("Update category error:", err);
    }
  };

  const handleDelete = async (code) => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/delete-category/${code}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories();
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  const handleEditClick = (category) => {
    setFormData({ name: category.name, categoryCode: category.categoryCode });
    setIsEditing(true);
  };

  return (
    <div className={styles.categoryManager}>
      <h2>Manage Categories</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryCode}>
              <td>{cat.categoryCode}</td>
              <td>{cat.name}</td>
              <td>
                <button onClick={() => handleEditClick(cat)}>Edit</button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this category?"
                      )
                    ) {
                      handleDelete(cat.categoryCode);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
