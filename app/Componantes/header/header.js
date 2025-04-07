"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = ({ posts }) => {
  // Corrected prop name and destructuring
  return (
    <div>
      <ul>
        {posts &&
          posts.map(
            (
              post // Check if posts exists and map
            ) => (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  {" "}
                  {/* Corrected to href and dynamic path */}
                  <h2>{post.id}</h2>
                  <h2>{post.title}</h2>
                  <h2>{post.body}</h2>
                  <p>!!</p>
                </Link>
              </li>
            )
          )}
      </ul>
      <h1>header yala</h1>
    </div>
  );
};
