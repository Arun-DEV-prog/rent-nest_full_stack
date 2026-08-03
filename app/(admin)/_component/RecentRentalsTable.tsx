"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { AdminRental } from "../_actions/adminActions";
import { updateRentalStatus } from "../admin-dashboard/_actions/adminActions";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  active_completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  active_completed: "Completed",
  rejected: "Rejected",
};

export default function RecentRentalsTable({
  rentals,
}: {
  rentals: AdminRental[];
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<
    "approved" | "rejected" | null
  >(null);

  const handleStatusUpdate = async (
    rentalId: string,
    status: "approved" | "rejected",
  ) => {
    setLoadingId(rentalId);
    setLoadingStatus(status);

    const toastId = toast.loading(
      status === "approved" ? "Approving rental..." : "Rejecting rental...",
    );

    const result = await updateRentalStatus(rentalId, status);

    if (!result.ok) {
      toast.error(result.message || "Failed to update rental status.", {
        id: toastId,
      });
    } else {
      toast.success(
        status === "approved"
          ? "Rental approved successfully."
          : "Rental rejected.",
        { id: toastId },
      );
      router.refresh();
    }

    setLoadingId(null);
    setLoadingStatus(null);
  };

  return (
    <div className="divide-y divide-gray-100">
      {rentals.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No rentals found.
        </p>
      ) : (
        rentals.map((rental) => (
          <div
            key={rental.id}
            className="px-5 py-3.5 hover:bg-gray-50 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {rental.properties.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {rental.properties.address}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    Tenant:{" "}
                    <span className="font-medium text-gray-700">
                      {rental.user.name}
                    </span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-blue-600 font-semibold">
                    ৳{Number(rental.properties.rent).toLocaleString()}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[rental.status] ?? "bg-gray-100 text-gray-600"}`}
              >
                {statusLabels[rental.status] ?? rental.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Move-in: {rental.move_in_date} · Lease: {rental.lease_duration}
            </p>

            {rental.status === "pending" ? (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(rental.id, "approved")}
                  disabled={loadingId === rental.id}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loadingId === rental.id && loadingStatus === "approved" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle className="h-3.5 w-3.5" />
                  )}
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(rental.id, "rejected")}
                  disabled={loadingId === rental.id}
                  className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {loadingId === rental.id && loadingStatus === "rejected" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  Reject
                </button>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
