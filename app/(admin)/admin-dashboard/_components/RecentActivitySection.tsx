import Link from "next/link";
import RecentUsersTable from "../../_component/RecentUsersTable";
import RecentRentalsTable from "../../_component/RecentRentalsTable";

type RecentActivitySectionProps = {
  users: any[];
  rentals: any[];
  totalUsers: number;
  totalRentals: number;
};

export default function RecentActivitySection({
  users,
  rentals,
  totalUsers,
  totalRentals,
}: RecentActivitySectionProps) {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Recent Users</h2>
          <Link
            href="/admin-dashboard/recent-users"
            className="text-sm font-medium text-[#123832] hover:text-[#0f2d25]"
          >
            View all
          </Link>
        </div>
        <RecentUsersTable users={users.slice(0, 6)} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Recent Rentals</h2>
          <span className="text-xs text-gray-400">{totalRentals} total</span>
        </div>
        <RecentRentalsTable rentals={rentals.slice(0, 5)} />
      </div>
    </section>
  );
}
