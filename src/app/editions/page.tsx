import React from "react";
import type { Metadata } from "next";
import { EditionsPageClient } from "@/components/EditionsPageClient";

export const metadata: Metadata = {
  title: "Past Weekly Editions",
  description:
    "Browse the archive of previous weekly global agriculture intelligence briefings and jump directly into any deep-dive report.",
};

export default function EditionsPage() {
  return <EditionsPageClient />;
}
