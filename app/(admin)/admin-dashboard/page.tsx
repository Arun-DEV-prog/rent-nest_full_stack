// app/admin/page.tsx
import {
  getAdminUsers,
  getAdminRentals,
  getAdminProperties,
} from "../_actions/adminActions";
import MemberStatsCards from "./_components/MemberStatsCards";
import PlatformOverviewCards from "./_components/PlatformOverviewCards";
import RecentActivitySection from "./_components/RecentActivitySection";
import RentalStatusBreakdown from "./_components/RentalStatusBreakdown";

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

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <PlatformOverviewCards
          totalUsers={totalUsers}
          totalProperties={totalProperties}
          totalRentals={totalRentals}
          totalRevenue={`৳${totalRevenue.toLocaleString()}`}
        />

        <MemberStatsCards
          tenants={tenants}
          landlords={landlords}
          pendingRentals={pendingRentals}
          activeRentals={activeRentals}
          availableProperties={availableProperties}
        />

        <RecentActivitySection
          users={users}
          rentals={rentals}
          totalUsers={totalUsers}
          totalRentals={totalRentals}
        />

        <RentalStatusBreakdown rentals={rentals} />
      </div>
    </div>
  );
}
