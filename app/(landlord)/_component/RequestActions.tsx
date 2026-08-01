"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

import { updateRentalRequestStatus } from "../_actions/propertiesAction";
import { toast } from "react-toastify";

export default function RequestActions({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approved" | "rejected" | null>(null);

  const handleAction = async (status: "approved" | "rejected") => {
    setLoading(status);

    const toastId = toast.loading(
      status === "approved" ? "Approving request..." : "Rejecting request...",
    );

    const result = await updateRentalRequestStatus(requestId, status);

    if (!result.ok) {
      toast.error(result.message || "Something went wrong.", { id: toastId });
    } else {
      toast.success(
        status === "approved"
          ? "Request approved successfully!"
          : "Request rejected.",
        { id: toastId },
      );
      router.refresh();
    }

    setLoading(null);
  };

  return (
    <div className="space-y-2 mt-4">
      <button
        onClick={() => handleAction("approved")}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {loading === "approved" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        Approve
      </button>
      <button
        onClick={() => handleAction("rejected")}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {loading === "rejected" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        Reject
      </button>
    </div>
  );
}
