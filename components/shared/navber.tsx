"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, Plus, Search, User, Grid, X } from "lucide-react";
import { cn } from "@/lib/utils";

const topCategories = [
  { label: "All", href: "/" },
  { label: "Family", href: "/properties/family" },
  { label: "Bachelor", href: "/properties/bachelor" },
  { label: "Sublet", href: "/properties/sublet" },
  { label: "Office", href: "/properties/office" },
  { label: "Shop", href: "/properties/shop" },
  { label: "Hostel", href: "/properties/hostel" },
];

const mainLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Property List", href: "/property-list", hasDropdown: true },
  { label: "বাসা ভাড়া ম্যানেজমেন্ট", href: "/management" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Others", href: "/others", hasDropdown: true },
  { label: "News", href: "/news" },
];

const mobileActions = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Login", href: "/login", icon: User },
  { label: "More", href: "/more", icon: Grid },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — hides on scroll */}
      <div
        className={cn(
          "hidden bg-slate-900 text-slate-100 md:block overflow-hidden transition-all duration-300 ease-in-out",
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-4 lg:px-5">
          <nav className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            {topCategories.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3 py-2 text-sm transition",
                  index === 0
                    ? "bg-slate-100 text-slate-950"
                    : "border-slate-600/40 text-slate-100 hover:border-slate-400/70 hover:bg-slate-800",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/add-property"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
            <Link
              href="/search"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-slate-100 transition hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav — always visible */}
      <div
        className={cn(
          "border-b border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 transition-shadow duration-300",
          scrolled && "shadow-md",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-slate-950 transition hover:text-primary dark:text-slate-100 dark:hover:text-primary"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-emerald-700">
                H
              </span>
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold">Housio</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                বাসা খুঁজুন নিশ্চিত
              </span>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 md:flex">
            {mainLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-4 py-2 transition",
                  item.active
                    ? "bg-sky-100 text-slate-950"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
              >
                {item.label}
                {item.hasDropdown ? <ChevronDown className="h-4 w-4" /> : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/login"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
              aria-label="Login"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-950 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 md:hidden",
            mobileOpen ? "max-h-screen py-5" : "max-h-0",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
              {topCategories.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "whitespace-nowrap rounded-full border px-3 py-2 text-sm transition",
                    index === 0
                      ? "bg-slate-100 text-slate-950"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {mainLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.label}
                  {item.hasDropdown ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : null}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/add-property"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <Plus className="h-4 w-4" />
                Add Property
              </Link>
              <div className="grid gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {mobileActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <action.icon className="h-5 w-5" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
