"use client";

import { useState } from "react";
import { Search, FileCheck, Key, Home, ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search Properties",
    desc: "Browse thousands of verified listings. Filter by location, budget, type, and more — down to the subarea level.",
    detail: "Use our powerful multi-level location filter to find properties in any division, district, thana or subarea across Bangladesh.",
    color: "#10b981",
    bg: "from-emerald-500/10 to-teal-500/5",
  },
  {
    step: "02",
    icon: FileCheck,
    title: "Apply Online",
    desc: "Submit your rental application directly through the platform with a few simple clicks.",
    detail: "Fill in your details, attach documents, and send your application to the landlord — all without leaving the platform.",
    color: "#6366f1",
    bg: "from-indigo-500/10 to-violet-500/5",
  },
  {
    step: "03",
    icon: Key,
    title: "Get Approved",
    desc: "Receive approval notifications in real time. Track your application status from the dashboard.",
    detail: "Our system notifies both tenant and landlord at every step. You'll always know where your application stands.",
    color: "#f59e0b",
    bg: "from-amber-500/10 to-yellow-500/5",
  },
  {
    step: "04",
    icon: Home,
    title: "Move In!",
    desc: "Sign the agreement, pay securely, and move into your new home with confidence.",
    detail: "Finalize your tenancy, get keys, and start your new chapter. Our team supports you through every step of the move-in process.",
    color: "#ef4444",
    bg: "from-rose-500/10 to-pink-500/5",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none how-orb"
        style={{ background: steps[activeStep].color, transition: "background 600ms ease" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: steps[activeStep].color, transition: "background 600ms ease" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            How <span style={{ color: steps[activeStep].color, transition: "color 400ms ease" }}>It Works</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            From browsing to moving in — the entire rental journey simplified in 4 easy steps.
          </p>
        </AnimateOnScroll>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Step cards */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <AnimateOnScroll key={step.step} animation="fade-left" delay={idx * 80}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left rounded-2xl p-5 transition-all duration-400 cursor-pointer group ${
                      isActive ? "bg-white/8" : "hover:bg-white/4"
                    }`}
                    style={{
                      border: isActive
                        ? `1px solid ${step.color}60`
                        : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isActive ? `0 8px 32px ${step.color}20` : "none",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: isActive ? step.color : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.5)" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-xs font-bold tracking-widest"
                            style={{ color: isActive ? step.color : "rgba(255,255,255,0.3)" }}
                          >
                            STEP {step.step}
                          </span>
                          <ArrowRight
                            className="w-4 h-4 transition-all duration-300"
                            style={{
                              color: isActive ? step.color : "rgba(255,255,255,0.2)",
                              transform: isActive ? "translateX(2px)" : "translateX(0)",
                            }}
                          />
                        </div>
                        <h3
                          className="font-bold text-base mb-1 transition-colors duration-300"
                          style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.75)" }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </button>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Active step detail */}
          <AnimateOnScroll animation="fade-right" className="lg:sticky lg:top-24">
            <div
              key={activeStep}
              className={`rounded-3xl p-8 bg-gradient-to-br ${steps[activeStep].bg} relative overflow-hidden how-step-enter`}
              style={{ border: `1px solid ${steps[activeStep].color}30` }}
            >
              {/* Large step number in background */}
              <div
                className="absolute -bottom-4 -right-4 text-9xl font-black opacity-10 select-none pointer-events-none leading-none"
                style={{ color: steps[activeStep].color }}
              >
                {steps[activeStep].step}
              </div>

              <div
                className="inline-flex w-16 h-16 items-center justify-center rounded-2xl mb-6"
                style={{ background: steps[activeStep].color }}
              >
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>

              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: steps[activeStep].color }}
              >
                Step {steps[activeStep].step}
              </p>
              <h3 className="text-2xl font-black text-white mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {steps[activeStep].detail}
              </p>

              {/* Progress dots */}
              <div className="flex gap-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: activeStep === idx ? "2rem" : "0.5rem",
                      height: "0.5rem",
                      background:
                        activeStep === idx
                          ? steps[activeStep].color
                          : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
