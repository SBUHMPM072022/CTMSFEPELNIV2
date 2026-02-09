'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface TableRow {
  id: string;
  cabang: string;
  kapalPelni: string;
  workDate: string;
  mode: string;
  intervention: string;
  volume: string;
  status: string;
  createdUser: string;
  createdDate: string;
  updatedUser: string;
}

const mockData: TableRow[] = [
  { id: '158430', cabang: 'AMBON', kapalPelni: 'KM PANGRANGO', workDate: '2026-01-27', mode: 'Kapal', intervention: 'Discharge', volume: '45', status: 'FR', createdUser: 'sci-palu', createdDate: '2026-01-28', updatedUser: '' },
  { id: '158429', cabang: 'AMBON', kapalPelni: 'KM SANGIANG', workDate: '2026-01-27', mode: 'Kapal', intervention: 'Loading', volume: '76', status: 'FR', createdUser: 'sci-palu', createdDate: '2026-01-28', updatedUser: '' },
  { id: '158428', cabang: 'AMBON', kapalPelni: 'KM PANGRANGO', workDate: '2026-01-27', mode: 'Kapal', intervention: 'Loading', volume: '55', status: 'FR', createdUser: 'sci-ambon', createdDate: '2026-01-28', updatedUser: '' },
  { id: '158427', cabang: 'BALIKPAPAN', kapalPelni: 'KM BUKIT SIGUNTANG', workDate: '2026-01-28', mode: 'Kapal', intervention: 'Loading', volume: '0', status: 'FR', createdUser: 'sci-denpasar', createdDate: '2026-01-28', updatedUser: '' },
  { id: '158426', cabang: 'BALIKPAPAN', kapalPelni: 'KM LAMBELU', workDate: '2026-01-26', mode: 'Kapal', intervention: 'Loading', volume: '118.386', status: 'FR', createdUser: 'sci-denpasar', createdDate: '2026-01-27', updatedUser: '' },
  { id: '158425', cabang: 'BITUNG', kapalPelni: 'KM TILONG KABILA', workDate: '2026-01-26', mode: 'Truck', intervention: 'Loading', volume: '3.8', status: 'FR', createdUser: 'sci-tarakan', createdDate: '2026-01-27', updatedUser: '' },
  { id: '158424', cabang: 'BITUNG', kapalPelni: 'KM TATAMAILAU', workDate: '2026-01-26', mode: 'Truck', intervention: 'Loading', volume: '3.8', status: 'FR', createdUser: 'sci-tarakan', createdDate: '2026-01-27', updatedUser: '' },
  { id: '158423', cabang: 'KENDARI', kapalPelni: 'KM JETLINER', workDate: '2026-01-27', mode: 'Truck', intervention: 'Loading', volume: '222', status: 'FR', createdUser: 'sci-kendari', createdDate: '2026-01-27', updatedUser: '' },
  { id: '158422', cabang: 'KENDARI', kapalPelni: 'KM JETLINER', workDate: '2026-01-27', mode: 'Truck', intervention: 'Loading', volume: '124', status: 'FR', createdUser: 'sci-kendari', createdDate: '2026-01-27', updatedUser: '' },
  { id: '158421', cabang: 'KUPANG', kapalPelni: 'KM SIRIMAU', workDate: '2026-01-26', mode: 'Truck', intervention: 'Loading', volume: '5', status: 'FR', createdUser: 'sci-tarakan', createdDate: '2026-01-27', updatedUser: '' },
];

export default function FormEntryPage() {
  const [isSimpleTable, setIsSimpleTable] = useState(true);
  const [bunkerSurvey, setBunkerSurvey] = useState('');
  const [moda, setModa] = useState('');

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Form Entry" />

        <div className="p-8 flex-1 overflow-x-hidden">
          {/* Create New Activity Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Create New Activity</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <input 
                  type="text" 
                  value={bunkerSurvey}
                  onChange={(e) => setBunkerSurvey(e.target.value)}
                  placeholder="Bunker Survey"
                  className="w-full px-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600 placeholder-gray-400"
                  list="bunker-options"
                />
                <datalist id="bunker-options">
                  <option value="Loading" />
                  <option value="Discharge" />
                </datalist>
              </div>
              <div className="relative w-64">
                <input 
                  type="text" 
                  value={moda}
                  onChange={(e) => setModa(e.target.value)}
                  placeholder="Moda"
                  className="w-full px-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600 placeholder-gray-400"
                   list="moda-options"
                />
                 <datalist id="moda-options">
                  <option value="Kapal" />
                  <option value="Truk" />
                  <option value="Pipe" />
                </datalist>
              </div>
              <button className="bg-[#0091d0] hover:bg-[#007bb0] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Create Data
              </button>
            </div>
          </div>

          {/* List Activities Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-800">List Activities</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSimpleTable(!isSimpleTable)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isSimpleTable ? 'bg-[#2d7dd2]' : 'bg-gray-200'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isSimpleTable ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className="text-sm text-gray-600 font-medium">Simple Table</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-left min-w-[50px] text-xs font-semibold text-gray-500 uppercase tracking-wider">...</th>
                    <th className="p-3 text-left min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Cabang</th>
                    <th className="p-3 text-left min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Kapal Pelni</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Work Date</th>
                    <th className="p-3 text-left min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Mode</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Intervention</th>
                    <th className="p-3 text-left min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Volume</th>
                    <th className="p-3 text-left min-w-[60px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Created User</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Created Date</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated User</th>
                    <th className="p-3 text-left min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Id</th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Function</th>
                  </tr>
                  {/* Filter Row */}
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="p-2"></td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <div className="relative">
                         <input type="text" placeholder="2026" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                         <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">✕</span>
                       </div>
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                    <td className="p-2">
                       <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400" />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-xs text-gray-500">{index + 1}</td>
                      <td className="p-3 text-xs font-bold text-gray-800">{row.cabang}</td>
                      <td className="p-3 text-xs font-bold text-gray-800">{row.kapalPelni}</td>
                      <td className="p-3 text-xs text-gray-600">{row.workDate}</td>
                      <td className="p-3 text-xs text-gray-600">{row.mode}</td>
                      <td className="p-3 text-xs text-gray-600">{row.intervention}</td>
                      <td className="p-3 text-xs text-gray-600">{row.volume}</td>
                      <td className="p-3 text-xs text-gray-600">{row.status}</td>
                      <td className="p-3 text-xs text-gray-600">{row.createdUser}</td>
                      <td className="p-3 text-xs text-gray-600">{row.createdDate}</td>
                      <td className="p-3 text-xs text-gray-600">{row.updatedUser}</td>
                      <td className="p-3 text-xs font-bold text-gray-700 flex items-center gap-1">
                        {row.id}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button className="bg-blue-500 p-1 rounded hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="bg-red-500 p-1 rounded hover:bg-red-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <button className="bg-green-500 p-1 rounded hover:bg-green-600 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                 <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                 </button>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Page</span>
                    <input type="number" min="1" max="134" defaultValue="1" className="w-12 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-blue-400" />
                    <span>of 134</span>
                 </div>
                 <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                 </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                   <span>Results per page</span>
                   <select className="border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 bg-white">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                   </select>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                   <span>Showing 1 - 10 of 1,337</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
