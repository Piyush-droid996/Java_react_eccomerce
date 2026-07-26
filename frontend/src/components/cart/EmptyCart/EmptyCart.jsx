import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="container text-center mt-5">
      <h2>Your Cart is Empty 🛒</h2>

      <p className="text-muted mt-3">
        Looks like you haven't added anything yet.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
