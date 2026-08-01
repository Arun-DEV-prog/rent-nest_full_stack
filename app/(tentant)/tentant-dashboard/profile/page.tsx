import { UserCircle2, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function TenantProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your account information</p>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-5">
          <div className="rounded-full bg-[#123832]/10 p-4">
            <UserCircle2 className="h-12 w-12 text-[#123832]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tenant User</h2>
            <span className="mt-1 inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              Active
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
          <InfoRow
            icon={<Mail className="h-4 w-4 text-gray-400" />}
            label="Email"
            value="tenant@example.com"
          />
          <InfoRow
            icon={<Phone className="h-4 w-4 text-gray-400" />}
            label="Phone"
            value="+880 1700-000000"
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
            label="Location"
            value="Dhaka, Bangladesh"
          />
          <InfoRow
            icon={<ShieldCheck className="h-4 w-4 text-gray-400" />}
            label="Role"
            value="Tenant"
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
