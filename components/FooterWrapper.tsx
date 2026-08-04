"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  // Hide footer on auth routes
  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname.startsWith("/auth")
  ) {
    return null;
  }

  // Hide main footer on dashboard routes (dashboards have their own compact footer)
  if (
    pathname === "/landlord-dashboard" ||
    pathname.startsWith("/landlord-dashboard/") ||
    pathname === "/tenant-dashboard" ||
    pathname.startsWith("/tenant-dashboard/") ||
    pathname === "/admin-dashboard" ||
    pathname.startsWith("/admin-dashboard/")
  ) {
    return null;
  }

  return <Footer />;
}
