"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchRecommendations } from "@/services/recommendations";

import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import Filter from "@/components/organisms/Filter/Filter";
import Loading from "@/components/atoms/Loading/Loading";

export default function RecommendationPage() {
  const [rawProducts, setRawProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter state (algorithm, limit, category)
  const [filter, setFilter] = useState({
    algorithm: "hybrid",
    limit: 10,
    category: "all",
  });

  // Fetch recommendations when algorithm/limit changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchRecommendations({
          algorithm: filter.algorithm,
          limit: filter.limit,
        });

        setRawProducts(result);
      } catch (err) {
        console.error("Recommendation error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filter.algorithm, filter.limit]);

  // Apply category filtering (client-side)
  const filteredProducts = useMemo(() => {
    if (filter.category === "all") return rawProducts;
    return rawProducts.filter((p) => p.category === filter.category);
  }, [filter.category, rawProducts]);

  // Empty state (if recommendation returns 0 items)
  const isEmpty = !loading && !error && filteredProducts.length === 0;

  return (
    <div className="max-w-[950px] w-full mx-auto px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Rekomendasi Untuk Anda</h1>

      {/* Filter */}
      <Filter
        filter={filter}
        onChange={(v) => setFilter((prev) => ({ ...prev, ...v }))}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="px-4 py-2 mt-4 text-red-400 rounded-md bg-red-900/20">
          {error}
        </p>
      )}

      {/* Empty State */}
      {isEmpty && (
        <div className="py-10 text-center text-gray-400">
          <p className="text-lg">Tidak ada rekomendasi untuk filter ini.</p>
          <p className="text-sm">Coba gunakan algoritma lain atau ubah kategori.</p>
        </div>
      )}

      {/* Product list */}
      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} onAdd={() => {}} />
      )}
    </div>
  );
}
