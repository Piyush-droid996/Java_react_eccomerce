import useProducts from "../../../hooks/useProducts";
import ProductGrid from "../ProductGrid/ProductGrid";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const { products, loading } = useProducts("", 0, 8);

  if (loading) {
    return <h3>Loading Products...</h3>;
  }

  return (
    <section>
      <h2>Featured Products</h2>

      <ProductGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
