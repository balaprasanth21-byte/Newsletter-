"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { VERTICALS, NAV_LINKS, siteConfig } from "@/data";
import { useSubscribe } from "@/components/SubscribeContext";

export function Navbar() {
  const pathname = usePathname();
  const { openSubscribeModal, activeVertical, showToast } = useSubscribe();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentVertical =
    VERTICALS.find((v) => v.id === activeVertical) ?? VERTICALS[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary navigation"
        className="glass-cream mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-[#E6DFD3]/90 px-4 py-3 shadow-[0_10px_30px_rgba(13,43,34,0.07)] sm:px-6"
      >
        {/* Left: Brand Mark + Industry Switcher */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link
            href="/"
            id="brand-logo-link"
            className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-2.5"
            aria-label="Kreya Branding Home"
          >
            <Image
              src="/images/kreya-logo.png"
              alt="Kreya Branding"
              width={160}
              height={40}
              className="h-8 w-auto object-contain sm:h-9"
              priority
            />
          </Link>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-[#E6DFD3] sm:inline-block"
          />

          {/* Industry Switcher Dropdown */}
          <div ref={dropdownRef} className="relative shrink-0">
            <button
              id="industry-switcher-btn"
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#2E7D4F]/25 bg-[#E3EFE8] px-2.5 py-1.5 text-[11px] font-semibold text-[#0D2B22] transition-colors hover:border-[#2E7D4F]/50 hover:bg-[#d7e8de] sm:px-3 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D4F]" />
              <span>{currentVertical.shortName}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#24473B] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  role="listbox"
                  aria-label="Select industry vertical"
                  className="absolute left-0 mt-2.5 w-72 rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(13,43,34,0.14)] sm:w-80"
                >
                  <div className="px-3 py-2">
                    <p className="font-data text-[10px] font-semibold uppercase text-[#4D6B60]">
                      Intelligence Verticals
                    </p>
                  </div>

                  <div className="space-y-1">
                    {VERTICALS.map((vertical) => {
                      const isActive = vertical.status === "active";
                      return (
                        <button
                          key={vertical.id}
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            if (!isActive) {
                              showToast(
                                `${vertical.name} launches next quarter — waitlist noted.`
                              );
                            }
                          }}
                          className={`flex w-full cursor-pointer items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "bg-[#E3EFE8]/75 text-[#0D2B22]"
                              : "text-[#24473B] hover:bg-[#F9F6F0]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#0D2B22]">
                                {vertical.name}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs leading-snug text-[#4D6B60]">
                              {vertical.description}
                            </p>
                          </div>

                          {isActive ? (
                            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#2E7D4F] px-2 py-0.5 font-data text-[9.5px] font-semibold uppercase text-[#FFFDF9]">
                              <Check className="h-2.5 w-2.5" />
                              Active
                            </span>
                          ) : (
                            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-[#D99B26]/35 bg-[#FDF4E3] px-2 py-0.5 font-data text-[9.5px] font-medium uppercase text-[#8A6114]">
                              <Clock className="h-2.5 w-2.5" />
                              Soon
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Desktop Quick Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => {
            const isActiveRoute =
              item.href !== "/#briefing" &&
              item.href !== "/#signals" &&
              pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActiveRoute
                    ? "bg-[#E3EFE8]/80 text-[#0D2B22]"
                    : "text-[#24473B] hover:bg-[#F2ECE1] hover:text-[#0D2B22]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Terracotta CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            id="nav-subscribe-btn"
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openSubscribeModal("navbar")}
            className="hidden cursor-pointer items-center gap-1.5 rounded-xl bg-[#C85A32] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-[0_6px_18px_rgba(200,90,50,0.26)] transition-colors hover:bg-[#B04822] sm:inline-flex sm:text-sm"
          >
            <span>Subscribe Free</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>

          <button
            id="mobile-menu-toggle-btn"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#E6DFD3] bg-[#FFFDF9] text-[#0D2B22] transition-colors hover:border-[#C85A32]/50 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-[#E6DFD3] bg-[#FFFDF9] p-4 shadow-[0_18px_40px_rgba(13,43,34,0.14)] lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3.5 py-3 text-sm font-medium text-[#0D2B22] transition-colors hover:bg-[#F9F6F0]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-[#E6DFD3] pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSubscribeModal("mobile-nav");
                }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C85A32] px-4 py-3 text-sm font-semibold text-[#FFFDF9] transition-colors hover:bg-[#B04822]"
              >
                <span>Subscribe Free — Monday Briefing</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
