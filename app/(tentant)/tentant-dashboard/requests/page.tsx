import Link from "next/link";

export default function TenantRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Tenant</p>
            <h1 className="text-3xl font-semibold text-slate-900">Requests</h1>
          </div>
          <Link
            href="/tentant-dashboard"
            className="inline-flex items-center rounded-full bg-[#123832] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f2d25]"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900">Your requests will appear here.</p>
          <p className="mt-2 text-sm text-gray-500">
            This page is ready for request status and history.
          </p>
        </div>
      </div>
    </div>
  );
}
