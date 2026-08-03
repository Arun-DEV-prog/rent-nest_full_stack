import { getTenantRentals } from "./_actions/tenantDashboardAction";
import CurrentRentalsSection from "./_components/CurrentRentalsSection";
import OverviewCards from "./_components/OverviewCards";
import RequestHistorySection from "./_components/RequestHistorySection";

export default async function TenantDashboardPage() {
  const result = await getTenantRentals();
  const rentals = result.data ?? [];

  const activeLeaseCount = rentals.filter(
    (rental) =>
      rental.status === "active_completed" || rental.status === "approved",
  ).length;

  const monthlyRent = rentals
    .filter(
      (rental) =>
        rental.status === "active_completed" || rental.status === "approved",
    )
    .reduce((sum, rental) => sum + Number(rental.properties.rent || 0), 0);

  const paymentsMade = rentals.filter(
    (rental) =>
      rental.status === "active_completed" || rental.status === "approved",
  ).length;

  const upcomingDue = rentals.filter(
    (rental) => rental.status === "pending",
  ).length;

  const requestHistory = [...rentals].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Overview of your tenancy and payments
        </p>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <OverviewCards
          activeLeaseCount={activeLeaseCount}
          monthlyRent={monthlyRent}
          paymentsMade={paymentsMade}
          upcomingDue={upcomingDue}
        />

        <CurrentRentalsSection rentals={rentals} result={result} />

        <RequestHistorySection requestHistory={requestHistory} />
      </div>
    </div>
  );
}
