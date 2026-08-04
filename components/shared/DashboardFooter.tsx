import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Rent Nest</span>
          <span>&copy; {currentYear} All rights reserved.</span>
          <span className="hidden md:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="hover:text-slate-900 transition-colors"
          >
            Browse Properties
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-900 transition-colors"
          >
            Support & FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
