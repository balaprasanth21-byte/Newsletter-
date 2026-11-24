# Kreya Branding — Content & Data Directory Structure

This folder contains the complete editorial content, industry data, market signals, and site configurations for the **Kreya Branding** Weekly Intelligence Platform.

Every file has a clear, self-describing purpose and can be imported directly or via the main index (`@/data`):

| File | Content & Purpose |
| --- | --- |
| [`siteConfig.ts`](./siteConfig.ts) | Brand details (Kreya Branding), logo path, metadata, copyright, and global taglines. |
| [`currentIssue.ts`](./currentIssue.ts) | Current issue number (#42), dates, reading time, and executive editorial note. |
| [`articles.ts`](./articles.ts) | All 12 curated deep-dive briefs and editorial analyses across issues. |
| [`editions.ts`](./editions.ts) | Chronological weekly issues (#42 through #38), summaries, highlights, and cover assets. |
| [`marketSignals.ts`](./marketSignals.ts) | Strategic metrics, ROI indicators, and market run-rates. |
| [`categories.ts`](./categories.ts) | Topic desks (`Crop Protection & Biologicals`, `AgTech & AI`, etc.). |
| [`verticals.ts`](./verticals.ts) | Multi-industry vertical switcher options (`Agriculture`, `Pharma`, `Manufacturing`, `Tech`). |
| [`navigation.ts`](./navigation.ts) | Navigation links, regional search filters (`REGIONS`), and breadcrumbs. |
| [`index.ts`](./index.ts) | Barrel file exporting all data and query helper functions (`getArticleBySlug`, etc.). |
| [`intelligence.ts`](./intelligence.ts) | Backwards-compatibility re-export proxy for existing component imports. |
