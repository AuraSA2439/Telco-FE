import ProductCard from "../../molecules/ProductCard/ProductCard";
import CardHeader from "../../atoms/CardHeader/CardHeader";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="w-full flex flex-col gap-[14px]">
      <CardHeader
        title="Hasil Rekomendasi Untuk Anda"
        linkText="Lihat Semua Produk"
        href="/products"
        className="mb-4"
      />

      <div className="grid w-full grid-cols-1 gap-6 pt-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
