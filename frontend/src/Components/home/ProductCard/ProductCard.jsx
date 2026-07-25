import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addItem } = useCart();

  async function handleAddToCart(e) {
    e.preventDefault(); // prevent card navigation
    e.stopPropagation();

    try {
      await addItem(product.productId, 1);
      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Unable to add product");
    }
  }

  return (
    <div className="card h-100 shadow-sm">
      <Link
        to={`/product/${product.productId}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />

        <div className="card-body">
          <h5>{product.name}</h5>

          <p>{product.description}</p>

          <h4 className="text-primary">₹ {product.price}</h4>
        </div>
      </Link>

      <div className="card-body pt-0">
        <button
          className="btn btn-success w-100 mb-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

        <Link
          to={`/product/${product.productId}`}
          className="btn btn-primary w-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
