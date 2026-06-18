/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  hasSubmenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    label: "Dashboard",
    href: "/dashboard",
    hasSubmenu: true,
    subMenuItems: [
      { label: "Monitoring & Analysis", href: "/dashboard/monitoring-analysis" },
      { label: "Performance & Report", href: "/dashboard/performance-report" },
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    label: "Survey Form",
    href: "/form-entry",
    hasSubmenu: true,
    subMenuItems: [
      { label: "Form Entry", href: "/form-entry/entry" },
      { label: "Form Quality", href: "/form-entry/quality" },
      { label: "Form ROB", href: "/form-entry/rob" },
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    label: "Operational Form",
    href: "/operational-form",
    hasSubmenu: true,
    subMenuItems: [
      { label: "Form Jadwal Pengerjaan Kapal", href: "/form-entry/jadwal-pengerjaan-kapal" },
      { label: "Form Kapal", href: "/form-entry/kapal" },
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    label: "Logout",
    href: "/logout",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    label: "Masukan & Saran",
    href: "/masukan-saran",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { isMobileOpen, closeMobileSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("imgUri");
    router.push("/login");
  };

  const handleMenuClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.label === "Logout") {
      e.preventDefault();
      handleLogout();
      return;
    }
    if (item.hasSubmenu && item.subMenuItems) {
      e.preventDefault();
      setExpandedMenu(expandedMenu === item.label ? null : item.label);
    } else {
      setActiveMenu(item.label);
      closeMobileSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`bg-[#1a2234] text-white min-h-screen h-screen fixed md:sticky top-0 left-0 z-50 flex flex-col transition-all duration-300 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
          ${isCollapsed ? "w-20" : "w-56"}`}
      >
        {/* Logo */}
        <div className="px-4 py-5 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img
              src="/Sucofindo_Putih.svg"
              alt="Sucofindo"
              className={isCollapsed ? "w-8 h-8" : "w-20 h-auto"}
            />
            {!isCollapsed && (
              <img src="/Logo Pelni.png" alt="Pelni" className="w-20 h-auto" />
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 py-3 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">administrator</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <div className="w-7 h-4 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-2">
          <ul className="space-y-0.5 px-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(e) => handleMenuClick(item, e)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                    activeMenu === item.label || expandedMenu === item.label
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-sm">{item.label}</span>
                      {item.hasSubmenu && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${expandedMenu === item.label ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </Link>
                {/* Submenu Items */}
                {!isCollapsed &&
                  item.hasSubmenu &&
                  item.subMenuItems &&
                  expandedMenu === item.label && (
                    <ul className="ml-6 mt-1 space-y-0.5">
                      {item.subMenuItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            onClick={() => {
                              setActiveMenu(subItem.label);
                              closeMobileSidebar();
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                              activeMenu === subItem.label
                                ? "bg-blue-600/20 text-blue-400"
                                : "text-gray-400 hover:bg-slate-700/50 hover:text-white"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo footer */}
        <div className="px-4 py-3 flex justify-center opacity-50 pointer-events-none">
          <img
            src="/Logo Danantara (Grey).png"
            alt="Danantara"
            className={isCollapsed ? "w-14 h-auto" : "w-44 h-auto"}
          />
        </div>

        {/* Hide Button */}
        <div className="px-2 py-3 border-t border-slate-700/50">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 px-3 py-2 w-full text-gray-400 hover:bg-slate-700/50 hover:text-white rounded-md transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isCollapsed
                    ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                    : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                }
              />
            </svg>
            {!isCollapsed && <span className="text-sm">Hide</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
