"use client";

export default function RecommendationFilter({ filter, onChange }) {
  return (
    <div className="w-full flex justify-between items-center mb-4 gap-4">

      {/* Category Filter */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="all">Semua</option>
        <option value="data">Internet</option>
        <option value="vod">Video</option>
        <option value="streaming">Streaming</option>
        <option value="voice">Telepon</option>
        <option value="sms">SMS</option>
      </select>

      {/* (optional) Algorithm Filter */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.algorithm}
        onChange={(e) => onChange({ algorithm: e.target.value })}
      >
        <option value="hybrid">Hybrid</option>
        <option value="content-based">Content-Based</option>
        <option value="collaborative">Collaborative</option>
      </select>

      {/* Limit Selection */}
      <select
        className="bg-[#1a1a1a] text-white px-3 py-2 rounded"
        value={filter.limit}
        onChange={(e) => onChange({ limit: e.target.value })}
      >
        <option value="5">5 produk</option>
        <option value="10">10 produk</option>
        <option value="15">15 produk</option>
        <option value="20">20 produk</option>
      </select>
    </div>
  );
}