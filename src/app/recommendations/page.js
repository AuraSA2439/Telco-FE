"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchRecommendations } from "@/services/recommendations";

import CardInfo from "@/components/organisms/CardInfo/CardInfo";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import Filter from "@/components/organisms/Filter/Filter";
import Loading from "@/components/atoms/Loading/Loading";

export default function RecommendationPage() {
  const [rawProducts, setRawProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    category: "all",
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchRecommendations();

        const normalized = result.map((p, index) => ({
          ...p,
          id: p.id || p._id || `product-${index}`,
          category: (p.category || "").toLowerCase(),
        }));

        setRawProducts(normalized);
      } catch (err) {
        console.error("Recommendation error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter.category === "all") return rawProducts;

    if (Array.isArray(filter.category)) {
      return rawProducts.filter((p) =>
        filter.category.includes(p.category)
      );
    }

    return rawProducts.filter((p) => p.category === filter.category);
  }, [filter.category, rawProducts]);

  const isEmpty = !loading && !error && filteredProducts.length === 0;

  return (
    <>
      <CardInfo />
      <div className="max-w-[950px] w-full mx-auto bg-[#F3F3F3] border-1 border-[var(--neutral-color)] rounded-2xl overflow-hidden">
        <Filter
          filter={filter}
          onChange={(v) =>
            setFilter((prev) => ({ ...prev, ...v }))
          }
        />

        {loading && (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        )}

        {error && (
          <p className="px-4 py-2 mt-4 text-red-400 rounded-md bg-red-900/20">
            {error}
          </p>
        )}

        {isEmpty && (
          <div className="py-10 text-center text-gray-400">
            <p className="text-lg">Tidak ada rekomendasi.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductGrid className="my-4 px-4" products={filteredProducts} onAdd={() => {}} />
        )}
    </div>
    </>
  );
}