// app/properties/[id]/page.tsx
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Calendar,
  Layers,
  CheckCircle,
  XCircle,
  Tag,
} from "lucide-react";
import { getPropertyById } from "../../_actions/publicPropertiesAction";
import { checkAuth } from "../../_actions/rentalRequestAction";
import RentalRequestPanel from "../_component/RentalRequestPanel";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative w-full h-80 md:h-[480px] bg-gray-200 overflow-hidden">
        <img
          src={p.images || "/placeholder.jpg"}
          alt={p.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges over image */}
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 text-gray-700 border border-white/50 backdrop-blur-sm">
            {p.categories?.name ?? "Property"}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${
              p.availability
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {p.availability ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Title over image bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
            {p.title}
          </h1>
          <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1.5">
            <MapPin className="w-4 h-4 shrink-0" />
            {p.address}, {p.division}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Property Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: BedDouble, label: "Bedrooms", value: p.bedrooms },
                { icon: Bath, label: "Bathrooms", value: p.bathrooms },
                { icon: Ruler, label: "Size", value: `${p.size_sqft} sqft` },
                { icon: Layers, label: "Floor", value: `Floor ${p.floor}` },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2"
                >
                  <div className="bg-[#123832]/10 p-2.5 rounded-xl">
                    <Icon className="w-5 h-5 text-[#123832]" />
                  </div>
                  <p className="text-base font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 text-base mb-3">
                About this property
              </h2>
              {p.description ? (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No description provided.
                </p>
              )}
            </div>

            {/* Details Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 text-base">
                  Property Details
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { label: "Property Type", value: p.categories?.name ?? "—" },
                  { label: "Division", value: p.division },
                  { label: "Address", value: p.address },
                  { label: "Floor", value: `Floor ${p.floor}` },
                  { label: "Size", value: `${p.size_sqft} sqft` },
                  { label: "Bedrooms", value: p.bedrooms },
                  { label: "Bathrooms", value: p.bathrooms },
                  {
                    label: "Available From",
                    value: new Date(p.available_from).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    ),
                  },
                  {
                    label: "Status",
                    value: p.availability ? "Available" : "Unavailable",
                    highlight: p.availability ? "green" : "red",
                  },
                ].map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-6 py-3.5"
                  >
                    <span className="text-sm text-gray-500">{label}</span>
                    <span
                      className={`text-sm font-medium ${
                        highlight === "green"
                          ? "text-green-600"
                          : highlight === "red"
                            ? "text-red-500"
                            : "text-gray-800"
                      }`}
                    >
                      {highlight === "green" && (
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {highlight === "red" && (
                        <XCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available From banner */}
            <div className="bg-[#123832]/5 border border-[#123832]/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="bg-[#123832]/10 p-3 rounded-xl shrink-0">
                <Calendar className="w-5 h-5 text-[#123832]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Available From
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {new Date(p.available_from).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right — Rent + Request Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RentalRequestPanel
                property={p}
                isLoggedIn={authResult.isLoggedIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
