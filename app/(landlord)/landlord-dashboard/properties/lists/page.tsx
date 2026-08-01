// app/landlord/properties/page.tsx
import { landlordProperties } from "../../../_actions/propertiesAction";
import { Building2 } from "lucide-react";
import PropertiesClient from "../../../_component/PropertiesClient";

export default async function LandlordPropertiesPage() {
  const result = await landlordProperties();
  const properties = result.ok ? (result.properties ?? []) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Update or remove your listed properties
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
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
          <PropertiesClient properties={properties} />
        )}
      </div>
    </div>
  );
}
