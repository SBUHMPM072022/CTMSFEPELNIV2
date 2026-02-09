'use client';

import { useState } from 'react';

interface FilterSectionProps {
  onFilterApply?: (filters: FilterState) => void;
}

interface FilterState {
  startDate: string;
  endDate: string;
  JenisKapal: string;
  modaType: string;
  productType: string;
  client: string;
}
const JenisKapal = ['All', 'Penumpang', 'Perintis', 'Tol Laut']
const modaTypes = ['All', 'Truck', 'Vessel', 'Pipeline'];
const productTypes = ['B-40'];
const clients = ['PT.PELNI (Persero)'];

export default function FilterSection({ onFilterApply }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    JenisKapal: 'All',
    modaType: 'All',
    productType: 'All',
    client: 'PT.PELNI(Persero)',
  });

  const handleJenisKapalChange = (type: string) => {
    setFilters((prev) => ({ ...prev, JenisKapal: type }));
  };

  const handleModaTypeChange = (type: string) => {
    setFilters((prev) => ({ ...prev, modaType: type }));
  };

  const handleProductTypeChange = (type: string) => {
    setFilters((prev) => ({ ...prev, productType: type }));
  };

  const handleApplyFilter = () => {
    onFilterApply?.(filters);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-800">Map Location Port</h2>
      </div>

      {/* Date Filter */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-3">Filter Duration</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <label className="text-xs text-gray-500">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
          <span className="text-gray-400">›</span>
          <div className="flex-1">
            <label className="text-xs text-gray-500">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>
        <button
          onClick={handleApplyFilter}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          Apply Filter
        </button>
      </div>

      {/* Jenis Kapal */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-3 block">Jenis Kapal</label>
        <div className="flex flex-wrap gap-2">
          {JenisKapal.map((type) => (
            <button
              key={type}
              onClick={() => handleJenisKapalChange(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.JenisKapal === type
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Moda Type */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-3 block">Moda Type</label>
        <div className="flex flex-wrap gap-2">
          {modaTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleModaTypeChange(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.modaType === type
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Product Type */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-3 block">Product Type</label>
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleProductTypeChange(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.productType === type
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Client */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-3 block">Client</label>
        <select
          value={filters.client}
          onChange={(e) => setFilters((prev) => ({ ...prev, client: e.target.value }))}
          className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {clients.map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
