import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import orderService from "../../../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load orders");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Orders</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th width="120">Action</th>
                <th>Total Amount</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>

                  <td>{order.status}</td>

                  <td>
                    <Link
                      to={`/admin/orders/${order.orderId}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </Link>
                  </td>

                  <td>₹ {order.totalAmount}</td>

                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
