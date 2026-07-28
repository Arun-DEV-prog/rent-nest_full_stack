import PropertiesList from "./_component/PropertiesList";

export const metadata = {
  title: "Properties | Housio",
};

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Properties</h1>
          <p className="mt-2 text-sm text-slate-600">
            Browse listings — demo data shown. Cards are reusable components.
          </p>
        </div>

        <PropertiesList />
      </div>
    </main>
  );
}
