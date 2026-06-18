"use client";

import React, { useState, useMemo } from "react";
import { parseDateString } from "@/utils/dateHelper";

interface ParameterMetadata {
  name: string;
  unit: string;
  specMin: string;
  specMax: string;
  method: string;
}

const QUALITY_PARAMETERS: ParameterMetadata[] = [
  {
    name: "Calculated Centane Index",
    unit: "-",
    specMin: "48",
    specMax: "-",
    method: "ASTM D4737-21",
  },
  {
    name: "Density at 15C",
    unit: "kg/m3",
    specMin: "815",
    specMax: "880",
    method: "ASTM D4052-22",
  },
  {
    name: "Kinematic Viscosity at 40°C",
    unit: "mm2/s",
    specMin: "2.0",
    specMax: "5.0",
    method: "ASTM D445-23",
  },
  {
    name: "Sulfur Content",
    unit: "% wt",
    specMin: "-",
    specMax: "0.2",
    method: "ASTM D4294-21",
  },
  {
    name: "Distillation Temperature at 90 % vol",
    unit: "°C",
    specMin: "-",
    specMax: "370",
    method: "ASTM D86-23",
  },
  {
    name: "Flash Point PMcc",
    unit: "°C",
    specMin: "52",
    specMax: "-",
    method: "ASTM D93-20",
  },
  {
    name: "Pour Point",
    unit: "°C",
    specMin: "-",
    specMax: "18",
    method: "ASTM D97-17b (2022)",
  },
  {
    name: "Carbon Residue",
    unit: "% wt",
    specMin: "-",
    specMax: "0.1",
    method: "ASTM D4530-15 (2020)",
  },
  {
    name: "Water Content",
    unit: "mg/kg",
    specMin: "-",
    specMax: "380",
    method: "ASTM D6304-20",
  },
  {
    name: "FAME Content",
    unit: "% vol",
    specMin: "40",
    specMax: "-",
    method: "ASTM D7371-14",
  },
  {
    name: "Copper Strip Corrosion",
    unit: "Class",
    specMin: "-",
    specMax: "Class 1",
    method: "ASTM D130-19",
  },
  {
    name: "Ash Content",
    unit: "% wt",
    specMin: "-",
    specMax: "0.01",
    method: "ASTM D482-19",
  },
  {
    name: "Sediment Content",
    unit: "% wt",
    specMin: "-",
    specMax: "0.01",
    method: "ASTM D473-22",
  },
  {
    name: "Strong Acid Number",
    unit: "mg KOH/g",
    specMin: "0",
    specMax: "-",
    method: "ASTM D974-22",
  },
  {
    name: "Total Acid Number",
    unit: "mg KOH/g",
    specMin: "-",
    specMax: "0.6",
    method: "ASTM D664-18e2",
  },
  {
    name: "Visual Appearance",
    unit: "-",
    specMin: "Clear & Bright",
    specMax: "-",
    method: "Visual",
  },
  {
    name: "Color ASTM",
    unit: "No. ASTM",
    specMin: "-",
    specMax: "3",
    method: "ASTM D1500-12 (2017)",
  },
  {
    name: "Oxidation Stability at 140°C (RSSOT)",
    unit: "Minutes",
    specMin: "45",
    specMax: "-",
    method: "ASTM D7545-14 (2019)",
  },
];

interface QualityDetailData {
  id: string;
  workDate: string;
  dateOfAnalysis: string;
  loadingPort: string;

  product: string;
  result: "On Spec" | "Off Spec" | "Not Valid" | "Invalid";
  // Dummy results for each parameter, easy to edit in code
  results: Record<string, string>;
  pdfFile?: string;
}

const mockData: QualityDetailData[] = [
  {
    id: "159189",
    workDate: "2026-02-04",
    dateOfAnalysis: "2026-01-05",
    loadingPort: "KM UMSINI",

    product: "B-40",
    result: "On Spec",
    pdfFile: "/uploads/000813 HSD B40 SBU HMPM (PELAYARAN NASIONAL).pdf",
    results: {
      "Calculated Centane Index": "52.1",
      "Density at 15C": "853.3",
      "Kinematic Viscosity at 40°C": "3.147",
      "Sulfur Content": "0.036",
      "Distillation Temperature at 90 % vol": "340.0",
      "Flash Point PMcc": "69.0",
      "Pour Point": "0",
      "Carbon Residue": "0.02",
      "Water Content": "678",
      "FAME Content": "35.69",
      "Copper Strip Corrosion": "1a",
      "Ash Content": "0.003",
      "Sediment Content": "0",
      "Strong Acid Number": "0",
      "Total Acid Number": "0.87",
      "Visual Appearance": "Clear and Bright",
      "Color ASTM": "L 3.5",
      "Oxidation Stability at 140°C (RSSOT)": "Greater than 60",
    },
  },
  {
    id: "159188",
    workDate: "2026-02-07",
    dateOfAnalysis: "2026-01-08",
    loadingPort: "KM TATAMAILAU",

    product: "B-40",
    result: "On Spec",
    results: {
      "Calculated Centane Index": "52.4",
      "Density at 15C": "842.1",
      "Kinematic Viscosity at 40°C": "2.45",
      "Sulfur Content": "0.015",
      "Distillation Temperature at 90 % vol": "345",
      "Flash Point PMcc": "62",
      "Pour Point": "12",
      "Carbon Residue": "0.02",
      "Water Content": "120",
      "FAME Content": "35",
      "Copper Strip Corrosion": "Class 1a",
      "Ash Content": "0.005",
      "Sediment Content": "0.004",
      "Strong Acid Number": "0.02",
      "Total Acid Number": "0.24",
      "Visual Appearance": "Clear & Bright",
      "Color ASTM": "L 1.5",
      "Oxidation Stability at 140°C (RSSOT)": "125",
    },
  },
];

