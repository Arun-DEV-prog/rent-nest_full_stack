// components/PropertiesList.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  getPublicProperties,
  PublicProperty,
  MetaData,
} from "../../_actions/publicPropertiesAction";
import PropertyCard from "./PropertyCard";
import CardSkeleton from "./CardSkeleton";
import FilterBar from "./FilterBar";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import "aos/dist/aos.css";

type AOSLib = {
  init: (opts?: { duration?: number; once?: boolean; easing?: string }) => void;
  refresh?: () => void;
};

type Filters = {
  keyword?: string;
  type?: string | null;
  city?: string | null;
  availableNow?: boolean;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

// Maps the URL query string (as built by Hero's handleSearch) into
// the internal Filters shape used by this component.
// URL uses "location" (to match the server action's param name);
// internally we call it "city".
function filtersFromSearchParams(params: URLSearchParams): Filters {
  const keyword = params.get("search") ?? undefined;
  const city = params.get("location") ?? null;
  const type = params.get("type") ?? null;
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const bedrooms = params.get("bedrooms");
  const availableNow = params.get("availability") === "true";

  return {
    keyword,
    city,
    type,
    minPrice: minPrice ? Number(minPrice) : null,
    maxPrice: maxPrice ? Number(maxPrice) : null,
    bedrooms: bedrooms ? Number(bedrooms) : null,
    availableNow,
  };
}

export default function PropertiesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PublicProperty[]>([]);
  const [meta, setMeta] = useState<MetaData | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(() =>
    Number(searchParams.get("page") ?? 1),
  );
  const [filters, setFilters] = useState<Filters>(() =>
    filtersFromSearchParams(searchParams),
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sort, setSort] = useState<"newest" | "priceLow" | "priceHigh">(
    "newest",
  );

  const divisions = Array.from(new Set(properties.map((p) => p.division)));
  const types = Array.from(
    new Set(properties.map((p) => p.categories?.name ?? "").filter(Boolean)),
  );

  const fetchProperties = useCallback(
    async (page: number, f: Filters) => {
      setLoading(true);
      setError(null);

      const result = await getPublicProperties({
        keyword: f.keyword,
        location: f.city ?? undefined,
        type: f.type ?? undefined,
        minPrice: f.minPrice ?? undefined,
        maxPrice: f.maxPrice ?? undefined,
        bedrooms: f.bedrooms ?? undefined,
        availableNow: f.availableNow,
        page,
        limit: 6,
      });

      if (result.ok) {
        const sorted = [...(result.properties ?? [])].sort((a, b) => {
          if (sort === "priceLow") return Number(a.rent) - Number(b.rent);
          if (sort === "priceHigh") return Number(b.rent) - Number(a.rent);
          return (
            new Date(b.available_from).getTime() -
            new Date(a.available_from).getTime()
          );
        });
        setProperties(sorted);
        setMeta(result.meta);
      } else {
        setError(result.message || "Failed to load properties.");
      }

      setLoading(false);
    },
    [sort],
  );

  useEffect(() => {
    let aos: AOSLib | null = null;
    import("aos").then((AOSmodule) => {
      aos = (AOSmodule as unknown as { default: AOSLib }).default;
      aos.init({ duration: 650, once: true, easing: "ease-out-cubic" });
    });
    return () => {
      if (aos?.refresh) aos.refresh();
    };
  }, []);

  // Guard ref: when true, the URL-push effect will skip to avoid a loop.
  const skipUrlPushRef = useRef(false);

  // Sync state whenever URL search parameters change
  // (e.g. top navbar category pills, or external navigation).
  useEffect(() => {
    skipUrlPushRef.current = true;
    setFilters(filtersFromSearchParams(searchParams));
    setCurrentPage(Number(searchParams.get("page") ?? 1));
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await fetchProperties(currentPage, filters);
      if (cancelled) return;
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [currentPage, filters, fetchProperties]);

  // Keep the URL in sync whenever filters/page change from internal UI
  // (sidebar edits, sort, pagination) so refresh/back-button/share links work.
  // Skip when the change came from searchParams sync to avoid infinite loop.
  useEffect(() => {
    if (skipUrlPushRef.current) {
      skipUrlPushRef.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (filters.keyword) params.set("search", filters.keyword);
    if (filters.city) params.set("location", filters.city);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice != null)
      params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null)
      params.set("maxPrice", String(filters.maxPrice));
    if (filters.bedrooms != null)
      params.set("bedrooms", String(filters.bedrooms));
    if (filters.availableNow) params.set("availability", "true");
    if (currentPage > 1) params.set("page", String(currentPage));

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage]);

  const handleFiltersChange = (next: Filters) => {
    setFilters(next);
    setCurrentPage(1);
  };

  const handleSortChange = (val: "newest" | "priceLow" | "priceHigh") => {
    setSort(val);
    setCurrentPage(1);
  };

  const totalPages = meta?.pages ?? 1;
  const total = meta?.total ?? properties.length;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hidden">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">{total}</span>{" "}
          properties
        </p>
        <button
          type="button"
          onClick={() => setShowMobileFilters(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 self-start">
            <FilterBar
              types={types}
              cities={divisions}
              value={filters}
              onChange={handleFiltersChange}
            />
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{total}</span>{" "}
              properties found
              {totalPages > 1 && (
                <span className="text-slate-400 ml-1">
                  — page {currentPage} of {totalPages}
                </span>
              )}
            </p>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as typeof sort)}
              className="rounded-xl border px-3 py-2 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white p-4">
                  <CardSkeleton />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">
              No properties match your filters.
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`e-${idx}`}
                    className="px-2 text-slate-400 text-sm select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-[#123832] text-white shadow-sm"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 px-2 py-4 lg:hidden">
          <div className="h-full w-[80%] max-w-sm overflow-y-auto rounded-l-3xl rounded-r-3xl bg-white p-4 shadow-2xl">
            <FilterBar
              types={types}
              cities={divisions}
              value={filters}
              onChange={(next) => {
                handleFiltersChange(next);
                setShowMobileFilters(false);
              }}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
