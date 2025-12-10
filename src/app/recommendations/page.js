"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchRecommendations } from "@/services/recommendations";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import Filter from "@/components/organisms/Filter/Filter";

export default function RecommendationPage() {
  const [rawProducts, setRawProducts] = useState([]);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    algorithm: "hybrid",
    limit: 10,
    category: "all",
  });

  const [loading, setLoading] = useState(false);

  // Fetch recommendations
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

  // Category filtering (client-side)
  const filteredProducts = useMemo(() => {
    if (filter.category === "all") return rawProducts;
    return rawProducts.filter((p) => p.category === filter.category);
  }, [filter.category, rawProducts]);

  return (
    <div className="max-w-[900px] w-full">
      <h1 className="text-2xl font-bold mb-4">Rekomendasi Untuk Anda</h1>

      <Filter
        filter={filter}
        onChange={(v) => setFilter((prev) => ({ ...prev, ...v }))}
      />

      {loading && <p className="text-gray-400">Loading recommendations...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <ProductGrid products={filteredProducts} onAdd={() => {}} />
      )}
    </div>
  );
}