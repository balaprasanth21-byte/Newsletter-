"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface SubscribeFormProps {
  variant?: "hero" | "sidebar" | "footer" | "modal";
  buttonLabel?: string;
  placeholder?: string;
  onSuccess?: (email: string) => void;
  idPrefix?: string;
}

export function SubscribeForm({
  variant = "hero",
  buttonLabel = "Get the Monday Briefing",
  placeholder = "Enter your work email (e.g. vp@agribusiness.com)",
  onSuccess,
  idPrefix = "subscribe",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid work email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
    onSuccess?.(trimmed);
  };

  const isDarkSurface = variant === "footer";

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              isDarkSurface
                ? "border-[#2E7D4F]/60 bg-[#143B2F] text-[#F9F6F0]"
                : "border-[#2E7D4F]/35 bg-[#E3EFE8] text-[#0D2B22]"
            }`}
          >
            <CheckCircle2
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                isDarkSurface ? "text-[#D99B26]" : "text-[#2E7D4F]"
              }`}
            />
            <div className="text-sm leading-relaxed">
              <p className="font-semibold">
                You&apos;re on the Monday executive list.
              </p>
              <p
                className={`mt-0.5 text-xs ${
                  isDarkSurface ? "text-[#B8CFC4]" : "text-[#24473B]"
                }`}
              >
                Issue #42 confirmation dispatched to{" "}
                <span className="font-medium underline decoration-[#C85A32]/60 underline-offset-2">
                  {email}
                </span>
                . Next edition arrives Monday at 07:00 local time.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              variant === "hero" || variant === "footer"
                ? "flex flex-col gap-2.5 sm:flex-row sm:items-center"
                : "flex flex-col gap-3"
            }
          >
            <div className="relative flex-1">
              <label htmlFor={`${idPrefix}-email`} className="sr-only">
                Work email address
              </label>
              <input
                id={`${idPrefix}-email`}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={placeholder}
                className={`w-full rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                  isDarkSurface
                    ? "border-[#24473B] bg-[#14392E] text-[#F9F6F0] placeholder:text-[#9AB5A8] focus:border-[#D99B26]"
                    : "border-[#D5CBB8] bg-[#FFFDF9] text-[#0D2B22] placeholder:text-[#4D6B60]/80 focus:border-[#C85A32]"
                }`}
              />
            </div>

            <motion.button
              id={`${idPrefix}-submit`}
              type="submit"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C85A32] px-5 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-[0_8px_22px_rgba(200,90,50,0.28)] transition-colors hover:bg-[#B04822] whitespace-nowrap"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && !submitted && (
        <p
          role="alert"
          className={`mt-2 text-xs font-medium ${
            isDarkSurface ? "text-[#FDF4E3]" : "text-[#C85A32]"
          }`}
        >
          {error}
        </p>
      )}

      {variant === "hero" && !submitted && (
        <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#24473B]">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-[#D99B26]" />
            Trusted by 4,500+ agribusiness founders, marketers &amp; R&amp;D leaders
          </span>
          <span className="hidden text-[#D5CBB8] sm:inline">•</span>
          <span className="font-data text-[11px] uppercase text-[#4D6B60]">
            Free weekly • 1-click unsubscribe
          </span>
        </div>
      )}
    </div>
  );
}
