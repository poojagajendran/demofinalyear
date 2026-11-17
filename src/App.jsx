// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const App = () => {
  const [page, setPage] = useState("home"); // home | cart | checkout

  const navigate = (target) => {
    setPage(target);
  };

  return (
    <CartProvider>
      <Header navigate={navigate} />
      {page === "home" && <Home />}
      {page === "cart" && <Cart navigate={navigate} />}
      {page === "checkout" && <Checkout navigate={navigate} />}
    </CartProvider>
  );
};

export default App;
