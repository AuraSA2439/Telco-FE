import ProductCard from "../../molecules/ProductCard/ProductCard";
import CardHeader from "../../atoms/CardHeader/CardHeader";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <CardHeader title="Jelajahi Lebih Lanjut" linkText="Lihat Semua" href="/products" className="mb-4"></CardHeader>
      <div className="grid w-full pt-1 grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}