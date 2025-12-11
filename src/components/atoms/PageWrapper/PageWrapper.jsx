"use client";

import { useGlobalLoading } from "@/services/LoadingPage";

export default function PageWrapper({ children }) {
  const { loading } = useGlobalLoading();

  if (loading) {
    return null; // page not rendered yet
  }

  return children;
}