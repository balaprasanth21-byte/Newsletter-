export type Category =
  | "Crop Protection & Biologicals"
  | "AgTech & AI"
  | "Global Markets & Policy"
  | "Crop Nutrition"
  | "Sustainability";

export type VerticalId = "agriculture" | "pharma" | "manufacturing" | "tech";

export type ArtworkVariant =
  | "foliar"
  | "seeds"
  | "satellite"
  | "drone"
  | "carbon"
  | "rnai";

export interface VerticalOption {
  id: VerticalId;
  name: string;
  shortName: string;
  status: "active" | "coming-soon";
  description: string;
  subscribers: string;
}

export interface KeyTakeaway {
  metric: string;
  label: string;
  detail: string;
}

export interface NewsArticle {
  slug: string;
  issueNumber: number;
  featured?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  category: Category;
  secondaryCategories?: Category[];
  region: string;
  readTime: string;
  publishedDate: string;
  sourceAttribution: string;
  tags: string[];
  image?: string;
  artworkVariant?: ArtworkVariant;
  imageCaption: string;
  globalDevelopment: string[];
  pullQuote: {
    text: string;
    attribution: string;
  };
  keyTakeaways: KeyTakeaway[];
  strategicLens: {
    headline: string;
    paragraphs: string[];
    implications: {
      audience: string;
      takeaway: string;
    }[];
  };
  watchNext: string;
}

export interface WeeklyEdition {
  issueNumber: number;
  title: string;
  date: string;
  readTime: string;
  leadCategory: Category;
  summary: string;
  highlights: string[];
  coverImage?: string;
  artworkVariant?: ArtworkVariant;
  storySlugs: string[];
  isCurrent?: boolean;
}

export interface MarketSignal {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  context: string;
  delta: string;
  region: string;
}
