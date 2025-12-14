"use client";

export default function Filter({ filter, onChange }) {
  return (
    <div className="w-full flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
      {/* Paket Category */}
      <select
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
        value={filter.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="all">Semua Paket</option>
        <option value="data">Data / Internet</option>
        <option value="voice">Voice</option>
        <option value="streaming">Streaming</option>
        <option value="combo">Combo</option>
      </select>
    </div>
  );
}