"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, VERTICALS, siteConfig } from "@/data";
import { SubscribeForm } from "@/components/SubscribeForm";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0D2B22] text-[#F9F6F0]">
      {/* Subtle botanical elevation lines in dark emerald footer */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 420"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#2E7D4F" strokeWidth="1.1">
          <path d="M-80 90C220 20 480 180 780 110C1060 45 1240 120 1520 70" />
          <path d="M-80 165C240 95 510 250 815 182C1095 118 1265 190 1530 145" />
          <path d="M-60 250C260 185 540 330 845 260C1125 196 1290 270 1545 225" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20">
        {/* Top Conversion Prompt */}
        <div className="grid gap-10 border-b border-[#24473B] pb-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-data text-xs uppercase text-[#D99B26]">
              The Monday Executive Ritual
            </p>
            <h2 className="font-editorial mt-3 text-3xl font-semibold tracking-tight text-[#F9F6F0] sm:text-4xl">
              Strategic clarity before your week begins.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8CFC4] sm:text-base">
              One focused 4-minute briefing every Monday morning. Curated for
              agribusiness founders, crop-science R&amp;D teams, and B2B growth
              leaders worldwide.
            </p>
          </div>
          <div className="lg:col-span-6">
            <SubscribeForm
              variant="footer"
              idPrefix="footer-subscribe"
              buttonLabel="Join 4,500+ Leaders"
              placeholder="Enter your work email"
            />
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <div className="rounded-xl bg-[#FFFDF9] px-3 py-1.5 shadow-sm">
                <Image
                  src="/images/kreya-logo.png"
                  alt="Kreya Branding"
                  width={140}
                  height={36}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#B8CFC4]">
              An independent weekly industry intelligence platform by Kreya
              Branding translating global crop science, biologicals, regulatory
              shifts, and AgTech signals into actionable commercial insight.
            </p>
            <p className="font-data mt-5 text-[11px] uppercase text-[#D99B26]">
              Curated with strategic clarity
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-data text-xs font-semibold uppercase text-[#D99B26]">
              Coverage Desks
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#DCE9E2]">
              {CATEGORIES.filter((c) => c !== "All Insights").map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/archive?category=${encodeURIComponent(cat)}`}
                    className="transition-colors hover:text-[#FDF4E3] hover:underline hover:decoration-[#C85A32] underline-offset-4"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-data text-xs font-semibold uppercase text-[#D99B26]">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#DCE9E2]">
              <li>
                <Link href="/" className="hover:text-[#FDF4E3]">
                  Issue #42 Briefing
                </Link>
              </li>
              <li>
                <Link href="/editions" className="hover:text-[#FDF4E3]">
                  Past Editions
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#FDF4E3]">
                  Topic Explorer
                </Link>
              </li>
              <li>
                <Link href="/#signals" className="hover:text-[#FDF4E3]">
                  Market Signals
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-data text-xs font-semibold uppercase text-[#D99B26]">
              Vertical Roadmap
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {VERTICALS.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-2 text-[#DCE9E2]"
                >
                  <span>{v.shortName}</span>
                  {v.status === "active" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2E7D4F]/35 px-2.5 py-0.5 font-data text-[10px] uppercase text-[#E3EFE8]">
                      Live
                    </span>
                  ) : (
                    <span className="font-data text-[10px] uppercase text-[#9AB5A8]">
                      Upcoming
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#24473B] pt-8 text-xs text-[#9AB5A8] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Kreya Branding. Curated with strategic clarity
            for executive teams.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/archive"
              className="inline-flex items-center gap-1 text-[#DCE9E2] transition-colors hover:text-[#D99B26]"
            >
              Explore Full Archive
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <span className="font-data uppercase text-[#9AB5A8]">
              Issue #42 • Vol IV
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
