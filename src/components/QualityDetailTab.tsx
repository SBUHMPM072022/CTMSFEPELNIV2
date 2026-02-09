'use client';

import { useState } from 'react';

interface QualityDetailData {
  id: string;
  workDate: string;
  dateOfAnalysis: string;
  loadingPort: string;
  moda: string;
  product: string;
  result: 'On Spec' | 'Off Spec' | 'Not Valid' | 'Invalid';
  qualityDetail?: {
    spec1: string;
    result1: string;
    density15C: string;
    spec2: string;
    result2: string;
    waterContent: string;
    spec3: string;
    appearance: string;
  };
}

const mockData: QualityDetailData[] = [
  {
    id: '159189',
    workDate: '2026-02-04',
    dateOfAnalysis: '-',
    loadingPort: 'TBBM PERTAMINA JAYAPURA',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'Not Valid',
    qualityDetail: {
      spec1: '-', result1: '-', density15C: '-',
      spec2: '-', result2: '-', waterContent: '-',
      spec3: '-', appearance: '-'
    }
  },
  {
    id: '159188',
    workDate: '2026-02-07',
    dateOfAnalysis: '-',
    loadingPort: 'JOBBER KETAPANG',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'Not Valid',
    qualityDetail: {
      spec1: '-', result1: '-', density15C: '-',
      spec2: '-', result2: '-', waterContent: '-',
      spec3: '-', appearance: '-'
    }
  },
  {
    id: '159187',
    workDate: '2026-02-07',
    dateOfAnalysis: '2026-01-22',
    loadingPort: 'TBBM PERTAMINA MANGGIS',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'On Spec',
  },
  {
    id: '159186',
    workDate: '2026-02-06',
    dateOfAnalysis: '-',
    loadingPort: 'JOBBER KETAPANG',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'Not Valid',
  },
  {
    id: '159185',
    workDate: '2026-02-06',
    dateOfAnalysis: '-',
    loadingPort: 'TBBM PERTAMINA PULAU BAAI',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'Not Valid',
  },
  {
    id: '159184',
    workDate: '2026-02-06',
    dateOfAnalysis: '2026-02-02',
    loadingPort: 'TBBM PERTAMINA KOLONODALE',
    moda: 'Truck',
    product: 'BIOSOLAR B-40',
    result: 'Off Spec',
  },
];

const resultTypes = ['All', 'On Spec', 'Off Spec', 'Invalid'];
const loadingPorts = ['Search Loading Port', 'TBBM PERTAMINA JAYAPURA', 'JOBBER KETAPANG', 'TBBM PERTAMINA MANGGIS'];
const clients = ['PT.PELNI(Persero)'];

export default function QualityDetailTab() {
  const [startDate, setStartDate] = useState('2026-02-01');
  const [endDate, setEndDate] = useState('');
  const [selectedResult, setSelectedResult] = useState('All');
  const [loadingPort, setLoadingPort] = useState('Search Loading Port');
  const [client, setClient] = useState('PT.PLN (Persero)');
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getResultStyle = (result: string) => {
    switch (result) {
      case 'On Spec':
        return 'bg-green-500 text-white';
      case 'Off Spec':
        return 'bg-orange-500 text-white';
      case 'Not Valid':
      case 'Invalid':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">Quality Detail Loading</h2>
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
                  placeholder="dd/mm/yyyy"
                  className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md">
              Apply Filter
            </button>
          </div>

          {/* Result Filter */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Result</span>
            <div className="flex gap-2">
              {resultTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedResult(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedResult === type
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Port */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Loading Port</span>
            <select
              value={loadingPort}
              onChange={(e) => setLoadingPort(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[200px]"
            >
              {loadingPorts.map((port) => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
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

          {/* Data Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-10 px-3 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Analysis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading Port</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moda</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockData.map((row) => (
                  <>
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <button 
                          onClick={() => toggleRow(row.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 text-gray-400 transition-transform ${expandedRows.includes(row.id) ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.workDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.dateOfAnalysis}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">{row.loadingPort}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.moda}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.product}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResultStyle(row.result)}`}>
                          {row.result}
                        </span>
                      </td>
                    </tr>
                    {expandedRows.includes(row.id) && row.qualityDetail && (
                      <tr key={`${row.id}-detail`} className="bg-gray-50">
                        <td colSpan={8} className="px-8 py-4">
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Information Quality Detail
                            </h4>
                            <div className="grid grid-cols-8 gap-4 text-sm">
                              <div><span className="text-gray-500 block text-xs">Spec</span><span className="text-gray-700">{row.qualityDetail.spec1}</span></div>
                              <div><span className="text-gray-500 block text-xs">Result</span><span className="text-gray-700">{row.qualityDetail.result1}</span></div>
                              <div><span className="text-gray-500 block text-xs">Density@15C</span><span className="text-gray-700">{row.qualityDetail.density15C}</span></div>
                              <div><span className="text-gray-500 block text-xs">Spec</span><span className="text-gray-700">{row.qualityDetail.spec2}</span></div>
                              <div><span className="text-gray-500 block text-xs">Result</span><span className="text-gray-700">{row.qualityDetail.result2}</span></div>
                              <div><span className="text-gray-500 block text-xs">Water Content</span><span className="text-gray-700">{row.qualityDetail.waterContent}</span></div>
                              <div><span className="text-gray-500 block text-xs">Spec</span><span className="text-gray-700">{row.qualityDetail.spec3}</span></div>
                              <div><span className="text-gray-500 block text-xs">Appearance</span><span className="text-gray-700">{row.qualityDetail.appearance}</span></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
