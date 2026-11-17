// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaTrash, FaPlus, FaMinus, FaCheckCircle } from "react-icons/fa";

const Cart = ({ navigate }) => {
  const {
    cartItems,
    removeFromCart,
    updateQty,
    subtotal,
    clearCart,
  } = useContext(CartContext);

  const handleCheckout = () => {
    navigate("checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate("home")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          <strong>{item.name}</strong> – ₹{item.price} × {item.qty}
          <div style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }}>
            <button onClick={() => updateQty(item.id, -1)} style={{ marginRight: "0.25rem" }}>
              <FaMinus />
            </button>
            <button onClick={() => updateQty(item.id, 1)} style={{ marginRight: "0.25rem" }}>
              <FaPlus />
            </button>
            <button onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <hr />
      <p>Subtotal: ₹{subtotal}</p>
      <div className="checkout">
        <button onClick={handleCheckout}>Proceed to Checkout</button>
        <button onClick={clearCart} style={{ marginLeft: "0.5rem" }}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
