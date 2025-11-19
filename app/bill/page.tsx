/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Building2,
  FileText,
  Calendar,
  Users,
  Scale,
  BookOpen,
  ChevronRight,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const CONGRESS_API_KEY = "ZOhszC52WhvJkzfzVnRNitIUBkTg7JLP9eLXoYWb";
const CONGRESS_API_ENDPOINT = "https://api.congress.gov/v3/bill";

interface BillDetails {
  congress: number;
  type: string;
  number: string;
  title: string;
  introducedDate: string;
  originChamber: string;
  policyArea?: {
    name: string;
  };
  latestAction: {
    actionDate: string;
    text: string;
  };
  sponsors: Array<{
    bioguideId: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    fullName: string;
    party: string;
    state: string;
    district?: number;
  }>;
  cosponsors: {
    count: number;
    countIncludingWithdrawnCosponsors: number;
    url: string;
  };
  committees: {
    count: number;
    url: string;
  };
  actions: {
    count: number;
    url: string;
  };
  amendments?: {
    count: number;
    url: string;
  };
  summaries: {
    count: number;
    url: string;
  };
  textVersions: {
    count: number;
    url: string;
  };
  subjects: {
    count: number;
    url: string;
  };
  relatedBills?: {
    count: number;
    url: string;
  };
  cboCostEstimates?: Array<{
    description: string;
    pubDate: string;
    title: string;
    url: string;
  }>;
  committeeReports?: Array<{
    citation: string;
    url: string;
  }>;
  laws?: Array<{
    number: string;
    type: string;
  }>;
  constitutionalAuthorityStatementText?: string;
  updateDate: string;
  updateDateIncludingText: string;
  legislationUrl?: string;
}

