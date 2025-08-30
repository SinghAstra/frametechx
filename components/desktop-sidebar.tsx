"use client";

import { cn } from "@/lib/utils";
import SidebarContent from "./sidebar-content";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Stages & Checklist", href: "/stages" },
  { name: "Upload Docs", href: "/upload" },
  { name: "Preferred Vendors", href: "/vendors" },
  { name: "Tech Stack", href: "/tech-stack" },
  { name: "Targets", href: "/targets" },
  { name: "Zee Sales Targets", href: "/zee-sales-targets" },
  { name: "MAI Settings", href: "/mai-settings" },
  { name: "Pending Questions", href: "/pending-questions", badge: "3" },
];

export function DesktopSidebar() {
  return (
    <aside
      className={cn(
        "hidden md:block",
        "fixed inset-y-0 left-0 w-64 overflow-y-auto",
        "bg-gradient-to-b from-slate-600 via-sky-900 to-teal-900",
        "border-r "
      )}
      aria-label="Primary"
    >
      <SidebarContent />
    </aside>
  );
}

export default DesktopSidebar;
