// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQty = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, qty: Math.max(p.qty + delta, 1) } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
