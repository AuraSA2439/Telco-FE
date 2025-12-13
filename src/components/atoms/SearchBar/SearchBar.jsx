"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/atoms/Icon/Icon";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  placeholder = "Cari Produk...",
}) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;

    router.push(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.searchBar} w-full rounded-full flex items-center gap-2`}
    >
      <input
        type="search"
        className="w-full outline-none bg-transparent"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" aria-label="Search">
        <Icon name="search" size={20} />
      </button>
    </form>
  );
}