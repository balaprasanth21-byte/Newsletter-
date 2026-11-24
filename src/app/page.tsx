import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { HeadlinesBentoSection } from "@/components/HeadlinesBentoSection";
import { MarketSignalsSection } from "@/components/MarketSignalsSection";
import { PastEditionsCarousel } from "@/components/PastEditionsCarousel";

export default function HomePage() {
  return (
    <div className="editorial-grain">
      <HeroSection />
      <HeadlinesBentoSection />
      <MarketSignalsSection />
      <PastEditionsCarousel />
    </div>
  );
}
