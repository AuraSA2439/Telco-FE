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

function formatQuota(mb) {
  if (!mb) return null;
  if (mb === 999999) return "Unlimited";
  return `${Math.ceil(mb / 1024)} GB`;
}

export default function ProductDetailPage() {
  const { id } = useParams();
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

  const specs = product.specifications || {};
  const roaming = specs.roaming || {};

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

            {specs.dataQuota && (
              <p>
                <span className="font-semibold">Kuota Internet:</span>{" "}
                {formatQuota(specs.dataQuota)}
              </p>
            )}

            {specs.videoDataQuota && (
              <p>
                <span className="font-semibold">Kuota Video:</span>{" "}
                {formatQuota(specs.videoDataQuota)}
              </p>
            )}

            {specs.voiceMinutes && (
              <p>
                <span className="font-semibold">Telepon:</span>{" "}
                {specs.voiceMinutes === 999999
                  ? "Unlimited"
                  : `${specs.voiceMinutes} Menit`}
              </p>
            )}

            {specs.smsCount && (
              <p>
                <span className="font-semibold">SMS:</span>{" "}
                {specs.smsCount === 999999
                  ? "Unlimited"
                  : `${specs.smsCount} SMS`}
              </p>
            )}

            {specs.validity && (
              <p>
                <span className="font-semibold">Masa Berlaku:</span>{" "}
                {specs.validity} Hari
              </p>
            )}

            {roaming && (
              <p>
                <span className="font-semibold">Roaming:</span>{" "}
                {roaming.isAvailable
                  ? roaming.countries.length > 0
                    ? roaming.countries.join(", ")
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
      <div className="py-2 flex justify-end font-bold">
        <Button>Beli Sekarang</Button>
      </div>
    </CardContainer>
  );
}