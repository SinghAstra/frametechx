"use client";

import type React from "react";
import type { Dispatch } from "react";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<boolean>;
}

const SlideOverSidebar = ({
  title,
  children,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) => {
  return (
    <div className="z-50">
      <div
        className={`fixed inset-0 bg-muted/60 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-hidden={!isSidebarOpen}
      />
      <aside
        className={`fixed z-[51] top-0 left-0 h-full shadow-xl transform transition-transform duration-300 ease-in-out bg-background border-r ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Sidebar"}
      >
        {title ? (
          <div className="flex items-center justify-between px-3 py-3 border-b">
            <h2 className="text-base text-primary">{title}</h2>
          </div>
        ) : null}
        <div className="h-[calc(100vh-49px)] md:h-screen overflow-y-auto">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default SlideOverSidebar;
