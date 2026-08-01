"use client";

type Property = {
  id: string;
  images: string | string[];
  title: string;
  categories?: { name: string };
  rent: number | string;
  bedrooms: number | string;
  bathrooms: number | string;
  size_sqft: number | string;
  floor: string;
  address: string;
  division: string;
  availability: boolean;
  available_from: string;
  description?: string | null;
  featured?: boolean;
  verified?: boolean;
  dealTag?: string;
};

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Bed,
  Droplet,
  Ruler,
  Check,
  Heart,
  Link2,
} from "lucide-react";

function getFirstImage(images: string | string[] | null | undefined) {
  if (Array.isArray(images)) {
    return images.find((image) => Boolean(image?.trim())) || "/placeholder.jpg";
  }
  if (!images) return "/placeholder.jpg";
  const trimmed = images.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed) as string[];
      const first = parsed.find((image) => Boolean(image?.trim()));
      if (first) return first;
    } catch {}
  }
  return trimmed || "/placeholder.jpg";
}

export default function PropertyCard({ property }: { property: Property }) {
  const imageSrc = getFirstImage(property.images);

  return (
    <article
      className="group/card overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
    >
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={property.title}
          fill
          className="object-cover group-hover/card:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Featured / Deal Tag — top-left ribbon style */}
        {(property.featured || property.dealTag) && (
          <div className="absolute left-0 top-5 z-10">
            <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-r-full shadow-md tracking-wide uppercase">
              {property.dealTag ?? "Featured"}
            </div>
          </div>
        )}

        {/* Top-right action icons */}
        <div className="absolute right-3 top-3 z-10 flex gap-1.5">
          {property.verified && (
            <div className="rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            </div>
          )}
          <div className="rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
            <Link2 className="h-3.5 w-3.5 text-slate-600" />
          </div>
          <div className="rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
            <Heart className="h-3.5 w-3.5 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title + availability badge */}
        <div className="flex items-start gap-2 mb-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight flex-1">
            {property.title}
          </h3>
          <span
            className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded border mt-1 ${
              property.availability
                ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                : "border-slate-300 text-slate-500 bg-slate-50"
            }`}
          >
            {property.availability ? "FOR RENT" : "UNAVAILABLE"}
          </span>
        </div>

        {/* Category pill */}
        {property.categories?.name && (
          <div className="mb-2">
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide">
              {property.categories.name}
            </span>
          </div>
        )}

        {/* Address */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">
            {property.address}, {property.division}
          </span>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 border-t border-slate-100 pt-3 mb-3">
          <div className="text-center border-r border-slate-100">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
              Bedrooms
            </p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">
              {String(property.bedrooms).padStart(2, "0")}
            </p>
          </div>
          <div className="text-center border-r border-slate-100">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
              Baths
            </p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">
              {String(property.bathrooms).padStart(2, "0")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
              Size (Sq.ft)
            </p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">
              {property.size_sqft}
            </p>
          </div>
        </div>

        {/* Footer — rent + date + details link */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Available from
            </p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              {property.available_from}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-900">
              ৳{property.rent.toLocaleString()}
            </p>
            <Link
              href={`/properties/${property.id}`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
