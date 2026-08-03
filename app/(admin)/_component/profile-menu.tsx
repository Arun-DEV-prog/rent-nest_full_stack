"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Settings, UserCircle2 } from "lucide-react";

const menuItems = [
  { label: "Profile", href: "/admin-dashboard/profile", icon: UserCircle2 },
  { label: "Settings", href: "/admin-dashboard/settings", icon: Settings },
  { label: "Logout", href: "/login", icon: LogOut },
];

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-flex text-left">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2"
      >
        <UserCircle2 className="h-4 w-4" />
        <span>Admin</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {open ? (
        <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
          <div className="flex flex-col py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
