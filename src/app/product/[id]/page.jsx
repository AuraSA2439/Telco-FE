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
import TextTitle from "@/components/atoms/TextTitle/TextTitle";

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
        <div className="flex flex-col gap-2 text-[#777777]">
          <TextTitle 
            title="Tentang"
            titleClass="text-[20px] font-medium"
          />
          <p className="text-[14px] px-1">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[#777777]">
          <TextTitle 
            title="Rincian"
            titleClass="text-[20px] font-medium"
          />

          <div className="px-1 text-[14px] flex flex-col gap-2">

            {/* Kuota Internet */}
            {product.specifications?.dataQuota && (
              <p>
                <span className="font-semibold">Kuota Internet:</span>{" "}
                {Math.ceil(product.specifications.dataQuota / 1024)} GB
              </p>
            )}

            {/* Menit Telepon */}
            {product.specifications?.voiceMinutes && (
              <p>
                <span className="font-semibold">Menit Telepon:</span>{" "}
                {product.specifications.voiceMinutes === 999999
                  ? "Unlimited"
                  : `${product.specifications.voiceMinutes} Menit`}
              </p>
            )}

            {/* Masa Berlaku */}
            {product.specifications?.validity && (
              <p>
                <span className="font-semibold">Masa Berlaku:</span>{" "}
                {product.specifications.validity} Hari
              </p>
            )}

            {/* Roaming */}
            {product.specifications?.roaming && (
              <p>
                <span className="font-semibold">Roaming:</span>{" "}
                {product.specifications.roaming.isAvailable
                  ? product.specifications.roaming.countries.length > 0
                    ? product.specifications.roaming.countries.join(", ")
                    : "Tersedia"
                  : "Tidak Tersedia"}
              </p>
            )}
          </div>
        </div>
        <div className="py-2 px-1 border-t-2 border-[#9A9A9A] text-[20px] text-[#5B5B5B] font-bold">
          {product.price}
        </div>
      </div>
      <div className="py-2 flex justify-end">
        <Button />
      </div>
    </CardContainer>
  );
}