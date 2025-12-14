import ProductCard from "../../molecules/ProductCard/ProductCard";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid w-full pt-1 grid-cols-1 md:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}