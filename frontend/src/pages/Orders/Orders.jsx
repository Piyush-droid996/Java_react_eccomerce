import { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import OrderCard from "../../Components/orders/OrderCard/OrderCard";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default Orders;
