import { Calendar, CreditCard, DollarSign, Home } from "lucide-react";
import type { ReactNode } from "react";

import { getTenantRentals } from "./_actions/tenantDashboardAction";
import PaymentButton from "./_components/PaymentButton";

export default async function TenantDashboardPage() {
  const result = await getTenantRentals();
  const rentals = result.data ?? [];

  const activeLeaseCount = rentals.filter(
    (rental) =>
      rental.status === "active_completed" || rental.status === "approved",
  ).length;

  const monthlyRent = rentals
    .filter(
      (rental) =>
        rental.status === "active_completed" || rental.status === "approved",
    )
    .reduce((sum, rental) => sum + Number(rental.properties.rent || 0), 0);

  const paymentsMade = rentals.filter(
    (rental) =>
      rental.status === "active_completed" || rental.status === "approved",
  ).length;

  const upcomingDue = rentals.filter(
    (rental) => rental.status === "pending",
  ).length;

  const requestHistory = [...rentals].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Overview of your tenancy and payments
        </p>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <div>
          <h2 className="mb-3 text-base font-semibold text-gray-700">
            Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Active Lease"
              value={String(activeLeaseCount || 0)}
              icon={<Home className="h-5 w-5 text-blue-600" />}
              bg="bg-blue-50"
            />
            <StatCard
              label="Monthly Rent"
              value={`৳${monthlyRent.toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5 text-green-600" />}
              bg="bg-green-50"
            />
            <StatCard
              label="Payments Made"
              value={String(paymentsMade || 0)}
              icon={<CreditCard className="h-5 w-5 text-purple-600" />}
              bg="bg-purple-50"
            />
            <StatCard
              label="Upcoming Due"
              value={String(upcomingDue || 0)}
              icon={<Calendar className="h-5 w-5 text-orange-600" />}
              bg="bg-orange-50"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-gray-700">
            Current Rentals
          </h2>
          {!result.ok ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {result.message}
            </div>
          ) : rentals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              No rental records found for this tenant.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {rentals.map((rental) => (
                <div
                  key={rental.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rental.properties.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {rental.properties.address}
                      </p>
                    </div>
                    <StatusBadge status={rental.status} />
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly rent</p>
                      <p className="text-xl font-bold text-blue-600">
                        ৳{Number(rental.properties.rent || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Move-in date</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {rental.move_in_date}
                      </p>
                    </div>
                  </div>

                  {/* Payment button — only for approved rentals */}
                  {rental.status === "approved" && (
                    <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Your request is approved. Complete payment to activate
                        your lease.
                      </p>
                      <PaymentButton propertyId={rental.properties_id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-gray-700">
            Request History
          </h2>
          {requestHistory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              No request history yet.
            </div>
          ) : (
            <div className="space-y-4">
              {requestHistory.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {request.properties.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {request.properties.address}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Move-in: {request.move_in_date} • Lease:{" "}
                        {request.lease_duration}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={request.status} />
                      <div className="text-sm text-gray-600">
                        <p className="font-semibold text-gray-800">
                          ৳
                          {Number(
                            request.properties.rent || 0,
                          ).toLocaleString()}
                        </p>
                        <p>
                          {new Date(request.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  value: string;
  icon: ReactNode;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
      <div className={`${bg} shrink-0 rounded-lg p-3`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
    active_completed: "bg-blue-100 text-blue-700",
  };

  const labels: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    active_completed: "Completed",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
