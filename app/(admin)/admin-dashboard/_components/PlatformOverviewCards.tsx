import { Home, FileText, TrendingUp, Users } from "lucide-react";
import type { ReactNode } from "react";

type PlatformOverviewCardsProps = {
  totalUsers: number | string;
  totalProperties: number | string;
  totalRentals: number | string;
  totalRevenue: string;
};

export default function PlatformOverviewCards({
  totalUsers,
  totalProperties,
  totalRentals,
  totalRevenue,
}: PlatformOverviewCardsProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Platform Overview
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          bg="bg-blue-50"
        />
        <StatCard
          label="Total Properties"
          value={totalProperties}
          icon={<Home className="h-5 w-5 text-emerald-600" />}
          bg="bg-emerald-50"
        />
        <StatCard
          label="Total Rentals"
          value={totalRentals}
          icon={<FileText className="h-5 w-5 text-purple-600" />}
          bg="bg-purple-50"
        />
        <StatCard
          label="Total Revenue"
          value={totalRevenue}
          icon={<TrendingUp className="h-5 w-5 text-orange-600" />}
          bg="bg-orange-50"
          isText
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
  isText = false,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  bg: string;
  isText?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
      <div className={`${bg} shrink-0 rounded-lg p-3`}>{icon}</div>
      <div className="min-w-0">
        <p
          className={`truncate font-bold text-gray-900 ${isText ? "text-base" : "text-2xl"}`}
        >
          {value}
        </p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
