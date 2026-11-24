"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ArrowRight,
  Sprout,
  Globe2,
  Clock,
} from "lucide-react";
import { CURRENT_ISSUE, getCurrentIssueArticles } from "@/data/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";

export function InboxPreviewWidget() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const currentArticles = getCurrentIssueArticles();
  const leadStory = currentArticles[0];
  const briefStories = currentArticles.slice(1, 4);

  return (
    <div className="relative">
      {/* Mode Switcher Bar */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className="font-data text-[10.5px] font-medium uppercase text-[#4D6B60]">
          Live Issue Preview
        </span>

        <div
          role="tablist"
          aria-label="Newsletter preview viewport"
          className="inline-flex rounded-full border border-[#E6DFD3] bg-[#FFFDF9] p-1 shadow-[0_4px_14px_rgba(13,43,34,0.05)]"
        >
          {(
            [
              { id: "desktop", label: "Desktop Briefing", icon: Monitor },
              { id: "mobile", label: "Mobile Digest", icon: Smartphone },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                id={`preview-toggle-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setMode(tab.id)}
                className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? "text-[#FFFDF9]" : "text-[#24473B] hover:text-[#0D2B22]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="inbox-preview-pill"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="absolute inset-0 rounded-full bg-[#0D2B22]"
                  />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Frame Stage — stable min-height prevents CLS on viewport toggle */}
      <div className="flex min-h-[455px] items-center justify-center">
        <AnimatePresence mode="wait">
          {mode === "desktop" ? (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="w-full overflow-hidden rounded-2xl border border-[#D5CBB8] bg-[#FFFDF9] shadow-[0_24px_54px_rgba(13,43,34,0.13)]"
            >
              {/* Email Client Chrome */}
              <div className="flex items-center justify-between border-b border-[#E6DFD3] bg-[#F2ECE1] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C85A32]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D99B26]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2E7D4F]/75" />
                </div>
                <div className="font-data truncate text-[10px] uppercase text-[#4D6B60]">
                  Inbox • Issue #{CURRENT_ISSUE.number} — {CURRENT_ISSUE.shortDate}
                </div>
                <span className="font-data rounded bg-[#E3EFE8] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase text-[#2E7D4F]">
                  Mon 07:00
                </span>
              </div>

              {/* Email Masthead */}
              <div className="border-b border-[#E6DFD3] bg-[#0D2B22] px-5 py-4 text-[#F9F6F0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-[#D99B26]" />
                    <span className="font-editorial text-sm font-semibold">
                      Meridian Canopy
                    </span>
                  </div>
                  <span className="font-data text-[10px] uppercase text-[#B8CFC4]">
                    Issue #{CURRENT_ISSUE.number} • 4 Min Read
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#DCE9E2]">
                  {CURRENT_ISSUE.editorialNote}
                </p>
              </div>

              {/* Lead Story Snippet */}
              <div className="p-4 sm:p-5">
                <Link
                  href={`/news/${leadStory.slug}`}
                  className="group grid gap-3.5 rounded-xl border border-[#E6DFD3] bg-[#F9F6F0]/75 p-3 transition-colors hover:border-[#C85A32]/50 sm:grid-cols-12"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg sm:col-span-5 sm:aspect-auto sm:h-full">
                    <EditorialArtwork
                      image={leadStory.image}
                      alt={leadStory.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between sm:col-span-7">
                    <div>
                      <span className="inline-block rounded-full bg-[#E3EFE8] px-2 py-0.5 font-data text-[9.5px] font-semibold uppercase text-[#2E7D4F]">
                        Lead Signal • {leadStory.region}
                      </span>
                      <h3 className="font-editorial mt-2 text-sm font-semibold leading-snug text-[#0D2B22] group-hover:text-[#C85A32] transition-colors">
                        {leadStory.title}
                      </h3>
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#C85A32]">
                      Read Deep Dive
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>

                {/* Rapid Executive Signals */}
                <div className="mt-3.5 divide-y divide-[#E6DFD3]">
                  {briefStories.map((story, idx) => (
                    <Link
                      key={story.slug}
                      href={`/news/${story.slug}`}
                      className="group flex items-center justify-between gap-3 py-2.5 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-data text-[10px] font-semibold text-[#D99B26]">
                            0{idx + 2}
                          </span>
                          <span className="font-data truncate text-[9.5px] uppercase text-[#4D6B60]">
                            {story.category}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#0D2B22] transition-colors group-hover:text-[#C85A32]">
                          {story.title}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#4D6B60] transition-transform group-hover:translate-x-1 group-hover:text-[#C85A32]" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] border-[6px] border-[#0D2B22] bg-[#FFFDF9] shadow-[0_24px_54px_rgba(13,43,34,0.2)]"
            >
              {/* Phone Status Notch Bar */}
              <div className="flex items-center justify-between bg-[#0D2B22] px-5 pt-2.5 pb-2 text-[10px] text-[#DCE9E2]">
                <span className="font-data">07:04</span>
                <div className="h-3.5 w-16 rounded-full bg-[#183F32]" />
                <span className="font-data">5G</span>
              </div>

              {/* Mobile Digest Header */}
              <div className="bg-[#0D2B22] px-4 pt-2 pb-4 text-[#F9F6F0]">
                <div className="flex items-center justify-between">
                  <span className="font-data text-[9.5px] uppercase text-[#D99B26]">
                    Issue #{CURRENT_ISSUE.number} • Digest
                  </span>
                  <span className="inline-flex items-center gap-1 font-data text-[9.5px] text-[#B8CFC4]">
                    <Clock className="h-2.5 w-2.5" /> 4m
                  </span>
                </div>
                <p className="font-editorial mt-1.5 text-base font-semibold leading-tight">
                  Global Crop Innovation Weekly
                </p>
              </div>

              {/* Mobile Digest Cards */}
              <div className="space-y-3 bg-[#F9F6F0] p-3.5">
                <Link
                  href={`/news/${leadStory.slug}`}
                  className="group block overflow-hidden rounded-xl border border-[#E6DFD3] bg-[#FFFDF9] shadow-[0_4px_12px_rgba(13,43,34,0.06)]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <EditorialArtwork
                      image={leadStory.image}
                      alt={leadStory.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <span className="inline-flex items-center gap-1 font-data text-[9px] font-semibold uppercase text-[#2E7D4F]">
                      <Globe2 className="h-2.5 w-2.5" /> {leadStory.region}
                    </span>
                    <h3 className="font-editorial mt-1 text-xs font-semibold leading-snug text-[#0D2B22] group-hover:text-[#C85A32]">
                      {leadStory.title}
                    </h3>
                  </div>
                </Link>

                <div className="space-y-2">
                  {briefStories.slice(0, 2).map((story) => (
                    <Link
                      key={story.slug}
                      href={`/news/${story.slug}`}
                      className="group flex items-start justify-between gap-2 rounded-xl border border-[#E6DFD3] bg-[#FFFDF9] p-2.5 transition-colors hover:border-[#C85A32]/50"
                    >
                      <div>
                        <span className="font-data text-[9px] uppercase text-[#C85A32]">
                          {story.region}
                        </span>
                        <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-[#0D2B22]">
                          {story.title}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-[#4D6B60] transition-transform group-hover:translate-x-0.5 group-hover:text-[#C85A32]" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
