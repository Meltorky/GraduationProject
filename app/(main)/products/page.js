"use client";

import ProductTable from "../../Componantes/ProductTable/ProductTable.jsx";
import { Navigator } from "../../Componantes/navigator/navigator.js";

// async function getProducts() {
//   const res = await fetch(
//     "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50"
//     // "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products-no-paginate"
//   );
//   const data = await res.json();
//   return data.data || [];
// }

export default function ProductsPage() {
  // const products = await getProducts();

  return (
    <div>
      <div style={{ marginTop: "50px", marginInline: "120px" }}>
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <ProductTable/>
      </div>
    </div>
  );
}
