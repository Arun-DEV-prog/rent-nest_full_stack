// components/PropertiesList.tsx
"use client";

import { useEffect, useState } from "react";
import {
  getPublicProperties,
  PublicProperty,
} from "../../_actions/publicPropertiesAction";
import PropertyCard from "./PropertyCard";
import CardSkeleton from "./CardSkeleton";
import SidebarFilters from "./SidebarFilters";
import "aos/dist/aos.css";

type AOSLib = {
  init: (opts?: { duration?: number; once?: boolean; easing?: string }) => void;
  refresh?: () => void;
};

export default function PropertiesList() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PublicProperty[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    keyword?: string;
    type?: string | null;
    city?: string | null;
    availableNow?: boolean;
    minPrice?: number | null;
    maxPrice?: number | null;
    bedrooms?: number | null;
  }>({});
  const [sort, setSort] = useState<"newest" | "priceLow" | "priceHigh">(
    "newest",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const divisions = Array.from(new Set(properties.map((p) => p.division)));
  const types = Array.from(
    new Set(properties.map((p) => p.categories?.name ?? "").filter(Boolean)),
  );

  useEffect(() => {
    let aos: AOSLib | null = null;
    import("aos").then((AOSmodule) => {
      aos = (AOSmodule as unknown as { default: AOSLib }).default;
      aos.init({ duration: 650, once: true, easing: "ease-out-cubic" });
    });

    getPublicProperties().then((result) => {
      if (result.ok) {
        setProperties(result.properties ?? []);
      } else {
        setError(result.message || "Failed to load properties.");
      }
      setLoading(false);
    });

    return () => {
      if (aos?.refresh) aos.refresh();
    };
  }, []);

  const filtered = properties
    .filter((p) => {
      const f = filters;
      if (f.keyword) {
        const q = f.keyword.toLowerCase();
        if (
          ![p.title, p.address, p.description]
            .join(" ")
            .toLowerCase()
            .includes(q)
        )
          return false;
      }
      if (f.type && p.categories?.name !== f.type) return false;
      if (f.city && p.division !== f.city) return false;
      if (f.availableNow && !p.availability) return false;
      if (f.minPrice != null && Number(p.rent) < f.minPrice) return false;
      if (f.maxPrice != null && Number(p.rent) > f.maxPrice) return false;
      if (f.bedrooms != null) {
        if (f.bedrooms >= 4) {
          if (Number(p.bedrooms) < 4) return false;
        } else if (Number(p.bedrooms) !== f.bedrooms) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "priceLow") return Number(a.rent) - Number(b.rent);
      if (sort === "priceHigh") return Number(b.rent) - Number(a.rent);
      return (
        new Date(b.available_from).getTime() -
        new Date(a.available_from).getTime()
      );
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProperties = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleFiltersChange = (nextFilters: {
    keyword?: string;
    type?: string | null;
    city?: string | null;
    availableNow?: boolean;
    minPrice?: number | null;
    maxPrice?: number | null;
    bedrooms?: number | null;
  }) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white p-4">
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 lg:pr-6">
        <div className="sticky top-24 self-start">
          <SidebarFilters
            types={types}
            cities={divisions}
            value={filters}
            onChange={handleFiltersChange}
          />
        </div>
      </aside>

      <section className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {filtered.length} properties found
          </p>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as typeof sort);
              setCurrentPage(1);
            }}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No properties match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {paginatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Page {safePage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={safePage === 1}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={safePage === totalPages}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
