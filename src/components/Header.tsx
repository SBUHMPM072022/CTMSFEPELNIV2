"use client";

import { useSidebar } from "@/context/SidebarContext";

interface HeaderProps {
  title: string;
  userName?: string;
}

export default function Header({ title, userName = "Admin" }: HeaderProps) {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu - Only on Mobile */}
          <button
            onClick={toggleMobileSidebar}
            className="p-1 -ml-1 md:hidden text-gray-500 hover:bg-gray-100 rounded transition-colors"
            title="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-base md:text-lg text-gray-400 font-normal truncate">
            {title}
          </h1>
        </div>
        <span className="text-sm md:text-base font-medium text-[#2d7dd2] whitespace-nowrap">
          Welcome back, {userName}
        </span>
      </div>
    </header>
  );
}
