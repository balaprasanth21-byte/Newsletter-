import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ArchiveExplorerClient } from "@/components/ArchiveExplorerClient";

export const metadata: Metadata = {
  title: "Full Archive & Topic Explorer",
  description:
    "Search and filter every weekly agriculture intelligence dispatch and standalone deep-dive brief by crop, region, or technology.",
};

export default function ArchivePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 text-sm text-[#24473B]">
          Loading archive explorer...
        </div>
      }
    >
      <ArchiveExplorerClient />
    </Suspense>
  );
}
