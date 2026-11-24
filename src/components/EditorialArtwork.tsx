"use client";

import React, { useId } from "react";
import { ArtworkVariant } from "@/types/intelligence";

interface EditorialArtworkProps {
  image?: string;
  artworkVariant?: ArtworkVariant;
  alt: string;
  className?: string;
}

export function EditorialArtwork({
  image,
  artworkVariant = "foliar",
  alt,
  className = "h-full w-full object-cover",
}: EditorialArtworkProps) {
  const uid = useId().replace(/:/g, "");

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={alt} className={className} loading="eager" />
    );
  }

  if (artworkVariant === "foliar") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-[#0D2B22] ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`foliarBg-${uid}`}
              x1="0"
              y1="0"
              x2="800"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#12382C" />
              <stop offset="55%" stopColor="#0D2B22" />
              <stop offset="100%" stopColor="#1E4B3A" />
            </linearGradient>
            <radialGradient id={`sunGlow-${uid}`} cx="68%" cy="32%" r="45%">
              <stop offset="0%" stopColor="#D99B26" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#C85A32" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0D2B22" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id={`leafFill-${uid}`}
              x1="160"
              y1="70"
              x2="640"
              y2="410"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#2E7D4F" />
              <stop offset="100%" stopColor="#174936" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill={`url(#foliarBg-${uid})`} />
          <rect width="800" height="450" fill={`url(#sunGlow-${uid})`} />

          <g stroke="#E3EFE8" strokeOpacity="0.1" strokeWidth="1">
            <circle cx="560" cy="145" r="110" />
            <circle cx="560" cy="145" r="175" />
            <circle cx="560" cy="145" r="245" />
          </g>

          <path
            d="M110 410C155 250 315 110 565 75C510 230 390 365 110 410Z"
            fill={`url(#leafFill-${uid})`}
            stroke="#E3EFE8"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <path
            d="M112 408C250 290 395 178 558 80"
            stroke="#FDF4E3"
            strokeOpacity="0.45"
            strokeWidth="1.6"
          />
          <g stroke="#E3EFE8" strokeOpacity="0.25" strokeWidth="1.1">
            <path d="M210 330C220 278 248 232 288 192" />
            <path d="M292 268C312 225 344 185 385 148" />
            <path d="M380 204C408 166 442 132 480 108" />
            <path d="M238 310C295 318 352 308 408 282" />
            <path d="M324 244C376 246 426 232 472 204" />
          </g>

          <g>
            <circle
              cx="322"
              cy="215"
              r="16"
              fill="#D99B26"
              fillOpacity="0.28"
              stroke="#FDF4E3"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
            <circle cx="317" cy="210" r="4" fill="#FDF4E3" fillOpacity="0.75" />

            <circle
              cx="436"
              cy="166"
              r="22"
              fill="#D99B26"
              fillOpacity="0.34"
              stroke="#FDF4E3"
              strokeOpacity="0.7"
              strokeWidth="1.3"
            />
            <circle cx="429" cy="159" r="5.5" fill="#FDF4E3" fillOpacity="0.82" />

            <circle
              cx="256"
              cy="285"
              r="11"
              fill="#C85A32"
              fillOpacity="0.45"
              stroke="#FDF4E3"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <circle
              cx="515"
              cy="130"
              r="9"
              fill="#E3EFE8"
              fillOpacity="0.4"
              stroke="#FDF4E3"
              strokeOpacity="0.65"
              strokeWidth="1"
            />
            <circle
              cx="388"
              cy="252"
              r="13"
              fill="#D99B26"
              fillOpacity="0.3"
              stroke="#FDF4E3"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          </g>

          <g
            fontFamily="monospace"
            fontSize="11"
            fill="#FDF4E3"
            fillOpacity="0.82"
            letterSpacing="1.6"
          >
            <text x="572" y="96">
              K⁺ / Ca²⁺ CHELATE
            </text>
            <text x="572" y="114" fill="#D99B26">
              +18.3% THERMAL RESILIENCE
            </text>
            <line
              x1="458"
              y1="158"
              x2="564"
              y2="102"
              stroke="#D99B26"
              strokeOpacity="0.45"
              strokeDasharray="3 3"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (artworkVariant === "seeds") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-[#F2ECE1] ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`seedCanvas-${uid}`}
              x1="0"
              y1="0"
              x2="800"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F2ECE1" />
              <stop offset="100%" stopColor="#E6DFD3" />
            </linearGradient>
            <radialGradient id={`seedWarmth-${uid}`} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FDF4E3" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E6DFD3" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill={`url(#seedCanvas-${uid})`} />
          <rect width="800" height="450" fill={`url(#seedWarmth-${uid})`} />

          <g stroke="#0D2B22" strokeOpacity="0.12" strokeWidth="1">
            <circle cx="400" cy="225" r="165" />
            <circle cx="400" cy="225" r="122" strokeDasharray="4 6" />
            <circle cx="400" cy="225" r="74" />
            <line x1="120" y1="225" x2="680" y2="225" strokeOpacity="0.08" />
            <line x1="400" y1="45" x2="400" y2="405" strokeOpacity="0.08" />
          </g>

          <g transform="translate(400 225)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <path
                  d="M0 -42 C24 -76 24 -118 0 -142 C-24 -118 -24 -76 0 -42 Z"
                  fill={
                    idx % 3 === 0
                      ? "#0D2B22"
                      : idx % 3 === 1
                        ? "#2E7D4F"
                        : "#C85A32"
                  }
                  fillOpacity={idx % 3 === 0 ? "0.9" : "0.84"}
                />
                <line
                  x1="0"
                  y1="-50"
                  x2="0"
                  y2="-128"
                  stroke="#F9F6F0"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="30" fill="#D99B26" />
            <circle cx="0" cy="0" r="16" fill="#0D2B22" />
            <circle cx="0" cy="0" r="5" fill="#FDF4E3" />
          </g>

          <g
            fontFamily="monospace"
            fontSize="11"
            fill="#24473B"
            letterSpacing="1.8"
          >
            <text x="52" y="64">
              TRAIT PIPELINE // 2026–2028
            </text>
            <text x="52" y="402" fill="#C85A32">
              44% R&amp;D CAPITAL ALLOCATION
            </text>
            <text x="556" y="402">
              CLIMATE-ADAPTIVE GENETICS
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (artworkVariant === "drone") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-[#0D2B22] ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`droneBg-${uid}`}
              x1="0"
              y1="0"
              x2="800"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#0D2B22" />
              <stop offset="60%" stopColor="#163F31" />
              <stop offset="100%" stopColor="#24473B" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill={`url(#droneBg-${uid})`} />

          {/* Terraced crop rows in perspective */}
          <g stroke="#2E7D4F" strokeOpacity="0.45" strokeWidth="1.5">
            <path d="M-40 310 Q240 245 480 295 T860 270" />
            <path d="M-40 345 Q240 280 480 330 T860 305" />
            <path d="M-40 380 Q240 315 480 365 T860 340" />
            <path d="M-40 415 Q240 350 480 400 T860 375" />
          </g>

          {/* Autonomous flight grid path */}
          <path
            d="M110 135 H660 C690 135 690 185 660 185 H160 C130 185 130 235 160 235 H620"
            stroke="#D99B26"
            strokeOpacity="0.65"
            strokeWidth="1.6"
            strokeDasharray="6 6"
          />

          {/* Three precision drone nodes with rotor rings */}
          {[
            { cx: 240, cy: 135, r: 22 },
            { cx: 470, cy: 185, r: 26 },
            { cx: 340, cy: 235, r: 18 },
          ].map((node, i) => (
            <g key={i}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 14}
                stroke="#E3EFE8"
                strokeOpacity="0.22"
                strokeWidth="1.1"
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="#C85A32"
                fillOpacity="0.22"
                stroke="#D99B26"
                strokeWidth="1.4"
              />
              <circle cx={node.cx} cy={node.cy} r="5.5" fill="#FDF4E3" />
            </g>
          ))}

          <g
            fontFamily="monospace"
            fontSize="11"
            fill="#FDF4E3"
            fillOpacity="0.82"
            letterSpacing="1.6"
          >
            <text x="54" y="54">
              APAC SWARM TELEMETRY // 18,000+ FLEETS
            </text>
            <text x="530" y="416" fill="#D99B26">
              -40% PER-ACRE APPLICATION COST
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (artworkVariant === "carbon") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-[#13382C] ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`carbonBg-${uid}`}
              x1="0"
              y1="0"
              x2="800"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="100%" stopColor="#E3EFE8" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill={`url(#carbonBg-${uid})`} />

          {/* Architectural grain stalks & carbon flow curves */}
          <g stroke="#2E7D4F" strokeOpacity="0.25" strokeWidth="1.2">
            <path d="M60 390 C180 280 280 180 420 150 C560 120 670 160 750 85" />
            <path d="M60 420 C190 315 295 215 435 185 C575 155 680 195 750 120" />
            <path d="M60 360 C175 245 270 145 405 115 C545 85 660 125 750 55" />
          </g>

          {/* Verified low-carbon grain bar geometry */}
          {[
            { x: 160, h: 120, fill: "#24473B" },
            { x: 245, h: 168, fill: "#2E7D4F" },
            { x: 330, h: 210, fill: "#0D2B22" },
            { x: 415, h: 255, fill: "#C85A32" },
            { x: 500, h: 295, fill: "#D99B26" },
          ].map((bar, idx) => (
            <g key={idx}>
              <rect
                x={bar.x}
                y={375 - bar.h}
                width="52"
                height={bar.h}
                rx="10"
                fill={bar.fill}
                fillOpacity="0.88"
              />
              <circle
                cx={bar.x + 26}
                cy={375 - bar.h - 14}
                r="4"
                fill="#0D2B22"
              />
            </g>
          ))}

          <g
            fontFamily="monospace"
            fontSize="11"
            fill="#0D2B22"
            letterSpacing="1.6"
          >
            <text x="54" y="56">
              SCOPE 3 VALUE-CHAIN LEDGER
            </text>
            <text x="54" y="416" fill="#C85A32">
              +$22/TON VERIFIED LOW-CARBON PREMIUM
            </text>
            <text x="564" y="416" fill="#2E7D4F">
              MRV CERTIFIED GRAIN
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (artworkVariant === "rnai") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-[#0D2B22] ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`rnaiBg-${uid}`}
              x1="0"
              y1="0"
              x2="800"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#0D2B22" />
              <stop offset="100%" stopColor="#1A4537" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill={`url(#rnaiBg-${uid})`} />

          {/* Precision RNAi botanical helix ribbon */}
          <path
            d="M70 280 C170 110 280 340 395 215 C510 90 615 330 735 165"
            stroke="#D99B26"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M70 175 C170 345 280 115 395 240 C510 365 615 125 735 285"
            stroke="#2E7D4F"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Base-pair precision bridges */}
          {[145, 220, 310, 400, 490, 575, 660].map((x, idx) => (
            <g key={x}>
              <line
                x1={x}
                y1={155 + (idx % 2) * 35}
                x2={x}
                y2={295 - (idx % 2) * 35}
                stroke="#E3EFE8"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
                strokeWidth="1.3"
              />
              <circle
                cx={x}
                cy={155 + (idx % 2) * 35}
                r="5.5"
                fill={idx % 2 === 0 ? "#C85A32" : "#FDF4E3"}
              />
              <circle
                cx={x}
                cy={295 - (idx % 2) * 35}
                r="5.5"
                fill="#D99B26"
              />
            </g>
          ))}

          <g
            fontFamily="monospace"
            fontSize="11"
            fill="#FDF4E3"
            fillOpacity="0.82"
            letterSpacing="1.6"
          >
            <text x="54" y="54">
              FOLIAR RNAi PRECISION BIOCONTROL
            </text>
            <text x="54" y="414" fill="#D99B26">
              91% TARGET EFFICACY // ZERO POLLINATOR IMPACT
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Satellite soil-moisture telemetry topographic map
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-[#0D2B22] ${className}`}
    >
      <svg
        viewBox="0 0 800 450"
        fill="none"
        className="h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`satBg-${uid}`}
            x1="0"
            y1="0"
            x2="800"
            y2="450"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0D2B22" />
            <stop offset="50%" stopColor="#163E31" />
            <stop offset="100%" stopColor="#0D2B22" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill={`url(#satBg-${uid})`} />

        <g stroke="#F9F6F0" strokeOpacity="0.16" strokeWidth="1.2">
          <polygon
            points="70,80 260,60 285,180 95,215"
            fill="#2E7D4F"
            fillOpacity="0.5"
          />
          <polygon
            points="270,60 475,85 450,210 295,180"
            fill="#1F593D"
            fillOpacity="0.65"
          />
          <polygon
            points="485,85 720,55 695,200 460,210"
            fill="#D99B26"
            fillOpacity="0.28"
          />
          <polygon
            points="95,225 295,190 325,360 115,385"
            fill="#C85A32"
            fillOpacity="0.32"
          />
          <polygon
            points="305,190 458,220 490,375 335,360"
            fill="#2E7D4F"
            fillOpacity="0.4"
          />
          <polygon
            points="468,220 695,210 725,380 500,375"
            fill="#184634"
            fillOpacity="0.7"
          />
        </g>

        <g stroke="#E3EFE8" strokeOpacity="0.36" strokeWidth="1.25">
          <path d="M40 160 C210 120 350 245 530 190 C650 155 720 125 785 150" />
          <path
            d="M30 220 C220 185 370 305 555 250 C670 215 735 185 795 215"
            stroke="#D99B26"
            strokeOpacity="0.65"
          />
          <path d="M35 285 C235 250 385 360 580 310 C680 282 745 255 795 280" />
        </g>

        <g>
          <circle
            cx="382"
            cy="242"
            r="28"
            stroke="#D99B26"
            strokeOpacity="0.55"
            strokeDasharray="4 4"
            strokeWidth="1.4"
          />
          <circle cx="382" cy="242" r="8" fill="#D99B26" />
          <circle
            cx="578"
            cy="146"
            r="18"
            stroke="#E3EFE8"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <circle cx="578" cy="146" r="5" fill="#E3EFE8" />
          <circle
            cx="206"
            cy="296"
            r="20"
            stroke="#C85A32"
            strokeOpacity="0.7"
            strokeWidth="1.3"
          />
          <circle cx="206" cy="296" r="6" fill="#C85A32" />
        </g>

        <g
          fontFamily="monospace"
          fontSize="11"
          fill="#F9F6F0"
          fillOpacity="0.82"
          letterSpacing="1.6"
        >
          <text x="58" y="44">
            SAR SUB-10M MOISTURE LAYER
          </text>
          <text x="546" y="418" fill="#D99B26">
            11M+ SMALLHOLDER PLOTS
          </text>
        </g>
      </svg>
    </div>
  );
}
