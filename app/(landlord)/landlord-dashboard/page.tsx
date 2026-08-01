import { landlordProperties } from "../_actions/propertiesAction";
import {
  Building2,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Tag,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

export default async function LandlordPage() {
  const result = await landlordProperties();
  const properties = result.ok ? (result.properties ?? []) : [];

  const totalProperties = properties.length;
  const available = properties.filter((p: any) => p.availability).length;
  const unavailable = totalProperties - available;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage and monitor your listed properties
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Properties"
            value={totalProperties}
            icon={<Building2 className="w-5 h-5 text-blue-600" />}
            bg="bg-blue-50"
          />
          <StatCard
            label="Available"
            value={available}
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            bg="bg-green-50"
          />
          <StatCard
            label="Unavailable"
            value={unavailable}
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            bg="bg-red-50"
          />
        </div>

        {/* Property List */}
        {!result.ok ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
            {result.message || "Failed to load properties."}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No properties listed yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Add your first property to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
      <div className={`${bg} p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-44 bg-gray-100">
        <img
          src={property.images || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            property.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {property.availability ? "Available" : "Unavailable"}
        </span>
        <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
          {property.categories?.name ?? "Property"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h2 className="font-semibold text-gray-900 text-base leading-tight">
            {property.title}
          </h2>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {property.address}, {property.division}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4 text-gray-400" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-400" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="w-4 h-4 text-gray-400" />
            {property.size_sqft} sqft
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-lg font-bold text-blue-600">
              ৳{Number(property.rent).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">per month</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            From{" "}
            {new Date(property.available_from).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
