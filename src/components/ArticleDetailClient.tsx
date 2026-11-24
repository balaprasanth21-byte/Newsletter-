"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Globe2,
  Share2,
  Link2,
  MessageCircle,
  BookOpen,
  Sparkles,
  Compass,
  Check,
  Building2,
} from "lucide-react";
import { NewsArticle } from "@/types/intelligence";
import { EditorialArtwork } from "@/components/EditorialArtwork";
import { SubscribeForm } from "@/components/SubscribeForm";
import { useSubscribe } from "@/components/SubscribeContext";

interface ArticleDetailClientProps {
  article: NewsArticle;
  issueArticles: NewsArticle[];
  nextArticle: NewsArticle;
}

export function ArticleDetailClient({
  article,
  issueArticles,
  nextArticle,
}: ArticleDetailClientProps) {
  const { showToast } = useSubscribe();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Briefing link copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Link ready to share.");
    }
    setShareOpen(false);
  };

  const handleShareLinkedIn = () => {
    const url =
      typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    showToast("Opening LinkedIn share composer.");
    setShareOpen(false);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `${article.title} — Meridian Canopy Weekly Brief: ${
        typeof window !== "undefined" ? window.location.href : ""
      }`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp share.");
    setShareOpen(false);
  };

  return (
    <div className="editorial-grain relative bg-[#F9F6F0] pb-20">
      {/* 3px Terracotta-to-Chlorophyll Reading Progress Bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 right-0 left-0 z-50 h-[3px] bg-gradient-to-r from-[#C85A32] via-[#D99B26] to-[#2E7D4F]"
      />

      {/* Sticky Sub-Header Breadcrumb & Share Action Bar */}
      <div className="sticky top-[74px] z-30 mx-3 mt-2 sm:top-[82px] sm:mx-6">
        <div className="glass-cream mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-xl border border-[#E6DFD3]/90 px-4 py-2.5 shadow-[0_6px_20px_rgba(13,43,34,0.06)] sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={article.issueNumber === 42 ? "/#briefing" : "/editions"}
              id="back-to-issue-link"
              className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#0D2B22] transition-colors hover:text-[#C85A32] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Issue #{article.issueNumber}</span>
            </Link>

            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-[#D5CBB8] sm:inline-block"
            />

            <span className="hidden truncate rounded-full bg-[#E3EFE8] px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#2E7D4F] sm:inline-block">
              {article.category}
            </span>
          </div>

          {/* Share Dropdown Button */}
          <div ref={shareRef} className="relative">
            <motion.button
              id="article-share-btn"
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setShareOpen((prev) => !prev)}
              aria-expanded={shareOpen}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#D5CBB8] bg-[#FFFDF9] px-3.5 py-2 text-xs font-semibold text-[#0D2B22] shadow-[0_4px_12px_rgba(13,43,34,0.06)] transition-colors hover:border-[#C85A32]/60 hover:text-[#C85A32]"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#2E7D4F]" />
              ) : (
                <Share2 className="h-3.5 w-3.5" />
              )}
              <span>Share Brief</span>
            </motion.button>

            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-1.5 shadow-[0_18px_40px_rgba(13,43,34,0.14)]"
                >
                  <button
                    id="share-copy-link-btn"
                    type="button"
                    onClick={handleCopyLink}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#0D2B22] transition-colors hover:bg-[#F9F6F0]"
                  >
                    <Link2 className="h-4 w-4 text-[#C85A32]" />
                    <span>Copy Briefing Link</span>
                  </button>
                  <button
                    id="share-linkedin-btn"
                    type="button"
                    onClick={handleShareLinkedIn}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#0D2B22] transition-colors hover:bg-[#F9F6F0]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-[#2E7D4F]"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>Share on LinkedIn</span>
                  </button>
                  <button
                    id="share-whatsapp-btn"
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#0D2B22] transition-colors hover:bg-[#F9F6F0]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#2E7D4F]" />
                    <span>Share on WhatsApp</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Article Hero Header */}
      <article className="mx-auto max-w-7xl px-5 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#E3EFE8] px-3 py-1 font-data text-[10.5px] font-semibold uppercase text-[#2E7D4F]">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#E6DFD3] bg-[#FFFDF9] px-3 py-1 font-data text-[10.5px] font-semibold uppercase text-[#24473B]">
              <Globe2 className="h-3 w-3 text-[#C85A32]" />
              {article.region}
            </span>
            <span className="inline-flex items-center gap-1 font-data text-[11px] uppercase text-[#4D6B60]">
              <Clock className="h-3.5 w-3.5 text-[#D99B26]" />
              {article.readTime}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 105, damping: 20 }}
            className="font-editorial article-headline mt-5 font-semibold text-[#0D2B22]"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 105,
              damping: 20,
              delay: 0.06,
            }}
            className="mt-4 text-base leading-relaxed text-[#24473B] sm:text-xl sm:leading-relaxed"
          >
            {article.subtitle}
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#E6DFD3] py-3.5 font-data text-[11px] uppercase text-[#4D6B60]">
            <span>Published {article.publishedDate}</span>
            <span className="hidden text-[#D5CBB8] sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#24473B]">
              <Building2 className="h-3.5 w-3.5 text-[#2E7D4F]" />
              Source: {article.sourceAttribution}
            </span>
            <span className="hidden text-[#D5CBB8] sm:inline">•</span>
            <span className="text-[#C85A32]">Issue #{article.issueNumber}</span>
          </div>
        </header>

        {/* Featured Visual Banner with Subtle Zoom-on-Load Motion */}
        <figure className="mt-8 overflow-hidden rounded-3xl border border-[#E6DFD3] bg-[#0D2B22] shadow-[0_20px_48px_rgba(13,43,34,0.12)]">
          <div className="aspect-[16/9] max-h-[500px] w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.06, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <EditorialArtwork
                image={article.image}
                artworkVariant={article.artworkVariant}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
          <figcaption className="border-t border-[#24473B] bg-[#0D2B22] px-5 py-3 text-xs text-[#B8CFC4] sm:px-6">
            <span className="font-data mr-2 text-[10px] uppercase text-[#D99B26]">
              Field Visual
            </span>
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Structured Executive Briefing Layout: 2-Column Desktop / Stacked Mobile */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Main Content Column */}
          <div className="space-y-10 lg:col-span-8">
            {/* Section 01: The Global Development */}
            <section aria-labelledby="section-global-development">
              <div className="flex items-center gap-3">
                <span className="font-data rounded-lg bg-[#0D2B22] px-2.5 py-1 text-xs font-semibold text-[#FDF4E3]">
                  01
                </span>
                <h2
                  id="section-global-development"
                  className="font-editorial text-2xl font-semibold text-[#0D2B22] sm:text-3xl"
                >
                  The Global Development
                </h2>
              </div>

              <div className="mt-5 space-y-5 text-base leading-[1.78] text-[#24473B] sm:text-[17px]">
                {article.globalDevelopment.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Editorial Pull Quote */}
              <blockquote className="mt-7 rounded-2xl border-l-4 border-[#C85A32] bg-[#FFFDF9] p-6 shadow-[0_8px_24px_rgba(13,43,34,0.06)]">
                <p className="font-editorial text-lg leading-relaxed text-[#0D2B22] italic sm:text-xl">
                  &ldquo;{article.pullQuote.text}&rdquo;
                </p>
                <footer className="mt-3 font-data text-[11px] uppercase text-[#4D6B60]">
                  — {article.pullQuote.attribution}
                </footer>
              </blockquote>
            </section>

            {/* Section 02: Key Data & Takeaways (Soft Amber Tint + Golden Ochre Left Border) */}
            <section
              aria-labelledby="section-key-takeaways"
              className="rounded-2xl border border-[#D99B26]/30 border-l-4 border-l-[#D99B26] bg-[#FDF4E3] p-6 shadow-[0_10px_28px_rgba(13,43,34,0.05)] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-data rounded-lg bg-[#D99B26] px-2.5 py-1 text-xs font-semibold text-[#0D2B22]">
                  02
                </span>
                <h2
                  id="section-key-takeaways"
                  className="font-editorial text-2xl font-semibold text-[#0D2B22]"
                >
                  Key Data &amp; Takeaways
                </h2>
              </div>

              <ul className="mt-6 space-y-4">
                {article.keyTakeaways.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col gap-3 rounded-xl border border-[#E6DFD3]/90 bg-[#FFFDF9]/85 p-4 sm:flex-row sm:items-start sm:gap-5"
                  >
                    <div className="shrink-0 sm:w-32">
                      <span className="font-data block text-2xl font-bold text-[#C85A32]">
                        {item.metric}
                      </span>
                      <span className="font-data mt-0.5 block text-[10px] font-semibold uppercase text-[#24473B]">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#24473B] sm:text-[15px]">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 03: Strategic Brand & Market Lens (Soft Sage Tint + Deep Emerald Typography) */}
            <section
              aria-labelledby="section-strategic-lens"
              className="rounded-2xl border border-[#2E7D4F]/25 bg-[#E3EFE8] p-6 shadow-[0_10px_28px_rgba(13,43,34,0.06)] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-data rounded-lg bg-[#2E7D4F] px-2.5 py-1 text-xs font-semibold text-[#FFFDF9]">
                    03
                  </span>
                  <h2
                    id="section-strategic-lens"
                    className="font-editorial text-2xl font-semibold text-[#0D2B22]"
                  >
                    Strategic Brand &amp; Market Lens
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFDF9] px-3 py-1 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
                  <Sparkles className="h-3 w-3 text-[#D99B26]" />
                  Why This Matters
                </span>
              </div>

              <p className="font-editorial mt-5 text-xl font-semibold leading-snug text-[#0D2B22] sm:text-2xl">
                {article.strategicLens.headline}
              </p>

              <div className="mt-4 space-y-4 text-sm leading-[1.75] text-[#0D2B22]/90 sm:text-[15.5px]">
                {article.strategicLens.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Actionable Commercial Implications */}
              <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
                {article.strategicLens.implications.map((imp) => (
                  <div
                    key={imp.audience}
                    className="rounded-xl border border-[#2E7D4F]/20 bg-[#FFFDF9] p-4"
                  >
                    <p className="font-data text-[10px] font-semibold uppercase text-[#C85A32]">
                      {imp.audience}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#24473B] sm:text-[13px]">
                      {imp.takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Horizon Watch Box */}
            <section className="flex items-start gap-4 rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D2B22] text-[#D99B26]">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <p className="font-data text-[10.5px] font-semibold uppercase text-[#2E7D4F]">
                  What To Watch Next Quarter
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#24473B]">
                  {article.watchNext}
                </p>
              </div>
            </section>

            {/* Topic Tags */}
            <div className="flex flex-wrap items-center gap-2 border-t border-[#E6DFD3] pt-6">
              <span className="font-data mr-1 text-[10.5px] uppercase text-[#4D6B60]">
                Topics:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/archive?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#E6DFD3] bg-[#FFFDF9] px-3 py-1 font-data text-[10.5px] text-[#24473B] transition-colors hover:border-[#C85A32]/50 hover:text-[#C85A32]"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Sticky Right Sidebar (Desktop) / Inline Card (Mobile) */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-40">
              {/* Compact Newsletter Signup Card */}
              <div className="rounded-2xl border border-[#D5CBB8] bg-[#FFFDF9] p-6 shadow-[0_12px_32px_rgba(13,43,34,0.08)]">
                <span className="inline-block rounded-full bg-[#F9EAE4] px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#C85A32]">
                  Weekly Dispatch
                </span>
                <h3 className="font-editorial mt-3 text-xl font-semibold text-[#0D2B22]">
                  Get Next Monday&apos;s Briefing
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#24473B] sm:text-sm">
                  Distilled global crop science, biologicals, and AgTech
                  intelligence delivered straight to your inbox every Monday.
                </p>
                <div className="mt-4">
                  <SubscribeForm
                    variant="sidebar"
                    idPrefix="sidebar-subscribe"
                    buttonLabel="Subscribe Free"
                    placeholder="Work email address"
                  />
                </div>
              </div>

              {/* More Headlines in This Issue Quick-Jump List */}
              <div className="rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-6 shadow-[0_8px_24px_rgba(13,43,34,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-data text-xs font-semibold uppercase text-[#0D2B22]">
                    More in Issue #{article.issueNumber}
                  </h3>
                  <BookOpen className="h-4 w-4 text-[#2E7D4F]" />
                </div>

                <nav
                  aria-label="More headlines in this issue"
                  className="mt-4 divide-y divide-[#E6DFD3]"
                >
                  {issueArticles.map((item, idx) => {
                    const isCurrent = item.slug === article.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/news/${item.slug}`}
                        className={`group flex items-start gap-3 py-3 first:pt-1 last:pb-0 ${
                          isCurrent ? "pointer-events-none" : ""
                        }`}
                      >
                        <span
                          className={`mt-0.5 font-data text-xs font-semibold ${
                            isCurrent ? "text-[#C85A32]" : "text-[#D99B26]"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-semibold leading-snug sm:text-[13px] ${
                              isCurrent
                                ? "text-[#C85A32]"
                                : "text-[#0D2B22] transition-colors group-hover:text-[#C85A32]"
                            }`}
                          >
                            {item.title}
                          </p>
                          <span className="font-data mt-1 block text-[9.5px] uppercase text-[#4D6B60]">
                            {isCurrent ? "Currently Reading" : `${item.region} • ${item.readTime}`}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom "Next Story" Interactive Preview Card */}
        <section
          aria-label="Next story in this issue"
          className="mt-16 border-t border-[#E6DFD3] pt-12"
        >
          <p className="font-data text-xs font-semibold uppercase text-[#4D6B60]">
            Continue Reading • Next Brief in Issue #{nextArticle.issueNumber}
          </p>

          <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            className="editorial-card group mt-4 overflow-hidden rounded-3xl"
          >
            <Link
              href={`/news/${nextArticle.slug}`}
              id="next-story-preview-link"
              className="grid items-center gap-6 md:grid-cols-12"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#0D2B22] md:col-span-5 md:aspect-auto md:h-full">
                <EditorialArtwork
                  image={nextArticle.image}
                  artworkVariant={nextArticle.artworkVariant}
                  alt={nextArticle.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:col-span-7 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E3EFE8] px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#2E7D4F]">
                    {nextArticle.category}
                  </span>
                  <span className="font-data text-[10.5px] uppercase text-[#4D6B60]">
                    {nextArticle.region} • {nextArticle.readTime}
                  </span>
                </div>

                <h3 className="font-editorial mt-3.5 text-2xl font-semibold leading-snug text-[#0D2B22] transition-colors group-hover:text-[#C85A32] sm:text-3xl">
                  {nextArticle.title}
                </h3>

                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#24473B] sm:text-base">
                  {nextArticle.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C85A32]">
                  <span>Read Next Deep Dive</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </section>
      </article>
    </div>
  );
}
