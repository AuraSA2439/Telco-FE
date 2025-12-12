"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { fetchProductById } from "@/services/products";

// Components
import { Badge } from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
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
    </CardContainer>
  );
}