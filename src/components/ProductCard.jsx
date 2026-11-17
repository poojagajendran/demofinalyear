// src/components/ProductCard.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaCheckCircle } from "react-icons/fa";

const ProductCard = ({ product, onAdd }) => {
  const { addToCart } = useContext(CartContext);
  const handleAdd = () => {
    addToCart(product);
    if (onAdd) onAdd();
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <p>Rating: {product.rating} ★</p>
      <button onClick={handleAdd}>Add to Cart</button>
      {onAdd && (
        <div style={{ color: "green", marginTop: "0.5rem" }}>
          <FaCheckCircle /> Added!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
