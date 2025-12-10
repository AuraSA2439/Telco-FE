"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// FIXED CATEGORY COLORS
const categoryColors = {
  data: { bg: "#A100FF", text: "#89E4FF" },
  streaming: { bg: "#7200B5", text: "#D48AFF" },
  voice: { bg: "#D48AFF", text: "#C9F3FF" },
  sms: { bg: "#61A2B5", text: "#7200B5" },
  combo: { bg: "#89E4FF", text: "#A100FF" },
  default: { bg: "#daf7ff", text: "#3a606b" },
};

// ✔ Category → Display Label Mapping
const displayCategory = {
  data: "Internet",
  streaming: "Streaming",
  voice: "Telepon",
  sms: "SMS",
  combo: "Combo",
  default: "Paket",
};

// Format quota
function formatQuota(dataQuota) {
  if (!dataQuota) return "";
  if (dataQuota >= 1024) {
    return `${Math.ceil(dataQuota / 1024)} GB`;
  }
  return `${Math.ceil(dataQuota)} MB`;
}

export default function PackageImage({
  width = "100%",
  height = "auto",
  product,
}) {
  const containerRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);

  // ResizeObserver → dynamic text size
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const boxWidth = entry.contentRect.width;

      const scale = Math.max(0.6, Math.min(boxWidth / 160, 2));
      setFontScale(scale);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const category = product?.category || "default";

  const colors = useMemo(
    () => categoryColors[category] || categoryColors.default,
    [category]
  );

  const specs = product?.specifications || {};

  // ✔ Use mapped display name instead of backend key
  const type = displayCategory[category] || displayCategory.default;

  const quota = formatQuota(specs.dataQuota);
  const sms = specs.smsCount ? `${specs.smsCount} Pesan` : "";
  const voice = specs.voiceMinutes ? `${specs.voiceMinutes} Menit` : "";
  const validity = specs.validity ? `${specs.validity} Hari` : "";
  const mainInfo = quota || sms || voice;

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
      className="w-full h-[120.67px] aspect-square flex flex-col font-bold rounded-lg p-6 md:px-4 md:py-2 select-none overflow-hidden"
    >
      <span
        style={{
          fontSize: `${20 * fontScale}px`, color: "#ffffff",
        }}
      >
        {type}
      </span>

      {mainInfo && (
        <span
          style={{
            fontSize: `${36 * fontScale}px`, height: "100%", display: "flex", alignItems: "center",
          }}
        >
          {mainInfo}
        </span>
      )}

      {validity && (
        <span
          style={{
            fontSize: `${20 * fontScale}px`, color: "#000000",
            opacity: 0.8,
          }}
        >
          {validity}
        </span>
      )}
    </div>
  );
}