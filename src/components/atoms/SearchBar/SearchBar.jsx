"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  placeholder = "Cari Produk...",
  onSearch,
}) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onSearch?.(v);
  };

  return (
    <div
      className={`${styles.searchBar} w-full max-w-[800px] rounded-full flex items-center gap-2 text-gray-400`}
    >
      <input
        type="text"
        className="w-full outline-none bg-transparent"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Icon name="search" className="text-gray-300" size={20} />
    </div>
  );
}