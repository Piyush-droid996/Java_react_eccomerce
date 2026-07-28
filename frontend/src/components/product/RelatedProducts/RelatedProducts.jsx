import ProductCard from "../../home/ProductCard/ProductCard";
import useRelatedProducts from "../../../hooks/useRelatedProducts";

function RelatedProducts({ categoryId, currentProductId }) {
  const { products, loading } = useRelatedProducts(
    categoryId,
    currentProductId,
  );

  if (loading) {
    return <p>Loading related products...</p>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-5">
      <h3 className="mb-4">Related Products</h3>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.productId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
