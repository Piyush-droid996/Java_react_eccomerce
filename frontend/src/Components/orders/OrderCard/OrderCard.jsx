import { Link } from "react-router-dom";
import "./OrderCard.css";

function OrderCard({ order }) {
  return (
    <div className="card order-card shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <div className="order-id">
              <strong>Order #{order.orderId}</strong>
            </div>
          </div>

          <div className="col-md-2">
            <div className="order-price">₹ {order.totalAmount}</div>
          </div>

          <div className="col-md-2">
            <span className="badge bg-success">{order.status}</span>
          </div>

          <div className="col-md-3">
            <div className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="col-md-3 text-end">
            <Link
              to={`/orders/${order.orderId}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
