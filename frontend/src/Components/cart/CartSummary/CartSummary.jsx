import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../../api/orderApi";

function CartSummary({ cartItems }) {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0,
  );

  const handleCheckout = async () => {
    try {
      const response = await placeOrder();

      console.log(response.data);

      alert("Order Placed Successfully");

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert("Unable to place order");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4>Order Summary</h4>

        <hr />

        <div className="d-flex justify-content-between">
          <span>Total Items</span>
          <span>{cartItems.length}</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <strong>Total Amount</strong>
          <strong>₹ {totalAmount}</strong>
        </div>

        <button className="btn btn-success w-100 mt-4" onClick={handleCheckout}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
