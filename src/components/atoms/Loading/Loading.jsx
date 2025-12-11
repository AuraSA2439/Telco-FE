"use client";

import { Riple } from "react-loading-indicators";
import { useGlobalLoading } from "@/services/LoadingPage";

export default function Loading() {
  const { loading } = useGlobalLoading();

  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <Riple color="var(--primary-color)" size="60px" />
    </div>
  );
}