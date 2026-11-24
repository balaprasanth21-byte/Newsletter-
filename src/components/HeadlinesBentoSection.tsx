"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, Clock, BookOpen } from "lucide-react";
import {
  ARTICLES,
  CATEGORIES,
  CURRENT_ISSUE,
  getCurrentIssueArticles,
} from "@/data";
import { Category, NewsArticle } from "@/types/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";

function getGridClasses(index: number, total: number): {
  colSpan: string;
  isHorizontalFeature: boolean;
} {
  if (total === 1) {
    return {
      colSpan: "md:col-span-2 lg:col-span-12",
      isHorizontalFeature: true,
    };
  }
  if (total === 2) {
    return {
      colSpan: "md:col-span-1 lg:col-span-6",
      isHorizontalFeature: false,
    };
  }
  if (total === 3) {
    if (index === 0) {
      return {
        colSpan: "md:col-span-2 lg:col-span-12",
        isHorizontalFeature: true,
      };
    }
    return {
      colSpan: "md:col-span-1 lg:col-span-6",
      isHorizontalFeature: false,
    };
  }
  if (total === 4) {
    if (index === 0) {
      return {
        colSpan: "md:col-span-2 lg:col-span-12",
        isHorizontalFeature: true,
      };
    }
    if (index === 3) {
      return {
        colSpan: "md:col-span-2 lg:col-span-4",
        isHorizontalFeature: false,
      };
    }
    return {
      colSpan: "md:col-span-1 lg:col-span-4",
      isHorizontalFeature: false,
    };
  }
  if (total === 5) {
    if (index === 0) {
      return {
        colSpan: "md:col-span-2 lg:col-span-6",
        isHorizontalFeature: false,
      };
    }
    if (index === 1) {
      return {
        colSpan: "md:col-span-1 lg:col-span-6",
        isHorizontalFeature: false,
      };
    }
    return {
      colSpan: "md:col-span-1 lg:col-span-4",
      isHorizontalFeature: false,
    };
  }

  // Default 6-story asymmetric magazine bento: 1 flagship (12) + 2 wide (6,6) + 3 cards (4,4,4)
  // On md (2-col): 0=2, 1+2=1+1, 3+4=1+1, 5=2 => ZERO orphan columns on every breakpoint
  if (index === 0) {
    return {
      colSpan: "md:col-span-2 lg:col-span-12",
      isHorizontalFeature: true,
    };
  }
  if (index === 1 || index === 2) {
    return {
      colSpan: "md:col-span-1 lg:col-span-6",
      isHorizontalFeature: false,
    };
  }
  if (index === total - 1 && total % 2 === 0) {
    return {
      colSpan: "md:col-span-2 lg:col-span-4",
      isHorizontalFeature: false,
    };
  }
  return {
    colSpan: "md:col-span-1 lg:col-span-4",
    isHorizontalFeature: false,
  };
}

