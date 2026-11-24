"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TopographicContours() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yLayer1 = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle organic radial atmospheric tint */}
      <div
        className="absolute -top-32 right-[-12%] h-[540px] w-[540px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(227, 239, 232, 0.85) 0%, rgba(249, 246, 240, 0) 70%)",
        }}
      />
      <div
        className="absolute top-36 -left-28 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 244, 227, 0.9) 0%, rgba(249, 246, 240, 0) 72%)",
        }}
      />

      {/* Parallax Layer 1 — Sage botanical contour rings */}
      <motion.svg
        style={{ y: yLayer1, opacity }}
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 1440 760"
        fill="none"
        className="absolute inset-0 h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#2E7D4F" strokeOpacity="0.13" strokeWidth="1.25">
          <path d="M-80 120C140 60 320 210 540 165C760 120 900 -20 1140 55C1310 108 1420 190 1520 150" />
          <path d="M-90 175C150 110 340 265 570 218C790 172 930 35 1175 112C1340 164 1430 245 1530 210" />
          <path d="M-95 235C165 168 360 320 600 272C820 228 965 92 1210 170C1365 219 1455 300 1545 270" />
          <path d="M-100 300C180 230 385 378 635 330C855 288 1005 152 1245 230C1395 278 1475 360 1555 335" />
          <path d="M-80 370C200 300 415 445 670 398C895 356 1045 225 1280 300C1425 346 1500 420 1570 400" />
        </g>

        {/* Organic hilltop contour loops on right */}
        <g stroke="#2E7D4F" strokeOpacity="0.11" strokeWidth="1.15">
          <ellipse
            cx="1190"
            cy="240"
            rx="240"
            ry="135"
            transform="rotate(-14 1190 240)"
          />
          <ellipse
            cx="1195"
            cy="242"
            rx="185"
            ry="98"
            transform="rotate(-14 1195 242)"
          />
          <ellipse
            cx="1200"
            cy="244"
            rx="128"
            ry="64"
            transform="rotate(-14 1200 244)"
          />
          <ellipse
            cx="1204"
            cy="246"
            rx="72"
            ry="34"
            transform="rotate(-14 1204 246)"
          />
        </g>
      </motion.svg>

      {/* Parallax Layer 2 — Golden harvest ochre elevation threads */}
      <motion.svg
        style={{ y: yLayer2, opacity }}
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 1440 760"
        fill="none"
        className="absolute inset-0 h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#D99B26" strokeOpacity="0.17" strokeWidth="1.15">
          <path d="M-70 505C140 450 280 570 490 520C700 470 865 375 1085 450C1275 515 1410 470 1520 430" />
          <path d="M-70 560C155 505 305 625 520 575C735 525 895 435 1115 510C1300 572 1425 530 1530 495" />
          <path d="M-65 620C170 565 330 680 555 632C775 585 930 498 1150 570C1330 628 1445 592 1545 562" />
        </g>
        <g stroke="#C85A32" strokeOpacity="0.1" strokeWidth="1">
          <ellipse
            cx="210"
            cy="520"
            rx="190"
            ry="96"
            transform="rotate(11 210 520)"
          />
          <ellipse
            cx="210"
            cy="520"
            rx="132"
            ry="64"
            transform="rotate(11 210 520)"
          />
          <ellipse
            cx="210"
            cy="520"
            rx="74"
            ry="34"
            transform="rotate(11 210 520)"
          />
        </g>
      </motion.svg>
    </div>
  );
}
