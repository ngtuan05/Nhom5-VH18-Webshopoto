import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (car) => {
    const exists = cart.find((item) => item.id === car.id);

    if (exists) {
      alert("Xe này đã có trong giỏ hàng!");
      return;
    }

    setCart([...cart, car]);
    alert("Đã thêm xe vào giỏ hàng!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}