function StoryCard({
  article,
  horizontalFeature = false,
  colSpanClass = "",
  index = 0,
}: {
  article: NewsArticle;
  horizontalFeature?: boolean;
  colSpanClass?: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: Math.min(index * 0.05, 0.24),
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      className={`editorial-card group relative flex h-full flex-col overflow-hidden rounded-2xl ${colSpanClass}`}
    >
      <Link
        href={`/news/${article.slug}`}
        id={`headline-card-${article.slug}`}
        className={`flex h-full w-full flex-col ${
          horizontalFeature ? "lg:grid lg:grid-cols-12" : ""
        }`}
      >
        {/* Editorial Visual */}
        <div
          className={`relative overflow-hidden bg-[#0D2B22] ${
            horizontalFeature
              ? "aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[380px]"
              : "aspect-[16/10]"
          }`}
        >
          <EditorialArtwork
            image={article.image}
            artworkVariant={article.artworkVariant}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D2B22]/45 via-transparent to-transparent" />

          {/* Region Floating Stamp */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-[#FFFDF9]/92 px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#0D2B22] backdrop-blur-sm shadow-[0_4px_12px_rgba(13,43,34,0.12)]">
            <Globe2 className="h-3 w-3 text-[#2E7D4F]" />
            <span>{article.region}</span>
          </div>

          {horizontalFeature && (
            <div className="absolute bottom-3.5 left-3.5 rounded-full bg-[#C85A32] px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#FFFDF9]">
              Lead Story • Issue #{article.issueNumber}
            </div>
          )}
        </div>

        {/* Editorial Content */}
        <div
          className={`flex flex-1 flex-col justify-between p-5 sm:p-6 ${
            horizontalFeature ? "lg:col-span-5 lg:p-8" : ""
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-block rounded-full bg-[#E3EFE8] px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 font-data text-[10.5px] uppercase text-[#4D6B60]">
                <Clock className="h-3 w-3 text-[#D99B26]" />
                {article.readTime}
              </span>
            </div>

            <h3
              className={`font-editorial mt-3.5 font-semibold text-[#0D2B22] transition-colors duration-200 group-hover:text-[#C85A32] ${
                horizontalFeature
                  ? "text-2xl leading-snug sm:text-[1.85rem]"
                  : "text-xl leading-snug"
              }`}
            >
              {article.title}
            </h3>

            <p
              className={`mt-2.5 text-sm leading-relaxed text-[#24473B] ${
                horizontalFeature ? "line-clamp-4 sm:text-[15px]" : "line-clamp-2"
              }`}
            >
              {article.summary}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#E6DFD3] pt-4">
            <span className="font-data text-[10.5px] uppercase text-[#4D6B60]">
              {article.publishedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C85A32]">
              <span>Read Deep Dive</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function HeadlinesBentoSection() {
  const [activeCategory, setActiveCategory] = useState<
    "All Insights" | Category
  >("All Insights");
  const [activeSlide, setActiveSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const issueArticles = useMemo(() => getCurrentIssueArticles(), []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All Insights") return issueArticles;
    const issueMatches = issueArticles.filter(
      (a) =>
        a.category === activeCategory ||
        a.secondaryCategories?.includes(activeCategory)
    );
    return issueMatches.length > 0
      ? issueMatches
      : ARTICLES.filter(
          (a) =>
            a.category === activeCategory ||
            a.secondaryCategories?.includes(activeCategory)
        ).slice(0, 6);
  }, [activeCategory, issueArticles]);

  const leadArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  const handleDeckScroll = () => {
    if (!deckRef.current) return;
    const el = deckRef.current;
    const cardWidth = el.firstElementChild?.clientWidth ?? 300;
    const idx = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveSlide(
      Math.max(0, Math.min(idx, Math.max(secondaryArticles.length - 1, 0)))
    );
  };

  const scrollToSlide = (idx: number) => {
    if (!deckRef.current) return;
    const cardWidth = deckRef.current.firstElementChild?.clientWidth ?? 300;
    deckRef.current.scrollTo({
      left: idx * (cardWidth + 16),
      behavior: "smooth",
    });
    setActiveSlide(idx);
  };

  return (
    <section
      id="briefing"
      className="relative bg-[#F9F6F0] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 font-data text-xs font-semibold uppercase text-[#2E7D4F]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>
                Issue #{CURRENT_ISSUE.number} • {CURRENT_ISSUE.date}
              </span>
            </div>
            <h2 className="font-editorial section-headline mt-2.5 font-semibold text-[#0D2B22]">
              This Week&apos;s Top Headlines
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#24473B] sm:text-base">
              Select any intelligence brief below for full field data, key
              metrics, and our strategic brand &amp; market lens.
            </p>
          </div>

          <Link
            href="/archive"
            className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#D5CBB8] bg-[#FFFDF9] px-4 py-2.5 text-sm font-semibold text-[#0D2B22] transition-colors hover:border-[#C85A32]/60 hover:text-[#C85A32] lg:self-auto"
          >
            <span>Explore All {ARTICLES.length} Briefs</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Interactive Framer Motion layoutId Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter headlines by category"
          className="no-scrollbar mt-8 flex items-center gap-2 overflow-x-auto pb-2"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                id={`category-pill-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveSlide(0);
                }}
                className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  isSelected
                    ? "text-[#FFFDF9]"
                    : "border border-[#E6DFD3] bg-[#FFFDF9] text-[#24473B] hover:border-[#C85A32]/40 hover:text-[#0D2B22]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-category-pill"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="absolute inset-0 rounded-full bg-[#0D2B22] shadow-[0_6px_16px_rgba(13,43,34,0.18)]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Mathematically Balanced Asymmetric Editorial Bento Grid (Zero Orphan Gaps) */}
        {filteredArticles.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-10 text-center">
            <p className="font-editorial text-xl text-[#0D2B22]">
              No briefs match this category in Issue #{CURRENT_ISSUE.number}.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Insights")}
              className="mt-4 cursor-pointer rounded-xl bg-[#C85A32] px-4 py-2 text-sm font-semibold text-[#FFFDF9]"
            >
              Show All Insights
            </button>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Asymmetric Bento Grid (12-col on lg, 2-col on md) */}
            <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-12">
              {filteredArticles.map((article, idx) => {
                const { colSpan, isHorizontalFeature } = getGridClasses(
                  idx,
                  filteredArticles.length
                );
                return (
                  <StoryCard
                    key={article.slug}
                    article={article}
                    horizontalFeature={isHorizontalFeature}
                    colSpanClass={colSpan}
                    index={idx}
                  />
                );
              })}
            </div>

            {/* Mobile-First Experience: Prominent Lead Card + Smooth Horizontal Snap-Scroll Card Deck */}
            <div className="mt-7 md:hidden">
              {leadArticle && (
                <StoryCard article={leadArticle} index={0} />
              )}

              {secondaryArticles.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-data text-[10.5px] font-semibold uppercase text-[#4D6B60]">
                      Swipe More Issue #{CURRENT_ISSUE.number} Briefs
                    </span>
                    <span className="font-data text-[10.5px] text-[#C85A32]">
                      {activeSlide + 1} / {secondaryArticles.length}
                    </span>
                  </div>

                  <div
                    ref={deckRef}
                    onScroll={handleDeckScroll}
                    className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3"
                  >
                    {secondaryArticles.map((article, idx) => (
                      <div
                        key={article.slug}
                        className="w-[84vw] max-w-[335px] shrink-0 snap-center"
                      >
                        <StoryCard article={article} index={idx + 1} />
                      </div>
                    ))}
                  </div>

                  {/* Animated Pagination Dots */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {secondaryArticles.map((article, idx) => (
                      <button
                        key={article.slug}
                        type="button"
                        aria-label={`View brief ${idx + 1}`}
                        onClick={() => scrollToSlide(idx)}
                        className="cursor-pointer p-1"
                      >
                        <motion.span
                          animate={{
                            width: activeSlide === idx ? 24 : 7,
                            backgroundColor:
                              activeSlide === idx ? "#C85A32" : "#D5CBB8",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 22,
                          }}
                          className="block h-1.5 rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
