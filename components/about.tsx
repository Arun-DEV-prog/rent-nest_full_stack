"use client";

import { CheckCircle2, Home, Building2, Users } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const highlights = [
  { icon: Home, label: "All property types", color: "#10b981" },
  { icon: Building2, label: "From studio to commercial", color: "#6366f1" },
  { icon: Users, label: "Landlords & tenants", color: "#f59e0b" },
];

const perks = [
  "Search by division, district, thana & subarea",
  "Verified landlords & licensed agents",
  "House, bachelor room, hostel, sublet & more",
  "Commercial spaces — offices & shops",
  "Advanced search filters",
  "24/7 rental assistance",
];

export default function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          {/* Left: text */}
          <div>
            <AnimateOnScroll animation="fade-left">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-3">
                Who We Are
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                About{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Rent Nest</span>
                  <span
                    className="absolute bottom-1 left-0 right-0 h-3 z-0 opacity-20 rounded-full"
                    style={{ background: "#10b981" }}
                  />
                </span>
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={100}>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                Welcome to <span className="font-semibold text-gray-900">Rent Nest</span>, the
                ultimate platform for finding rental properties in Bangladesh. Our system lets you
                explore properties by{" "}
                <span className="font-semibold text-emerald-600">division, district, thana</span>, and
                even down to the <span className="font-semibold text-emerald-600">subarea</span>,
                making it easy to find your perfect rental space.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={180}>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                Whether you're looking for a house, bachelor room, hostel seat, sublet, or commercial
                space, Rent Nest simplifies the process. Connect directly with property owners and
                agents — no middlemen.
              </p>
            </AnimateOnScroll>

            {/* Perks checklist */}
            <AnimateOnScroll animation="fade-left" delay={240}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group"
                  >
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ color: "#10b981" }}
                    />
                    <span className="text-sm text-gray-700">{perk}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={300}>
              <div className="flex flex-wrap gap-4">
                <button className="relative overflow-hidden px-7 py-3.5 bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 group">
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                </button>
                <button className="px-7 py-3.5 border-2 border-emerald-500/40 text-emerald-600 font-bold rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  Find Properties
                </button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: visual card */}
          <AnimateOnScroll animation="fade-right" delay={150}>
            <div className="relative">
              {/* Main card */}
              <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl">
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 0%, #10b98140 0%, transparent 60%)",
                  }}
                />
                <p className="text-xs uppercase tracking-widest text-emerald-400 mb-4 font-semibold">
                  Our Coverage
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-6 sm:mb-8">
                  Across all 64 districts
                </h3>

                {/* Highlight pills */}
                <div className="space-y-4 mb-8">
                  {highlights.map((h, idx) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 cursor-default hover:-translate-x-1"
                        style={{ background: `${h.color}15`, border: `1px solid ${h.color}25` }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: h.color }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">{h.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom stat */}
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <p className="text-4xl font-black text-emerald-400 mb-1">100%</p>
                  <p className="text-sm text-slate-400">Free for Tenants — Always</p>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-2xl animate-bounce-slow"
                style={{ background: "#10b981" }}
              >
                <p className="text-xs font-bold text-white uppercase tracking-wide">🏆 #1 Rated</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
