"use client";

import { useState } from "react";

interface NoonReportRow {
  id: string;
  no: number;
  vesselName: string;
  voyage: string;
  time: string;
  date: string;
  totalQuantity: string;
  tangkiDetails: { name: string; cm: string; liter: string }[];
}

const mockData: NoonReportRow[] = [
  {
    id: "NR-160001",
    no: 1,
    vesselName: "KM PANGRANGO",
    voyage: "V.01",
    time: "12:00",
    date: "2026-01-01",
    totalQuantity: "1500",
    tangkiDetails: [
      { name: "Tangki 1", cm: "100", liter: "1000" },
      { name: "Tangki 2", cm: "50", liter: "500" },
    ],
  },
  {
    id: "NR-160002",
    no: 2,
    vesselName: "KM SANGIANG",
    voyage: "V.02",
    time: "14:30",
    date: "2026-01-02",
    totalQuantity: "2200",
    tangkiDetails: [
      { name: "Tangki A", cm: "120", liter: "1200" },
      { name: "Tangki B", cm: "100", liter: "1000" },
    ],
  },
  {
    id: "NR-160003",
    no: 3,
    vesselName: "KM LAMBELU",
    voyage: "V.03",
    time: "09:15",
    date: "2026-01-11",
    totalQuantity: "3100",
    tangkiDetails: [
      { name: "Tangki Utama", cm: "150", liter: "1500" },
      { name: "Tangki Cadangan", cm: "160", liter: "1600" },
    ],
  },
];

export default function NoonReportTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");
  const [vesselFilter, setVesselFilter] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  
  // Modal state
  const [selectedRow, setSelectedRow] = useState<NoonReportRow | null>(null);

  const filteredData = mockData.filter((row) => {
    const matchVessel = vesselFilter
      ? row.vesselName.toLowerCase().includes(vesselFilter.toLowerCase())
      : true;
    let matchDate = true;
    if (appliedFilterDate) {
      matchDate = row.date === appliedFilterDate;
    }
    return matchVessel && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    setPageInput(String(p));
  };



  const grandTotalQuantity = filteredData.reduce(
    (s, r) => s + parseFloat(r.totalQuantity || "0"),
    0
  );

  return (
    <div className="p-4 md:p-6 flex-1 overflow-x-hidden relative">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              Noon Report - Fuel & Lubricant
            </h2>
          </div>
        </div>

        <div className="p-5">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <p className="text-xs text-blue-600 font-medium mb-1">
                Total Quantity
              </p>
              <p className="text-lg font-bold text-blue-800">
                {grandTotalQuantity.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-md">
            <p className="text-sm text-gray-500 mb-3">Filter Duration</p>
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => {
                setAppliedFilterDate(filterDate);
                setCurrentPage(1);
                setPageInput("1");
              }}
              className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md"
            >
              Apply Filter
            </button>
          </div>

          {/* Vessel Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Vessel
              </span>
              <div className="relative w-full sm:w-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={vesselFilter}
                  onChange={(e) => {
                    setVesselFilter(e.target.value);
                    setCurrentPage(1);
                    setPageInput("1");
                  }}
                  placeholder="Search vessel name..."
                  className="w-full sm:w-auto pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:min-w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 text-left min-w-[40px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="p-3 text-left min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Vessel Name
                  </th>
                  <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Voyage
                  </th>
                  <th className="p-3 text-center min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="p-3 text-center min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-3 text-center min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Quantity
                  </th>
                  <th className="p-3 text-center min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Function
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-xs text-gray-500">{row.no}</td>
                    <td className="p-3 text-xs font-bold text-gray-800 whitespace-nowrap">
                      {row.vesselName}
                    </td>
                    <td className="p-3 text-xs font-medium text-gray-700">
                      {row.voyage}
                    </td>
                    <td className="p-3 text-xs text-gray-600 text-center">
                      {row.time}
                    </td>
                    <td className="p-3 text-xs text-gray-600 text-center">
                      {row.date}
                    </td>
                    <td className="p-3 text-xs text-gray-800 font-bold text-center bg-blue-50/30">
                      {row.totalQuantity}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedRow(row)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1.5 rounded transition-colors inline-flex items-center justify-center"
                        title="View Info"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {filteredData.length > 0 && (
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td
                      colSpan={5}
                      className="p-3 text-xs font-extrabold text-gray-800 text-right"
                    >
                      TOTAL
                    </td>
                    <td className="p-3 text-xs font-extrabold text-blue-700 text-center">
                      {grandTotalQuantity.toLocaleString()}
                    </td>
                    <td className="p-3"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col lg:flex-row items-center justify-between border-t border-gray-100 pt-4 gap-6">
            <div className="flex items-center gap-4 order-2 lg:order-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span>Page</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onBlur={() => {
                    const p = parseInt(pageInput);
                    if (!isNaN(p)) goToPage(p);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const p = parseInt(pageInput);
                      if (!isNaN(p)) goToPage(p);
                    }
                  }}
                  className="w-12 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20"
                />
                <span>of {totalPages}</span>
              </div>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 lg:order-2 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="whitespace-nowrap">Results per page</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                    setPageInput("1");
                  }}
                  className="border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 bg-white"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="whitespace-nowrap">
                  Showing {Math.min(startIndex + 1, filteredData.length)} -{" "}
                  {endIndex} of {filteredData.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Submitted Input Details
              </h3>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vessel Name</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedRow.vesselName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Voyage</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedRow.voyage}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedRow.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedRow.date}
                  </p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">
                Tabel Tangki
              </h4>
              <div className="bg-gray-50 rounded border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Tangki
                      </th>
                      <th className="px-3 py-2 text-right font-semibold text-gray-600">
                        CM
                      </th>
                      <th className="px-3 py-2 text-right font-semibold text-gray-600">
                        Liter
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRow.tangkiDetails && selectedRow.tangkiDetails.length > 0 ? (
                      selectedRow.tangkiDetails.map((td, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-3 py-2 text-gray-800">
                            {td.name || "-"}
                          </td>
                          <td className="px-3 py-2 text-right text-gray-800">
                            {td.cm}
                          </td>
                          <td className="px-3 py-2 text-right text-gray-800 font-medium">
                            {td.liter}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 py-4 text-center text-gray-500 italic">No details available</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-blue-50 border-t border-gray-200">
                    <tr>
                      <td colSpan={2} className="px-3 py-2 text-right font-bold text-gray-800">
                        Total Quantity
                      </td>
                      <td className="px-3 py-2 text-right font-bold text-blue-700">
                        {selectedRow.totalQuantity}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
              <button
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

