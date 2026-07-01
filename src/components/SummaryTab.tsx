"use client";

import { useState, Fragment } from "react";
import { totalDataMock } from "@/data/totalDataMock";

interface VesselDetail {
  vessel: string;
  tanggalBerangkat: string;
  tanggalTiba: string;
  pemakaian: number;
  no: number;
}

interface VesselSummary {
  vessel: string;
  totalPemakaian: number;
  details: VesselDetail[];
}

function buildSummaryData(monthFilter?: string): VesselSummary[] {
  // Group by vessel name
  const vesselMap = new Map<
    string,
    { totalPemakaian: number; rawDetails: { date: string; pemakaian: number; no: number }[] }
  >();

  for (const row of totalDataMock) {
    if (monthFilter) {
      const parts = row.loadingFieldDate?.split("-") || [];
      const rowMonth = parts.length === 3 ? `${parts[1]}-${parts[2]}` : "";
      if (rowMonth !== monthFilter) continue;
    }
    const vesselName = row.vessel;
    // Estimasi Pemakaian = Ship Received KL - ROB (Pelni) KL
    // ROB (Pelni) = Before Discharge - After Discharge
    const robPelni =
      row.bargeFigBeforeDischarge.kl - row.bargeFigAfterDischarge.kl;
    const estimasiPemakaian = row.shipReceived.kl - robPelni;

    if (!vesselMap.has(vesselName)) {
      vesselMap.set(vesselName, { totalPemakaian: 0, rawDetails: [] });
    }
    const entry = vesselMap.get(vesselName)!;
    entry.totalPemakaian += estimasiPemakaian;
    entry.rawDetails.push({
      date: row.loadingFieldDate,
      pemakaian: estimasiPemakaian,
      no: row.no,
    });
  }

  // Build summary array and group raw details into pairs (Berangkat & Tiba)
  const summaries: VesselSummary[] = [];
  vesselMap.forEach((entry, vessel) => {
    // Sort raw details by no to ensure correct chronological order
    entry.rawDetails.sort((a, b) => a.no - b.no);

    const groupedDetails: VesselDetail[] = [];
    for (let i = 0; i < entry.rawDetails.length; i += 2) {
      const current = entry.rawDetails[i];
      const next = entry.rawDetails[i + 1];

      groupedDetails.push({
        vessel,
        tanggalBerangkat: current.date,
        tanggalTiba: next ? next.date : "",
        pemakaian: current.pemakaian + (next ? next.pemakaian : 0),
        no: current.no,
      });
    }

    summaries.push({
      vessel,
      totalPemakaian: entry.totalPemakaian,
      details: groupedDetails,
    });
  });

  // Sort alphabetically by vessel name
  summaries.sort((a, b) => a.vessel.localeCompare(b.vessel));
  return summaries;
}

