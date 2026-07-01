"use client";

import { useState } from "react";
import { totalDataMock } from "@/data/totalDataMock";
import { parseDateString } from "@/utils/dateHelper";

export default function TotalDataTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  const [vesselFilter, setVesselFilter] = useState("");
  const [bargeFilter, setBargeFilter] = useState("");

  // Filter data by vessel name and date
  const filteredData = totalDataMock.filter((row) => {
    const matchVessel = vesselFilter
      ? row.vessel.toLowerCase().includes(vesselFilter.toLowerCase())
      : true;

    const matchBarge = bargeFilter
      ? row.barge.toLowerCase().includes(bargeFilter.toLowerCase())
      : true;

    let matchDate = true;
    if (appliedFilterDate || appliedEndDate) {
      const rowDate = parseDateString(row.loadingFieldDate);
      if (rowDate) {
        const rowTime = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate()).getTime();
        
        let afterStart = true;
        if (appliedFilterDate) {
          const startDate = new Date(appliedFilterDate);
          const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
          afterStart = rowTime >= startTime;
        }

        let beforeEnd = true;
        if (appliedEndDate) {
          const endDateObj = new Date(appliedEndDate);
          const endTime = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate()).getTime();
          beforeEnd = rowTime <= endTime;
        }

        matchDate = afterStart && beforeEnd;
      } else {
        matchDate = false;
      }
    }

    return matchVessel && matchBarge && matchDate;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
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

  // Map row numbers to their PDF files
  const pdfMap: Record<number, string> = {
    1: "/uploads/01_Km_Pangrango_01_Januari_2026.pdf",
  };

  const handleViewPdf = (vessel: string, no: number) => {
    const pdfPath = pdfMap[no];
    if (pdfPath) {
      window.open(pdfPath, "_blank");
    } else {
      alert(`PDF belum tersedia untuk ${vessel} (No. ${no})`);
    }
  };

  const handleFilterDuration = () => {
    setAppliedFilterDate(filterDate);
    setAppliedEndDate(endDate);
    setCurrentPage(1);
    setPageInput("1");
  };

  const handleDownload = () => {
    const headers = [
      "No",
      "Vessel",
      "Barge",
      "Port",
      "Date Load to Barge",
      "Date Load to Pelni",
      "FM Initial",
      "FM Final",
      "FM Total",
      "DO KL",
      "OBQ KL",
      "After Loading KL",
      "Before Disch KL",
      "After Disch KL",
      "Ship Received (Pelni) KL",
      "ROB Before Bunker KL",
      "ROB After Bunker KL",
      "Estimate Compsumtion After Voyage KL",
      "Diff",
      "Load R1",
      "Transit R2",
      "Disch R3",
      "Outt R4",
    ];
    const rows = totalDataMock.map((row) => [
      row.no,
      row.vessel,
      row.barge,
      row.port,
      row.loadingBargeDate,
      row.loadingFieldDate,
      row.flowmeter.initial,
      row.flowmeter.final,
      row.flowmeter.total,
      row.deliveryOrder.kl,
      row.obq.kl,
      row.bargeFigAfterLoading.kl,
      row.bargeFigBeforeDischarge.kl,
      row.bargeFigAfterDischarge.kl,
      row.shipReceived.kl,
      row.rob.kl,
      row.robAfterBunker.kl,
      (() => {
        const prevRecord = totalDataMock
          .filter((r) => r.vessel === row.vessel && r.no < row.no)
          .sort((a, b) => b.no - a.no)[0];
        return prevRecord ? prevRecord.robAfterBunker.kl - row.rob.kl : 0;
      })(),
      row.diff,
      row.difference.loadPt,
      row.difference.transit,
      row.difference.dischPt,
      row.difference.clerk,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "total_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Column group header helper
  const thGroup = (label: string, colSpan: number) => (
    <th
      colSpan={colSpan}
      className="p-2 text-center text-[10px] font-semibold text-[#2d7dd2] uppercase tracking-wider bg-blue-50/60 border-b border-blue-100"
    >
      {label}
    </th>
  );

  // Sub-column header helper
  const thSub = (label: string) => (
    <th className="p-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider min-w-[75px] whitespace-nowrap">
      {label}
    </th>
  );

  // Helper to format numbers with Indonesian style (comma decimal) and 3 decimals
  const formatIndo = (val: number, decimals: number = 3) => {
    return val.toLocaleString("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              Total Data
            </h2>
          </div>
        </div>

        <div className="p-3 md:p-5">
          {/* Filter Duration */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 md:mb-5 max-w-md">
            <p className="text-sm text-gray-500 mb-3">Filter Duration</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Start Date */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <div className="flex items-center gap-2">
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
              </div>
              {/* End Date */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">End Date</p>
                <div className="flex items-center gap-2">
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
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
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              <span className="text-sm font-medium text-gray-600">Barge</span>
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
                  value={bargeFilter}
                  onChange={(e) => {
                    setBargeFilter(e.target.value);
                    setCurrentPage(1);
                    setPageInput("1");
                  }}
                  placeholder="Cari nama barge..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {bargeFilter && (
                  <button
                    onClick={() => {
                      setBargeFilter("");
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

            <div className="flex flex-col min-w-0">
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
              {/* Group Headers (Row 1) */}
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[40px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Vessel
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Barge
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Port
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[90px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Date Load to Barge
                  </th>
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[90px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Date Load to Pelni
                  </th>
                  {thGroup("Flowmeter", 3)}
                  {thGroup("Delivery Order", 1)}
                  {thGroup("OBQ", 1)}
                  {thGroup("After Loading. Barge", 1)}
                  {thGroup("Before Disch. Barge", 1)}
                  {thGroup("After Disch. Barge", 1)}
                  {thGroup("Ship Received (Pelni)", 1)}
                  {thGroup("ROB Before Bunker", 1)}
                  {thGroup("ROB After Bunker", 1)}
                  {thGroup("Estimation Consumption After Voyage", 1)}
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[60px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Diff
                  </th>
                  {thGroup("Difference", 4)}
                  <th
                    rowSpan={2}
                    className="p-3 text-center min-w-[60px] text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    View
                  </th>
                </tr>
                {/* Sub-column Headers (Row 2) */}
                <tr className="border-b border-gray-200">
                  {thSub("Initial")}
                  {thSub("Final")}
                  {thSub("Total")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("KL")}
                  {thSub("Load. R1")}
                  {thSub("Transit.R2")}
                  {thSub("Disch. R3")}
                  {thSub("Outt. R4")}
                  <th className="p-2 min-w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                {/* Uncomment Total Data */}
                {currentData.map((row) => {
                  const prevRecord = totalDataMock
                    .filter((r) => r.vessel === row.vessel && r.no < row.no)
                    .sort((a, b) => b.no - a.no)[0];
                  const estimasi = prevRecord
                    ? prevRecord.robAfterBunker.kl - row.rob.kl
                    : 0;

                  return (
                    <tr
                      key={row.no}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-xs text-gray-500">{row.no}</td>
                      <td className="p-3 text-xs font-bold text-gray-800 whitespace-nowrap">
                        {row.vessel}
                      </td>
                      <td className="p-3 text-xs text-gray-700 whitespace-nowrap">
                        {row.barge}
                      </td>
                      <td className="p-3 text-xs text-gray-600">{row.port}</td>
                      <td className="p-3 text-xs text-gray-600 text-center whitespace-nowrap">
                        {row.loadingBargeDate}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center whitespace-nowrap">
                        {row.loadingFieldDate}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {row.flowmeter.initial}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {row.flowmeter.final}
                      </td>
                      <td className="p-3 text-xs font-bold text-gray-800 text-right">
                        {row.flowmeter.total}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.deliveryOrder.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.obq.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.bargeFigAfterLoading.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.bargeFigBeforeDischarge.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.bargeFigAfterDischarge.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.shipReceived.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.rob.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(row.robAfterBunker.kl)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-right">
                        {formatIndo(estimasi)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center">
                        {row.diff.toFixed(3)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center">
                        {row.difference.loadPt.toFixed(2)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center">
                        {row.difference.transit.toFixed(2)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center">
                        {row.difference.dischPt.toFixed(2)}
                      </td>
                      <td className="p-3 text-xs text-gray-600 text-center">
                        {row.difference.clerk.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleViewPdf(row.vessel, row.no)}
                          className="bg-green-500 p-1 rounded hover:bg-green-600 transition-colors"
                          title={`View PDF for ${row.vessel}`}
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* Summary Footer */}
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                <tr>
                  <td
                    className="p-3 text-xs font-extrabold text-gray-800 text-center"
                    colSpan={6}
                  >
                    PERIODE 01 - 31 Januari 2026
                  </td>
                  <td
                    className="p-3 text-xs font-extrabold text-gray-800 text-center"
                    colSpan={3}
                  >
                    TOTAL = {filteredData.length} KAPAL
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.deliveryOrder.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce((sum, row) => sum + row.obq.kl, 0),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.bargeFigAfterLoading.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.bargeFigBeforeDischarge.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.bargeFigAfterDischarge.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.shipReceived.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce((sum, row) => sum + row.rob.kl, 0),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce(
                        (sum, row) => sum + row.robAfterBunker.kl,
                        0,
                      ),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-right">
                    {formatIndo(
                      filteredData.reduce((sum, row) => {
                        const prevRecord = totalDataMock
                          .filter(
                            (r) => r.vessel === row.vessel && r.no < row.no,
                          )
                          .sort((a, b) => b.no - a.no)[0];
                        return (
                          sum +
                          (prevRecord
                            ? prevRecord.robAfterBunker.kl - row.rob.kl
                            : 0)
                        );
                      }, 0),
                    )}
                  </td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-center">
                    {filteredData
                      .reduce((sum, row) => sum + row.diff, 0)
                      .toFixed(3)}
                  </td>
                  <td className="p-3" colSpan={3}></td>
                  <td className="p-3 text-xs font-extrabold text-gray-800 text-center">
                    {(() => {
                      const totalShipReceived = filteredData.reduce(
                        (sum, row) => sum + row.shipReceived.kl,
                        0,
                      );
                      const totalDeliveryOrder = filteredData.reduce(
                        (sum, row) => sum + row.deliveryOrder.kl,
                        0,
                      );
                      const result =
                        totalDeliveryOrder !== 0
                          ? ((totalShipReceived - totalDeliveryOrder) /
                              totalDeliveryOrder) *
                            100
                          : 0;
                      return result.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      });
                    })()}
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
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
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
                  Showing {startIndex + 1} - {endIndex} of {filteredData.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
