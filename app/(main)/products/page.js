"use client";

import ProductTable from "../../Componantes/ProductTable/ProductTable.jsx";
import { Navigator } from "../../Componantes/navigator/navigator.js";

export default function ProductsPage() {
  // const products = await getProducts();

  return (
    <div>
      <div style={{ marginTop: "50px", marginInline: "120px" }}>
        {/* <h2 className="text-2xl font-bold mb-4">All Products</h2> */}
        <ProductTable />
      </div>
    </div>
  );
}
