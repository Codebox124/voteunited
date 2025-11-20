/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  TrendingUp,
  Calendar,
  Eye,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const CONGRESS_API_KEY = "kycYtq68dOZ6tjLnAf5GaVk4ayQ1QUGmG76aA3rc";
const CONGRESS_API_URL = "https://api.congress.gov/v3/bill";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Politics" | "Legislation" | "Elections" | "Opinion" | "Policy";
  date: string;
  author: string;
  views: number;
  trending: boolean;
  relatedPoliticians: string[];
  image: string;
  url?: string;
  source?: string;
}

export default function Resources() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    fetchPoliticalNews();
  }, []);

  // 🔥 FETCH FROM CONGRESS.GOV
  const fetchPoliticalNews = async () => {
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

      setArticles(transformed);
    } catch (err: any) {
      setError(err.message || "Failed to load Congress data.");
    } finally {
      setLoading(false);
    }
  };

  // FILTERING + SEARCH
  const filteredNews = articles
    .filter((article) => {
      const term = searchTerm.toLowerCase();
      return (
        (article.title.toLowerCase().includes(term) ||
          article.summary.toLowerCase().includes(term)) &&
        (filterCategory === "All" || article.category === filterCategory)
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = [
    "All",
    "Politics",
    "Legislation",
    "Elections",
    "Opinion",
    "Policy",
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Politics":
        return "bg-primary/10 text-primary";
      case "Legislation":
      case "Policy":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Elections":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Opinion":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col items-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading Congress updates...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col items-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-lg font-semibold text-red-600 mb-2">
              Error Loading Congress Data
            </p>
            <p className="text-sm text-slate-600 mb-4">{error}</p>
            <Button onClick={fetchPoliticalNews} className="rounded-none">
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center p-10">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Congress Updates
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Live legislative news, updates, and actions directly from U.S.
            Congress.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search Congress updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-2">Filter by Category</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                onClick={() => setFilterCategory(cat)}
                className="rounded-none"
                size="sm"
              >
                {cat} (
                {cat === "All"
                  ? articles.length
                  : articles.filter((a) => a.category === cat).length}
                )
              </Button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {filteredNews.some((a) => a.trending) && (
          <div className="mb-12">
            {(() => {
              const featured = filteredNews.find((a) => a.trending);
              if (!featured) return null;

              return (
                <Card className="overflow-hidden rounded-none">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video bg-muted">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-2">
                        <Badge className={`${getCategoryColor(featured.category)}`}>
                          {featured.category}
                        </Badge>
                        <Badge className="bg-red-100 text-red-700 gap-1">
                          <TrendingUp size={12} />
                          Trending
                        </Badge>
                      </div>

                      <h2 className="text-3xl font-bold mb-3">
                        {featured.title}
                      </h2>

                      <p className="mb-4 line-clamp-3">{featured.summary}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(featured.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {featured.views.toLocaleString()} views
                        </span>
                      </div>

                      <Button asChild className="rounded-none">
                        <a href={featured.url} target="_blank">
                          View on Congress.gov <ExternalLink size={16} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })()}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article, idx) => (
            <Card
              key={article.id || idx}
              className="rounded-none overflow-hidden flex flex-col"
            >
              <div className="aspect-video bg-muted">
                <img
                  src={article.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex gap-2 mb-2">
                  <Badge className={`${getCategoryColor(article.category)} text-xs`}>
                    {article.category}
                  </Badge>
                  {article.trending && (
                    <Badge className="bg-red-100 text-red-700 text-xs gap-1">
                      <TrendingUp size={12} /> Trending
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-xs border-t pt-2 mt-auto">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(article.date).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {article.views.toLocaleString()}
                  </span>
                </div>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full rounded-none mt-3"
                >
                  <a href={article.url} target="_blank">
                    Read on Congress.gov <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">
            No results found.
          </p>
        )}
      </main>
    </div>
  );
}
