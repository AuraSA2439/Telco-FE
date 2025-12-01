"use client";
import { useState } from "react";
import { ProductGrid } from "../components/organisms/ProductGrid/ProductGrid";
import CardInfo from "../components/organisms/CardInfo/CardInfo";
import Navbar from "../components/organisms/Navbar/Navbar";

const productsData = [
  { id: 1, price: "Rp. 100.000", image: "/assets/paket1.png" },
  { id: 2, price: "Rp. 25.000", image: "/assets/paket2.png" },
  { id: 3, price: "Rp. 15.000", image: "/assets/paket3.png" }
];

const usersData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phoneNumber: "08123456789" },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => setCart([...cart, product]);

  return (
    <>
      <Navbar />
      <div className="px-10 py-4 font-sans max-w-6xl mx-auto">
        <CardInfo />
        <ProductGrid products={productsData} onAdd={handleAddToCart} />
        {/* <CartSidebar cart={cart} /> */}
      </div>
    </>
  );
}