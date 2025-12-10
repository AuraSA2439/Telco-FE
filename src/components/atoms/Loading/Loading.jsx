"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Riple } from "react-loading-indicators";

export default function Loading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <Riple color="var(--primary-color)" size="60px" />
    </div>
  );
}