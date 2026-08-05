"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  BedDouble,
  DollarSign,
  Home,
  ChevronDown,
} from "lucide-react";

const slides = [
  {
    titleTop: "Secure",
    titleMain: "INVESTMENT",
    titleSuffix: "in the SALTANAT",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    accent: "#10b981",
  },
  {
    titleTop: "Smart",
    titleMain: "PROPERTY",
    titleSuffix: "for your future",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    accent: "#6366f1",
  },
  {
    titleTop: "Live",
    titleMain: "COMFORT",
    titleSuffix: "with confidence",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    accent: "#f59e0b",
  },
];

// Matches the `type` values understood by PropertiesList / FilterBar
const PROPERTY_TYPES = [
  { label: "House", value: "house" },
  { label: "Bachelor", value: "bachelor" },
  { label: "Hostel", value: "hostel" },
  { label: "Sublet", value: "sublet" },
  { label: "Office", value: "office" },
  { label: "Shop", value: "shop" },
];

// Matches the city/location options used by PropertiesSearchBar
const CITIES = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Barishal", "Comilla"];

const BEDROOMS = [
  { label: "Any", value: "" },
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
];

type HeroFilters = {
  keyword: string;
  type: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
};

const EMPTY_FILTERS: HeroFilters = {
  keyword: "",
  type: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
};

