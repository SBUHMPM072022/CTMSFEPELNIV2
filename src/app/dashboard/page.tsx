'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import MapLoadingPortTab from '@/components/MapLoadingPortTab';
import QualityDetailTab from '@/components/QualityDetailTab';
import GraphicAnalysisTab from '@/components/GraphicAnalysisTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('map-loading-port');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map-loading-port':
        return <MapLoadingPortTab />;
      case 'grafik-analysis':
        return <GraphicAnalysisTab />;
      case 'quality-detail':
        return <QualityDetailTab />;
      case 'total-data':
      case 'time-series':
      case 'quantity-detail':
      case 'vessel-monitoring':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <p className="text-gray-400">Content for this tab will be available soon.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Dashboard" userName="Admin" />
        
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
