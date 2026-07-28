"use client";
import { useState, useEffect } from "react";
import {
  Home,
  Users,
  ShieldCheck,
  MapPin,
  Leaf,
  CheckCircle2,
  Smartphone,
  BellRing,
} from "lucide-react";

const SLIDE_COUNT = 2;

export default function PromoCarousel({ autoPlayMs = 4500 }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!autoPlayMs) return;
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % SLIDE_COUNT);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
        {/* Slides track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            width: `${SLIDE_COUNT * 100}%`,
            transform: `translateX(-${activeSlide * (100 / SLIDE_COUNT)}%)`,
          }}
        >
          {/* Slide 1: Tolet BD family */}
          <div
            className="relative h-full shrink-0"
            style={{ width: `${100 / SLIDE_COUNT}%` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1E3A6E 0%, #2C5AA0 45%, #1B3F73 100%)",
              }}
            />
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90">
              <Home size={16} />
              <span className="text-xs font-semibold tracking-wide">
                Tolet BD
              </span>
            </div>

            <div className="absolute top-4 right-4 bottom-4 w-[58%] bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col items-center justify-center px-4 py-4 text-center">
              <p className="text-white/70 text-[11px] mb-1">সহজ খোঁজে পান</p>
              <h2 className="text-white text-2xl font-extrabold leading-tight mb-1">
                ফ্যামিলি
              </h2>
              <p className="text-white/80 text-[11px] mb-3">
                ব্যাচেলার সিট, সাবলেট বাসা
              </p>
              <div className="w-full h-px bg-white/20 mb-3" />
              <p className="text-white/70 text-[11px]">এখনই দেখুন</p>
              <h3 className="text-white text-lg font-bold mb-3">ঘরে বসেই</h3>

              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Home size={14} className="text-white" />
                </span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Users size={14} className="text-white" />
                </span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-white" />
                </span>
              </div>

              <button className="text-[10px] bg-white/90 text-[#1E3A6E] font-semibold px-3 py-1.5 rounded-md">
                আজই তালিকাভুক্ত করুন
              </button>
            </div>

            <div className="absolute left-6 bottom-0 w-24 h-40 bg-gradient-to-t from-black/40 to-transparent rounded-t-full opacity-60" />
            <MapPin
              size={20}
              className="absolute bottom-6 left-8 text-white/70"
            />
          </div>

          {/* Slide 2: Rent management */}
          <div
            className="relative h-full shrink-0 bg-white"
            style={{ width: `${100 / SLIDE_COUNT}%` }}
          >
            {/* Leaf decoration, top right */}
            <div className="absolute -top-3 -right-3 text-[#2F6B3A] opacity-90">
              <Leaf size={70} strokeWidth={1.2} className="rotate-90" />
            </div>
            <div className="absolute top-6 right-10 text-[#3E8A4D] opacity-70">
              <Leaf size={36} strokeWidth={1.2} className="rotate-45" />
            </div>

            {/* Diagonal green sweep, bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{
                background:
                  "linear-gradient(100deg, #E38B29 0%, #1F5C33 55%, #14401F 100%)",
                clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />

            <div className="relative h-full flex items-center gap-3 px-4 py-4">
              {/* Phone mock */}
              <div className="relative shrink-0 w-16 h-full max-h-[85%] my-auto">
                <div className="w-full h-full rounded-xl bg-neutral-900 p-1 shadow-md">
                  <div className="w-full h-full rounded-lg bg-[#0F3D2E] flex flex-col items-center justify-center gap-1 p-1.5">
                    <Smartphone size={16} className="text-white/90" />
                    <div className="grid grid-cols-2 gap-1 w-full">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full aspect-square rounded-[3px] bg-white/20"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* person silhouette beside phone */}
                <div className="absolute -left-4 bottom-0 w-6 h-20 bg-neutral-300 rounded-t-full opacity-80" />
              </div>

              {/* Headline + checklist */}
              <div className="flex-1 min-w-0">
                <p className="text-[#E38B29] font-bold text-sm leading-tight">
                  বাসা ভাড়া
                </p>
                <p className="text-[#1F5C33] font-extrabold text-[13px] leading-tight mb-2">
                  ম্যানেজ করুন সহজেই।
                </p>

                <ul className="space-y-1">
                  {[
                    "বিনিয়োগ",
                    "ভাড়া",
                    "ভাড়াটিয়া",
                    "প্রতি মাসের ভাড়ার হিসাব",
                    "প্যাকেজ ম্যানেজমেন্ট",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-[10px] text-neutral-700"
                    >
                      <CheckCircle2
                        size={11}
                        className="text-[#1F5C33] shrink-0"
                      />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                    <BellRing size={11} className="text-[#1F5C33] shrink-0" />
                    <span>SMS ইমেইল</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2 mt-6">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: activeSlide === i ? 24 : 8,
              height: 8,
              backgroundColor: activeSlide === i ? "#E3B98D" : "#D8D2C4",
            }}
          />
        ))}
      </div>
    </div>
  );
}
