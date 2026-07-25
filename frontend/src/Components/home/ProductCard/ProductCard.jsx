import { Link } from "react-router-dom";
import { addToCart } from "../../../api/cartApi";
import "./ProductCard.css";

function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      const response = await addToCart({
        productId: product.productId,
        quantity: 1,
      });

      console.log(response.data);

      alert("Product added to cart");
    } catch (error) {
      console.error(error);

      alert("Unable to add product");
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />

      <div className="card-body d-flex flex-column">
        <h5>{product.name}</h5>

        <p>{product.description}</p>

        <h4 className="text-primary">₹ {product.price}</h4>

        <button className="btn btn-success mb-2" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <Link to={`/product/${product.productId}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
