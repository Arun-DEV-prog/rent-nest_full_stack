"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navber";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/auth")
  ) {
    return null;
  }
  if (
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname.startsWith("/auth")
  ) {
    return null;
  }

  // Hide navbar for landlord dashboard pages
  if (
    pathname === "/landlord-dashboard" ||
    pathname.startsWith("/landlord-dashboard/")
  ) {
    return null;
  }
  if (
    pathname === "/tenant-dashboard" ||
    pathname.startsWith("/tenant-dashboard")
  ) {
    return null;
  }
  if (
    pathname === "/admin-dashboard" ||
    pathname.startsWith("/admin-dashboard")
  ) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
}
