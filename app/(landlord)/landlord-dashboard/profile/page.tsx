import { getProfile } from "@/app/(auth)/_actions/profileAction";
import {
  UserCircle2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default async function ProfilePage() {
  const result = await getProfile();

  if (!result.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm max-w-sm text-center">
          {result.message || "Failed to load profile."}
        </div>
      </div>
    );
  }

  const user = result.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your account information</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* Avatar + Name */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
          <div className="bg-[#123832]/10 rounded-full p-4">
            <UserCircle2 className="w-12 h-12 text-[#123832]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.status}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
          <InfoRow
            icon={<Mail className="w-4 h-4 text-gray-400" />}
            label="Email"
            value={user.email}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4 text-gray-400" />}
            label="Phone"
            value={user.phone}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4 text-gray-400" />}
            label="Location"
            value={[user.district, user.division].filter(Boolean).join(", ") || "—"}
          />
          <InfoRow
            icon={<ShieldCheck className="w-4 h-4 text-gray-400" />}
            label="Role"
            value={user.role}
            capitalize
          />
          <InfoRow
            icon={<BadgeCheck className="w-4 h-4 text-gray-400" />}
            label="Account Status"
            value={user.status}
            capitalize
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
  capitalize = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p
          className={`text-sm text-gray-800 font-medium mt-0.5 ${capitalize ? "capitalize" : ""}`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
