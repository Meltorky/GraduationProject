"use client";

import React, { useEffect, useState } from "react";
import styles from "./brandManager.module.css";
import { getToken } from "/lib/auth";

const API_BASE =
  "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Brand";


const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", categoryCode: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/get-all-brands`);
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
      await fetch(`${API_BASE}/add-brand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          brandName: formData.name,
        }),
      });
      setFormData({ name: "", categoryCode: "" });
      fetchCategories();
      console.error("Add brand Success:", err);
    } catch (err) {
      console.error("Add brand error:", err);
    }
  };

  const handleUpdate = async () => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/update-brand`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          brandCode: formData.categoryCode,
          brandName: formData.name,
        }),
      });

      setFormData({ name: "", categoryCode: "" });
      setIsEditing(false);
      fetchCategories();
    } catch (err) {
      console.error("Update brand error:", err);
    }
  };

  const handleDelete = async (code) => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/delete-brand/${code}`, {
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
      name: category.brandName,
      categoryCode: category.brandCode,
    });
    setIsEditing(true);
  };

  // Filter brands based on search term
  const filteredBrands = categories.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.brandCode.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.categoryManager}>
      <h2>Manage Brands</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Brand Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      {/* Search input */}
      <div style={{ marginBlock: "-10px" }}>
        <input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
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
          {filteredBrands.map((cat) => (
            <tr key={cat.brandCode}>
              <td>{cat.brandCode}</td>
              <td>{cat.brandName}</td>
              <td>
                <button onClick={() => handleEditClick(cat)}>Edit</button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this brand?"
                      )
                    ) {
                      handleDelete(cat.brandCode);
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
      {filteredBrands.length === 0 && (
        <div className={styles.noResults}>
          No brands found matching your search.
        </div>
      )}

      <div className={styles.resultsCount}>
        {searchTerm
          ? `Found ${filteredBrands.length} matching brands`
          : `Total: ${categories.length} brands`}
      </div>
    </div>
  );
};

export default CategoryManager;