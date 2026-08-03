import Link from "next/link";
import { getAdminProperties } from "../../_actions/adminActions";

export default async function AdminPropertiesPage() {
  const result = await getAdminProperties();
  const properties = result.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Admin</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Properties
            </h1>
          </div>
          <Link
            href="/admin-dashboard"
            className="inline-flex items-center rounded-full bg-[#123832] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f2d25]"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {!result.ok ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {result.message}
            </div>
          ) : properties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-sm text-gray-500">
              No properties found.
            </div>
          ) : (
            properties.map((property) => (
              <div
                key={property.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {property.title}
                    </h2>
                    <p className="text-sm text-gray-500">{property.address}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>৳{Number(property.rent || 0).toLocaleString()}</p>
                    <p>{property.availability ? "Available" : "Unavailable"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
