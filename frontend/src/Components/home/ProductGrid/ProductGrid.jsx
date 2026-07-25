import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.productId}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No Products Found</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
