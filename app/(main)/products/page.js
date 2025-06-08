// "use client";

// import ProductTable from "../../Componantes/ProductTable/ProductTable.jsx";
// import { Navigator } from "../../Componantes/navigator/navigator.js";
// import { Suspense } from "react";

// export default function ProductsPage() {
//   // const products = await getProducts();

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <div>
//         <div style={{ marginTop: "50px", marginInline: "120px" }}>
//           {/* <h2 className="text-2xl font-bold mb-4">All Products</h2> */}
//           <ProductTable />
//         </div>
//       </div>
//     </Suspense>
//   );
// }

"use client";

import ProductTable from "../../Componantes/ProductTable/ProductTable.jsx";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div>
      <div style={{ marginTop: "50px", marginInline: "120px" }}>
        {/* Wrap only the component that uses useSearchParams */}
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
}
