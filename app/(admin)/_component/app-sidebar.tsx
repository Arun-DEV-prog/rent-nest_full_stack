"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  CircleUserRound,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
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
  { label: "Overview", href: "/admin-dashboard", icon: BarChart3 },
  { label: "Landlords", href: "/admin-dashboard/landlords", icon: Building2 },
  { label: "Tenants", href: "/admin-dashboard/tenants", icon: Users },
  {
    label: "Properties",
    href: "/admin-dashboard/properties",
    icon: ShieldCheck,
  },
  { label: "Reviews", href: "/admin-dashboard/reviews", icon: FileText },
  { label: "Profile", href: "/admin-dashboard/profile", icon: CircleUserRound },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Admin
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
                pathname === item.href || pathname.startsWith(item.href + "/");

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
        <div className="text-sm text-slate-500">Platform Control Center</div>
      </SidebarFooter>
    </Sidebar>
  );
}
