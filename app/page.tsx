import { Suspense } from "react";
import Hero from "@/components/hero";
import HomeText from "@/components/hometext";
import PropertiesList from "./(public)/properties/_component/PropertiesList";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      {/*<HomeText />*/}
      <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading properties...</div>}>
        <PropertiesList />
      </Suspense>
      <About />
      <FAQ />
      <Footer />
    </>
  );
}
