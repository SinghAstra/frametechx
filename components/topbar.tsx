"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-40 border-b"
        role="banner"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant={"ghost"}
            onClick={() => setOpen(true)}
            className="md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant={"ghost"}>
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/user.jpg" alt="@username" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-600 via-sky-900 to-teal-900 border-r",
              "shadow-xl flex flex-col"
            )}
          >
            <div className="px-4 py-4 border-b flex items-center gap-2">
              <div
                className="h-6 w-6 rounded bg-foreground/20"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{siteConfig.name}</span>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-4">
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
                          "flex items-center gap-4 rounded px-4 py-2.5 text-sm tracking-wider",
                          "transition-all duration-300",
                          "text-muted-foreground",
                          "hover:bg-muted/10 hover:text-teal-500",
                          isActive && "bg-muted/10 text-teal-500"
                        )}
                      >
                        <span className="text-pretty">{item.name}</span>
                        {item.badge && (
                          <span className="bg-muted px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="px-4 py-3 border-t">
              <button
                type="button"
                className="w-full text-left text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
