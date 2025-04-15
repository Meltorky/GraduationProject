"use client";

import React, { useEffect, useState } from "react";
import styles from "./subCategoryManager.module.css";
import { getToken } from "/lib/auth";

const API_BASE =
  "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/SubCategory";

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
      const res = await fetch(`${API_BASE}/get-all-subcategories`);
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
      await fetch(`${API_BASE}/add-subcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          categoryCode: formData.categoryCode,
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
      await fetch(`${API_BASE}/update-subcategory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryCode: formData.categoryCode,
          subCategoryCode: formData.subCategoryCode,
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
      await fetch(`${API_BASE}/delete-subcategory/${code}`, {
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
    setFormData({
      name: category.name,
      categoryCode: category.categoryCode,
      subCategoryCode: category.subCategoryCode,
    });
    setIsEditing(true);
  };

  return (
    <div className={styles.categoryManager}>
      <h2>Manage Subcategories</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Category Code"
          value={formData.categoryCode}
          onChange={(e) =>
            setFormData({ ...formData, categoryCode: e.target.value })
          }
          disabled={isEditing} // disable editing categoryCode during update
        />
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
            <th>Category Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.subCategoryCode}>
              <td>{cat.subCategoryCode}</td>
              <td>{cat.name}</td>
              <td>{cat.categoryCode}</td>
              <td>
                <button onClick={() => handleEditClick(cat)}>Edit</button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this subcategory?"
                      )
                    ) {
                      handleDelete(cat.subCategoryCode);
                    }
                  }}
                  style={{ backgroundColor: "var(--accent)" }}
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
