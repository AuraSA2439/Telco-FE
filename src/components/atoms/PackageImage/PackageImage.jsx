"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatQuota } from "@/utils/formatQuota";
import styles from "./PackageImage.module.css";

const categoryColors = {
  data: { bg: "#A100FF", text: "#89E4FF" },
  streaming: { bg: "#7200B5", text: "#D48AFF" },
  voice: { bg: "#D48AFF", text: "#C9F3FF" },
  sms: { bg: "#61A2B5", text: "#7200B5" },
  combo: { bg: "#89E4FF", text: "#A100FF" },
  device: { bg: "#61A2B5", text: "#C9F3FF" },
  roaming: { bg: "#C9F3FF", text: "#61A2B5" },
  default: { bg: "var(--neutral-color)", text: "#A100FF" },
};

const displayCategory = {
  data: "Internet",
  streaming: "Streaming",
  voice: "Telepon",
  sms: "SMS",
  combo: "Combo",
  device: "Device +",
  roaming: "Roaming",
  default: "Paket",
};

export default function PackageImage({ product, size = "medium" }) {
  const containerRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const scale = Math.max(0.6, Math.min(width / 160, 2));
      setFontScale(scale);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const category = product?.category || "default";
  const specs = product?.specifications || {};
  const roaming = specs.roaming || {};

  const colors = useMemo(
    () => categoryColors[category] || categoryColors.default,
    [category]
  );

  const type = displayCategory[category] || displayCategory.default;

  const quota = formatQuota(specs.dataQuota);
  const videoQuota = formatQuota(specs.videoDataQuota);
  const sms = specs.smsCount ? `${specs.smsCount} Pesan` : "";
  const voice = specs.voiceMinutes ? `${specs.voiceMinutes} Menit` : "";
  const validity = specs.validity ? `${specs.validity} Hari` : "";

  let roamingCountry =
    category === "roaming" && roaming?.countries?.length > 0
      ? roaming.countries[0]
      : "";

  if (roamingCountry.toLowerCase() === "global coverage") {
    roamingCountry = "Global";
  }

  const mainInfo =
    category === "roaming"
      ? roamingCountry
      : quota || videoQuota || sms || voice;

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
      className={`${styles.container} ${styles[size]}`}
    >
      <span
        className={styles.type}
        style={{ fontSize: `${20 * fontScale}px` }}
      >
        {type}
      </span>

      {mainInfo && (
        <span
          className={styles.main}
          style={{
            fontSize:
              size === "large"
                ? "28px"
                : `${32 * fontScale}px`,
          }}
        >
          {mainInfo}
        </span>
      )}

      {size === "medium" && validity && (
        <span
          className={styles.validity}
          style={{ fontSize: `${20 * fontScale}px` }}
        >
          {validity}
        </span>
      )}
    </div>
  );
}