import { CreditCard, DollarSign, Home, Calendar } from "lucide-react";

const leases = [
  {
    title: "Modern Family Apartment",
    location: "Dhanmondi, Dhaka",
    rent: "৳42000",
    dueDate: "05 Aug 2026",
  },
  {
    title: "Cozy Studio Flat",
    location: "Gulshan, Dhaka",
    rent: "৳28000",
    dueDate: "12 Aug 2026",
  },
];

export default function TenantDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of your tenancy and payments
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              label="Active Lease"
              value="02"
              icon={<Home className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50"
            />
            <StatCard
              label="Monthly Rent"
              value="৳70000"
              icon={<DollarSign className="w-5 h-5 text-green-600" />}
              bg="bg-green-50"
            />
            <StatCard
              label="Payments Made"
              value="08"
              icon={<CreditCard className="w-5 h-5 text-purple-600" />}
              bg="bg-purple-50"
            />
            <StatCard
              label="Upcoming Due"
              value="1"
              icon={<Calendar className="w-5 h-5 text-orange-600" />}
              bg="bg-orange-50"
            />
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Current Rentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {leases.map((lease) => (
              <div
                key={lease.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lease.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {lease.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Monthly rent</p>
                    <p className="text-xl font-bold text-blue-600">
                      {lease.rent}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Next due</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {lease.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-center gap-4">
      <div className={`${bg} rounded-lg p-3 shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
