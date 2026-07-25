import "./Hero.css";
import heroBanner from "../../../assets/images/hero-banner.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-badge">🔥 NEW ARRIVAL</span>

          <h1 className="hero-title">
            Discover Amazing Products
            <br />
            For Your Everyday Needs
          </h1>

          <p className="hero-description">
            Shop electronics, fashion, home essentials and much more at
            unbeatable prices with fast delivery and secure payments.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Shop Now</button>

            <button className="secondary-btn">Explore Products</button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hero-image">
          <img src={heroBanner} alt="EazyStore Hero Banner" />
        </div>
      </div>
    </section>
  );
}
