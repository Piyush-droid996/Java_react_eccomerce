import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshCart();
  }, []);

  async function refreshCart() {
    try {
      setLoading(true);

      const data = await fetchCart();

      setCartItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addItem(productId, quantity = 1) {
    await addItemToCart(productId, quantity);
    await refreshCart();
  }

  async function removeItem(cartId) {
    await removeItemFromCart(cartId);
    await refreshCart();
  }

  async function updateQuantity(cartId, quantity) {
    await updateItemQuantity(cartId, quantity);
    await refreshCart();
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        refreshCart,
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
