"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, User, ReceiptText, LayoutGrid } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Overview", href: "/tenant-dashboard", icon: LayoutGrid },

  {
    label: "Requests",
    href: "/tenant-dashboard/requests",
    icon: ReceiptText,
  },
  {
    label: "Profile",
    href: "/tenant-dashboard/profile",
    icon: User,
  },
  {
    label: "Payments",
    href: "/tenant-dashboard/payments",
    icon: ReceiptText,
  },
];

export function TenantSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Tenant
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/tenant-dashboard"
                    ? pathname === "/tenant-dashboard"
                    : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={
                      <Link
                        href={item.href}
                        className="w-full inline-flex items-center gap-3"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    }
                    isActive={isActive}
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4">
        <div className="text-sm text-slate-500">Quick links</div>
      </SidebarFooter>
    </Sidebar>
  );
}
