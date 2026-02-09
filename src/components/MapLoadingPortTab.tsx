'use client';

import { useState } from 'react';

const JenisKapal = ['All', 'Penumpang', 'Perintis', 'Tol Laut']
const modaTypes = ['All', 'Truck', 'Vessel', 'Pipeline'];
const productTypes = ['B-40'];
const clients = ['PT.PELNI (Persero)'];

export default function MapLoadingPortTab() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedJenisKapal, setSelectedJenisKapal] = useState('All');
  const [selectedModa, setSelectedModa] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [client, setClient] = useState('PT.PLN (Persero)');

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">Map Discharge Port</h2>
          </div>
        </div>

        <div className="p-5">
          {/* Filter Duration */}
          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-md">
            <p className="text-sm text-gray-500 mb-3">Filter Duration</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <label className="text-xs text-gray-400 block">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </div>
              <span className="text-gray-300 text-xl">›</span>
              <div>
                <label className="text-xs text-gray-400 block">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md">
              Apply Filter
            </button>
          </div>

          {/* Jenis Kapal */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Jenis Kapal</span>
            <div className="flex gap-2">
              {JenisKapal.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedJenisKapal(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedJenisKapal === type
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Moda Type */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Moda Supply</span>
            <div className="flex gap-2">
              {modaTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedModa(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedModa === type
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Product Type */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Product Type</span>
            <div className="flex flex-wrap gap-2">
              {productTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedProduct(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedProduct === type
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Client */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-600 w-24">Client</span>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[200px]"
            >
              {clients.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Map Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <span className="text-sm text-gray-600">All Transportation with All Cargo (Latest this Month)</span>
            </div>
            <div className="relative h-[450px] bg-blue-50">
              {/* Map Placeholder - will be replaced with actual Leaflet map */}
              <div className="absolute inset-0">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=95.0%2C-11.0%2C141.0%2C6.0&amp;layer=mapnik"
                  style={{ width: '100%', height: '100%', border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
              
              {/* Zoom Controls */}
              <div className="absolute left-3 top-3 flex flex-col gap-0.5 z-10">
                <button className="w-8 h-8 bg-white rounded-t shadow flex items-center justify-center hover:bg-gray-50 border border-gray-300">
                  <span className="text-lg font-bold text-gray-600">+</span>
                </button>
                <button className="w-8 h-8 bg-white rounded-b shadow flex items-center justify-center hover:bg-gray-50 border border-gray-300 border-t-0">
                  <span className="text-lg font-bold text-gray-600">−</span>
                </button>
              </div>

              {/* Data Map Information Panel */}
              <div className="absolute left-3 bottom-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
                <h4 className="font-semibold text-sm text-gray-800 mb-2">Data Map Information</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Location</span>
                    <span className="font-medium text-gray-700">43 TBBM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Frequency</span>
                    <span className="font-medium text-gray-700">1,679 Activities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Volume</span>
                    <span className="font-medium text-gray-700">58,066.07 KL</span>
                  </div>
                </div>
              </div>

              {/* Attribution */}
              <div className="absolute right-1 bottom-1 text-[10px] text-gray-500 bg-white/80 px-1 rounded z-10">
                🍃 Leaflet | © OpenStreetMap contributors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
