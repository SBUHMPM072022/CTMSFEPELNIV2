'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'map-loading-port', label: 'MAP LOCATION PORT' },
  { id: 'grafik-analysis', label: 'GRAPHIC ANALYSIS' },
  //{ id: 'total-data', label: 'TOTAL DATA' },
  //{ id: 'time-series', label: 'TIME SERIES' },
  { id: 'quality-detail', label: 'QUALITY DETAIL' },
  //{ id: 'quantity-detail', label: 'QUANTITY DETAIL' },
  //{ id: 'vessel-monitoring', label: 'VESSEL MONITORING' },
];
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <nav className="flex px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-[#2d7dd2] border-[#2d7dd2]'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
