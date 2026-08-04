"use client";

import { useState, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Rent Nest?",
    answer:
      "Rent Nest বাংলাদেশের একটি অনলাইন ভাড়ার প্ল্যাটফর্ম যেখোনে ফ্যামিলি বাসা, ব্যাচেলরস রুম, সাবলেট, অফিস, দোকান এবং হোস্টেল সিটের জন্য সার্চ করতে পারবেন।",
    category: "General",
  },
  {
    question: "How do I find house rent in Bangladesh?",
    answer:
      "Go to Properties, pick a category, then filter by division, district, thana, or subarea. You can also use our advanced filters to narrow by budget, size, and amenities.",
    category: "Search",
  },
  {
    question: "বিনামূল্যে কি প্রোপার্টি লিস্ট করা যায়?",
    answer:
      "হাঁ। আপনার প্রোপার্টি যোগ করুন — সম্পূর্ণ বিনামূল্যে। আমরা বিশ্বাস করি প্রতিটি বাড়িওয়ালা তাদের সম্পত্তি সহজেই লিস্ট করতে পারবেন।",
    category: "Landlord",
  },
  {
    question: "What is tenant management?",
    answer:
      "Landlords can manage buildings, flats, tenants, rent collection, invoices, SMS, and garage spaces from one dashboard. It's your complete property management solution.",
    category: "Landlord",
  },
  {
    question: "Is Rent Nest free for tenants?",
    answer:
      "Yes! Browsing and applying for properties is 100% free for tenants. We believe finding a home should never cost extra.",
    category: "Pricing",
  },
  {
    question: "How long does it take to get approved?",
    answer:
      "Approval times vary by landlord, but most applications receive a response within 24–48 hours. You'll get real-time notifications throughout the process.",
    category: "Process",
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <AnimateOnScroll animation="fade-up" delay={index * 60}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
        style={{
          border: isOpen ? "1px solid rgba(16,185,129,0.4)" : "1px solid #f1f5f9",
          boxShadow: isOpen ? "0 8px 32px rgba(16,185,129,0.08)" : "none",
          background: isOpen ? "rgba(16,185,129,0.03)" : "#fff",
        }}
      >
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 focus:outline-none group"
        >
          <div className="flex items-center gap-4 text-left">
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: isOpen ? "#10b981" : "#f8fafc",
              }}
            >
              <HelpCircle
                className="w-4 h-4 transition-colors duration-300"
                style={{ color: isOpen ? "#fff" : "#94a3b8" }}
              />
            </div>
            <div>
              {item.category && (
                <span
                  className="text-xs font-semibold uppercase tracking-wider mb-0.5 block"
                  style={{ color: isOpen ? "#10b981" : "#94a3b8" }}
                >
                  {item.category}
                </span>
              )}
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                {item.question}
              </h3>
            </div>
          </div>
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: isOpen ? "#10b981" : "#f1f5f9",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: isOpen ? "#fff" : "#64748b" }}
            />
          </div>
        </button>

        {/* Animated content */}
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 300}px` : "0px",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-6 pb-5 pl-[4.25rem]">
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.answer}</p>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-20 right-10 w-48 h-48 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-3">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="relative">
              <span className="relative z-10 text-emerald-500">Questions</span>
            </span>
          </h2>
          <p className="text-gray-500">
            Everything you need to know about renting with Rent Nest.
          </p>
        </AnimateOnScroll>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll animation="fade-up" delay={200} className="text-center mt-12">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/25 active:scale-95">
            Contact Support
          </button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
