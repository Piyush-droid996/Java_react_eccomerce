import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../../../services/orderService";

function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);

      setOrder(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error(error);
      alert("Unable to load order");
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await orderService.updateOrderStatus(order.orderId, status);

      alert("Order Status Updated Successfully");

      loadOrder();
    } catch (error) {
      console.error(error);
      alert("Unable to update order status");
    }
  };

  if (!order) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      <div className="row">
        {/* Order Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="mb-3">Order Summary</h5>

              <p>
                <strong>Order ID :</strong> #{order.orderId}
              </p>

              <p>
                <strong>Total Amount :</strong> ₹ {order.totalAmount}
              </p>

              <div className="mt-4">
                <strong>Current Status : </strong>

                <span
                  className={`badge ms-2 ${
                    order.status === "PLACED"
                      ? "bg-success"
                      : order.status === "PROCESSING"
                        ? "bg-warning text-dark"
                        : order.status === "SHIPPED"
                          ? "bg-primary"
                          : order.status === "DELIVERED"
                            ? "bg-dark"
                            : "bg-danger"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <button className="btn btn-success" onClick={handleStatusUpdate}>
                Update Status
              </button>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="mb-3">Customer Information</h5>

              <p>
                <strong>Name :</strong> {order.customerName}
              </p>

              <p>
                <strong>Email :</strong> {order.customerEmail}
              </p>

              <p>
                <strong>Ordered On :</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Products */}

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Ordered Products</h4>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-end">Price</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>

                  <td>{item.productName}</td>

                  <td className="text-center">{item.quantity}</td>

                  <td className="text-end">₹ {item.price}</td>

                  <td className="text-end">
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th colSpan="4" className="text-end">
                  Grand Total
                </th>

                <th className="text-end">₹ {order.totalAmount}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
