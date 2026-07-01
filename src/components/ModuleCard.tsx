"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  href: string;
}

export default function ModuleCard({
  icon: Icon,
  category,
  title,
  description,
  href,
}: ModuleCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100
        hover:shadow-xl hover:scale-[1.02] hover:bg-white
        transition-all duration-300 ease-out cursor-pointer p-5 flex flex-col justify-between"
    >
      {/* Icon */}
      <div className="mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors duration-300">
          <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
        </div>
      </div>

      {/* Category */}
      <p className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-1">
        {category}
      </p>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {/* Button */}
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(href);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700
            bg-gray-50 rounded-full border border-gray-200
            hover:bg-blue-600 hover:text-white hover:border-blue-600
            group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600
            transition-all duration-300"
        >
          Access Workspace
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
