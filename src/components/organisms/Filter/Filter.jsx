"use client";

const CATEGORIES = [
  { label: "Semua", values: ["all"] },
  { label: "Rekomendasi", values: ["all"] },
  { label: "Combo", values: ["combo", "device"] },
  { label: "Internet", values: ["data", "roaming"] },
  { label: "Streaming", values: ["streaming"] },
  { label: "Telepon & SMS", values: ["voice", "sms"] },
];

export default function Filter({ filter, onChange }) {
  return (
    <div className="w-full h-fit py-4 px-4 overflow-x-auto border-b-2 border-[var(--neutral-color)] bg-[#E6E6E6]">
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
                px-4 py-2 rounded-full border-1 border-[var(--neutral-color)] text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${
                  active
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-[#FFFFFF] text-[#5B5B5B] hover:bg-purple-800 hover:text-[#FFFFFF]"
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