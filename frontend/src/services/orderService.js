import apiClient from "../api/apiClient";

const placeOrder = () => {
  return apiClient.post("/orders");
};

const getOrders = () => {
  return apiClient.get("/orders");
};

const getAllOrders = () => {
  return apiClient.get("/orders/admin");
};

const getOrderById = (orderId) => {
  return apiClient.get(`/orders/${orderId}`);
};

// NEW
const updateOrderStatus = (orderId, status) => {
  return apiClient.put(`/orders/${orderId}/status`, {
    status,
  });
};

export default {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