export default function BillDetailsPage() {
  const [bill, setBill] = useState<BillDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract URL parameters from query string
  const getUrlParams = () => {
    if (typeof window === "undefined") return null;
    const searchParams = new URLSearchParams(window.location.search);

    const congress = searchParams.get("congress");
    const billType = searchParams.get("billType");
    const billNumber = searchParams.get("billNumber");

    if (congress && billType && billNumber) {
      return {
        congress,
        billType: billType.toLowerCase(),
        billNumber,
      };
    }
    return null;
  };

  useEffect(() => {
    const params = getUrlParams();
    if (params) {
      fetchBillDetails(params.congress, params.billType, params.billNumber);
    } else {
      setError(
        "Invalid URL format. Expected /bill/{congress}/{billType}/{billNumber}"
      );
      setLoading(false);
    }
  }, []);

  const fetchBillDetails = async (
    congress: string,
    billType: string,
    billNumber: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${CONGRESS_API_ENDPOINT}/${congress}/${billType}/${billNumber}?api_key=${CONGRESS_API_KEY}&format=json`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);

      if (!data.bill) {
        throw new Error("Bill data not found.");
      }

      setBill(data.bill);
    } catch (err: any) {
      console.error("Error fetching bill details:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBillTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      HCONRES: "House Concurrent Resolution",
      SCONRES: "Senate Concurrent Resolution",
      HJRES: "House Joint Resolution",
      SJRES: "Senate Joint Resolution",
      HR: "House Bill",
      S: "Senate Bill",
      HRES: "House Resolution",
      SRES: "Senate Resolution",
    };
    return types[type.toUpperCase()] || type;
  };

  const getChamberColor = (chamber: string) => {
    return chamber === "House"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  const getPartyColor = (party: string) => {
    switch (party) {
      case "D":
        return "text-blue-600 dark:text-blue-400";
      case "R":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading bill details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <div className="text-center max-w-md">
              <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Error Loading Bill
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {error}
              </p>
              <Button
                onClick={() => window.history.back()}
                className="mt-4 rounded-none"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background fontroboto">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          className="mb-6 rounded-none"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Bills
        </Button>

        {/* Header Card */}
        <Card className="overflow-hidden mb-8 p-0 rounded-none shadow-none fontroboto">
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 px-6 py-4 border-b">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="text-primary" size={28} />
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className={`${getChamberColor(
                    bill.originChamber
                  )} rounded-none`}
                >
                  {bill.originChamber}
                </Badge>
                <Badge variant="outline" className="rounded-none">
                  {getBillTypeLabel(bill.type)}
                </Badge>
                {bill.laws && bill.laws.length > 0 && (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-none">
                    <CheckCircle2 size={14} className="mr-1" />
                    Enacted into Law
                  </Badge>
                )}
              </div>
            </div>
            <div className="mb-2">
              <span className="text-lg font-bold text-primary">
                {bill.type.toUpperCase()} {bill.number}
              </span>
              <span className="text-sm text-muted-foreground ml-3">
                • {bill.congress}th Congress
              </span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-6 fontmont">
              {bill.title}
            </h1>

            {/* Latest Action */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border rounded-none border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FileText
                  className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <div className="flex-1">
                  <p className="text-amber-900 dark:text-amber-200 font-semibold text-sm mb-2">
                    Latest Action
                  </p>
                  <p className="text-amber-800 dark:text-amber-300 mb-2">
                    {bill.latestAction.text}
                  </p>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    {formatDate(bill.latestAction.actionDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Introduced
                  </p>
                  <p className="text-sm font-semibold">
                    {formatDate(bill.introducedDate)}
                  </p>
                </div>
              </div>

              {bill.policyArea && (
                <div className="flex items-start gap-3">
                  <Scale className="text-primary mt-1" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Policy Area
                    </p>
                    <p className="text-sm font-semibold">
                      {bill.policyArea.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-semibold">
                    {formatDate(bill.updateDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            {bill.legislationUrl && (
              <Button asChild className="rounded-none">
                <a
                  href={bill.legislationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  View on Congress.gov <ExternalLink size={16} />
                </a>
              </Button>
            )}
          </div>
        </Card>

        {/* Sponsor Information */}
        <Card className="mb-8 rounded-none shadow-none fontroboto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
              <Users size={22} className="text-primary" />
              Sponsor & Cosponsors
            </h2>

            {bill.sponsors && bill.sponsors.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Primary Sponsor
                </p>
                {bill.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.bioguideId}
                    className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
                  >
                    <p className="font-semibold text-foreground">
                      {sponsor.fullName}
                    </p>
                    <p className={`text-sm ${getPartyColor(sponsor.party)}`}>
                      {sponsor.party === "D"
                        ? "Democrat"
                        : sponsor.party === "R"
                        ? "Republican"
                        : sponsor.party}
                      {" • "} {sponsor.state}
                      {sponsor.district && `-${sponsor.district}`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span>
                  <span className="font-semibold">{bill.cosponsors.count}</span>{" "}
                  Cosponsors
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Law Status */}
        {bill.laws && bill.laws.length > 0 && (
          <Card className="mb-8 rounded-none shadow-none fontroboto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
                <CheckCircle2 size={22} className="text-green-600" />
                Law Status
              </h2>
              {bill.laws.map((law, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
                >
                  <p className="font-semibold text-green-900 dark:text-green-200">
                    {law.type}: {law.number}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Legislative Activity */}
        <Card className="mb-8 rounded-none shadow-none fontroboto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
              <BookOpen size={22} className="text-primary" />
              Legislative Activity
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {bill.actions.count}
                    </p>
                    <p className="text-sm text-muted-foreground">Actions</p>
                  </div>
                  <FileText className="text-primary" size={24} />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {bill.committees.count}
                    </p>
                    <p className="text-sm text-muted-foreground">Committees</p>
                  </div>
                  <Building2 className="text-primary" size={24} />
                </div>
              </div>

              {bill.amendments && (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {bill.amendments.count}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amendments
                      </p>
                    </div>
                    <FileText className="text-primary" size={24} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* CBO Cost Estimates */}
        {bill.cboCostEstimates && bill.cboCostEstimates.length > 0 && (
          <Card className="mb-8 rounded-none shadow-none fontroboto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
                <DollarSign size={22} className="text-primary" />
                CBO Cost Estimates
              </h2>
              <div className="space-y-3">
                {bill.cboCostEstimates.map((estimate, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
                  >
                    <a
                      href={estimate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline flex items-center gap-2"
                    >
                      {estimate.title}
                      <ExternalLink size={14} />
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estimate.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Published: {formatDate(estimate.pubDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Committee Reports */}
        {bill.committeeReports && bill.committeeReports.length > 0 && (
          <Card className="mb-8 rounded-none shadow-none fontroboto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
                <FileText size={22} className="text-primary" />
                Committee Reports
              </h2>
              <div className="space-y-2">
                {bill.committeeReports.map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 rounded-lg p-3"
                  >
                    <span className="font-medium">{report.citation}</span>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Related Bills */}
        {bill.relatedBills && bill.relatedBills.count > 0 && (
          <Card className="mb-8 rounded-none shadow-none fontroboto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 fontmont">
                <FileText size={22} className="text-primary" />
                Related Bills
              </h2>
              <p className="text-muted-foreground">
                {bill.relatedBills.count} related bill
                {bill.relatedBills.count !== 1 ? "s" : ""}
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
