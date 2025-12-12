"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { fetchProductById } from "@/services/products";

// Components
import { Badge } from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import PackageImage from "@/components/atoms/PackageImage/PackageImage";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import CardHeader from "@/components/atoms/CardHeader/CardHeader";

export default function ProductDetailPage() {
  const { id } = useParams();

  // product loading ONLY controls data, not UI spinner
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const data = await fetchProductById(id);
      setProduct(data);
    }

    load();
  }, [id]);

  if (!product) return null;

  return (
    <CardContainer size="big" className="bg-[#FBFBFB]">
      <CardHeader
        title="Detail Produk"
        linkText="Kembali"
        href="/recommendations"
        titleClass="text-[var(--primary-color)]"
        linkClass="text-[#777777]"
      />
      <div className="mt-4 flex flex-col gap-4">
      <PackageImage 
        width="100%" 
        height="100%"
        className="flex flex-col aligns-center justify-center"
        product={product}
      />
      </div>
    </CardContainer>
  );
}