"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { CATEGORIES, WEEKLY_EDITIONS, getArticleBySlug } from "@/data";
import { Category } from "@/types/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";

export function EditionsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<
    "All Insights" | Category
  >("All Insights");

  const editions =
    selectedCategory === "All Insights"
      ? WEEKLY_EDITIONS
      : WEEKLY_EDITIONS.filter((e) => e.leadCategory === selectedCategory);

  return (
    <div className="editorial-grain bg-[#F9F6F0] pb-24">
      <section className="border-b border-[#E6DFD3] pt-10 pb-12 sm:pt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="font-data text-xs font-semibold uppercase text-[#2E7D4F]">
            Monday Dispatch Chronology
          </p>
          <h1 className="font-editorial article-headline mt-3 font-semibold text-[#0D2B22]">
            Past Weekly Editions
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#24473B]">
            Every Monday briefing curated for agribusiness executives—complete
            with issue highlights and direct access to individual deep-dive
            briefs.
          </p>

          <div className="no-scrollbar mt-7 flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    active
                      ? "text-[#FFFDF9]"
                      : "border border-[#E6DFD3] bg-[#FFFDF9] text-[#24473B] hover:border-[#C85A32]/50"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="editions-cat-pill"
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 24,
                      }}
                      className="absolute inset-0 rounded-full bg-[#0D2B22]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 lg:px-8">
        {editions.length === 0 ? (
          <div className="rounded-3xl border border-[#E6DFD3] bg-[#FFFDF9] p-12 text-center">
            <p className="font-editorial text-2xl font-semibold text-[#0D2B22]">
              No weekly editions led with &ldquo;{selectedCategory}&rdquo; yet.
            </p>
            <p className="mt-2 text-sm text-[#24473B]">
              Browse all editions or explore individual {selectedCategory} briefs
              inside our Topic Explorer.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory("All Insights")}
                className="cursor-pointer rounded-xl bg-[#C85A32] px-5 py-2.5 text-sm font-semibold text-[#FFFDF9] hover:bg-[#B04822]"
              >
                Show All Editions
              </button>
              <Link
                href={`/archive?category=${encodeURIComponent(selectedCategory)}`}
                className="rounded-xl border border-[#D5CBB8] bg-[#F9F6F0] px-5 py-2.5 text-sm font-semibold text-[#0D2B22] hover:border-[#C85A32]/50"
              >
                View {selectedCategory} Briefs
              </Link>
            </div>
          </div>
        ) : (
        <div className="space-y-8">
          {editions.map((edition, index) => (
            <motion.article
              key={edition.issueNumber}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.05,
              }}
              className="editorial-card overflow-hidden rounded-3xl"
            >
              <div className="grid lg:grid-cols-12">
                <div className="relative aspect-[16/10] bg-[#0D2B22] lg:col-span-5 lg:aspect-auto">
                  <EditorialArtwork
                    image={edition.coverImage}
                    artworkVariant={edition.artworkVariant}
                    alt={edition.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-[#0D2B22]/90 px-3 py-1 font-data text-[10.5px] font-semibold uppercase text-[#FDF4E3] backdrop-blur-sm">
                      Issue #{edition.issueNumber}
                    </span>
                    {edition.isCurrent && (
                      <span className="rounded-full bg-[#C85A32] px-3 py-1 font-data text-[10.5px] font-semibold uppercase text-[#FFFDF9]">
                        Current Issue
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 font-data text-[11px] uppercase text-[#4D6B60]">
                    <span className="rounded-full bg-[#E3EFE8] px-2.5 py-0.5 font-semibold text-[#2E7D4F]">
                      {edition.leadCategory}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#D99B26]" />
                      {edition.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#D99B26]" />
                      {edition.readTime}
                    </span>
                  </div>

                  <h2 className="font-editorial mt-3.5 text-2xl font-semibold text-[#0D2B22] sm:text-3xl">
                    {edition.title}
                  </h2>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#24473B] sm:text-base">
                    {edition.summary}
                  </p>

                  <div className="mt-5 rounded-2xl border border-[#E6DFD3] bg-[#F9F6F0] p-4">
                    <p className="font-data text-[10px] font-semibold uppercase text-[#4D6B60]">
                      Featured Briefs Inside
                    </p>
                    <div className="mt-3 space-y-2">
                      {edition.storySlugs.slice(0, 3).map((slug) => {
                        const story = getArticleBySlug(slug);
                        if (!story) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/news/${story.slug}`}
                            className="group flex items-center justify-between gap-3 rounded-xl bg-[#FFFDF9] px-3.5 py-2.5 text-sm font-semibold text-[#0D2B22] transition-colors hover:text-[#C85A32]"
                          >
                            <span className="flex items-center gap-2">
                              <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" />
                              <span className="line-clamp-1">{story.title}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#4D6B60] transition-transform group-hover:translate-x-1 group-hover:text-[#C85A32]" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        )}
      </section>
    </div>
  );
}
