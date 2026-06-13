import products from "../data/products";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
function Home() {
  return (
    <div className="home-container">
      <PageHeading title="Explore eazytSticker" />
      <ProductListings products={products} />
    </div>
  );
}

export default Home;
