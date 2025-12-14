"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { fetchProducts } from "@/services/products";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import Loading from "@/components/atoms/Loading/Loading";

export default function SearchProductPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchProducts({ page: 1, limit: 100 });
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;

    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="w-full max-w-[1000px] mx-auto px-2 py-6">

      <h1 className="text-2xl font-bold mb-2">
        Semua Produk
      </h1>

      {query && (
        <p className="text-gray-500 mb-4">
          Hasil pencarian untuk: <b className="text-[var(--primary-color)]">{query}</b>
        </p>
      )}

      <CardContainer className="bg-[#F3F3F3]">
        {loading && (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            Tidak ada produk ditemukan.
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} />
        )}
      </CardContainer>
    </div>
  );
}