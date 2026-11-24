import { NewsArticle } from "@/types/intelligence";
import { ARTICLES } from "./articles";
import { CURRENT_ISSUE } from "./currentIssue";

export * from "./siteConfig";
export * from "./categories";
export * from "./verticals";
export * from "./currentIssue";
export * from "./articles";
export * from "./marketSignals";
export * from "./editions";
export * from "./navigation";

// ---------------------------------------------------------------------------
// Intelligence & Article Query Helpers
// ---------------------------------------------------------------------------

export function getCurrentIssueArticles(): NewsArticle[] {
  return ARTICLES.filter(
    (article) => article.issueNumber === CURRENT_ISSUE.number
  );
}

export function getArticlesByIssue(issueNumber: number): NewsArticle[] {
  const issueMatches = ARTICLES.filter(
    (article) => article.issueNumber === issueNumber
  );
  if (issueMatches.length >= 4) return issueMatches;
  const extras = ARTICLES.filter(
    (article) => article.issueNumber !== issueNumber
  ).slice(0, 6 - issueMatches.length);
  return [...issueMatches, ...extras];
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getNextArticle(currentSlug: string): NewsArticle {
  const index = ARTICLES.findIndex((article) => article.slug === currentSlug);
  if (index === -1 || index === ARTICLES.length - 1) {
    return ARTICLES[0];
  }
  return ARTICLES[index + 1];
}
