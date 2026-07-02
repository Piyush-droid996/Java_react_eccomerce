import "./ProductCard.css";
import Price from "./Price";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-details">
        <h3 className="product-card-title">{product.name}</h3>

        <p className="product-card-description">{product.description}</p>

        <div className="product-card-footer">
          <Price currency="$" price={product.price} />
        </div>
      </div>
    </article>
  );
}
