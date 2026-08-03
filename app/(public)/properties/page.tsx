import { Suspense } from "react";
import PropertiesList from "../properties/_component/PropertiesList";

export default function PropertiesPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Find your perfect property
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Search by location, price range, bedrooms, and property type.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-16 text-center text-slate-400">Loading…</div>
        }
      >
        <PropertiesList />
      </Suspense>
    </section>
  );
}
