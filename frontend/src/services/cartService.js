import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../api/cartApi";

export const fetchCart = async () => {
  const response = await getCartItems();
  return response.data;
};

export const addItemToCart = async (productId, quantity = 1) => {
  const response = await addToCart({
    productId,
    quantity,
  });

  return response.data;
};

export const updateItemQuantity = async (cartId, quantity) => {
  const response = await updateCartItem(cartId, {
    quantity,
  });

  return response.data;
};

export const removeItemFromCart = async (cartId) => {
  await deleteCartItem(cartId);
};
