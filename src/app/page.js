"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/products";
import ProductRow from "@/components/organisms/ProductRow/ProductRow";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CardInfo from "@/components/organisms/CardInfo/CardInfo";
import CardPaket from "@/components/organisms/CardPaket/CardPaket";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts({
          page: 1,
          limit: 20,
        });

        // Optional slight delay for smoother UX
        await new Promise((res) => setTimeout(res, 2000));

        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
      </div>
    );
  }

  return (
    <>
      <CardInfo />
      <CardPaket />
      <ProductRow products={products} />
      <ProductGrid products={products} />
    </>
  );
}