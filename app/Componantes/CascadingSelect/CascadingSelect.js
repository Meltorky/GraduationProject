"use client";
import { useEffect, useState } from "react";
import styles from "./CascadingSelect.module.css";
import Link from "next/link";
export default function CategorySelector({
  categoryCode,
  subCategoryCode,
  setFilters,
}) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Category/get-all-categories"
        );
        const subRes = await fetch(
          "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/SubCategory/get-all-subcategories"
        );
        const categories = await catRes.json();
        const subcategories = await subRes.json();
        setCategories(categories);
        setSubcategories(subcategories);
      } catch (err) {
        console.error("Error fetching categories or subcategories:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categoryCode) {
      const filtered = subcategories.filter(
        (sub) => sub.categoryCode === categoryCode
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [categoryCode, subcategories]);

  const handleCategoryChange = (e) => {
    const newCategoryCode = e.target.value;
    setFilters({
      categoryCode: newCategoryCode,
      subCategoryCode: "", // reset subcategory when changing category
    });
  };

  const handleSubcategoryChange = (e) => {
    const newSubCategoryCode = e.target.value;
    setFilters({
      categoryCode,
      subCategoryCode: newSubCategoryCode,
    });
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={categoryCode}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.categoryCode} value={cat.categoryCode}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={subCategoryCode}
        onChange={handleSubcategoryChange}
        disabled={!categoryCode}
      >
        <option value="">Select Subcategory</option>
        {filteredSubcategories.map((sub) => (
          <option key={sub.subCategoryCode} value={sub.subCategoryCode}>
            {sub.name}
          </option>
        ))}
      </select>
      <button className={styles.reset} onClick={() => window.location.reload()}>
        reset
      </button>
    </div>
  );
}
