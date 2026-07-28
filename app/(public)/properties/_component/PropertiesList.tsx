"use client";

import { useEffect, useState } from "react";

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
};

type AOSLib = {
  init: (opts?: { duration?: number; once?: boolean; easing?: string }) => void;
  refresh?: () => void;
};
import demoProperties from "./demoData";
import PropertyCard from "./PropertyCard";
import CardSkeleton from "./CardSkeleton";
import SidebarFilters from "./SidebarFilters";
import "aos/dist/aos.css";

export default function PropertiesList() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<{
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
  }>({});

  const divisions = Array.from(new Set(demoProperties.map((d) => d.division)));
  const types = Array.from(
    new Set(
      demoProperties.map((d) => d.categories?.name ?? "").filter((x) => !!x),
    ),
  ) as string[];
  const [sort, setSort] = useState<"newest" | "priceLow" | "priceHigh">(
    "newest",
  );

  useEffect(() => {
    // lazy init AOS for scroll animations
    let aos: AOSLib | null = null;
    import("aos").then((AOSmodule) => {
      aos = (AOSmodule as unknown as { default: AOSLib }).default;
      aos.init({ duration: 650, once: true, easing: "ease-out-cubic" });
    });

    // simulate loading
    const t = setTimeout(() => {
      setProperties(demoProperties);
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
      if (aos && aos.refresh) aos.refresh();
    };
  }, []);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 lg:pr-6">
        <div className="sticky top-24 self-start">
          <SidebarFilters
            types={types}
            cities={divisions}
            value={filters}
            onChange={setFilters}
          />
        </div>
      </aside>

      <section className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {/* count */}
            {
              properties.filter((p) => {
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
                if (f.minPrice != null && p.rent < f.minPrice) return false;
                if (f.maxPrice != null && p.rent > f.maxPrice) return false;
                if (f.bedrooms != null) {
                  if (f.bedrooms >= 4) {
                    if (p.bedrooms < 4) return false;
                  } else if (p.bedrooms !== f.bedrooms) return false;
                }
                return true;
              }).length
            }{" "}
            properties found
          </div>

          <div>
            <select
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSort(e.target.value as "newest" | "priceLow" | "priceHigh")
              }
              className="rounded-xl border px-3 py-2 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {properties
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
              if (f.minPrice != null && p.rent < f.minPrice) return false;
              if (f.maxPrice != null && p.rent > f.maxPrice) return false;
              if (f.bedrooms != null) {
                if (f.bedrooms >= 4) {
                  if (p.bedrooms < 4) return false;
                } else if (p.bedrooms !== f.bedrooms) return false;
              }
              return true;
            })
            .sort((a, b) => {
              if (sort === "priceLow") return a.rent - b.rent;
              if (sort === "priceHigh") return b.rent - a.rent;
              // newest: sort by available_from desc
              const da = new Date(a.available_from).getTime();
              const db = new Date(b.available_from).getTime();
              return db - da;
            })
            .map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
        </div>
      </section>
    </div>
  );
}
