import "./Home.css";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/products");

      setProducts(response.data);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch products. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore Eazy Stickers</h1>
          <p>Discover amazing stickers for developers, coders, and creators.</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </section>

      <PageHeading title="Featured Stickers">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers.
      </PageHeading>

      <ProductListings products={products} />
    </div>
  );
}
