"use client";

interface Tab {
  id: string;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: "map-loading-port", label: "MAP LOCATION PORT" },
  { id: "grafik-analysis", label: "GRAPHIC ANALYSIS" },
  { id: "total-data", label: "TOTAL DATA" },
  { id: "summary", label: "SUMMARY" },
  { id: "quality-detail", label: "QUALITY DETAIL" },
  { id: "rob", label: "ROB" },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs?: Tab[];
}

export default function TabNavigation({
  activeTab,
  onTabChange,
  tabs = defaultTabs,
}: TabNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="overflow-x-auto no-scrollbar">
        <nav className="flex px-4 md:px-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-[13px] md:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[#2d7dd2] border-[#2d7dd2]"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
