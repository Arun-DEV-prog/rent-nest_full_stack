// app/properties/[id]/page.tsx
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, MapPin, Layers } from "lucide-react";
import { getPropertyById } from "../../_actions/publicPropertiesAction";
import { checkAuth } from "../../_actions/rentalRequestAction";
import RentalRequestPanel from "../_component/RentalRequestPanel";
import PropertyDetailTabs from "../_component/PropertyDetailTabs";
import PropertyImageGallery from "../_component/PropertyImageGallery";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [propertyResult, authResult] = await Promise.all([
    getPropertyById(id),
    checkAuth(),
  ]);

  if (!propertyResult.ok || !propertyResult.property) return notFound();

  const p = propertyResult.property;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <PropertyImageGallery property={p} />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Listed by
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    Trusted landlord
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Neighborhood
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {p.division}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: BedDouble, label: "Bedrooms", value: p.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: p.bathrooms },
                  { icon: Ruler, label: "Size", value: `${p.size_sqft} sqft` },
                  { icon: Layers, label: "Floor", value: `Floor ${p.floor}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-3xl bg-slate-50 p-4 text-center"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123832]/10 text-[#123832]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      {value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#effaf7] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                    Move-in ready
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-900">
                    {new Date(p.available_from).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#f8fafc] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Status
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold ${p.availability ? "text-emerald-800" : "text-rose-600"}`}
                  >
                    {p.availability ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>

              <PropertyDetailTabs property={p} />
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <section className="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Monthly rent
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[#123832]">
                    ৳{Number(p.rent).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#123832] px-4 py-3 text-white text-sm font-semibold">
                  {p.categories?.name ?? "Property"}
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>
                    {p.address}, {p.division}
                  </span>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Quick facts</p>
                  <ul className="mt-3 space-y-2">
                    <li>Bedrooms: {p.bedrooms}</li>
                    <li>Bathrooms: {p.bathrooms}</li>
                    <li>Floor: {p.floor}</li>
                    <li>Size: {p.size_sqft} sqft</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <RentalRequestPanel
                  property={p}
                  isLoggedIn={authResult.isLoggedIn}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
