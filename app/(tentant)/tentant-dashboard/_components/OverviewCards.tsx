import { Calendar, CreditCard, DollarSign, Home } from "lucide-react";
import type { ReactNode } from "react";

type OverviewCardsProps = {
  activeLeaseCount: number;
  monthlyRent: number;
  paymentsMade: number;
  upcomingDue: number;
};

export default function OverviewCards({
  activeLeaseCount,
  monthlyRent,
  paymentsMade,
  upcomingDue,
}: OverviewCardsProps) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-gray-700">Overview</h2>
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
    </section>
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
