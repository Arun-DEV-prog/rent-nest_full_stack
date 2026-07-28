export default function HomeText() {
  return (
    <section className="bg-slate-100 py-14 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[32px] border border-slate-200 bg-white/95 p-10 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">
              Rent smarter
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Find trusted rental homes in your city with speed and confidence.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Discover verified properties, transparent rent packages, and
              expert support across Dhaka, Chittagong, Sylhet, and Khulna. Our
              curated listings help you lease with ease and grow your rental
              income securely.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm dark:bg-slate-950/80">
                <p className="text-lg font-semibold">Verified listings</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Only licensed landlords and trusted agents are listed so you
                  can rent without worrying.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm dark:bg-slate-950/80">
                <p className="text-lg font-semibold">Fast approval</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Apply quickly with our easy rental forms and track your
                  booking in real time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] bg-emerald-600 p-8 text-white shadow-2xl shadow-emerald-700/20 sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">
              Featured rent benefit
            </p>
            <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
              Low-cost rent plans with priority support
            </h3>
            <p className="mt-4 text-base leading-7 text-emerald-100">
              Save time with curated homes and get priority support for move-in
              guidance, documentation, and landlord communication.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-emerald-100/90">
              <li>• Verified neighborhoods</li>
              <li>• 24/7 rental assistance</li>
              <li>• Peaceful moving experience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
