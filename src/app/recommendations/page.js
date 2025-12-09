"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchRecommendations } from "@/services/recommendations";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import RecommendationFilter from "@/components/organisms/RecommendationFilter/RecommendationFilter";

export default function RecommendationPage() {
  const [rawProducts, setRawProducts] = useState([]);
  const [filter, setFilter] = useState({
    algorithm: "hybrid",
    limit: 10,
    category: "all",
  });

  const [loading, setLoading] = useState(false);

  // Fetch recommendations from backend
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await fetchRecommendations({
          algorithm: filter.algorithm,
          limit: filter.limit,
        });
        setRawProducts(result); // store original recommendations
      } catch (error) {
        console.error("Recommendation error:", error.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filter.algorithm, filter.limit]);

  // CLIENT-SIDE FILTERING BASED ON CATEGORY
  const filteredProducts = useMemo(() => {
    if (filter.category === "all") return rawProducts;
    return rawProducts.filter((p) => p.category === filter.category);
  }, [filter, rawProducts]);

  return (
    <div className="max-w-[900px] w-full">
      <h1 className="text-2xl font-bold mb-4">Rekomendasi Untuk Anda</h1>

      <RecommendationFilter
        filter={filter}
        onChange={(v) => setFilter((prev) => ({ ...prev, ...v }))}
      />

      {loading ? (
        <p className="text-gray-400">Loading recommendations...</p>
      ) : (
        <ProductGrid products={filteredProducts} onAdd={() => {}} />
      )}
    </div>
  );
}