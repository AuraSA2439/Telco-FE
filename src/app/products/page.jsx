"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "@/services/products";
import { fetchRecommendations } from "@/services/recommendations";

import CardInfo from "@/components/organisms/CardInfo/CardInfo";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import Filter from "@/components/organisms/Filter/Filter";
import Loading from "@/components/atoms/Loading/Loading";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    category: "__RECOMMENDED__", // default tab
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [all, recommended] = await Promise.all([
          fetchProducts(),
          fetchRecommendations(),
        ]);

        setAllProducts(all);
        setRecommendedProducts(recommended);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter.category === "__RECOMMENDED__") return recommendedProducts;

    if (filter.category === "__ALL__") return allProducts;

    if (Array.isArray(filter.category)) {
      return allProducts.filter((p) =>
        filter.category.includes(p.category)
      );
    }

    return allProducts;
  }, [filter.category, allProducts, recommendedProducts]);

  const isEmpty = !loading && !error && filteredProducts.length === 0;

  return (
    <>
      <CardInfo />

      <div className="max-w-[950px] w-full mx-auto bg-[#F3F3F3] border border-[var(--neutral-color)] rounded-2xl overflow-hidden">
        <Filter
          filter={filter}
          onChange={(v) => setFilter((prev) => ({ ...prev, ...v }))}
        />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="px-3 py-2 mt-4 text-red-400 bg-red-900/20 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Empty state */}
        {isEmpty && (
          <p className="py-10 text-center text-gray-400 text-lg">
            Tidak ada produk.
          </p>
        )}

        {/* Product Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductGrid
            className="px-4 py-2 sm:py-4 my-2"
            products={filteredProducts}
            onAdd={() => {}}
          />
        )}
      </div>
    </>
  );
}