// Helper to format numbers with Indonesian style (comma decimal) and 3 decimals
const formatIndo = (val: number, decimals: number = 3) => {
  return val.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const availableMonths = Array.from(
  new Set(
    totalDataMock
      .map((row) => {
        const parts = row.loadingFieldDate?.split("-");
        return parts?.length === 3 ? `${parts[1]}-${parts[2]}` : "";
      })
      .filter((m) => m !== "")
  )
);

const formatMonthLabel = (m: string) => {
  const [mon, yr] = m.split("-");
  const monthsMap: Record<string, string> = {
    Jan: "Januari", Feb: "Februari", Mar: "Maret", Apr: "April",
    May: "Mei", Jun: "Juni", Jul: "Juli", Aug: "Agustus",
    Sep: "September", Oct: "Oktober", Nov: "November", Dec: "Desember"
  };
  return `${monthsMap[mon] || mon} 20${yr}`;
};

export default function SummaryTab() {
  const [monthFilter, setMonthFilter] = useState("");
  const summaryData = buildSummaryData(monthFilter);
  const [vesselFilter, setVesselFilter] = useState("");
  const [expandedVessels, setExpandedVessels] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");

  const filteredData = vesselFilter
    ? summaryData.filter((row) =>
        row.vessel.toLowerCase().includes(vesselFilter.toLowerCase())
      )
    : summaryData;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calculate grand total (across ALL filtered data, not just current page)
  const grandTotal = filteredData.reduce(
    (sum, row) => sum + row.totalPemakaian,
    0
  );

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

  const toggleExpand = (vessel: string) => {
    setExpandedVessels((prev) => {
      const next = new Set(prev);
      if (next.has(vessel)) {
        next.delete(vessel);
      } else {
        next.add(vessel);
      }
      return next;
    });
  };

  return (
    <div className="p-3 md:p-6 flex-1 overflow-x-hidden">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-3 md:p-5 border-b border-gray-100">
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
            <h2 className="text-base font-semibold text-gray-800">Summary</h2>
          </div>
        </div>

        <div className="p-3 md:p-5">
          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 md:mb-6 items-end">
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

            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-sm font-medium text-gray-600">Bulan</span>
              <select
                value={monthFilter}
                onChange={(e) => {
                  setMonthFilter(e.target.value);
                  setCurrentPage(1);
                  setPageInput("1");
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer h-[34px]"
              >
                <option value="">Semua Periode</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {formatMonthLabel(m)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2d7dd2] to-[#45a3e5] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Kapal
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {filteredData.length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2d7dd2] to-[#45a3e5] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pemakaian
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {formatIndo(grandTotal)}{" "}
                <span className="text-sm font-medium text-gray-500">KL</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2d7dd2] to-[#45a3e5] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periode
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800 mt-1">
                {monthFilter ? formatMonthLabel(monthFilter) : "Semua Periode"}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5]">
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider w-[60px]">
                    No
                  </th>
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Nama Kapal
                  </th>
                  <th className="p-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Pemakaian
                  </th>
                  <th className="p-3 text-center text-xs font-semibold text-white uppercase tracking-wider w-[60px]">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => {
                  const isExpanded = expandedVessels.has(row.vessel);
                  return (
                    <Fragment key={row.vessel}>
                      {/* Main vessel row */}
                      <tr
                        key={row.vessel}
                        onClick={() => toggleExpand(row.vessel)}
                        className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors cursor-pointer ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        } ${isExpanded ? "bg-blue-50/60" : ""}`}
                      >
                        <td className="p-3 text-sm text-gray-500">
                          {startIndex + index + 1}
                        </td>
                        <td className="p-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {row.vessel}
                          <span className="ml-2 text-xs text-gray-400 font-normal">
                            ({row.details.length} data)
                          </span>
                        </td>
                        <td className="p-3 text-sm font-semibold text-gray-800 text-right whitespace-nowrap">
                          {formatIndo(row.totalPemakaian)}{" "}
                          <span className="text-gray-400 font-normal">KL</span>
                        </td>
                        <td className="p-3 text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 text-gray-400 mx-auto transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </td>
                      </tr>

                      {/* Expanded detail rows */}
                      {isExpanded && (
                        <tr key={`${row.vessel}-detail`}>
                          <td colSpan={4} className="p-0">
                            <div className="bg-slate-50 border-b border-gray-200">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-slate-100/80">
                                    <th className="py-2 px-4 pl-12 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider w-[60px]">
                                      No
                                    </th>
                                    <th className="py-2 px-4 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                      Nama Kapal
                                    </th>
                                    <th className="py-2 px-4 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                      Tanggal Berangkat
                                    </th>
                                    <th className="py-2 px-4 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                      Tanggal Tiba
                                    </th>
                                    <th className="py-2 px-4 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                      Pemakaian
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {row.details.map(
                                    (detail, detailIdx) => (
                                      <tr
                                        key={`${detail.vessel}-${detail.no}`}
                                        className={`border-b border-gray-100/80 hover:bg-blue-50/30 transition-colors ${
                                          detailIdx % 2 === 0
                                            ? "bg-white/50"
                                            : "bg-slate-50/50"
                                        }`}
                                      >
                                        <td className="py-2 px-4 pl-12 text-xs text-gray-400">
                                          {detailIdx + 1}
                                        </td>
                                        <td className="py-2 px-4 text-xs text-gray-700 whitespace-nowrap">
                                          {detail.vessel}
                                        </td>
                                        <td className="py-2 px-4 text-xs text-gray-600 text-center whitespace-nowrap">
                                          {detail.tanggalBerangkat}
                                        </td>
                                        <td className="py-2 px-4 text-xs text-gray-600 text-center whitespace-nowrap">
                                          {detail.tanggalTiba || "-"}
                                        </td>
                                        <td className="py-2 px-4 text-xs font-medium text-gray-700 text-right whitespace-nowrap">
                                          {formatIndo(detail.pemakaian)}{" "}
                                          <span className="text-gray-400 font-normal">
                                            KL
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  {/* Sub-total row */}
                                  <tr className="bg-slate-100/80 border-t border-gray-200">
                                    <td
                                      colSpan={4}
                                      className="py-2 px-4 pl-12 text-xs font-bold text-gray-600"
                                    >
                                      Sub Total ({row.details.length} data)
                                    </td>
                                    <td className="py-2 px-4 text-xs font-bold text-[#2d7dd2] text-right whitespace-nowrap">
                                      {formatIndo(row.totalPemakaian)}{" "}
                                      <span className="font-medium">KL</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
              {/* Summary Footer */}
              <tfoot className="bg-gradient-to-r from-gray-100 to-gray-50 border-t-2 border-gray-300">
                <tr>
                  <td
                    className="p-3 text-sm font-extrabold text-gray-800"
                    colSpan={2}
                  >
                    TOTAL ({filteredData.length} Kapal)
                  </td>
                  <td className="p-3 text-sm font-extrabold text-[#2d7dd2] text-right whitespace-nowrap">
                    {formatIndo(grandTotal)}{" "}
                    <span className="font-medium">KL</span>
                  </td>
                  <td className="p-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  className="w-12 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-blue-400"
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Results per page</span>
                <select
                  value={pageSize}
                  onChange={(e) =>
                    handlePageSizeChange(Number(e.target.value))
                  }
                  className="border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 bg-white"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  Showing {startIndex + 1} - {endIndex} of{" "}
                  {filteredData.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
