"use client";

type Property = {
  id: string;
  images: string[];
  title: string;
  categories?: { name: string };
  rent: number;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  floor: string;
  address: string;
  division: string;
  availability: boolean;
  available_from: string;
  description?: string;
  featured?: boolean;
  verified?: boolean;
  dealTag?: string;
};

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Bed, Droplet, Ruler } from "lucide-react";
import { Heart, Link2, Check } from "lucide-react";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article
      className="group/card relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
      data-aos="fade-up"
    >
      <div className="relative h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={property.images?.[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
        {/* top-left featured badge */}
        {property.featured && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
            Featured
          </div>
        )}

        {/* deal tag */}
        {property.dealTag && (
          <div className="absolute left-3 bottom-3 z-10 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {property.dealTag}
          </div>
        )}

        {/* price pill */}
        <div className="absolute right-3 bottom-3 z-10 rounded-full bg-slate-800/90 px-3 py-1 text-sm font-semibold text-white">
          ৳{property.rent.toLocaleString()}/mo
        </div>

        {/* top-right action icons */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          {property.verified && (
            <div className="rounded-full bg-white p-1 shadow-sm">
              <Check className="h-4 w-4 text-emerald-600" />
            </div>
          )}
          <div className="rounded-full bg-white p-1 shadow-sm">
            <Link2 className="h-4 w-4 text-slate-700" />
          </div>
          <div className="rounded-full bg-white p-1 shadow-sm">
            <Heart className="h-4 w-4 text-slate-700" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {property.address}
          </h3>
          <p className="mt-1 text-sm text-slate-600 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>
              {property.categories?.name} • {property.floor}
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-700 line-clamp-2">
            {property.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-slate-900">
            ৳{property.rent.toLocaleString()}
          </div>
          <div className="mt-1 text-sm text-slate-500">/ month</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-slate-500" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-slate-500" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-slate-500" />
            <span>{property.size_sqft} sqft</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${property.availability ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}
          >
            {property.availability ? "Available" : "Not Available"}
          </span>
          <Link
            href={`/properties/${property.id}`}
            className="text-sm font-semibold text-[#b55c33]"
          >
            Details
          </Link>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500 flex items-center gap-3">
        <Calendar className="h-4 w-4" />
        <span>Available from: {property.available_from}</span>
      </div>
    </article>
  );
}
