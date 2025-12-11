"use client";

export default function Input({
  value,
  onChange,
  placeholder = "Placeholder...",
  type = "text",
  className = "",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-white border-1 border-[var(--neutral-color)] p-3 -my-2 rounded-lg text-[14px] text-[#5B5B5B] ${className}`}
    />
  );
}