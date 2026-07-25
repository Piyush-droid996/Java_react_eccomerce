import { useCart } from "../../../context/CartContext";

function ProductInfo({ product }) {
  const { addItem } = useCart();

  async function handleAddToCart() {
    try {
      await addItem(product.productId, 1);
      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Unable to add product");
    }
  }

  return (
    <div>
      <h2>{product.name}</h2>

      <h4 className="text-success mb-3">₹ {product.price}</h4>

      <p>
        <strong>Category:</strong> {product.categoryName}
      </p>

      <p>
        <strong>Popularity:</strong> ⭐ {product.popularity}
      </p>

      <hr />

      <p>{product.description}</p>

      <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductInfo;
