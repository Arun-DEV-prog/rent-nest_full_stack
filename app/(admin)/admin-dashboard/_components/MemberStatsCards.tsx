type MemberStatsCardsProps = {
  tenants: number;
  landlords: number;
  pendingRentals: number;
  activeRentals: number;
  availableProperties: number;
};

export default function MemberStatsCards({
  tenants,
  landlords,
  pendingRentals,
  activeRentals,
  availableProperties,
}: MemberStatsCardsProps) {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <MiniStat label="Tenants" value={tenants} color="text-blue-600" />
      <MiniStat label="Landlords" value={landlords} color="text-emerald-600" />
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
    </section>
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
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-gray-500">{label}</p>
    </div>
  );
}