const clients = ["PT.PELNI(Persero)"];

export default function QualityDetailTab() {
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const filteredData = useMemo(() => {
    let data = mockData;
    if (appliedFilterDate) {
      const inputDate = new Date(appliedFilterDate);
      data = data.filter((row) => {
        const rowDate = parseDateString(row.workDate);
        if (!rowDate) return false;
        return (
          rowDate.getFullYear() === inputDate.getFullYear() &&
          rowDate.getMonth() === inputDate.getMonth() &&
          rowDate.getDate() === inputDate.getDate()
        );
      });
    }
    return data;
  }, [appliedFilterDate]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
    setPageInput(targetPage.toString());
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      goToPage(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    setPageInput("1");
  };

  const [client, setClient] = useState("PT.PLN (Persero)");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const getResultStyle = (result: string) => {
    switch (result) {
      case "On Spec":
        return "bg-green-50 text-green-700 border-green-200";
      case "Off Spec":
        return "bg-red-50 text-red-700 border-red-200";
      case "Not Valid":
      case "Invalid":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="p-4 md:p-6">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              Quality Detail Loading
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
              onClick={() => setAppliedFilterDate(filterDate)}
              className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md"
            >
              Apply Filter
            </button>
          </div>

          {/* Client Filter */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-6">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto min-w-[200px]">
              <span className="text-sm font-medium text-gray-600">Client</span>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                {clients.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-10 px-3 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Analysis
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vessel
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(row.id)}
                    >
                      <td className="px-3 py-3">
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 text-gray-400 transition-transform ${expandedRows.includes(row.id) ? "rotate-180" : ""}`}
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
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.workDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.dateOfAnalysis}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-bold uppercase">
                        {row.loadingPort}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.product}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${getResultStyle(
                            row.result,
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.result === "On Spec"
                                ? "bg-green-600"
                                : row.result === "Off Spec"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                            }`}
                          ></span>
                          {row.result}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            title="View File"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (row.pdfFile) {
                                window.open(row.pdfFile, "_blank");
                              } else {
                                alert("No file available for this record.");
                              }
                            }}
                            className={`p-2 rounded-md transition-colors border shadow-sm ${
                              row.pdfFile
                                ? "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 cursor-pointer"
                                : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                            }`}
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
                                strokeWidth={2.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            title="Download File"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (row.pdfFile) {
                                const link = document.createElement("a");
                                link.href = row.pdfFile;
                                link.download =
                                  row.pdfFile.split("/").pop() ||
                                  "download.pdf";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              } else {
                                alert("No file available for this record.");
                              }
                            }}
                            className={`p-2 rounded-md transition-colors border shadow-sm ${
                              row.pdfFile
                                ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 cursor-pointer"
                                : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                            }`}
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
                                strokeWidth={2.5}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(row.id) && (
                      <tr className="bg-white">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="border border-gray-100 rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left font-bold text-gray-600 w-1/4">
                                      Parameters
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold text-gray-600">
                                      Units
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600 w-1/4">
                                      Results
                                    </th>
                                    <th
                                      colSpan={2}
                                      className="px-4 py-3 text-center font-bold text-gray-600 border-x border-gray-100"
                                    >
                                      Specifications B40 CN 48*
                                      <div className="flex mt-1 border-t border-gray-100">
                                        <div className="w-1/2 py-1 border-r border-gray-100">
                                          MIN
                                        </div>
                                        <div className="w-1/2 py-1">MAX</div>
                                      </div>
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                      Methods
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {QUALITY_PARAMETERS.map((param) => (
                                    <tr
                                      key={param.name}
                                      className="hover:bg-gray-50/50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-gray-700 font-medium">
                                        {param.name}
                                      </td>
                                      <td className="px-4 py-3 text-center text-gray-500">
                                        {param.unit}
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 font-medium shadow-sm flex items-center min-h-[34px]">
                                          {row.results[param.name] || "-"}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center font-bold text-gray-700 w-[70px] border-l border-gray-50 bg-gray-50/30">
                                        {param.specMin}
                                      </td>
                                      <td className="px-4 py-3 text-center font-bold text-gray-700 w-[70px] border-r border-gray-50 bg-gray-50/30">
                                        {param.specMax}
                                      </td>
                                      <td className="px-4 py-3 italic text-gray-400 text-[11px]">
                                        {param.method}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
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
