import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="container-fluid">
      <div className="row g-4 justify-content-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.productId}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5>No Products Found</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
