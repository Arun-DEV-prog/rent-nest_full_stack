import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../_component/app-sidebar";
import ProfileMenu from "../_component/profile-menu";
import DashboardFooter from "@/components/shared/DashboardFooter";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50 flex flex-col min-h-screen">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div>
            <p className="text-sm text-slate-500 font-medium">Admin Workspace</p>
            <h1 className="text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ProfileMenu />
            <SidebarTrigger className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200" />
          </div>
        </div>
        <div className="p-6 flex-1">{children}</div>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
