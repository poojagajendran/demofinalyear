// src/components/Header.jsx
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

const Header = ({ navigate }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((c, p) => c + p.qty, 0);

  return (
    <header>
      <h1>ShopCart</h1>
      <nav>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("cart"); }}>
          <FaShoppingCart /> Cart ({itemCount})
        </a>
      </nav>
    </header>
  );
};

export default Header;
