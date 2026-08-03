"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

type Filters = {
  keyword?: string;
  type?: string | null;
  city?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

export default function PropertiesSearchBar({
  value,
  onSearch,
  types = [],
  cities = [],
}: {
  value: Filters;
  onSearch: (next: Filters) => void;
  types?: string[];
  cities?: string[];
}) {
  const [local, setLocal] = useState<Filters>(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const cityOptions = useMemo(() => {
    const fallback = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi"];
    return Array.from(new Set([...(cities ?? []), ...fallback])).filter(
      Boolean,
    );
  }, [cities]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({
      keyword: local.keyword?.trim() || undefined,
      type: local.type || null,
      city: local.city || null,
      minPrice: local.minPrice != null ? Number(local.minPrice) : null,
      maxPrice: local.maxPrice != null ? Number(local.maxPrice) : null,
      bedrooms: local.bedrooms != null ? Number(local.bedrooms) : null,
    });
  };

  const resetFilters = () => {
    const empty: Filters = {
      keyword: undefined,
      type: null,
      city: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
    };
    setLocal(empty);
    onSearch(empty);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Keyword</span>
          <input
            value={local.keyword ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                keyword: event.target.value,
              }))
            }
            placeholder="Search by title or address"
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Location</span>
          <select
            value={local.city ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                city: event.target.value || null,
              }))
            }
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any location</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Property type</span>
          <select
            value={local.type ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                type: event.target.value || null,
              }))
            }
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-2 lg:justify-end">
          <button
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Min price</span>
          <input
            type="number"
            min="0"
            value={local.minPrice ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                minPrice: event.target.value
                  ? Number(event.target.value)
                  : null,
              }))
            }
            placeholder="0"
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Max price</span>
          <input
            type="number"
            min="0"
            value={local.maxPrice ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                maxPrice: event.target.value
                  ? Number(event.target.value)
                  : null,
              }))
            }
            placeholder="Any"
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          <span className="font-medium">Bedrooms</span>
          <select
            value={local.bedrooms ?? ""}
            onChange={(event) =>
              setLocal((current) => ({
                ...current,
                bedrooms: event.target.value
                  ? Number(event.target.value)
                  : null,
              }))
            }
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
      </div>

      {(local.keyword ||
        local.city ||
        local.type ||
        local.minPrice ||
        local.maxPrice ||
        local.bedrooms) && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      )}
    </form>
  );
}
