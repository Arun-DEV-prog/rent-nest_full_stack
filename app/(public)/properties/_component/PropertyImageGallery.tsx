"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import type { PublicProperty } from "../../_actions/publicPropertiesAction";

function parseImages(images: string | null | undefined) {
  if (!images) return ["/placeholder.jpg"];

  const trimmed = images.trim();
  if (!trimmed) return ["/placeholder.jpg"];

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed) as string[];
      const valid = parsed.map((image) => image?.trim()).filter(Boolean);
      if (valid.length) return valid;
    } catch {
      // fall through to string handling
    }
  }

  if (trimmed.includes(",")) {
    const list = trimmed
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);
    if (list.length) return list;
  }

  return [trimmed];
}

export default function PropertyImageGallery({
  property,
}: {
  property: PublicProperty;
}) {
  const images = useMemo(() => parseImages(property.images), [property.images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="rounded-[32px] overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
      <div className="relative h-[380px] sm:h-[520px]">
        <Image
          src={activeImage}
          alt={property.title}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
            {property.categories?.name ?? "Property"}
          </span>
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm ${
              property.availability
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {property.availability ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/90 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Featured image</p>
              <h2 className="text-xl font-semibold text-slate-900">
                {property.title}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#123832] px-4 py-2 text-sm font-semibold text-white">
              <Sparkles className="w-4 h-4" />
              Showcased
            </div>
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2 p-4 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-3xl border ${
                activeIndex === index
                  ? "border-emerald-500 ring-2 ring-emerald-200"
                  : "border-slate-200"
              }`}
            >
              <div className="relative h-20 w-full">
                <Image
                  src={image}
                  alt={`${property.title} image ${index + 1}`}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                  sizes="100px"
                  unoptimized
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-black/20 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
