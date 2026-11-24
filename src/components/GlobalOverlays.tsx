"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Check, Leaf } from "lucide-react";
import { useSubscribe } from "@/components/SubscribeContext";
import { SubscribeForm } from "@/components/SubscribeForm";

export function GlobalOverlays() {
  const { isModalOpen, closeSubscribeModal, openSubscribeModal, toastMessage } =
    useSubscribe();
  const [showMobilePill, setShowMobilePill] = useState(false);
  const [pillDismissed, setPillDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 360) {
        setShowMobilePill(true);
      } else {
        setShowMobilePill(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeSubscribeModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, closeSubscribeModal]);

  return (
    <>
      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-[#2E7D4F]/40 bg-[#0D2B22] px-5 py-3 text-sm font-medium text-[#F9F6F0] shadow-[0_14px_34px_rgba(13,43,34,0.28)] md:bottom-8"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E7D4F] text-[#F9F6F0]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-First Thumb-Friendly Bottom Floating Subscribe Pill */}
      <AnimatePresence>
        {showMobilePill && !pillDismissed && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed right-4 bottom-5 left-4 z-50 md:hidden"
          >
            <div className="glass-cream flex items-center justify-between gap-2 rounded-full border border-[#D5CBB8] p-1.5 pl-4 shadow-[0_14px_36px_rgba(13,43,34,0.18)]">
              <button
                id="mobile-floating-subscribe-btn"
                type="button"
                onClick={() => openSubscribeModal("mobile-pill")}
                className="flex flex-1 items-center gap-2.5 text-left"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E3EFE8] text-[#2E7D4F]">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-[#0D2B22]">
                  Get Weekly Ag Insights
                  <span className="mx-1.5 text-[#D5CBB8]">•</span>
                  <span className="text-[#C85A32]">Subscribe</span>
                </span>
              </button>
              <button
                id="mobile-floating-dismiss-btn"
                type="button"
                aria-label="Dismiss subscribe bar"
                onClick={() => setPillDismissed(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#4D6B60] transition-colors hover:bg-[#E6DFD3]/60 hover:text-[#0D2B22]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Subscribe Modal (Centered on Desktop / Smooth Bottom Sheet on Mobile) */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-modal-title"
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSubscribeModal}
              className="absolute inset-0 bg-[#0D2B22]/55 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative z-10 w-full max-w-lg rounded-t-3xl border border-[#E6DFD3] bg-[#FFFDF9] p-6 pb-8 shadow-[0_26px_64px_rgba(13,43,34,0.24)] sm:rounded-3xl sm:p-8"
            >
              {/* Mobile drag handle indicator */}
              <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#E6DFD3] sm:hidden" />

              <button
                id="close-subscribe-modal-btn"
                type="button"
                aria-label="Close subscribe modal"
                onClick={closeSubscribeModal}
                className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E6DFD3] bg-[#F9F6F0] text-[#24473B] transition-colors hover:border-[#C85A32]/50 hover:text-[#0D2B22]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E3EFE8] px-3 py-1 font-data text-[11px] font-medium uppercase text-[#2E7D4F]">
                <Leaf className="h-3.5 w-3.5" />
                Every Monday • 4 Min Executive Brief
              </div>

              <h2
                id="subscribe-modal-title"
                className="font-editorial text-2xl font-semibold text-[#0D2B22] sm:text-3xl"
              >
                Stay ahead of global crop science &amp; AgTech shifts.
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-[#24473B]">
                Join 4,500+ agribusiness founders, R&amp;D leaders, and brand
                strategists receiving curated weekly intelligence—zero noise,
                sharp commercial context.
              </p>

              <div className="mt-6">
                <SubscribeForm
                  variant="modal"
                  idPrefix="modal-subscribe"
                  buttonLabel="Subscribe Free"
                />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#E6DFD3] pt-4 text-xs text-[#4D6B60]">
                <span>Delivered Mondays at 07:00</span>
                <span className="font-data uppercase">Zero spam • Free</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
