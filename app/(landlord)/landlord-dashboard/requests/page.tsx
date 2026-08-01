// app/landlord/requests/page.tsx
import {
  landlordPropertiesRequest,
  RentalRequest,
} from "../../_actions/propertiesAction";

import {
  BedDouble,
  Bath,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";
import RequestActions from "../../_component/RequestActions";

export default async function LandlordRequestsPage() {
  const result = await landlordPropertiesRequest();
  const requests: RentalRequest[] = result.ok ? (result.requests ?? []) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Rental Requests</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Review and manage tenant rental requests
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {!result.ok ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
            {result.message || "Failed to load requests."}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
            <p className="text-gray-500 font-medium">No rental requests yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Requests from tenants will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Property Info */}
                  <div className="md:col-span-1">
                    <img
                      src={req.properties.images || "/placeholder.jpg"}
                      alt={req.properties.title}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    <div className="mt-3 space-y-1">
                      <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                        {req.properties.title}
                      </h2>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {req.properties.address}, {req.properties.division}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5" />
                          {req.properties.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5" />
                          {req.properties.bathrooms} Baths
                        </span>
                      </div>
                      <p className="text-blue-600 font-bold text-sm pt-1">
                        ৳{Number(req.properties.rent).toLocaleString()}/mo
                      </p>
                    </div>
                  </div>

                  {/* Tenant & Request Info */}
                  <div className="md:col-span-1 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Tenant
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <User className="w-4 h-4 text-gray-400" />
                        {req.user.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {req.user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {req.user.phone}
                      </div>
                      <p className="text-xs text-gray-400">
                        {req.user.district}, {req.user.divison}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Request Details
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Move in: {req.move_in_date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        Lease: {req.lease_duration}
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Status
                      </p>
                      <StatusBadge status={req.status} />
                      <p className="text-xs text-gray-400 mt-2">
                        Requested:{" "}
                        {new Date(req.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {req.status === "pending" && (
                      <RequestActions requestId={req.id} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
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
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
