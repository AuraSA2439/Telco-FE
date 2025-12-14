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

    router.push(`/allProducts?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.searchBar} w-full rounded-full flex gap-2 text-gray-500`}
    >
      <input
        type="search"
        className="w-full outline-none bg-transparent"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" aria-label="Search" className="flex items-center">
        <Icon name="search" size={24} />
      </button>
    </form>
  );
}