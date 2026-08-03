import Link from "next/link";
import { getAdminUsers } from "../../_actions/adminActions";
import RecentUsersTable from "../../_component/RecentUsersTable";
import type { AdminUser } from "../../_actions/adminActions";

export default async function AdminRecentUsersPage() {
  const result = await getAdminUsers();
  const users = (result.data ?? []) as AdminUser[];

  const recentUsers = [...users].sort((a, b) => {
    const aTime = new Date(a.created_at || 0).getTime();
    const bTime = new Date(b.created_at || 0).getTime();
    return bTime - aTime;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Admin</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Recent Users
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Review and manage the latest account activity across the platform.
            </p>
          </div>
          <Link
            href="/admin-dashboard"
            className="inline-flex items-center rounded-full bg-[#123832] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f2d25]"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
            <h2 className="font-semibold text-gray-900">User accounts</h2>
            <span className="text-xs text-gray-400">
              {result.meta?.total ?? recentUsers.length} total
            </span>
          </div>

          {!result.ok ? (
            <div className="border-t border-red-100 bg-red-50 p-5 text-sm text-red-700">
              {result.message}
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="bg-white p-10 text-center text-sm text-gray-500">
              No users found.
            </div>
          ) : (
            <RecentUsersTable users={recentUsers} />
          )}
        </div>
      </div>
    </div>
  );
}
