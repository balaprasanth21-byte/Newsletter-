"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Globe2,
  Clock,
  SlidersHorizontal,
  Layers,
  BookOpen,
} from "lucide-react";
import { ARTICLES, CATEGORIES, WEEKLY_EDITIONS, REGIONS } from "@/data";
import { Category } from "@/types/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";

export function ArchiveExplorerClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    CATEGORIES.includes(initialCategory as Category) &&
      initialCategory !== "All Insights"
      ? [initialCategory as Category]
      : []
  );
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [viewMode, setViewMode] = useState<"headlines" | "editions">(
    "headlines"
  );

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearAll = () => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedRegion("All Regions");
  };

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.region.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(article.category) ||
        selectedCategories.some((c) => article.secondaryCategories?.includes(c));

      const matchesRegion =
        selectedRegion === "All Regions" ||
        article.region.toLowerCase().includes(selectedRegion.toLowerCase()) ||
        (selectedRegion === "India & South Asia" &&
          article.tags.some((t) => t.toLowerCase() === "india"));

      return matchesQuery && matchesCategory && matchesRegion;
    });
  }, [query, selectedCategories, selectedRegion]);

  const filteredEditions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WEEKLY_EDITIONS.filter((edition) => {
      const matchesQuery =
        !q ||
        edition.title.toLowerCase().includes(q) ||
        edition.summary.toLowerCase().includes(q) ||
        edition.highlights.some((h) => h.toLowerCase().includes(q));
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(edition.leadCategory);
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategories]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedRegion !== "All Regions";

  return (
    <div className="editorial-grain bg-[#F9F6F0] pb-24">
      {/* Header Banner */}
      <section className="border-b border-[#E6DFD3] bg-[#F9F6F0] pt-10 pb-12 sm:pt-14 sm:pb-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="font-data text-xs font-semibold uppercase text-[#2E7D4F]">
            Intelligence Library • Topic Explorer
          </p>
          <h1 className="font-editorial article-headline mt-3 font-semibold text-[#0D2B22]">
            Full Archive &amp; Topic Explorer
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#24473B]">
            Search across curated weekly dispatches, biological breakthroughs,
            regulatory shifts, and AgTech deep dives by crop, region, or
            technology.
          </p>

          {/* Search & View Switcher Bar */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-xl">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-[#4D6B60]" />
              <label htmlFor="archive-search-input" className="sr-only">
                Search headlines by keyword, crop, region, or technology
              </label>
              <input
                id="archive-search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keyword, crop, region, or tech (e.g. nitrogen, Brazil, AI, EU)..."
                className="w-full rounded-2xl border border-[#D5CBB8] bg-[#FFFDF9] py-3.5 pr-11 pl-11 text-sm text-[#0D2B22] shadow-[0_6px_18px_rgba(13,43,34,0.05)] placeholder:text-[#4D6B60]/75 focus:border-[#C85A32]"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-3.5 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#F2ECE1] text-[#24473B] hover:text-[#0D2B22]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className="inline-flex self-start rounded-full border border-[#E6DFD3] bg-[#FFFDF9] p-1 shadow-[0_4px_12px_rgba(13,43,34,0.05)] lg:self-auto">
              {(
                [
                  {
                    id: "headlines",
                    label: `Deep-Dive Headlines (${filteredArticles.length})`,
                    icon: BookOpen,
                  },
                  {
                    id: "editions",
                    label: `Weekly Editions (${filteredEditions.length})`,
                    icon: Layers,
                  },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = viewMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setViewMode(tab.id)}
                    className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? "text-[#FFFDF9]"
                        : "text-[#24473B] hover:text-[#0D2B22]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="archive-view-pill"
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 24,
                        }}
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

          {/* Multi-Tag Category & Region Filters */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1.5 font-data text-[10.5px] font-semibold uppercase text-[#4D6B60]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Topics:
              </span>
              {CATEGORIES.filter((c): c is Category => c !== "All Insights").map(
                (cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-[#C85A32] text-[#FFFDF9] shadow-[0_4px_12px_rgba(200,90,50,0.24)]"
                          : "border border-[#E6DFD3] bg-[#FFFDF9] text-[#24473B] hover:border-[#C85A32]/50"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                }
              )}
            </div>

            {viewMode === "headlines" && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-1.5 font-data text-[10.5px] font-semibold uppercase text-[#4D6B60]">
                  <Globe2 className="h-3.5 w-3.5" />
                  Region:
                </span>
                {REGIONS.map((region) => {
                  const active = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setSelectedRegion(region)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "bg-[#2E7D4F] text-[#FFFDF9]"
                          : "border border-[#E6DFD3] bg-[#FFFDF9] text-[#24473B] hover:border-[#2E7D4F]/45"
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="ml-2 cursor-pointer font-data text-[11px] font-semibold uppercase text-[#C85A32] underline underline-offset-4"
                  >
                    Reset All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 lg:px-8">
        {viewMode === "headlines" ? (
          filteredArticles.length === 0 ? (
            <div className="rounded-3xl border border-[#E6DFD3] bg-[#FFFDF9] p-12 text-center">
              <p className="font-editorial text-2xl font-semibold text-[#0D2B22]">
                No intelligence briefs matched your filters.
              </p>
              <p className="mt-2 text-sm text-[#24473B]">
                Try removing a topic tag or searching a broader crop or region
                term.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 cursor-pointer rounded-xl bg-[#C85A32] px-5 py-2.5 text-sm font-semibold text-[#FFFDF9] hover:bg-[#B04822]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  className="editorial-card group flex flex-col overflow-hidden rounded-2xl"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0D2B22]">
                      <EditorialArtwork
                        image={article.image}
                        artworkVariant={article.artworkVariant}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-[#FFFDF9]/92 px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#0D2B22] backdrop-blur-sm">
                        Issue #{article.issueNumber} • {article.region}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-[#E3EFE8] px-2.5 py-0.5 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
                            {article.category}
                          </span>
                          <span className="inline-flex items-center gap-1 font-data text-[10.5px] uppercase text-[#4D6B60]">
                            <Clock className="h-3 w-3 text-[#D99B26]" />
                            {article.readTime}
                          </span>
                        </div>
                        <h2 className="font-editorial mt-3 text-xl font-semibold leading-snug text-[#0D2B22] transition-colors group-hover:text-[#C85A32]">
                          {article.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#24473B]">
                          {article.summary}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#E6DFD3] pt-4">
                        <span className="font-data text-[10.5px] uppercase text-[#4D6B60]">
                          {article.publishedDate}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#C85A32]">
                          <span>Read Deep Dive</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )
        ) : filteredEditions.length === 0 ? (
          <div className="rounded-3xl border border-[#E6DFD3] bg-[#FFFDF9] p-12 text-center">
            <p className="font-editorial text-2xl font-semibold text-[#0D2B22]">
              No weekly editions matched your search.
            </p>
            <p className="mt-2 text-sm text-[#24473B]">
              Clear your filters to browse all 5 published issues.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 cursor-pointer rounded-xl bg-[#C85A32] px-5 py-2.5 text-sm font-semibold text-[#FFFDF9] hover:bg-[#B04822]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEditions.map((edition) => (
              <motion.div
                key={edition.issueNumber}
                whileHover={{ y: -3 }}
                className="editorial-card group flex flex-col justify-between overflow-hidden rounded-2xl"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0D2B22]">
                    <EditorialArtwork
                      image={edition.coverImage}
                      artworkVariant={edition.artworkVariant}
                      alt={edition.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-[#0D2B22]/90 px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#FDF4E3] backdrop-blur-sm">
                        Issue #{edition.issueNumber}
                      </span>
                      {edition.isCurrent && (
                        <span className="rounded-full bg-[#C85A32] px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#FFFDF9]">
                          Latest
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-[#E3EFE8] px-2.5 py-0.5 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
                        {edition.leadCategory}
                      </span>
                      <span className="font-data text-[11px] uppercase text-[#4D6B60]">
                        {edition.date} • {edition.readTime}
                      </span>
                    </div>
                    <h2 className="font-editorial mt-3.5 text-2xl font-semibold text-[#0D2B22]">
                      {edition.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#24473B]">
                      {edition.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-[#E6DFD3] pt-4 text-xs text-[#24473B]">
                      {edition.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C85A32]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E6DFD3] px-6 py-4">
                  <span className="font-data text-[10.5px] uppercase text-[#4D6B60]">
                    {edition.storySlugs.length} Deep-Dive Briefs
                  </span>
                  <Link
                    href={
                      edition.storySlugs[0]
                        ? `/news/${edition.storySlugs[0]}`
                        : "/editions"
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C85A32]"
                  >
                    <span>Read Issue Lead</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
