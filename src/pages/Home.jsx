// src/pages/Home.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import AIChat from "../components/AIChat.jsx";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(products);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = search.trim().toLowerCase();
    if (!term) {
      setFiltered(products);
      return;
    }
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
    setFiltered(results);
  };

  return (
    <div className="container">
      <h2>Welcome to ShopCart</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Search
        </button>
      </form>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <AIChat />
    </div>
  );
};

export default Home;
