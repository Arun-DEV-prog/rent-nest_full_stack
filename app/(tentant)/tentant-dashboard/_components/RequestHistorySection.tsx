type RequestHistorySectionProps = {
  requestHistory: any[];
};

export default function RequestHistorySection({
  requestHistory,
}: RequestHistorySectionProps) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-gray-700">
        Request History
      </h2>
      {requestHistory.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          No request history yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requestHistory.map((request) => (
            <div
              key={request.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {request.properties.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {request.properties.address}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Move-in: {request.move_in_date} • Lease: {request.lease_duration}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={request.status} />
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-gray-800">
                      ৳{Number(request.properties.rent || 0).toLocaleString()}
                    </p>
                    <p>
                      {new Date(request.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
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
