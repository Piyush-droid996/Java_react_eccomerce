import apiClient from "./apiClient";

export const placeOrder = () => {
  return apiClient.post("/orders");
};

export const getOrders = () => {
  return apiClient.get("/orders");
};
export const getAllOrders = () => {
  return apiClient.get("/orders/admin");
};
export const getOrderById = (orderId) => {
  return apiClient.get(`/orders/${orderId}`);
};
