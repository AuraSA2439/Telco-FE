"use client";

const CATEGORIES = [
  { label: "Semua", value: "__ALL__" },
  { label: "Rekomendasi", value: "__RECOMMENDED__" },
  { label: "Combo", value: ["combo", "device"] },
  { label: "Internet", value: ["data", "roaming", "streaming"] },
  { label: "Telepon & SMS", value: ["voice", "sms"] },
];

export default function Filter({ filter, onChange }) {
  return (
    <div className="w-full py-4 px-4 border-b border-[var(--neutral-color)] bg-[#E6E6E6] overflow-x-auto">
      <div className="flex gap-2">
        {CATEGORIES.map((cat) => {
          const active =
            filter.category === cat.value ||
            (Array.isArray(cat.value) &&
              Array.isArray(filter.category) &&
              cat.value.some((v) => filter.category.includes(v)));

          return (
            <button
              key={cat.label}
              onClick={() => onChange({ category: cat.value })}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap
                ${
                  active
                    ? "bg-[var(--primary-color)] text-white border-transparent"
                    : "bg-white text-[#5B5B5B] border-[var(--neutral-color)] hover:bg-purple-800 hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}