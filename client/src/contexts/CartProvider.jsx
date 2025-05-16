import { useState } from "react";
import { CartContext } from "./useCartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity = 1) {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.sys.id === product.sys.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.sys.id === product.sys.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.sys.id !== productId);
    });
  }

  function updateQuantity(productId, action) {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.sys.id === productId) {
          return {
            ...item,
            quantity:
              action === "increase"
                ? item.quantity + 1
                : action === "decrease" && item.quantity > 1
                ? item.quantity - 1
                : item.quantity,
          };
        }
        return item;
      });
    });
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
