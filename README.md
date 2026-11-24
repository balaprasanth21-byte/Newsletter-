# Kreya Branding — Global Industry Intelligence & Weekly Newsletter Platform

A modern, ultra-responsive, animation-rich **B2B Weekly Industry Intelligence & Newsletter Platform** built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide Icons**.

Designed as an interactive digital-magazine experience to nurture executive client relationships, starting with the **Global Agriculture, Crop Science, Biologicals & AgTech** vertical and architected with an extensible industry switcher for future verticals (*Pharma & Biomanufacturing*, *Industrial & Materials*, and *Applied AI & Climate Tech*).

---

## Visual System & Design Principles

### Strict Organic Botanical Palette (Zero Pure Black)
No pure black (`#000000`) or cold neutral grays (`#111`, `#222`, `#333`) appear anywhere in backgrounds, typography, borders, or shadows:

| Role | Token | Hex / Value |
| --- | --- | --- |
| Primary Canvas | Warm Alabaster / Oat Cream | `#F9F6F0` |
| Elevated Card Surface | Soft Parchment Ivory | `#FFFDF9` |
| Warm Borders | Linen Warm Border | `#E6DFD3` |
| Primary Dark Anchor | Deep Emerald Canopy | `#0D2B22` |
| Secondary Dark Copy | Deep Moss Slate | `#24473B` |
| Primary CTA & Accent | Sunlit Terracotta (Hover) | `#C85A32` (`#B04822`) |
| Secondary Botanical Accent | Chlorophyll Green / Soft Sage | `#2E7D4F` / `#E3EFE8` |
| Tertiary Callout Accent | Golden Harvest Ochre / Soft Amber | `#D99B26` / `#FDF4E3` |
| Glass Header & Shadows | Translucent Cream / Emerald Shadow | `rgba(249,246,240,0.85)` / `rgba(13,43,34,0.08)` |

### Editorial Typography
- **Display & Headlines:** `Fraunces` (editorial serif, `-0.02em` tracking, fluid `clamp()` scaling)
- **Body & UI Copy:** `Plus Jakarta Sans` (`1.65` body line-height)
- **Data Badges, Dates & Read Times:** `JetBrains Mono` (uppercase, `0.06em` tracking, `tabular-nums`)

---

## Key Features & Motion Craft

- **Topographic Botanical Contours:** Slow-drifting SVG contour rings behind the hero section with scroll-linked parallax.
- **Interactive Inbox Preview Widget:** Toggle live between **Desktop Briefing** and **Mobile Digest** views of Issue #42—with clickable headlines routing directly to deep-dive pages.
- **Balanced Asymmetric Editorial Bento Grid:** 12-column desktop bento layout (`1 flagship lead + 2 wide secondary + 3 tertiary cards`) engineered with zero orphan columns across every breakpoint and every category filter.
- **Shared-Element Filter Pills:** Smooth Framer Motion `layoutId` sliding active pill across `All Insights`, `Crop Protection & Biologicals`, `AgTech & AI`, `Global Markets & Policy`, `Crop Nutrition`, and `Sustainability`.
- **Animated Market Signals:** Deep Emerald section with scroll-triggered spring number counters.
- **Dedicated Deep-Dive Article Pages (`/news/[slug]`):**
  - Pinned 3px Terracotta-to-Chlorophyll scroll reading progress bar
  - Sticky breadcrumb & Share menu (Copy Link, LinkedIn, WhatsApp with toast confirmation)
  - Structured 3-part executive format: *01. The Global Development*, *02. Key Data & Takeaways* (Amber/Ochre callout), and *03. Strategic Brand & Market Lens* (Sage/Emerald commercial analysis)
  - Sticky right sidebar with newsletter signup and *"More in This Issue"* quick-jump list
  - Bottom clickable **Next Story** preview card
- **Mobile-First Parity:** Horizontal `snap-x snap-mandatory` swipe card decks with animated pagination dots on mobile viewports + a scroll-revealed floating bottom subscribe pill that opens a smooth bottom-sheet modal.

---

## Routes & Populated Editorial Content (12 Deep-Dive Stories • 5 Editions)

- `/` — Executive Hero, Live Inbox Preview, Issue #42 Top Headlines Bento Grid (6 briefs), Market Signals Snapshot, and Recent Editions Carousel
- `/news/[slug]` — Dedicated deep-dive pages for all **12 global agriculture intelligence stories** spanning Issues `#42` through `#38`:
  1. *Biological Nitrogen Fixation Enters Commercial Scale Across Row Crops in Brazil and India* (Issue #42)
  2. *Precision Spraying AI Cuts Herbicide Volume by 62% in Large-Scale Trials* (Issue #42)
  3. *EU Approves Fast-Track Regulatory Pathway for Microbial Biostimulants* (Issue #42)
  4. *Next-Gen Foliar Potassium & Calcium Formulations Show 18% Yield Resilience Under Heat Stress* (Issue #42)
  5. *Global Agri-Input Giants Shift R&D Budgets Toward Climate-Adaptive Seed Genetics* (Issue #42)
  6. *Satellite Soil-Moisture Telemetry Integrates Directly with Smallholder Advisory Platforms* (Issue #42)
  7. *APAC Spray-as-a-Service Drone Fleets Cross 18,000 Operators, Cutting Per-Acre Cost by 40%* (Issue #41)
  8. *Chelated Zinc & Boron Specialty Blends Outpace Commodity NPK Growth Three-to-One* (Issue #41)
  9. *Global Food CPGs Introduce $22/Ton Low-Carbon Wheat & Barley Procurement Premiums* (Issue #40)
  10. *Green Ammonia Fertilizer Pilots Reach 12% Blended Distribution Across Nordic Co-ops* (Issue #40)
  11. *Short-Duration Climate-Smart Maize & Millet Hybrids Capture 24% Acreage Gain Across Semi-Arid Belts* (Issue #39)
  12. *Foliar RNAi Biopesticides Complete First Commercial Specialty-Crop Season With 91% Target Efficacy* (Issue #38)
- `/editions` — Filterable chronology of weekly issues (`Issue #42` – `Issue #38`)
- `/archive` — Instant client-side search (keyword, crop, region, technology) + multi-tag topic & region filters

---

## Project Structure

```text
├── public/
│   └── images/                  # Editorial photography assets
├── src/
│   ├── app/
│   │   ├── archive/page.tsx     # Full Archive & Topic Explorer
│   │   ├── editions/page.tsx    # Past Weekly Editions chronology
│   │   ├── news/[slug]/page.tsx # Dynamic deep-dive briefing pages (SSG)
│   │   ├── globals.css          # Organic botanical design tokens & utilities
│   │   ├── layout.tsx           # Fonts, SEO metadata & global chrome
│   │   ├── not-found.tsx        # Custom botanical 404 page
│   │   └── page.tsx             # Home & Issue #42 executive briefing
│   ├── components/              # Modular UI, motion, cards, modals & SVG artwork
│   ├── data/intelligence.ts     # 12 curated articles, 5 editions, signals & verticals
│   └── types/intelligence.ts    # TypeScript domain definitions
└── next.config.ts
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Lint and run production build
npm run lint
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
