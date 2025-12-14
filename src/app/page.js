"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/products";
import CardHeader from "@/components/atoms/CardHeader/CardHeader";
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
      <div className="w-full max-md:max-h-[280px] flex flex-col gap-[10px] relative mt-2">
        <CardHeader
          title="Penawaran untuk Mu"
          linkText="Lihat Semua"
          href="/products"
          titleClass="text-[var(--secondary-color)]"
          linkClass="text-[var(--primary-color)]"
          className="mb-2"
        />
        <ProductRow products={products} />
      </div>
      <div className="w-full flex flex-col gap-[10px] mb-10">
        <CardHeader 
          title="Jelajahi Lebih Lanjut" 
          linkText="Lihat Semua"
          href="/products"  
          titleClass="text-[var(--secondary-color)]"
          linkClass="text-[var(--primary-color)]"
          className="mb-4"
        />
        <ProductGrid products={products} />
      </div>
    </>
  );
}