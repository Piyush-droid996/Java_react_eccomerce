import React from "react";
import ProductCard from "./ProductCard";

function ProductListings({ products }) {
  return (
    <div className="ProductListings">
      <div className="product-listings-grid">
        {products.length > 0 ? (
          products.map(
            (product) => <ProductCard product={product}></ProductCard>,
            // <ProductCard key={product.productId} product={product} />
          )
        ) : (
          <p className="product-listings-empty">No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default ProductListings;
