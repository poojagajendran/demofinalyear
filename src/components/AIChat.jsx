// src/components/AIChat.jsx
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext.jsx"; // provides addToCart and clearCart
import { products } from "../data/products.js";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm your shopping assistant. Ask me to find products or add them to your cart." },
  ]);
  const [input, setInput] = useState("");
  const { addToCart, clearCart } = useContext(CartContext);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    addMessage("user", userMsg);
    const lower = userMsg.toLowerCase();

    // 1. Find products under a budget
    const budgetMatch = lower.match(/under\s*₹?\s*(\d+)/);
    if (budgetMatch) {
      const max = parseInt(budgetMatch[1]);
      const matches = products.filter((p) => p.price <= max);
      if (matches.length) {
        const list = matches.map((p) => `${p.id}. ${p.name} – ₹${p.price}`).join("\n");
        addMessage(
          "ai",
          `I found ${matches.length} product(s) under ₹${max}:\n${list}\nYou can say "Add the first product to my cart".`
        );
      } else {
        addMessage("ai", `Sorry, I couldn't find any product under ₹${max}.`);
      }
      setInput("");
      return;
    }

    // 2. Add the first product from the last search result
    if (lower.includes("add the first product")) {
      const lastAI = messages
        .slice()
        .reverse()
        .find((m) => m.from === "ai" && m.text.includes("product(s) under"));
      if (lastAI) {
        const lines = lastAI.text.split("\n");
        const firstLine = lines.find((l) => /^\d+\.\s/.test(l));
        if (firstLine) {
          const id = parseInt(firstLine.split(".")[0]);
          const product = products.find((p) => p.id === id);
          if (product) {
            addToCart(product);
            addMessage("ai", "✅ Your product has been successfully added to the cart!");
          }
        }
      }
      setInput("");
      return;
    }

    // 3. Show cart hint
    if (lower.includes("show cart")) {
      addMessage("ai", "You can view your cart by clicking the Cart icon in the header.");
      setInput("");
      return;
    }

    // 4. Simulated payment (just clear cart and show tick)
    if (lower.includes("pay") || lower.includes("pay it")) {
      clearCart();
      addMessage("ai", "✅ Payment successful! Order confirmed.");
      setInput("");
      return;
    }

    // fallback message
    addMessage(
      "ai",
      "Try asking me to find a product (e.g., \"find wireless earbuds under ₹2000\") or say \"pay\" to simulate checkout."
    );
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat">
      <h3>AI Shopping Assistant</h3>
      <div className="ai-chat-messages">
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{m.from === "ai" ? "Assistant" : "You"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="ai-chat-input">
        <input
          type="text"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default AIChat;
