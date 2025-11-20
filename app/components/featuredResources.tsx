"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Eye, TrendingUp, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CONGRESS_API_KEY = "kycYtq68dOZ6tjLnAf5GaVk4ayQ1QUGmG76aA3rc";
const CONGRESS_API_URL = "https://api.congress.gov/v3/bill";

type CategoryType =
  | "Politics"
  | "Legislation"
  | "Elections"
  | "Opinion"
  | "Policy";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: CategoryType;
  date: string;
  author: string;
  views: number;
  trending: boolean;
  relatedPoliticians: string[];
  image: string;
  url?: string;
  source?: string;
}

// Helper to get category color
function getCategoryColor(category: CategoryType) {
  switch (category) {
    case "Politics":
      return "bg-primary/10 text-primary";
    case "Legislation":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "Elections":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "Opinion":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "Policy":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

const FeaturedResources: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedNews();
  }, []);

const fetchFeaturedNews = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${CONGRESS_API_URL}?api_key=${CONGRESS_API_KEY}&format=json&limit=40&sort=dateOfIntroduction`
    );

    if (!response.ok) {
      throw new Error(`Congress API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.bills || data.bills.length === 0) {
      throw new Error("No legislative news found from Congress API.");
    }

    const transformed: NewsArticle[] = data.bills.map(
      (bill: any, index: number) => {
        const latestAction = bill.latestAction?.text || "No update available";

        let category: NewsArticle["category"] = "Politics";
        const actionLower = latestAction.toLowerCase();

        if (bill.type === "hr" || bill.type === "s") {
          category = "Legislation";
        }
        if (actionLower.includes("election")) category = "Elections";
        if (actionLower.includes("policy")) category = "Policy";

        return {
          id: bill.billNumber || `bill-${index}`,
          title: bill.title || latestAction || "Congressional Update",
          summary: latestAction,
          content: latestAction,
          category,
          date:
            bill.latestAction?.actionDate ||
            bill.dateOfIntroduction ||
            new Date().toISOString().split("T")[0],
          author: bill.sponsor?.fullName || "United States Congress",
          views: Math.round(Math.random() * 50000),
          trending: index < 8,
          relatedPoliticians: [],
          image: "/flag.png",
          url: bill.congressUrl || "https://www.congress.gov",
          source: "Congress.gov",
        };
      }
    );

    // ✅ Return only 6 posts
    setArticles(transformed.slice(0, 6));

  } catch (err: any) {
    setError(err.message || "Failed to load Congress data.");
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Featured Resources
          </h2>
          <p className="text-sm md:text-base fontroboto text-muted-foreground font-roboto max-w-2xl">
            Explore our curated collection of articles, videos, and tools to help
            you understand and vote with confidence
          </p>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Loading featured articles...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Featured Resources
          </h2>
          <p className="text-sm md:text-base fontroboto text-muted-foreground font-roboto max-w-2xl">
            Explore our curated collection of articles, videos, and tools to help
            you understand and vote with confidence
          </p>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Error Loading Featured News
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {error}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-left mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>Setup Instructions (100% FREE):</strong>
              </p>
              <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                <li>Sign up FREE at: <a href="https://gnews.io/" target="_blank" className="underline">gnews.io</a></li>
                <li>Get your FREE API key instantly (no credit card)</li>
                <li>Replace YOUR_GNEWS_API_KEY_HERE in code</li>
                <li>Free: 100 requests/day, works in browser!</li>
              </ol>
            </div>
            <Button onClick={fetchFeaturedNews} className="rounded-none">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      <div className="text-start mb-6">
        <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
          Featured Resources
        </h2>
        <p className="text-sm md:text-base fontroboto text-muted-foreground font-roboto max-w-2xl">
          Explore our curated collection of articles, videos, and tools to help
          you understand and vote with confidence
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <div key={article.id || idx}>
            <Card className="h-full rounded-none py-0 fontroboto overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              {/* Image */}
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/flag.png";
                  }}
                />
              </div>
              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={`${getCategoryColor(article.category)} text-xs`}
                  >
                    {article.category}
                  </Badge>
                  {article.trending && (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs gap-1 flex items-center">
                      <TrendingUp size={12} />
                      Trending
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold fontmont text-foreground mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {article.summary}
                </p>

                {article.source && (
                  <p className="text-xs text-muted-foreground mb-3">
                    Source: {article.source}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {article.views.toLocaleString()}
                  </span>
                </div>

                {article.url && (
                  <Button asChild className="w-full rounded-none" size="sm" variant="outline">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                      Read Article <ExternalLink size={14} />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {articles.length > 0 && (
        <div className="text-center mt-8">
          <Button asChild className="rounded-none" size="lg">
            <Link href="/resources">
              View All Resources
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeaturedResources;