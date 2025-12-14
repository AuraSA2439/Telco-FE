import ProductCard from "../../molecules/ProductCard/ProductCard";

export default function ProductGrid({ products, onAdd, className = "" }) {
  return (
    <div
      className={`grid w-full pt-1 grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}