import "./Home.css";
import products from "../data/products";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore Eazy Stickers</h1>
          <p>Discover amazing stickers for developers, coders, and creators.</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </section>

      {/* Products Section */}
      <PageHeading title="Featured Stickers">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers.
      </PageHeading>

      <ProductListings products={products} />
    </div>
  );
}
