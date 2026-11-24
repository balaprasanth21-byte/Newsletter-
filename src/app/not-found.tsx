import React from "react";
import Link from "next/link";
import { ArrowLeft, Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <div className="editorial-grain flex min-h-[65vh] flex-col items-center justify-center bg-[#F9F6F0] px-5 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D2B22] text-[#D99B26]">
        <Sprout className="h-6 w-6" />
      </span>
      <p className="font-data mt-5 text-xs font-semibold uppercase text-[#C85A32]">
        404 • Brief Not Found
      </p>
      <h1 className="font-editorial mt-2 text-3xl font-semibold text-[#0D2B22] sm:text-4xl">
        This intelligence brief has moved or isn&apos;t published yet.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#24473B]">
        Return to Issue #42 or search the full Kreya Branding archive to find
        global crop science and AgTech insights.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#C85A32] px-5 py-3 text-sm font-semibold text-[#FFFDF9] hover:bg-[#B04822]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Issue #42</span>
        </Link>
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CBB8] bg-[#FFFDF9] px-5 py-3 text-sm font-semibold text-[#0D2B22] hover:border-[#C85A32]/50"
        >
          <span>Explore Archive</span>
        </Link>
      </div>
    </div>
  );
}
