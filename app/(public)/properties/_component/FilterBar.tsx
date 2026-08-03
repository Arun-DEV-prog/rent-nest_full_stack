"use client";

import { useState } from "react";

type Filters = {
  keyword?: string;
  type?: string | null;
  city?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

export default function FilterBar({
  types = [],
  cities = [],
  value,
  onChange,
  className = "",
  onClose,
}: {
  types?: string[];
  cities?: string[];
  value: Filters;
  onChange: (next: Filters) => void;
  className?: string;
  onClose?: () => void;
}) {
  const [local, setLocal] = useState<Filters>(value || {});

  function reset() {
    const empty: Filters = {
      keyword: undefined,
      type: null,
      city: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
    };
    setLocal(empty);
    onChange(empty);
  }

  function update(next: Partial<Filters>) {
    const updated = { ...local, ...next };
    setLocal(updated);
    onChange(updated);
  }

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="text-sm font-medium text-emerald-600"
          >
            Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-sm text-slate-600 lg:hidden"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Keyword
          </label>
          <input
            value={local.keyword ?? ""}
            onChange={(e) => update({ keyword: e.target.value })}
            placeholder="Search by title or address"
            className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Location
          </label>
          <select
            value={local.city ?? ""}
            onChange={(e) => update({ city: e.target.value || null })}
            className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any location</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Property type
          </label>
          <select
            value={local.type ?? ""}
            onChange={(e) => update({ type: e.target.value || null })}
            className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Min price
            </label>
            <input
              type="number"
              min="0"
              value={local.minPrice ?? ""}
              onChange={(e) =>
                update({
                  minPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              placeholder="0"
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Max price
            </label>
            <input
              type="number"
              min="0"
              value={local.maxPrice ?? ""}
              onChange={(e) =>
                update({
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              placeholder="Any"
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Bedrooms
          </label>
          <select
            value={local.bedrooms ?? ""}
            onChange={(e) =>
              update({
                bedrooms: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
