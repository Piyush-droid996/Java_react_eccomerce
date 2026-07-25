import { useEffect, useState } from "react";
import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../api/cartApi";
import CartItem from "../../components/cart/CartItem/CartItem";
import CartSummary from "../../components/cart/CartSummary/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart/EmptyCart";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateQuantity = async (item, quantity) => {
    try {
      await updateCartItem(item.cartId, {
        productId: item.productId,
        quantity: quantity,
      });

      loadCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteItem = async (cartId) => {
    try {
      await deleteCartItem(cartId);

      loadCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <CartItem
              key={item.cartId}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>

        <div className="col-lg-4">
          <CartSummary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
