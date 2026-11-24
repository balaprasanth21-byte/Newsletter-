import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ARTICLES,
  getArticleBySlug,
  getArticlesByIssue,
  getNextArticle,
} from "@/data/intelligence";
import { ArticleDetailClient } from "@/components/ArticleDetailClient";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Brief Not Found",
    };
  }

  return {
    title: article.title,
    description: article.summary,
  };
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const issueArticles = getArticlesByIssue(article.issueNumber);
  const nextArticle = getNextArticle(slug);

  return (
    <ArticleDetailClient
      article={article}
      issueArticles={issueArticles}
      nextArticle={nextArticle}
    />
  );
}

export default function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="editorial-grain min-h-[70vh] bg-[#F9F6F0] px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl animate-pulse space-y-5">
            <div className="h-5 w-40 rounded-full bg-[#E6DFD3]" />
            <div className="h-12 w-full rounded-xl bg-[#E6DFD3]" />
            <div className="h-6 w-3/4 rounded-lg bg-[#E6DFD3]" />
            <div className="mt-8 aspect-[16/9] w-full rounded-3xl bg-[#E6DFD3]" />
          </div>
        </div>
      }
    >
      <ArticleContent params={params} />
    </Suspense>
  );
}
