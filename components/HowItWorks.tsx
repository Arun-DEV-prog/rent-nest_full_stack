"use client";

import { useState, useEffect } from "react";
import {
  Search,
  FileCheck,
  Home,
  Sparkles,
  CheckCircle2,
  Building2,
  UserCheck,
  ShieldCheck,
  Zap,
  Play,
  Pause,
  ChevronRight,
  MapPin,
  BadgeCheck,
  Lock,
  Unlock,
  CreditCard,
  Check,
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { cn } from "@/lib/utils";

type Role = "tenant" | "landlord";

interface StepItem {
  id: string;
  stepNumber: string;
  icon: any;
  title: string;
  subtitle: string;
  desc: string;
  highlights: string[];
  color: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
}

const tenantSteps: StepItem[] = [
  {
    id: "search",
    stepNumber: "01",
    icon: Search,
    title: "Search & Filter Properties",
    subtitle: "Precise location hierarchy",
    desc: "Browse thousands of verified rentals across Bangladesh. Filter by Division, District, Thana, sub-area, price, and property type.",
    highlights: ["4-level location search", "Verified property badges", "Real-time availability"],
    color: "#059669", // Emerald
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    accentBorder: "border-emerald-500",
  },
  {
    id: "inspect",
    stepNumber: "02",
    icon: Sparkles,
    title: "Inspect & Connect",
    subtitle: "Direct landlord communication",
    desc: "View HD photos, virtual walkthroughs, and detailed specs. Message or call landlords directly with zero hidden middleman fees.",
    highlights: ["HD photo galleries", "Direct chat & phone", "Instant visit scheduling"],
    color: "#0284c7", // Sky
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    accentBorder: "border-sky-500",
  },
  {
    id: "apply",
    stepNumber: "03",
    icon: FileCheck,
    title: "Instant Digital Application",
    subtitle: "1-Click application submission",
    desc: "Submit your rental application online with your verified profile. Track status updates in real-time from your tenant dashboard.",
    highlights: ["Digital NID verification", "Real-time request tracking", "Transparent status"],
    color: "#7c3aed", // Violet
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    accentBorder: "border-violet-500",
  },
  {
    id: "movein",
    stepNumber: "04",
    icon: Home,
    title: "Digital Lease & Move In",
    subtitle: "Hassle-free tenancy",
    desc: "Sign digital lease agreements, pay monthly rent securely via bKash/Nagad/Cards, and receive instant digital receipts.",
    highlights: ["Automated lease agreements", "Multi-channel online payment", "Digital payment history"],
    color: "#d97706", // Amber
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    accentBorder: "border-amber-500",
  },
];

const landlordSteps: StepItem[] = [
  {
    id: "list",
    stepNumber: "01",
    icon: Building2,
    title: "Post Property Listing",
    subtitle: "2-Minute property setup",
    desc: "Upload photos, set monthly rent, define rules, and publish your property to reach thousands of active tenants across Bangladesh.",
    highlights: ["Free & instant listing", "Multi-image uploads", "Custom amenity tags"],
    color: "#2563eb", // Blue
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    accentBorder: "border-blue-500",
  },
  {
    id: "screen",
    stepNumber: "02",
    icon: UserCheck,
    title: "Screen Interested Tenants",
    subtitle: "Verified applicant profiles",
    desc: "Review incoming tenant applications, inspect NID verification badges, and approve qualified tenants with one tap.",
    highlights: ["Verified tenant NID", "Application history", "1-Tap Accept / Reject"],
    color: "#db2777", // Pink
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
    accentBorder: "border-pink-500",
  },
  {
    id: "agreement",
    stepNumber: "03",
    icon: ShieldCheck,
    title: "Automate Rent & Receipts",
    subtitle: "Zero hassle collection",
    desc: "Send automated payment requests, track monthly rent collection, and generate automated rent invoices effortlessly.",
    highlights: ["Automated monthly invoices", "Payment reminder alerts", "Income reporting"],
    color: "#059669", // Emerald
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    accentBorder: "border-emerald-500",
  },
  {
    id: "manage",
    stepNumber: "04",
    icon: Zap,
    title: "Full Property Control",
    subtitle: "Complete landlord dashboard",
    desc: "Manage multiple flats, buildings, tenant records, and maintenance requests from your centralized Landlord Dashboard.",
    highlights: ["Multi-unit management", "Occupancy analytics", "24/7 Support access"],
    color: "#4f46e5", // Indigo
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    accentBorder: "border-indigo-500",
  },
];

export default function HowItWorks() {
  const [role, setRole] = useState<Role>("tenant");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Live interactive simulator state variables
  const [selectedLocation, setSelectedLocation] = useState("Gulshan, Dhaka");
  const [verifiedBadges, setVerifiedBadges] = useState({ nid: true, job: true, ref: false });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const steps = role === "tenant" ? tenantSteps : landlordSteps;
  const currentStep = steps[activeIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setActiveIdx(0);
    setIsUnlocked(false);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden text-slate-900 border-y border-slate-200">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimateOnScroll animation="fade-up" className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Simple & Transparent Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How Rent Nest{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, ${currentStep.color}, #0f172a)`,
              }}
            >
              Works For You
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Experience a streamlined end-to-end digital rental workflow designed for tenants and property owners in Bangladesh.
          </p>
        </AnimateOnScroll>

        {/* Role Toggle Switch & Auto-Play Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-12 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-md">
          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-1.5 w-full sm:w-auto bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
            <button
              onClick={() => handleRoleChange("tenant")}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                role === "tenant"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Home className="w-4 h-4" />
              For Tenants
            </button>
            <button
              onClick={() => handleRoleChange("landlord")}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                role === "landlord"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Building2 className="w-4 h-4" />
              For Landlords
            </button>
          </div>

          {/* Auto-play toggle button */}
          <div className="flex items-center gap-3 px-3 py-1">
            <span className="text-xs text-slate-500 font-semibold">Auto-play steps</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-sm"
              title={isPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-emerald-600" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Grid: Steps List (Left) + Interactive Live Simulator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Step Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden",
                    isActive
                      ? "bg-white border-slate-300 shadow-xl scale-[1.01]"
                      : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  {/* Left edge indicator line */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300",
                      isActive ? s.accentBorder.replace("border-", "bg-") : "bg-transparent group-hover:bg-slate-300"
                    )}
                  />

                  <div className="flex items-start gap-4 pl-1">
                    {/* Icon container */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: isActive ? s.color : "#f1f5f9",
                        color: isActive ? "#ffffff" : s.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[11px] font-extrabold tracking-widest uppercase"
                          style={{ color: s.color }}
                        >
                          Step {s.stepNumber}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isActive ? "translate-x-1 text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                          )}
                        />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Auto-play progress line for active item */}
                  {isActive && isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                      <div
                        className="h-full animate-[progress_4.5s_linear_infinite]"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Live Mockup Simulator (7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-500">
              
              {/* Top Bar of Mockup */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: currentStep.color }}
                  >
                    <currentStep.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Interactive Demonstration • Step {currentStep.stepNumber}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{currentStep.title}</h4>
                  </div>
                </div>

                <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", currentStep.badgeBg, currentStep.badgeText, "border-slate-200")}>
                  {role === "tenant" ? "Tenant Flow" : "Landlord Flow"}
                </span>
              </div>

              {/* DYNAMIC INTERACTIVE SIMULATORS */}
              <div className="min-h-[280px] flex flex-col justify-center">

                {/* TENANT STEP 1: Search & Location Simulator */}
                {role === "tenant" && activeIdx === 0 && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-semibold">Try clicking a location filter below:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Gulshan, Dhaka", "Uttara, Dhaka", "Dhanmondi", "Chittagong", "Sylhet"].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5",
                            selectedLocation === loc
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          )}
                        >
                          <MapPin className="w-3 h-3" />
                          {loc}
                        </button>
                      ))}
                    </div>

                    {/* Filtered property preview card */}
                    <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center shrink-0 relative">
                          <Building2 className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-slate-900">Modern Premium Apartment</h5>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {selectedLocation}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-emerald-600">৳35,000</span>
                        <p className="text-[10px] text-slate-400 font-medium">per month</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TENANT STEP 2: Inspect & Connect Simulator */}
                {role === "tenant" && activeIdx === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-xs text-slate-500 font-semibold">Virtual Tour</span>
                        <div className="mt-2 h-20 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 gap-2 text-xs font-bold">
                          <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" /> 360° Walkthrough
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-xs text-slate-500 font-semibold">Direct Connect</span>
                        <div className="mt-2 h-20 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-1 shadow-sm">
                          <span className="text-xs font-bold text-slate-900">Owner: Abul Kalam</span>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Verified Owner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TENANT STEP 3: Online Application Simulator */}
                {role === "tenant" && activeIdx === 2 && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-semibold">Click items to toggle application verification badges:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: "nid", label: "NID Verified" },
                        { key: "job", label: "Income Slip" },
                        { key: "ref", label: "Landlord Ref" },
                      ].map((item) => {
                        const isChecked = (verifiedBadges as any)[item.key];
                        return (
                          <button
                            key={item.key}
                            onClick={() =>
                              setVerifiedBadges((prev) => ({ ...prev, [item.key]: !isChecked }))
                            }
                            className={cn(
                              "p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all shadow-sm",
                              isChecked
                                ? "bg-violet-50 border-violet-300 text-violet-800"
                                : "bg-slate-50 border-slate-200 text-slate-400"
                            )}
                          >
                            <BadgeCheck className={cn("w-5 h-5", isChecked ? "text-violet-600" : "text-slate-300")} />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-between text-xs">
                      <span className="text-violet-700 font-semibold">Application Strength:</span>
                      <span className="font-extrabold text-violet-900">
                        {Object.values(verifiedBadges).filter(Boolean).length === 3 ? "100% Verified (Highest Approval)" : `${Object.values(verifiedBadges).filter(Boolean).length * 33}% Verified`}
                      </span>
                    </div>
                  </div>
                )}

                {/* TENANT STEP 4: Digital Lease & Move In */}
                {role === "tenant" && activeIdx === 3 && (
                  <div className="space-y-4 text-center">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="inline-flex p-3 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700">
                        {isUnlocked ? <Unlock className="w-8 h-8 text-amber-600" /> : <Lock className="w-8 h-8 text-slate-400" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-base text-slate-900">Smart Digital Tenancy Key</h5>
                        <p className="text-xs text-slate-500 mt-1">Click button below to simulate digital move-in key access</p>
                      </div>
                      <button
                        onClick={() => setIsUnlocked(!isUnlocked)}
                        className={cn(
                          "w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md",
                          isUnlocked
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-500 text-white hover:bg-amber-600"
                        )}
                      >
                        {isUnlocked ? "✓ Digital Key Activated — Welcome Home!" : "Unlock Digital Access Key"}
                      </button>
                    </div>
                  </div>
                )}

                {/* LANDLORD STEPS SIMULATORS */}
                {role === "landlord" && activeIdx === 0 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pb-2 border-b border-slate-200">
                      <span>Quick Property Listing</span>
                      <span className="text-blue-600 font-extrabold">2 Mins Setup</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium">Property: 2 BHK Flat</div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium">Rent: ৳28,000/mo</div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs text-center font-bold">
                      ✓ Instant Multi-Photo Upload & Auto Location Mapping
                    </div>
                  </div>
                )}

                {role === "landlord" && activeIdx === 1 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Applicant: Rafiq Ahmed</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 font-bold">NID Verified</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">Software Engineer • Family of 3 • Looking for 12 months lease</p>
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-sm">Accept Applicant</button>
                      <button className="py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium">Decline</button>
                    </div>
                  </div>
                )}

                {role === "landlord" && activeIdx === 2 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Monthly Rent Status</span>
                      <span className="text-emerald-600 font-black">Collected 100%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span className="text-slate-900 font-bold">Flat 4B — July Rent</span>
                      </div>
                      <span className="text-emerald-600 font-black">৳32,000 Received</span>
                    </div>
                  </div>
                )}

                {role === "landlord" && activeIdx === 3 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto" />
                    <h5 className="font-bold text-sm text-slate-900">Centralized Landlord Dashboard</h5>
                    <p className="text-xs text-slate-600">Track occupancy, maintenance requests, and monthly revenue in one place.</p>
                  </div>
                )}

              </div>

              {/* Bottom Feature Bullets */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Key Highlights</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentStep.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80 font-medium">
                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
