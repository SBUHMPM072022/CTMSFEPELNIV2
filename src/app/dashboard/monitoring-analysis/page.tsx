"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import MapLoadingPortTab from "@/components/MapLoadingPortTab";
import QualityDetailTab from "@/components/QualityDetailTab";
import GraphicAnalysisTab from "@/components/GraphicAnalysisTab";
import TotalDataTab from "@/components/TotalDataTab";
import SummaryTab from "@/components/SummaryTab";
import ROBTab from "@/components/ROBTab";

const monitoringTabs = [
  { id: "map-loading-port", label: "MAP LOCATION" },
  { id: "grafik-analysis", label: "GRAPHIC ANALYSIS" },
  { id: "total-data", label: "TOTAL DATA" },
  { id: "summary", label: "SUMMARY" },
  { id: "quality-detail", label: "QUALITY DETAIL" },
  { id: "rob", label: "ROB" },
];

export default function MonitoringAnalysisPage() {
  const [activeTab, setActiveTab] = useState("map-loading-port");

  const renderTabContent = () => {
    switch (activeTab) {
      case "map-loading-port":
        return <MapLoadingPortTab />;
      case "grafik-analysis":
        return <GraphicAnalysisTab />;
      case "total-data":
        return <TotalDataTab />;
      case "summary":
        return <SummaryTab />;
      case "quality-detail":
        return <QualityDetailTab />;
      case "rob":
        return <ROBTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard — Monitoring & Analysis" userName="Admin" />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={monitoringTabs} />
        <main className="flex-1 overflow-auto">{renderTabContent()}</main>
      </div>
    </div>
  );
}
