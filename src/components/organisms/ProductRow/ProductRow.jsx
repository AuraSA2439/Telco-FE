"use client";

import { useRef } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import CardHeader from "../../atoms/CardHeader/CardHeader";

export default function ProductRow({ products, onAdd }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="w-full max-md:max-h-[280px] flex flex-col gap-[10px] relative mt-2">
      <CardHeader
        title="Penawaran untuk Mu"
        linkText="Lihat Semua"
        href="/recommendations"
        titleClass="text-[var(--secondary-color)]"
        linkClass="text-[var(--primary-color)]"
        className="mb-2"
      />

      <div className="relative">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 
                     bg-[var(--primary-color)] text-white shadow-md rounded-full p-2"
        >
          ◀
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="flex gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="pt-1 pb-2 flex-shrink-0 w-[160px] md:w-[calc((100%-4.5rem)/4)]"
              >
                <ProductCard product={p} onAdd={onAdd} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="hidden sm:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 
                     bg-[var(--primary-color)] text-white shadow-md rounded-full p-2"
        >
          ▶
        </button>
      </div>
    </div>
  );
}