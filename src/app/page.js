"use client";

import { useEffect, useState } from "react";
import ProductRow from "@/components/organisms/ProductRow/ProductRow";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CardInfo from "@/components/organisms/CardInfo/CardInfo";
import CardPaket from "@/components/organisms/CardPaket/CardPaket";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAdd = (product) => setCart([...cart, product]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <CardInfo />
      <CardPaket />
      <ProductRow products={products} onAdd={handleAdd} />
      <ProductGrid products={products} onAdd={handleAdd} />
    </>
  );
}