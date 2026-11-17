// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaCheckCircle } from "react-icons/fa";

const Checkout = ({ navigate }) => {
  const { cartItems, subtotal, clearCart } = useContext(CartContext);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    // Simulated payment – just clear the cart after a short delay
    setTimeout(() => {
      clearCart();
      setConfirmed(false);
      navigate("home");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate("home")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} – ₹{item.price} × {item.qty}
          </li>
        ))}
      </ul>
      <p>Total Amount: ₹{subtotal}</p>
      {confirmed ? (
        <div style={{ color: "green", marginTop: "1rem" }}>
          <FaCheckCircle /> Payment Successful! Order Confirmed.
        </div>
      ) : (
        <button onClick={handleConfirm}>Confirm Payment</button>
      )}
    </div>
  );
};

export default Checkout;
