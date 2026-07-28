"use client";

import { useState } from "react";

type Filters = {
  division?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

export default function FilterBar({
  divisions,
  value,
  onChange,
}: {
  divisions: string[];
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  const [local, setLocal] = useState<Filters>(value || {});

  function apply() {
    onChange(local);
  }

  function reset() {
    const empty = {
      division: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
    };
    setLocal(empty);
    onChange(empty);
  }

  return (
    <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex gap-3 overflow-x-auto py-2">
        {divisions.map((d) => (
          <button
            key={d}
            onClick={() => {
              const next = {
                ...local,
                division: local.division === d ? null : d,
              };
              setLocal(next);
              onChange(next);
            }}
            className={`shrink-0 flex items-end h-20 w-32 rounded-xl bg-cover bg-center p-2 text-sm font-medium text-white shadow-md transition-opacity duration-150 ${
              local.division === d ? "ring-2 ring-indigo-500" : "opacity-90"
            }`}
            style={{
              backgroundImage: `url(https://source.unsplash.com/400x300/?${encodeURIComponent(
                d,
              )})`,
            }}
            aria-pressed={local.division === d}
            title={d}
          >
            <span className="bg-black/40 rounded px-2 py-1">{d}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs text-slate-500">Min Price</label>
          <input
            type="number"
            value={local.minPrice ?? ""}
            onChange={(e) =>
              setLocal({
                ...local,
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500">Max Price</label>
          <input
            type="number"
            value={local.maxPrice ?? ""}
            onChange={(e) =>
              setLocal({
                ...local,
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="Any"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500">Bedrooms</label>
          <select
            value={local.bedrooms ?? ""}
            onChange={(e) =>
              setLocal({
                ...local,
                bedrooms: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="mt-1 w-full rounded-md border px-3 py-2"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <button onClick={reset} className="rounded-md px-3 py-2 text-sm">
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
  );
}
