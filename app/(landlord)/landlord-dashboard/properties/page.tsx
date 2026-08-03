import Link from "next/link";
import { landlordProperties } from "../../_actions/propertiesAction";
import PropertiesClient from "../../_component/PropertiesClient";

export default async function LandlordPropertyListPage() {
  const result = await landlordProperties();
  const properties = result.ok ? (result.properties ?? []) : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Properties</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Property list
            </h1>
          </div>
          <Link
            href="/landlord-dashboard/properties/new"
            className="inline-flex items-center justify-center rounded-full bg-[#123832] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f2d25]"
          >
            Create new property
          </Link>
        </div>
      </div>

      {!result.ok ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-sm text-red-700 shadow-sm">
          {result.message || "Failed to load properties."}
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            No properties yet
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Add your first property to see it appear here.
          </p>
        </div>
      ) : (
        <PropertiesClient properties={properties} />
      )}
    </div>
  );
}
