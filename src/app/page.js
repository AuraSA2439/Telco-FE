"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/products";
import ProductRow from "@/components/organisms/ProductRow/ProductRow";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CardInfo from "@/components/organisms/CardInfo/CardInfo";
import CardPaket from "@/components/organisms/CardPaket/CardPaket";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAdd = (product) => setCart([...cart, product]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts({
          page: 1,
          limit: 20,
          sortBy: "price",
          sortOrder: "asc"
        });

        setProducts(data);
      } catch (error) {
        console.error("Load error:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="text-white">Loading products...</p>;

  return (
    <>
      <CardInfo />
      <CardPaket />
      <ProductRow products={products} onAdd={handleAdd} />
      <ProductGrid products={products} onAdd={handleAdd} />
    </>
  );
}