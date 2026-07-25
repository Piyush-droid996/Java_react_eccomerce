import apiClient from "./apiClient";

export const getCartItems = () => {
  return apiClient.get("/cart");
};

export const addToCart = (cart) => {
  return apiClient.post("/cart", cart);
};

export const updateCartItem = (cartId, cart) => {
  return apiClient.put(`/cart/${cartId}`, cart);
};

export const deleteCartItem = (cartId) => {
  return apiClient.delete(`/cart/${cartId}`);
};
