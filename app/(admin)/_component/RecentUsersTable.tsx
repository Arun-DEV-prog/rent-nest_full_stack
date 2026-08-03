// app/admin/_components/RecentUsersTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminUser, updateUserStatus } from "../_actions/adminActions";

const roleBadge: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  landlord: "bg-blue-100 text-blue-700",
  tenant: "bg-gray-100 text-gray-600",
};

export default function RecentUsersTable({ users }: { users: AdminUser[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === "active" ? "banned" : "active";
    setLoadingId(user.id);
    const toastId = toast.loading(
      `${newStatus === "banned" ? "Blocking" : "Activating"} user...`,
    );
    const result = await updateUserStatus(user.id, newStatus);
    console.log(result);
    if (result.ok) {
      toast.success(
        `User ${newStatus === "banned" ? "blocked" : "activated"}.`,
        { id: toastId },
      );
      router.refresh();
    } else {
      toast.error(result.message || "Failed.", { id: toastId });
    }
    setLoadingId(null);
  };

  return (
    <div className="divide-y divide-gray-100">
      {users.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No users found.
        </p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleBadge[user.role] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => handleToggleStatus(user)}
              disabled={loadingId === user.id}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition disabled:opacity-50 shrink-0 ml-3 ${
                user.status === "active"
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              {loadingId === user.id
                ? "..."
                : user.status === "active"
                  ? "Block"
                  : "Activate"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
