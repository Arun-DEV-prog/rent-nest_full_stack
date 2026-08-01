import Link from "next/link";

export default function LandlordPropertyListPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Properties</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Property list
            </h1>
          </div>
          <Link
            href="/landlord-dashboard/properties/new"
            className="inline-flex items-center justify-center rounded-full bg-[#123832] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f2d25]"
          >
            Create new property
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-500">
          The property list page is ready. Add your property and it will show
          here.
        </p>
      </div>
    </div>
  );
}
