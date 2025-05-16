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
    setCartItems((prevItems) => prevItems.filter((item) => item.sys.id !== productId));
  }

  function updateQuantity(productId, action) {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
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
      })
    );
  }

  async function handleCheckout() {
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error("Carrinho vazio ou inválido");
      return;
    }

    const itemsToSend = cartItems.map((item) => ({
      title: item.fields?.name,
      unit_price: item.fields?.price,
      quantity: item.quantity || 1,
    }));

    try {
      const res = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToSend }),
      });

      const responseData = await res.json();

      if (responseData.init_point) {
        window.location.href = responseData.init_point;
      } else {
        console.error("Erro ao obter init_point:", responseData);
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
