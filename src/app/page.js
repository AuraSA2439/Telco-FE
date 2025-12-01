"use client";
import { useState } from "react";
import { ProductGrid } from "../components/organisms/ProductGrid";
import { CartSidebar } from "../components/organisms/CartSidebar";

const productsData = [
  { id: 1, name: "Basic Shirt", price: "$20", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 2, name: "Casual Shoes", price: "$45", image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f" },
  { id: 3, name: "Minimalist Backpack", price: "$30", image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a" }
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => setCart([...cart, product]);

  return (
    <div className="p-10 font-sans max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Shopping Website</h1>
      <ProductGrid products={productsData} onAdd={handleAddToCart} />
      <CartSidebar cart={cart} />
    </div>
  );
}