import { Suspense } from "react";
import Hero from "@/components/hero";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import PropertiesList from "./(public)/properties/_component/PropertiesList";
import About from "@/components/about";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-3">
              Browse Properties
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-tight">
              Featured <span className="text-emerald-500">Listings</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Explore our latest verified rental properties across Bangladesh.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="p-10 text-center text-gray-500">
                Loading properties...
              </div>
            }
          >
            <PropertiesList />
          </Suspense>
        </div>
      </section>
      <div className="mt-7 rounded-3xl">
        <HowItWorks />
      </div>
      <About />
      <FAQ />
    </>
  );
}
