"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { Scan, QrCode, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, user, logout } = useAuth(); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // If on Scanner route, render ONLY the Volunteer Scanner Layout matching user's design
  if (pathname?.startsWith("/admin/scanner")) {
    return (
      <div className="h-screen w-screen flex flex-col font-sans overflow-hidden bg-[#000000] text-white selection:bg-[#86A995] selection:text-black">
        {/* Top Header Bar */}
        <header className="h-12 shrink-0 bg-[#000000] border-b border-neutral-800 flex items-center justify-between px-3 sm:px-6 z-20">
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs font-medium text-neutral-300">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="md:hidden p-1.5 -ml-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={18} />
            </button>
            <div className="w-6 h-6 rounded-lg bg-[#86A995]/15 border border-[#86A995]/30 flex items-center justify-center text-[#86A995] shrink-0">
              <Scan size={13} />
            </div>
            <span className="text-neutral-600 hidden sm:inline">/</span>
            <span className="font-extrabold text-white tracking-wide text-xs sm:text-sm truncate">Gate Scanner</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </div>
            <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#86A995]/15 border border-[#86A995]/30 text-[#86A995] text-[10px] font-black tracking-wider uppercase">
              VOLUNTEER
            </div>
          </div>
        </header>

        {/* Content Area with Volunteer Sidebar and Scanner */}
        <div className="flex flex-1 overflow-hidden relative w-full">
          {/* Mobile Backdrop Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Volunteer Sidebar: Slide-over drawer on mobile, persistent on desktop (md+) */}
          <aside
            className={`
              fixed md:static inset-y-0 left-0 z-50 md:z-auto
              w-64 md:w-56 shrink-0 bg-[#000000] border-r border-neutral-800
              flex flex-col justify-between select-none
              transition-transform duration-200 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            <div>
              {/* Brand Header */}
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#86A995] flex items-center justify-center text-[#050f09] font-black shadow-[0_0_15px_rgba(134,169,149,0.25)] shrink-0">
                    <QrCode size={18} className="stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black tracking-widest text-[#86A995] uppercase leading-none mb-1">
                      ANWESHA 2027
                    </div>
                    <div className="text-sm font-extrabold text-white tracking-tight leading-none">
                      Volunteer Portal
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  aria-label="Close Sidebar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Items (Only Scanner) */}
              <nav className="p-3">
                <div
                  onClick={() => setIsSidebarOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-[#86A995]/30 text-white flex items-center justify-between shadow-[0_0_12px_rgba(134,169,149,0.08)] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Scan size={16} className="text-[#86A995] shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide">Scanner</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86A995] shadow-[0_0_8px_#86A995] shrink-0" />
                </div>
              </nav>
            </div>

            {/* User Profile & Sign Out Footer */}
            <div className="p-3 border-t border-neutral-800">
              <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-[#86A995]/30 text-[#86A995] font-black text-xs flex items-center justify-center shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "V"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate" title={user?.name || "Volunteer"}>
                    {user?.name || "Volunteer"}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                    {user?.role || "VOLUNTEER"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Scanner Page - 100% full width on mobile */}
          <main className="flex-1 overflow-hidden bg-[#000000] w-full min-w-0">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col font-sans overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-mesh-dark text-white' : 'bg-mesh-light text-gray-900'
    }`}>
      
      <AdminNavbar 
        toggleSidebar={toggleSidebar} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={toggleSidebar}
          />
        )}

        <AdminSidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Main content area with subtle inner glow */}
        <main className={`flex-1 px-4 py-5 md:px-6 md:py-5 overflow-y-auto relative ${
          isDarkMode ? '' : ''
        }`}>
          {/* Ambient top glow */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-500/[0.02] to-transparent" aria-hidden />
          <div className="relative">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  );
}