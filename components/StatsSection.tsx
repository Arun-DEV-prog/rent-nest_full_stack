"use client";

import { Building2, Users, Star, Shield, TrendingUp, Clock } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { icon: Building2, value: 12000, suffix: "+", label: "Properties Listed", color: "#10b981" },
  { icon: Users, value: 8500, suffix: "+", label: "Happy Tenants", color: "#6366f1" },
  { icon: Star, value: 4, suffix: ".9★", prefix: "", label: "Average Rating", color: "#f59e0b" },
  { icon: Shield, value: 64, suffix: "+", label: "Cities Covered", color: "#ef4444" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    desc: "Every property is reviewed and verified by our team before it goes live.",
    color: "#10b981",
    bg: "#10b98115",
  },
  {
    icon: TrendingUp,
    title: "Smart Filters",
    desc: "Filter by division, district, thana, subarea, budget and more with ease.",
    color: "#6366f1",
    bg: "#6366f115",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Our dedicated support team is always ready to assist you anytime.",
    color: "#f59e0b",
    bg: "#f59e0b15",
  },
  {
    icon: Users,
    title: "Direct Connect",
    desc: "Connect directly with landlords — no middlemen, no hidden fees.",
    color: "#ef4444",
    bg: "#ef444415",
  },
];

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-3">
            Why Rent Nest?
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-tight">
            Trusted by <span className="text-emerald-500">thousands</span> across Bangladesh
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            From Dhaka to Chittagong, Rent Nest makes finding the right rental fast, safe and simple.
          </p>
        </AnimateOnScroll>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <AnimateOnScroll
                key={stat.label}
                animation="zoom-in"
                delay={idx * 100}
              >
                <div
                  className="group rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    border: "1px solid #f1f5f9",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = stat.color;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px ${stat.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#f1f5f9";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${stat.color}15` }}
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-black text-gray-900 sm:text-3xl lg:text-4xl">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 font-medium">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Feature cards */}
        <AnimateOnScroll animation="fade-up">
          <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-10">
            Everything you need to rent smarter
          </h3>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <AnimateOnScroll
                key={feat.title}
                animation="fade-up"
                delay={idx * 120}
              >
                <div
                  className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-default"
                  style={{
                    background: feat.bg,
                    border: `1px solid ${feat.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${feat.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Hover background blob */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: feat.color }}
                  />
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: feat.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">{feat.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
