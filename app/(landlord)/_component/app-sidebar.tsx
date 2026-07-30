"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, User, MessageSquare } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: Home },
  {
    label: "Properties",
    href: "/dashboard/landlord/properties",
    icon: Building2,
    subItems: [
      { label: "Property list", href: "/dashboard/landlord/properties" },
      {
        label: "Create property",
        href: "/dashboard/landlord/properties/new",
      },
    ],
  },
  {
    label: "Requests",
    href: "/dashboard/landlord/requests",
    icon: MessageSquare,
  },
  { label: "Profile", href: "/dashboard/landlord/profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Landlord
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

                  {item.subItems ? (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.href}>
                          <SidebarMenuSubButton
                            render={
                              <Link
                                href={subItem.href}
                                className="w-full text-left"
                              >
                                {subItem.label}
                              </Link>
                            }
                            isActive={pathname === subItem.href}
                          />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
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
