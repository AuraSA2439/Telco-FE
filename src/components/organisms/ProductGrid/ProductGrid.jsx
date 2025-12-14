import ProductCard from "../../molecules/ProductCard/ProductCard";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid w-full pt-1 grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p, index) => (
        <ProductCard
          key={p.id ?? p._id ?? `${p.name}-${index}`}
          product={p}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}