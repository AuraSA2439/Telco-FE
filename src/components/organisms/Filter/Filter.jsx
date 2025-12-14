"use client";

const CATEGORIES = [
  { label: "Semua Paket", values: ["all"] },
  { label: "Combo", values: ["combo", "device"] },
  { label: "Internet", values: ["data", "roaming"] },
  { label: "Streaming", values: ["streaming"] },
  { label: "Telepon & SMS", values: ["voice", "sms"] },
];

export default function Filter({ filter, onChange }) {
  return (
    <div className="w-full mb-6 overflow-x-auto">
      <div className="flex gap-2 justify-center sm:justify-start">
        {CATEGORIES.map((cat) => {
          const active =
            filter.category === "all"
              ? cat.values.includes("all")
              : Array.isArray(filter.category) &&
                cat.values.some((v) =>
                  filter.category.includes(v)
                );

          return (
            <button
              key={cat.label}
              type="button"
              onClick={() =>
                onChange({
                  category: cat.values.includes("all")
                    ? "all"
                    : cat.values,
                })
              }
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${
                  active
                    ? "bg-purple-600 text-white"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}