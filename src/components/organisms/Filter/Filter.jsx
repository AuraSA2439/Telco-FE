"use client";

export default function RecommendationFilter({ filter, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-6">

      {/* Category */}
      <select
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded border border-gray-700"
        value={filter.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="all">Semua Kategori</option>
        <option value="data">Data</option>
        <option value="voice">Voice</option>
        <option value="roaming">Roaming</option>
        <option value="streaming">Streaming</option>
        <option value="combo">Combo</option>
        <option value="device">Device</option>
      </select>

      {/* Algorithm */}
      <select
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded border border-gray-700"
        value={filter.algorithm}
        onChange={(e) => onChange({ algorithm: e.target.value })}
      >
        <option value="hybrid">Hybrid</option>
        <option value="content-based">Content Based</option>
        <option value="collaborative">Collaborative</option>
      </select>

      {/* Limit */}
      <select
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded border border-gray-700"
        value={filter.limit}
        onChange={(e) => onChange({ limit: Number(e.target.value) })}
      >
        <option value={5}>5 Produk</option>
        <option value={10}>10 Produk</option>
        <option value={15}>15 Produk</option>
        <option value={20}>20 Produk</option>
      </select>
    </div>
  );
}
