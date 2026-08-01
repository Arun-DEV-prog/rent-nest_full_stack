// app/landlord/properties/_components/PropertiesClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  X,
  Trash2,
  Loader2,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  deleteProperty,
  updateProperty,
} from "../_actions/propertyManageActions";
import PropertyModal from "../_component/property-modal";
import { PropertyFormData } from "@/lib/propertySchema";
import PropertyActions from "./PropertyActions";

export default function PropertiesClient({
  properties,
}: {
  properties: any[];
}) {
  const router = useRouter();
  const [updateTarget, setUpdateTarget] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const toastId = toast.loading("Deleting property...");
    const result = await deleteProperty(deleteTarget.id);

    if (!result.ok) {
      toast.error(result.message || "Failed to delete.", { id: toastId });
    } else {
      toast.success("Property deleted successfully.", { id: toastId });
      setDeleteTarget(null);
      router.refresh();
    }
    setDeleting(false);
  };

  const handleUpdate = async (data: PropertyFormData) => {
    const result = await updateProperty(updateTarget.id, data);
    if (result.ok) {
      toast.success(result.message || "Property updated successfully.");
      setUpdateTarget(null);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update property.");
    }
    return result;
  };

  const buildDefaultValues = (property: any): PropertyFormData => ({
    title: property.title,
    description: property.description ?? "",
    rent: Number(property.rent),
    categoriesId: property.categoriesId,
    bedrooms: Number(property.bedrooms),
    bathrooms: Number(property.bathrooms),
    size_sqft: Number(property.size_sqft),
    floor: Number(property.floor),
    availability: property.availability,
    available_from: property.available_from,
    address: property.address,
    division: property.division,
    images: property.images,
  });

  return (
    <>
      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((property: any) => (
          <div
            key={property.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
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
                  {new Date(property.available_from).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </div>
              </div>

              <PropertyActions
                property={property}
                onUpdate={setUpdateTarget}
                onDelete={setDeleteTarget}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Delete Confirm Modal ── rendered once at root level */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Delete Property</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-700">
                    "{deleteTarget.title}"
                  </span>
                  ? This cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Update Modal ── rendered once at root level */}
      {updateTarget && (
        <PropertyModal
          defaultValues={buildDefaultValues(updateTarget)}
          action={handleUpdate}
          onClose={() => setUpdateTarget(null)}
          mode="update"
        />
      )}
    </>
  );
}
