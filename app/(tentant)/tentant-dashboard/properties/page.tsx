import { Building2, BedDouble, Bath, MapPin } from "lucide-react";

const properties = [
  {
    title: "Modern Family Apartment",
    address: "Dhanmondi, Dhaka",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    title: "Cozy Studio Flat",
    address: "Gulshan, Dhaka",
    bedrooms: 1,
    bathrooms: 1,
  },
];

export default function TenantPropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Your current rental listings
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-2">
          {properties.map((property) => (
            <div
              key={property.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="bg-slate-100 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {property.title}
                    </h2>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {property.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4 text-gray-400" />
                    {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-gray-400" />
                    {property.bathrooms} Baths
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
