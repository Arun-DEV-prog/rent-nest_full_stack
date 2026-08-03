"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    titleTop: "Secure",
    titleMain: "INVESTMENT",
    titleSuffix: "in the SALTANAT",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
  {
    titleTop: "Smart",
    titleMain: "PROPERTY",
    titleSuffix: "for your future",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
  {
    titleTop: "Live",
    titleMain: "COMFORT",
    titleSuffix: "with confidence",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setActiveSlide((current) => (current + 1) % slides.length);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white mb-5">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slides[activeSlide].image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/20 to-slate-950/95" />

      <div className="relative mx-auto flex min-h-130 max-w-350 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-emerald-300 sm:text-sm">
            Secure in the
          </p>
          <div className="mb-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            <span>{slides[activeSlide].titleTop}</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-[0.15em] text-emerald-400 sm:text-6xl">
            {slides[activeSlide].titleMain}
          </h1>
          <p className="mt-2 text-base text-slate-200 sm:text-xl">
            {slides[activeSlide].titleSuffix}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-between px-4 md:flex">
        <button
          type="button"
          onClick={prevSlide}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white transition hover:bg-slate-900"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white transition hover:bg-slate-900"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center gap-2 md:bottom-14">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2 w-2 rounded-full transition ${activeSlide === index ? "bg-emerald-400" : "bg-white/50"}`}
            aria-label={`Select slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
