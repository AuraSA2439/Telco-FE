"use client";

import { Riple } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-6">
      <Riple color="var(--primary-color)" size="50px" />
    </div>
  );
}
