"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import styles from "./SearchBar.module.css";

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className={`${styles.searchBar} w-full h-full rounded-full flex items-center text-gray-400 placeholder-gray-400 gap-2`}>
      <input
        type="text"
        className={`w-full outline-none`}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Icon name="search" className="text-gray-400" size={20} />
    </div>
  );
}