import { MarketSignal } from "@/types/intelligence";

export const MARKET_SIGNALS: MarketSignal[] = [
  {
    id: "herbicide-cut",
    value: 62,
    suffix: "%",
    label: "Herbicide Volume Reduction",
    context:
      "Verified average chemical cut across 180,000 acres using green-on-green AI precision boom sprayers.",
    delta: "+14 pts vs. 2024 trials",
    region: "North America",
  },
  {
    id: "biologicals-market",
    value: 18.4,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    label: "Global Biologicals Run-Rate",
    context:
      "Accelerated by EU CMC-7 regulatory fast-tracking and 4.2M ha commercial diazotroph rollouts.",
    delta: "+14.2% YoY CAGR",
    region: "Global",
  },
  {
    id: "yield-resilience",
    value: 18.3,
    prefix: "+",
    suffix: "%",
    decimals: 1,
    label: "Heat-Stress Yield Resilience",
    context:
      "Marketable yield preserved under 42°C flowering peaks with amino-chelated foliar K+Ca sprays.",
    delta: "5.8× grower ROI",
    region: "India & South Asia",
  },
];
