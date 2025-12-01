import { ProductCard } from "../molecules/ProductCard";

export const ProductGrid = ({ products, onAdd }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} onAdd={onAdd} />
    ))}
  </div>
);