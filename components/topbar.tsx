"use client";

import { Menu, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarContent from "./sidebar-content";
import SlideOverSidebar from "./slide-over-sidebar";
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
            <Button variant={"ghost"} aria-label="Open settings">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/user.jpg" alt="@username" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <SlideOverSidebar
        title="weframetech"
        isSidebarOpen={open}
        setIsSidebarOpen={setOpen}
      >
        <SidebarContent />
      </SlideOverSidebar>
    </>
  );
}
