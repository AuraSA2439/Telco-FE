"use client";

export default function Form({
  children,
  onSubmit,
  className = "",
  gap = "gap-4",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`bg-[#F3F3F3] p-6 rounded-xl border-1 border-[var(--neutral-color)] flex flex-col ${gap} ${className}`}
    >
      {children}
    </form>
  );
}