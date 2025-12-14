"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchRecommendations } from "@/services/recommendations";

import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import RecommendationFilter from "@/components/organisms/Filter/Filter"; 
import Loading from "@/components/atoms/Loading/Loading";

export default function RecommendationPage() {
  const [rawProducts, setRawProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    algorithm: "hybrid",
    limit: 20,
    category: "all",
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchRecommendations({
          algorithm: filter.algorithm,
          limit: filter.limit,
        });

        // ⬅ Normalisasi kategori menjadi lowercase
        const normalized = result.map((p) => ({
          ...p,
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
  }, [filter.algorithm, filter.limit]);

  // ✔ Kategori filter aman karena sudah dinormalisasi
  const filteredProducts = useMemo(() => {
    if (filter.category === "all") return rawProducts;
    return rawProducts.filter((p) => p.category === filter.category);
  }, [filter.category, rawProducts]);

  const isEmpty = !loading && !error && filteredProducts.length === 0;

  return (
    <div className="max-w-[950px] w-full mx-auto px-4 py-6">

      <h1 className="mb-6 text-3xl font-bold text-center">
        Rekomendasi Untuk Anda
      </h1>

      <RecommendationFilter
        filter={filter}
        onChange={(v) => setFilter((prev) => ({ ...prev, ...v }))}
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
        <ProductGrid products={filteredProducts} onAdd={() => {}} />
      )}
    </div>
  );
}
