import { CheckCircle, Clock, UserCheck, UserX } from "lucide-react";

type RentalStatusBreakdownProps = {
  rentals: any[];
};

export default function RentalStatusBreakdown({
  rentals,
}: RentalStatusBreakdownProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 font-semibold text-gray-900">
        Rental Status Breakdown
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
            rentals.length > 0 ? Math.round((count / rentals.length) * 100) : 0;

          return (
            <div key={status} className={`${bg} rounded-2xl p-4`}>
              <div className="mb-2 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs font-semibold text-gray-600">
                  {label}
                </span>
              </div>
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/60">
                <div
                  className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">{pct}% of total</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
