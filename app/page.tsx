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
      <Suspense
        fallback={
          <div className="p-10 text-center text-gray-500">
            Loading properties...
          </div>
        }
      >
        <PropertiesList />
      </Suspense>
      <div className="mt-7 rounded-3xl">
        <HowItWorks />
      </div>
      <About />
      <FAQ />
    </>
  );
}
