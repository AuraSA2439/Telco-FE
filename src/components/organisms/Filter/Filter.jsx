"use client";

export default function RecommendationFilter({ filter, onChange }) {
  return (
    <div className="w-full flex flex-wrap gap-4 mb-4">

      {/* Paket Category (FE only, SINKRON dengan BE) */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="all">Semua Paket</option>
        <option value="data">Data / Internet</option>
        <option value="voice">Voice</option>
        <option value="streaming">Streaming</option>
        <option value="combo">Combo</option>
      </select>

      {/* Limit (mengontrol jumlah hasil dari BE) */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.limit}
        onChange={(e) => onChange({ limit: Number(e.target.value) })}
      >
        <option value={5}>5 produk</option>
        <option value={10}>10 produk</option>
        <option value={15}>15 produk</option>
        <option value={20}>20 produk</option>
      </select>

      {/* Algorithm (langsung dikirim ke BE / ML) */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.algorithm}
        onChange={(e) => onChange({ algorithm: e.target.value })}
      >
        <option value="hybrid">Hybrid</option>
        <option value="content-based">Content-Based</option>
        <option value="collaborative">Collaborative</option>
      </select>
    </div>
  );
}
