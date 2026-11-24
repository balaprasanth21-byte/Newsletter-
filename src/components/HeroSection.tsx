"use client";

import React from "react";
import { motion } from "framer-motion";
import { CURRENT_ISSUE } from "@/data/intelligence";
import { TopographicContours } from "@/components/TopographicContours";
import { SubscribeForm } from "@/components/SubscribeForm";
import { InboxPreviewWidget } from "@/components/InboxPreviewWidget";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E6DFD3] bg-[#F9F6F0]">
      <TopographicContours />

      <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-7"
          >
            {/* Refined Editorial Metadata Eyebrow */}
            <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-[#D99B26]/55 pb-2 font-data text-[11px] font-semibold uppercase text-[#24473B]">
              <span className="text-[#C85A32]">
                ISSUE #{CURRENT_ISSUE.number}
              </span>
              <span aria-hidden="true" className="text-[#D5CBB8]">
                •
              </span>
              <span>{CURRENT_ISSUE.verticalLabel}</span>
              <span aria-hidden="true" className="text-[#D5CBB8]">
                •
              </span>
              <span className="text-[#2E7D4F]">{CURRENT_ISSUE.readTime}</span>
            </div>

            <h1 className="font-editorial hero-headline mt-5 font-semibold text-[#0D2B22]">
              Global Agribusiness &amp; Crop Innovation—Curated Weekly for
              Industry Leaders.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#24473B] sm:text-lg">
              Cut through the noise. Every Monday, we distill the biggest
              breakthroughs in crop science, biologicals, and AgTech—and what
              they mean for your brand.
            </p>

            {/* Single-Field Conversion Form */}
            <div className="mt-8 max-w-xl">
              <SubscribeForm
                variant="hero"
                idPrefix="hero-subscribe"
                buttonLabel="Get the Monday Briefing"
              />
            </div>

            {/* Subtle Editorial Desk Index */}
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-[#E6DFD3] pt-6">
              <div>
                <p className="font-data text-lg font-semibold text-[#0D2B22] sm:text-xl">
                  6 Briefs
                </p>
                <p className="mt-0.5 text-xs text-[#4D6B60]">
                  Curated deep dives per issue
                </p>
              </div>
              <div>
                <p className="font-data text-lg font-semibold text-[#0D2B22] sm:text-xl">
                  4 Regions
                </p>
                <p className="mt-0.5 text-xs text-[#4D6B60]">
                  Americas, EU, India &amp; APAC
                </p>
              </div>
              <div>
                <p className="font-data text-lg font-semibold text-[#2E7D4F] sm:text-xl">
                  4 Min
                </p>
                <p className="mt-0.5 text-xs text-[#4D6B60]">
                  Executive scan-to-strategy
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Live Interactive Inbox Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 95,
              damping: 20,
              delay: 0.12,
            }}
            className="lg:col-span-5"
          >
            <InboxPreviewWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
