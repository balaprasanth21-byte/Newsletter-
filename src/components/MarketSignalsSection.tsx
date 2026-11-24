"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Globe2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MARKET_SIGNALS } from "@/data/intelligence";
import { MarketSignal } from "@/types/intelligence";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    const duration = 1250;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-data tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SignalCard({
  signal,
  index,
}: {
  signal: MarketSignal;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-2xl border border-[#24473B] bg-[#13382C]/90 p-6 backdrop-blur-sm transition-colors hover:border-[#D99B26]/55 sm:p-7"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C4A3B] px-2.5 py-1 font-data text-[10px] font-semibold uppercase text-[#E3EFE8]">
            <Globe2 className="h-3 w-3 text-[#D99B26]" />
            {signal.region}
          </span>
          <span className="font-data text-[10.5px] font-semibold uppercase text-[#D99B26]">
            {signal.delta}
          </span>
        </div>

        <div className="mt-6 text-4xl font-semibold tracking-tight text-[#F9F6F0] sm:text-5xl">
          <AnimatedCounter
            value={signal.value}
            prefix={signal.prefix}
            suffix={signal.suffix}
            decimals={signal.decimals}
          />
        </div>

        <h3 className="font-editorial mt-3 text-xl font-semibold text-[#FDF4E3]">
          {signal.label}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[#B8CFC4]">
          {signal.context}
        </p>
      </div>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-[#1C4A3B]">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${Math.min(72 + index * 11, 94)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#C85A32] via-[#D99B26] to-[#2E7D4F]"
        />
      </div>
    </motion.div>
  );
}

export function MarketSignalsSection() {
  return (
    <section
      id="signals"
      className="relative overflow-hidden bg-[#0D2B22] py-16 text-[#F9F6F0] sm:py-20 lg:py-24"
    >
      {/* Subtle botanical elevation contours */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 520"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#2E7D4F" strokeWidth="1.2">
          <path d="M-80 120C220 40 480 220 790 140C1080 65 1290 155 1520 95" />
          <path d="M-80 210C230 130 500 305 810 225C1100 150 1310 240 1530 180" />
          <path d="M-70 305C245 225 520 395 830 315C1120 240 1330 330 1545 270" />
        </g>
        <g stroke="#D99B26" strokeOpacity="0.45" strokeWidth="1">
          <circle cx="1290" cy="120" r="145" />
          <circle cx="1290" cy="120" r="95" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-data text-xs font-semibold uppercase text-[#D99B26]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Why It Matters • Weekly Market Snapshot</span>
            </div>
            <h2 className="font-editorial section-headline mt-3 font-semibold text-[#F9F6F0]">
              Three Signals Reshaping Agribusiness Margins This Week
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B8CFC4] sm:text-base">
              Verified commercial benchmarks distilled from multi-region trials,
              regulatory filings, and global R&amp;D disclosures.
            </p>
          </div>

          <Link
            href="/news/global-agri-input-giants-shift-rd-budgets-climate-adaptive-seed-genetics"
            className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#2E7D4F]/60 bg-[#143B2F] px-4 py-2.5 text-sm font-semibold text-[#F9F6F0] transition-colors hover:border-[#D99B26] hover:bg-[#1A4B3C] lg:self-auto"
          >
            <span>Read R&amp;D Capital Analysis</span>
            <ArrowUpRight className="h-4 w-4 text-[#D99B26] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3 Animated Metric Signal Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {MARKET_SIGNALS.map((signal, idx) => (
            <SignalCard key={signal.id} signal={signal} index={idx} />
          ))}
        </div>

        {/* Client Advisory Strip */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#24473B] bg-[#123429]/85 px-6 py-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#DCE9E2]">
            <span className="font-data rounded bg-[#C85A32] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#FFFDF9]">
              Executive Signal
            </span>
            <span>
              44% of Tier-1 crop-science R&amp;D capital is rotating toward
              integrated climate-adaptive seed + biological bundles.
            </span>
          </div>
          <Link
            href="/archive"
            className="shrink-0 font-data text-xs font-semibold uppercase text-[#D99B26] transition-colors hover:text-[#FDF4E3]"
          >
            View All Signals →
          </Link>
        </div>
      </div>
    </section>
  );
}
