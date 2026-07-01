/* eslint-disable @next/next/no-img-element */
"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { Ship, Fuel, BarChart3, Leaf, LogOut } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import type { LucideIcon } from "lucide-react";

interface ModuleItem {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  href: string;
}

const modules: ModuleItem[] = [
  {
    icon: Ship,
    category: "MONITORING",
    title: "Marine Bunker Monitoring System",
    description:
      "Monitor marine fuel bunkering activities in real time across all vessels while ensuring operational transparency, compliance, and accuracy.",
    href: "/dashboard",
  },
  {
    icon: Fuel,
    category: "FUEL MANAGEMENT",
    title: "Advance Fuel Management",
    description:
      "Optimize fuel planning, allocation, monitoring, and consumption using intelligent analytics and forecasting.",
    href: "/advance-fuel-management",
  },
  {
    icon: BarChart3,
    category: "PERFORMANCE",
    title: "Smart Performance Management",
    description:
      "Monitor operational KPIs, vessel performance, analytics, and reporting through an interactive dashboard.",
    href: "/smart-performance-management",
  },
  {
    icon: Leaf,
    category: "SUSTAINABILITY",
    title: "Renewable Fuel Intelligence",
    description:
      "Monitor renewable fuel usage, carbon emissions, sustainability metrics, and environmental performance.",
    href: "/renewable-fuel-intelligence",
  },
];

export default function ModuleSelectionPage() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("imgUri");
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Background Module Section (2).png')` }}
      >
        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3 sm:gap-5">
                <img
                  src="/Danantara_Logo.png"
                  alt="Danantara"
                  className="h-4 sm:h-6 object-contain"
                />
                <img
                  src="/Logo-Sucofindo-Color.png"
                  alt="Sucofindo"
                  className="h-10 sm:h-12 object-contain"
                />
                <img
                  src="/PELNI_Logo.png"
                  alt="Pelni"
                  className="h-5 sm:h-7 object-contain"
                />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">
                    admin
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
                {/* Avatar */}
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  A
                </div>
                {/* Mobile sign out */}
                <button
                  onClick={handleSignOut}
                  className="sm:hidden p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Welcome back, Admin
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
              Select a module below to manage operations and access your
              workspace.
            </p>
          </div>

          {/* Module Grid */}
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <ModuleCard
                key={mod.title}
                icon={mod.icon}
                category={mod.category}
                title={mod.title}
                description={mod.description}
                href={mod.href}
              />
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
