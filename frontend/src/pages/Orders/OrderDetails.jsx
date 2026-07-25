import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load order");
    }
  };

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Order Information</h5>

              <p>
                <strong>Order ID :</strong> #{order.orderId}
              </p>

              <p>
                <strong>Status :</strong> {order.status}
              </p>

              <p>
                <strong>Order Date :</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="col-md-6">
              <h5>Customer</h5>

              <p>
                <strong>Name :</strong> {order.customerName}
              </p>

              <p>
                <strong>Email :</strong> {order.customerEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Products</h5>
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>

                  <td>₹ {item.price}</td>

                  <td>{item.quantity}</td>

                  <td>₹ {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-4 shadow-sm">
        <div className="card-body text-end">
          <h4>
            Grand Total :
            <span className="text-success"> ₹ {order.totalAmount}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
