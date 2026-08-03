import PaymentButton from "./PaymentButton";

type CurrentRentalsSectionProps = {
  rentals: any[];
  result: {
    ok?: boolean;
    message?: string;
  };
};

export default function CurrentRentalsSection({
  rentals,
  result,
}: CurrentRentalsSectionProps) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-gray-700">
        Current Rentals
      </h2>
      {!result.ok ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {result.message}
        </div>
      ) : rentals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          No rental records found for this tenant.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rental.properties.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {rental.properties.address}
                  </p>
                </div>
                <StatusBadge status={rental.status} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly rent</p>
                  <p className="text-xl font-bold text-blue-600">
                    ৳{Number(rental.properties.rent || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Move-in date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {rental.move_in_date}
                  </p>
                </div>
              </div>

              {rental.status === "approved" && (
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">
                    Your request is approved. Complete payment to activate your
                    lease.
                  </p>
                  <PaymentButton propertyId={rental.properties_id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
    active_completed: "bg-blue-100 text-blue-700",
  };

  const labels: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    active_completed: "Completed",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
