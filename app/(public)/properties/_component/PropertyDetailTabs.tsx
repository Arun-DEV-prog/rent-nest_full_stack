"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  Copy,
  Share2,
  MapPin,
  Sparkles,
  Layers,
  CheckCircle,
} from "lucide-react";
import type { PublicProperty } from "../../_actions/publicPropertiesAction";

const tabs = [
  { id: "about", label: "About" },
  { id: "features", label: "Highlights" },
  { id: "location", label: "Location" },
];

export default function PropertyDetailTabs({
  property,
}: {
  property: PublicProperty;
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: "Check out this rental property",
        url,
      });
      return;
    }
    handleCopyLink();
  };

  const features = useMemo(() => {
    const bedrooms = Number(property.bedrooms);
    const bathrooms = Number(property.bathrooms);

    return [
      `${property.bedrooms} bedroom${bedrooms === 1 ? "" : "s"}`,
      `${property.bathrooms} bathroom${bathrooms === 1 ? "" : "s"}`,
      `${property.size_sqft} sqft`,
      `Floor ${property.floor}`,
      property.availability ? "Ready to move in" : "Available soon",
    ];
  }, [property]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Property snapshot</p>
            <h2 className="text-xl font-semibold text-slate-900">
              {property.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFavorite((value) => !value)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                favorite
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <Heart className="w-4 h-4" />
              {favorite ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 transition"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
              Rent
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              ৳{Number(property.rent).toLocaleString()}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
              Status
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {property.availability ? "Available" : "Unavailable"}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
              Move in
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {new Date(property.available_from).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
              Type
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {property.categories?.name ?? "Property"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-[#123832] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 text-sm text-slate-600 space-y-4">
          {activeTab === "about" && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-slate-900">
                Why this property stands out
              </p>
              <p>
                {property.description ||
                  "This property has been designed for comfort, convenience, and smart living."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#effaf7] px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle className="w-4 h-4" />
                    Premium comfort
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Spacious rooms, modern finishes, and ample natural light
                    throughout the home.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#effaf7] px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Layers className="w-4 h-4" />
                    Smart layout
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Open plan living paired with a functional bedroom and
                    bathroom setup.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-slate-900">
                What you get
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <Sparkles className="w-5 h-5 text-[#123832]" />
                    <span className="font-medium text-slate-800">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-slate-900">
                Explore the location
              </p>
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="w-4 h-4" />
                  <div>
                    <p className="font-medium text-slate-900">
                      {property.address}
                    </p>
                    <p className="text-sm text-slate-500">
                      {property.division}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${property.address} ${property.division}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#123832]"
                >
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
