"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  X,
  BookOpen,
  Layers,
} from "lucide-react";
import { WEEKLY_EDITIONS, getArticleBySlug } from "@/data/intelligence";
import { WeeklyEdition } from "@/types/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";

function EditionCard({
  edition,
  onQuickRead,
}: {
  edition: WeeklyEdition;
  onQuickRead: (edition: WeeklyEdition) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      className="editorial-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0D2B22]">
        <EditorialArtwork
          image={edition.coverImage}
          artworkVariant={edition.artworkVariant}
          alt={edition.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D2B22]/65 via-[#0D2B22]/15 to-transparent" />

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

        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between font-data text-[10px] uppercase text-[#F9F6F0]">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#D99B26]" />
            {edition.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#D99B26]" />
            {edition.readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="inline-block rounded-full bg-[#E3EFE8] px-2.5 py-0.5 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
            {edition.leadCategory}
          </span>
          <h3 className="font-editorial mt-2.5 text-lg font-semibold leading-snug text-[#0D2B22] transition-colors group-hover:text-[#C85A32]">
            {edition.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#24473B]">
            {edition.summary}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#E6DFD3] pt-4">
          <button
            type="button"
            onClick={() => onQuickRead(edition)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#24473B] transition-colors hover:text-[#C85A32]"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick Preview</span>
          </button>

          <Link
            href={
              edition.storySlugs[0]
                ? `/news/${edition.storySlugs[0]}`
                : "/editions"
            }
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C85A32]"
          >
            <span>Open Brief</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PastEditionsCarousel() {
  const [selectedEdition, setSelectedEdition] = useState<WeeklyEdition | null>(
    null
  );
  const [activeDot, setActiveDot] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const displayedEditions = WEEKLY_EDITIONS.slice(0, 4);

  const handleScroll = () => {
    if (!deckRef.current) return;
    const el = deckRef.current;
    const width = el.firstElementChild?.clientWidth ?? 300;
    const idx = Math.round(el.scrollLeft / (width + 16));
    setActiveDot(Math.max(0, Math.min(idx, displayedEditions.length - 1)));
  };

  return (
    <section className="border-t border-[#E6DFD3] bg-[#F9F6F0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 font-data text-xs font-semibold uppercase text-[#2E7D4F]">
              <Layers className="h-3.5 w-3.5" />
              <span>Weekly Archive</span>
            </div>
            <h2 className="font-editorial section-headline mt-2.5 font-semibold text-[#0D2B22]">
              Recent Editions &amp; Briefings
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#24473B] sm:text-base">
              Browse previous Monday dispatches or open an instant executive
              preview of any edition.
            </p>
          </div>

          <Link
            href="/editions"
            className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#D5CBB8] bg-[#FFFDF9] px-4 py-2.5 text-sm font-semibold text-[#0D2B22] transition-colors hover:border-[#C85A32]/60 hover:text-[#C85A32] sm:self-auto"
          >
            <span>All Past Editions</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Desktop & Tablet 4-Column Grid */}
        <div className="mt-9 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {displayedEditions.map((edition) => (
            <EditionCard
              key={edition.issueNumber}
              edition={edition}
              onQuickRead={setSelectedEdition}
            />
          ))}
        </div>

        {/* Mobile Horizontal Snap-Scroll Deck */}
        <div className="mt-7 md:hidden">
          <div
            ref={deckRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3"
          >
            {displayedEditions.map((edition) => (
              <div
                key={edition.issueNumber}
                className="w-[82vw] max-w-[320px] shrink-0 snap-center"
              >
                <EditionCard
                  edition={edition}
                  onQuickRead={setSelectedEdition}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {displayedEditions.map((ed, idx) => (
              <button
                key={ed.issueNumber}
                type="button"
                aria-label={`View Issue ${ed.issueNumber}`}
                onClick={() => {
                  if (!deckRef.current) return;
                  const w = deckRef.current.firstElementChild?.clientWidth ?? 300;
                  deckRef.current.scrollTo({
                    left: idx * (w + 16),
                    behavior: "smooth",
                  });
                  setActiveDot(idx);
                }}
                className="cursor-pointer p-1"
              >
                <motion.span
                  animate={{
                    width: activeDot === idx ? 22 : 7,
                    backgroundColor: activeDot === idx ? "#2E7D4F" : "#D5CBB8",
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="block h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick-Read Edition Modal */}
      <AnimatePresence>
        {selectedEdition && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edition-preview-title"
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEdition(null)}
              className="absolute inset-0 bg-[#0D2B22]/55 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative z-10 max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[#E6DFD3] bg-[#FFFDF9] p-6 shadow-[0_26px_64px_rgba(13,43,34,0.24)] sm:rounded-3xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Close edition preview"
                onClick={() => setSelectedEdition(null)}
                className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E6DFD3] bg-[#F9F6F0] text-[#24473B] hover:border-[#C85A32]/50 hover:text-[#0D2B22]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#0D2B22] px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#FDF4E3]">
                  Issue #{selectedEdition.issueNumber}
                </span>
                <span className="font-data text-[11px] uppercase text-[#4D6B60]">
                  {selectedEdition.date} • {selectedEdition.readTime}
                </span>
              </div>

              <h3
                id="edition-preview-title"
                className="font-editorial mt-3.5 text-2xl font-semibold text-[#0D2B22] sm:text-3xl"
              >
                {selectedEdition.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#24473B]">
                {selectedEdition.summary}
              </p>

              <div className="mt-6 rounded-2xl border-l-4 border-[#D99B26] bg-[#FDF4E3] p-5">
                <p className="font-data text-[10.5px] font-semibold uppercase text-[#8A6114]">
                  Inside This Dispatch
                </p>
                <ul className="mt-3 space-y-2.5">
                  {selectedEdition.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#0D2B22]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C85A32]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-data text-[10.5px] font-semibold uppercase text-[#4D6B60]">
                  Jump Directly to Deep-Dive Stories
                </p>
                <div className="mt-3 space-y-2">
                  {selectedEdition.storySlugs.slice(0, 3).map((slug) => {
                    const story = getArticleBySlug(slug);
                    if (!story) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/news/${story.slug}`}
                        onClick={() => setSelectedEdition(null)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-[#E6DFD3] bg-[#F9F6F0] px-4 py-3 transition-colors hover:border-[#C85A32]/50 hover:bg-[#FFFDF9]"
                      >
                        <div className="flex items-start gap-2.5">
                          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D4F]" />
                          <div>
                            <p className="text-sm font-semibold text-[#0D2B22] group-hover:text-[#C85A32]">
                              {story.title}
                            </p>
                            <p className="font-data mt-0.5 text-[10px] uppercase text-[#4D6B60]">
                              {story.region} • {story.readTime}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#4D6B60] transition-transform group-hover:translate-x-1 group-hover:text-[#C85A32]" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
