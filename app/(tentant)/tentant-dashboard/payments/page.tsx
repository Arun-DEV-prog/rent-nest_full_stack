import Link from "next/link";
import { getTenantRentals } from "../_actions/tenantDashboardAction";

export default async function TenantPaymentsPage() {
  const result = await getTenantRentals();
  const rentals = result.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Tenant</p>
            <h1 className="text-3xl font-semibold text-slate-900">Payments</h1>
          </div>
          <Link
            href="/tentant-dashboard"
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
          ) : rentals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-sm text-gray-500">
              No payment records available yet.
            </div>
          ) : (
            rentals.map((rental) => (
              <div
                key={rental.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {rental.properties.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {rental.properties.address}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-gray-800">
                      ৳{Number(rental.properties.rent || 0).toLocaleString()}
                    </p>
                    <p>Status: {rental.status}</p>
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
