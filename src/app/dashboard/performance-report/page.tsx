"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import PelaksanaanKapalTab from "@/components/PelaksanaanKapalTab";
import NoonReportTab from "@/components/NoonReportTab";

const performanceTabs = [
  { id: "pelaksanaan-kapal", label: "PELAKSANAAN KAPAL" },
  { id: "noon-report", label: "NOON REPORT - BBM PELUMAS" },
];

export default function PerformanceReportPage() {
  const [activeTab, setActiveTab] = useState("pelaksanaan-kapal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "pelaksanaan-kapal":
        return <PelaksanaanKapalTab />;
      case "noon-report":
        return <NoonReportTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard — Performance & Report" userName="Admin" />
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={performanceTabs}
        />
        <main className="flex-1 overflow-auto">{renderTabContent()}</main>
      </div>
    </div>
  );
}
