import { ProductCard } from "../../molecules/ProductCard/ProductCard";

export const ProductGrid = ({ products, onAdd }) => (
  <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-6">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} onAdd={onAdd} />
    ))}
  </div>
);