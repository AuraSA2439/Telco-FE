"use client";

export default function Form({
  children,
  onSubmit,
  className = "",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`bg-[#F3F3F3] p-6 rounded-xl border-1 border-[var(--neutral-color)] flex flex-col gap-7 ${className}`}
    >
      {children}
    </form>
  );
}