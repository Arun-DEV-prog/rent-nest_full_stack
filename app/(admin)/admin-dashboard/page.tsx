// app/admin/page.tsx
import {
  Users,
  Home,
  FileText,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  getAdminUsers,
  getAdminRentals,
  getAdminProperties,
} from "../_actions/adminActions";
import RecentUsersTable from "../_component/RecentUsersTable";
import RecentRentalsTable from "../_component/RecentRentalsTable";

export default async function AdminDashboardPage() {
  const [usersResult, rentalsResult, propertiesResult] = await Promise.all([
    getAdminUsers(),
    getAdminRentals(),
    getAdminProperties(),
  ]);

  const users = usersResult.data ?? [];
  const rentals = rentalsResult.data ?? [];
  const properties = propertiesResult.data ?? [];

  // Stats
  const totalUsers = usersResult.meta?.total ?? users.length;
  const totalProperties = propertiesResult.meta?.total ?? properties.length;
  const totalRentals = rentalsResult.meta?.total ?? rentals.length;
  const totalRevenue = rentals
    .filter((r) => r.status === "active_completed")
    .reduce((sum, r) => sum + Number(r.properties.rent || 0), 0);

  const tenants = users.filter((u) => u.role === "tenant").length;
  const landlords = users.filter((u) => u.role === "landlord").length;
  const pendingRentals = rentals.filter((r) => r.status === "pending").length;
  const activeRentals = rentals.filter(
    (r) => r.status === "active_completed",
  ).length;
  const availableProperties = properties.filter((p) => p.availability).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Platform overview and management
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Main Stats */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Platform Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users"
              value={totalUsers}
              icon={<Users className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50"
            />
            <StatCard
              label="Total Properties"
              value={totalProperties}
              icon={<Home className="w-5 h-5 text-emerald-600" />}
              bg="bg-emerald-50"
            />
            <StatCard
              label="Total Rentals"
              value={totalRentals}
              icon={<FileText className="w-5 h-5 text-purple-600" />}
              bg="bg-purple-50"
            />
            <StatCard
              label="Total Revenue"
              value={`৳${totalRevenue.toLocaleString()}`}
              icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
              bg="bg-orange-50"
              isText
            />
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MiniStat label="Tenants" value={tenants} color="text-blue-600" />
          <MiniStat
            label="Landlords"
            value={landlords}
            color="text-emerald-600"
          />
          <MiniStat
            label="Pending Rentals"
            value={pendingRentals}
            color="text-yellow-600"
          />
          <MiniStat
            label="Active Leases"
            value={activeRentals}
            color="text-green-600"
          />
          <MiniStat
            label="Available Properties"
            value={availableProperties}
            color="text-purple-600"
          />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recent Users</h2>
              <span className="text-xs text-gray-400">{totalUsers} total</span>
            </div>
            <RecentUsersTable users={users.slice(0, 6)} />
          </div>

          {/* Recent Rentals */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recent Rentals</h2>
              <span className="text-xs text-gray-400">
                {totalRentals} total
              </span>
            </div>
            <RecentRentalsTable rentals={rentals.slice(0, 5)} />
          </div>
        </div>

        {/* Rental Status Breakdown */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Rental Status Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Pending",
                status: "pending",
                icon: Clock,
                color: "text-yellow-600",
                bg: "bg-yellow-50",
              },
              {
                label: "Approved",
                status: "approved",
                icon: CheckCircle,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Completed",
                status: "active_completed",
                icon: UserCheck,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                label: "Rejected",
                status: "rejected",
                icon: UserX,
                color: "text-red-500",
                bg: "bg-red-50",
              },
            ].map(({ label, status, icon: Icon, color, bg }) => {
              const count = rentals.filter((r) => r.status === status).length;
              const pct =
                rentals.length > 0
                  ? Math.round((count / rentals.length) * 100)
                  : 0;
              return (
                <div key={status} className={`${bg} rounded-2xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-xs font-semibold text-gray-600">
                      {label}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${color}`}>{count}</p>
                  <div className="mt-2 h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{pct}% of total</p>
                </div>
              );
            })}
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
  isText = false,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  bg: string;
  isText?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
      <div className={`${bg} p-3 rounded-lg shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p
          className={`font-bold text-gray-900 truncate ${isText ? "text-base" : "text-2xl"}`}
        >
          {value}
        </p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