export default function Hero() {
  const router = useRouter();

  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Search state
  const [filters, setFilters] = useState<HeroFilters>(EMPTY_FILTERS);
  const [searchFocused, setSearchFocused] = useState(false);

  const [particles, setParticles] = useState<{
    id: number;
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 6,
      }))
    );
  }, []);

  const goToSlide = useCallback(
    (nextIdx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setPrevSlideIdx(activeSlide);
      setActiveSlide(nextIdx);
      setTimeout(() => {
        setPrevSlideIdx(null);
        setTransitioning(false);
      }, 700);
    },
    [activeSlide, transitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((activeSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, goToSlide]);

  const prevSlide = () => goToSlide((activeSlide - 1 + slides.length) % slides.length);
  const nextSlide = () => goToSlide((activeSlide + 1) % slides.length);

  const currentSlide = slides[activeSlide];

  function setFilter<K extends keyof HeroFilters>(key: K, value: HeroFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  // Build the URL params matching PropertiesList's filtersFromSearchParams()
  // URL keys: search, location, type, minPrice, maxPrice, bedrooms
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.keyword.trim()) params.set("search", filters.keyword.trim());
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);

    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  }

  // Quick-type tab click — set type and immediately search
  function handleQuickType(value: string) {
    const isAlreadyActive = filters.type === value;
    const newType = isAlreadyActive ? "" : value;
    const newFilters = { ...filters, type: newType };
    setFilters(newFilters);

    // Navigate immediately on click
    const params = new URLSearchParams();
    if (newFilters.keyword.trim()) params.set("search", newFilters.keyword.trim());
    if (newFilters.location) params.set("location", newFilters.location);
    if (newType) params.set("type", newType);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.bedrooms) params.set("bedrooms", newFilters.bedrooms);

    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white mb-5 min-h-[85vh] md:min-h-[90vh] flex flex-col">
      {/* Background slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: idx === activeSlide ? 1 : idx === prevSlideIdx ? 0 : 0,
            transition: "opacity 700ms ease-in-out",
            zIndex: idx === activeSlide ? 1 : idx === prevSlideIdx ? 2 : 0,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.2) 40%, rgba(2,6,23,0.95) 100%)",
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-emerald-400 hero-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: 0.25,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[5] flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto w-full">
        {/* Eyebrow badge */}
        <div
          key={`eyebrow-${activeSlide}`}
          className="hero-text-enter mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-sm"
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ background: currentSlide.accent }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            Bangladesh&apos;s #1 Rental Platform
          </span>
        </div>

        {/* Title */}
        <div
          key={`top-${activeSlide}`}
          className="hero-text-enter mb-2 text-lg font-medium uppercase tracking-widest text-white/80 sm:text-2xl md:text-3xl"
          style={{ animationDelay: "80ms" }}
        >
          {currentSlide.titleTop}
        </div>

        <h1
          key={`main-${activeSlide}`}
          className="hero-text-enter text-4xl font-black uppercase sm:text-6xl lg:text-8xl"
          style={{
            animationDelay: "160ms",
            background: `linear-gradient(135deg, #fff 30%, ${currentSlide.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.06em",
          }}
        >
          {currentSlide.titleMain}
        </h1>

        <p
          key={`suffix-${activeSlide}`}
          className="hero-text-enter mt-2 text-base text-slate-300 sm:text-lg md:text-2xl"
          style={{ animationDelay: "240ms" }}
        >
          {currentSlide.titleSuffix}
        </p>

        {/* ── SEARCH PANEL ── */}
        <div
          className="hero-text-enter mt-6 sm:mt-10 w-full max-w-3xl"
          style={{ animationDelay: "320ms" }}
        >
          <form
            onSubmit={handleSearch}
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(2,6,23,0.70)",
              border: searchFocused
                ? `1.5px solid ${currentSlide.accent}80`
                : "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: searchFocused
                ? `0 0 0 4px ${currentSlide.accent}20, 0 24px 60px rgba(0,0,0,0.5)`
                : "0 16px 48px rgba(0,0,0,0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* ── Main search row ── */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-0">
              {/* Keyword input */}
              <div className="flex flex-1 items-center gap-3 px-5 py-4 border-b border-white/10 sm:border-b-0">
                <Search className="h-5 w-5 flex-shrink-0 text-white/40" />
                <input
                  type="text"
                  value={filters.keyword}
                  onChange={(e) => setFilter("keyword", e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search by title or address…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none min-w-0"
                />
                {filters.keyword && (
                  <button
                    type="button"
                    onClick={() => setFilter("keyword", "")}
                    className="text-white/40 hover:text-white/70 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-px bg-white/10 flex-shrink-0" />

              {/* Location dropdown */}
              <div className="relative flex items-center gap-2 px-5 sm:px-4 py-4 min-w-[140px] border-b border-white/10 sm:border-b-0">
                <MapPin className="h-4 w-4 flex-shrink-0 text-white/40" />
                <select
                  value={filters.location}
                  onChange={(e) => setFilter("location", e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none cursor-pointer appearance-none pr-2 min-w-0"
                  style={{ WebkitAppearance: "none" }}
                >
                  <option value="" className="bg-slate-900">Any Location</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="bg-slate-900">
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-3.5 w-3.5 text-white/30 flex-shrink-0 pointer-events-none" />
              </div>



              {/* Search button */}
              <button
                type="submit"
                className="m-2 flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95 flex-shrink-0 w-auto"
                style={{ background: currentSlide.accent }}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>


          </form>

          {/* ── Quick property type tabs ── */}
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                type="button"
                onClick={() => handleQuickType(pt.value)}
                className="rounded-full px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    filters.type === pt.value
                      ? currentSlide.accent
                      : "rgba(255,255,255,0.08)",
                  color:
                    filters.type === pt.value ? "#fff" : "rgba(255,255,255,0.65)",
                  border:
                    filters.type === pt.value
                      ? `1px solid ${currentSlide.accent}`
                      : "1px solid rgba(255,255,255,0.12)",
                  transform: filters.type === pt.value ? "scale(1.06)" : "scale(1)",
                }}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div
          className="hero-text-enter mt-5 sm:mt-8 flex flex-wrap justify-center gap-5 sm:gap-8"
          style={{ animationDelay: "480ms" }}
        >
          {[
            { label: "Properties", value: "12,000+" },
            { label: "Cities", value: "64+" },
            { label: "Happy Tenants", value: "8,500+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-black text-white sm:text-xl md:text-2xl">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-x-0 top-1/2 z-[6] hidden -translate-y-1/2 items-center justify-between px-6 md:flex">
        <button
          type="button"
          onClick={prevSlide}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-8 z-[6] flex justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className="rounded-full transition-all duration-500"
            style={{
              width: activeSlide === index ? "2rem" : "0.5rem",
              height: "0.5rem",
              background:
                activeSlide === index ? slide.accent : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Select slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C360,70 1080,10 1440,40 L1440,60 L0,60 Z"
            fill="white"
            fillOpacity="1"
          />
        </svg>
      </div>
    </section>
  );
}
