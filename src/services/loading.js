"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useGlobalLoading = () => useContext(LoadingContext);