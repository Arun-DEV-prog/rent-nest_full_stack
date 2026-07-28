"use client";

import { useState } from "react";

type Filters = {
  keyword?: string;
  type?: string | null;
  city?: string | null;
  nearUniversity?: string | null;
  availableNow?: boolean;
  verifiedOnly?: boolean;
  furnishing?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

export default function SidebarFilters({
  types = [],
  cities = [],
  value,
  onChange,
}: {
  types?: string[];
  cities?: string[];
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  const [local, setLocal] = useState<Filters>(value || {});

  function apply() {
    onChange(local);
  }

  function reset() {
    const empty: Filters = {
      keyword: "",
      type: null,
      city: null,
      nearUniversity: null,
      availableNow: false,
      verifiedOnly: false,
      furnishing: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
    };
    setLocal(empty);
    onChange(empty);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <svg
            className="h-5 w-5 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M3 12h18M3 20h18"
            />
          </svg>
          Filters
        </h3>
        <button onClick={reset} className="text-sm text-emerald-600">
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600">
            Keyword
          </label>
          <input
            value={local.keyword ?? ""}
            onChange={(e) => setLocal({ ...local, keyword: e.target.value })}
            placeholder="Search..."
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600">
            Type
          </label>
          <select
            value={local.type ?? ""}
            onChange={(e) =>
              setLocal({ ...local, type: e.target.value || null })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600">
            City
          </label>
          <select
            value={local.city ?? ""}
            onChange={(e) =>
              setLocal({ ...local, city: e.target.value || null })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600">
            Near University
          </label>
          <select
            value={local.nearUniversity ?? ""}
            onChange={(e) =>
              setLocal({ ...local, nearUniversity: e.target.value || null })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!local.availableNow}
              onChange={(e) =>
                setLocal({ ...local, availableNow: e.target.checked })
              }
            />
            <span className="text-sm text-slate-700">Available Now</span>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!local.verifiedOnly}
              onChange={(e) =>
                setLocal({ ...local, verifiedOnly: e.target.checked })
              }
            />
            <span className="text-sm text-slate-700">Verified Only</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600">
            Furnishing
          </label>
          <select
            value={local.furnishing ?? ""}
            onChange={(e) =>
              setLocal({ ...local, furnishing: e.target.value || null })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="furnished">Furnished</option>
            <option value="semi">Semi-furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={reset}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Reset
          </button>
          <button
            onClick={apply}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
