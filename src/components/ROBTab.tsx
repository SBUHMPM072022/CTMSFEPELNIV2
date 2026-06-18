"use client";

import { useState } from "react";
import { parseDateString } from "@/utils/dateHelper";

interface ROBRow {
  no: number;
  namaKapal: string;
  dateROBSurvey: string;
  robQuantity: number;
  logBook: number;
}

const robDataMock: ROBRow[] = [
  {
    no: 1,
    namaKapal: "KM Logistik Nusantara 4",
    dateROBSurvey: "23-Des-25",
    robQuantity: 35.073,
    logBook: 0,
  },
];

export default function ROBTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [client, setClient] = useState("PT.PELNI(Persero)");
  const [vesselFilter, setVesselFilter] = useState("");

  // Filter data by vessel name
  const filteredData = robDataMock.filter((row) => {
    const matchVessel = vesselFilter
      ? row.namaKapal.toLowerCase().includes(vesselFilter.toLowerCase())
      : true;

    let matchDate = true;
    if (appliedFilterDate) {
      const rowDate = parseDateString(row.dateROBSurvey);
      const inputDate = new Date(appliedFilterDate);
      if (rowDate) {
        matchDate =
          rowDate.getFullYear() === inputDate.getFullYear() &&
          rowDate.getMonth() === inputDate.getMonth() &&
          rowDate.getDate() === inputDate.getDate();
      } else {
        matchDate = false;
      }
    }

    return matchVessel && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    setPageInput("1");
  };

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    setPageInput(String(p));
  };

  const handlePageInputSubmit = () => {
    const p = parseInt(pageInput);
    if (!isNaN(p)) goToPage(p);
  };

  const handleFilterDuration = () => {
    setAppliedFilterDate(filterDate);
    setCurrentPage(1);
    setPageInput("1");
  };

  const handleDownload = () => {
    const headers = [
      "No",
      "Nama Kapal",
      "Date R.O.B Survey",
      "ROB Quantity",
      "Log Book",
      "Different",
    ];
    const rows = filteredData.map((row) => [
      row.no,
      row.namaKapal,
      row.dateROBSurvey,
      row.robQuantity,
      row.logBook,
      (row.logBook - row.robQuantity).toFixed(3),
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rob_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to format numbers
  const formatIndo = (val: number, decimals: number = 3) => {
    return val.toLocaleString("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format difference: negative values shown as (value) with parentheses
  const formatDiff = (val: number, decimals: number = 3) => {
    if (val < 0) {
      return `(${Math.abs(val).toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })})`;
    }
    return val.toLocaleString("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="p-4 md:p-6 flex-1 overflow-x-hidden">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              ROB (Remaining On Board)
            </h2>
          </div>
        </div>

        <div className="p-5">
          {/* Filter Duration */}
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
              <div className="flex-1">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleFilterDuration}
              className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md"
            >
              Apply Filter
            </button>
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 md:mb-6 items-end">
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-sm font-medium text-gray-600">Client</span>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="PT.PELNI(Persero)">PT.PELNI(Persero)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-sm font-medium text-gray-600">Vessel</span>
              <div className="relative">
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
                  placeholder="Cari nama vessel..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                {vesselFilter && (
                  <button
                    onClick={() => {
                      setVesselFilter("");
                      setCurrentPage(1);
                      setPageInput("1");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col min-w-0 lg:col-start-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white text-sm font-medium rounded-lg hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md active:scale-[0.98]"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {/* Group Headers (Row 1) */}
                <tr className="border-b border-gray-200">
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[50px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[180px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Nama Kapal
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[130px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Date R.O.B Survey
                  </th>
                  <th
                    colSpan={2}
                    className="p-2 text-center text-[10px] font-semibold text-[#2d7dd2] uppercase tracking-wider bg-blue-50/60 border-b border-blue-100"
                  >
                    Diesel Oil Vol Obs (KL)
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Different
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[60px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Download
                  </th>
                </tr>
                {/* Sub-column Headers (Row 2) */}
                <tr className="border-b border-gray-200">
                  <th className="p-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider min-w-[120px] whitespace-nowrap">
                    ROB Quantity
                  </th>
                  <th className="p-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider min-w-[120px] whitespace-nowrap">
                    Log Book
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => {
                  const different = row.logBook - row.robQuantity;
                  return (
                    <tr
                      key={row.no}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-xs text-gray-500">{row.no}</td>
                      <td className="p-3 text-xs font-bold text-gray-800 whitespace-nowrap">
                        {row.namaKapal}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center whitespace-nowrap">
                        {row.dateROBSurvey}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.robQuantity)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.logBook)}
                      </td>
                      <td className="p-3 text-xs font-bold text-center text-gray-800">
                        {formatIndo(different)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            alert(`Download folder for ${row.namaKapal}`)
                          }
                          className="bg-green-500 p-1 rounded hover:bg-green-600 transition-colors"
                          title={`Download folder ${row.namaKapal}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* Summary Footer */}
              {filteredData.length > 0 && (
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td
                      className="p-3 text-xs font-extrabold text-gray-800 text-center"
                      colSpan={3}
                    >
                      TOTAL = {filteredData.length} KAPAL
                    </td>
                    <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                      {formatIndo(
                        filteredData.reduce(
                          (sum, row) => sum + row.robQuantity,
                          0,
                        ),
                      )}
                    </td>
                    <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                      {formatIndo(
                        filteredData.reduce((sum, row) => sum + row.logBook, 0),
                      )}
                    </td>
                    <td className="p-3 text-xs font-extrabold text-gray-800 text-center">
                      {formatDiff(
                        filteredData.reduce(
                          (sum, row) => sum + (row.logBook - row.robQuantity),
                          0,
                        ),
                      )}
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
                  onBlur={handlePageInputSubmit}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handlePageInputSubmit()
                  }
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
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
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
    </div>
  );
}
