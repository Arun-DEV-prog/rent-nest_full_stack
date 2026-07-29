"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Rent Nest?",
    answer:
      "Rent Nest বাংলাদেশের একটি অনলাইন ভাড়ার প্ল্যাটফর্ম যেখোনে ফ্যামিলি বাসা, ব্যাচেলরস রুম, সাবলেট, অফিস, দোকান এবং হোস্টেল সিটের জন্য সার্চ করতে পারবেন।",
  },
  {
    question: "How do I find house rent in Bangladesh?",
    answer:
      "Go to Properties, pick a category, then filter by division, district, thana, or subarea.",
  },
  {
    question: "বিনামূল্যে কি প্রোপার্টি লিস্ট করা যায়?",
    answer: "হাঁ। আপনার প্রোপার্টি যোগ করুন — সম্পূর্ণ বিনামূল্যে।",
  },
  {
    question: "What is tenant management?",
    answer:
      "Landlords can manage buildings, flats, tenants, rent collection, invoices, SMS, and garage spaces from one dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
