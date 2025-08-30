"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WeframeTechMark from "./weframetech-mark";

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

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-64 h-full overflow-y-auto",
        "bg-gradient-to-b from-slate-600 via-sky-900 to-teal-900",
        "border-r text-background"
      )}
      aria-label="Primary"
    >
      <div className="flex h-full flex-col px-4 py-6">
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          <WeframeTechMark className="h-10 w-auto" />
          <span className="text-xl tracking-wider">
            we<span className="text-teal-500 mx-1">frame</span>tech
          </span>
        </div>

        <nav className="mt-2">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-4 rounded px-4 py-2.5 text-sm tracking-wider transition-all duration-300",
                      isActive
                        ? "bg-muted/10 text-teal-300"
                        : "text-background hover:bg-muted/10 hover:text-teal-300"
                    )}
                  >
                    <span className="text-pretty">{item.name}</span>
                    {item.badge && (
                      <span className="bg-background/30 text-background px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto">
          <p className="cursor-pointer hover:text-teal-300 transition-all duration-300">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
