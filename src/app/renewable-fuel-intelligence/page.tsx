"use client";

import { useRouter } from "next/navigation";
import { Leaf, ArrowLeft } from "lucide-react";

export default function RenewableFuelIntelligencePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-8 h-8 text-green-500" />
        </div>
        <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-green-600 bg-green-50 rounded-full uppercase mb-4">
          Coming Soon
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Renewable Fuel Intelligence
        </h1>
        <p className="text-gray-500 mb-8">
          This module is currently under development.
        </p>
        <button
          onClick={() => router.push("/module-selection")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Module Selection
        </button>
      </div>
    </div>
  );
}
