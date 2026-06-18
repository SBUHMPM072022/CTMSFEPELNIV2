"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface QualityRow {
  id: string;
  lokasi: string;
  namaKapal: string;
  workDate: string;
  dateOfAnalysis: string;
  createdDate: string;
  updatedUser: string;
}

const mockData: QualityRow[] = [
  {
    id: "158430",
    lokasi: "BITUNG",
    namaKapal: "KM UMSINI",
    workDate: "2026-01-27",
    dateOfAnalysis: "2026-01-27",
    createdDate: "2026-01-28",
    updatedUser: "",
  },
  {
    id: "158429",
    lokasi: "BITUNG",
    namaKapal: "KM TATAMAILAU",
    workDate: "2026-01-27",
    dateOfAnalysis: "2026-01-27",
    createdDate: "2026-01-28",
    updatedUser: "",
  },
  {
    id: "158428",
    lokasi: "BITUNG",
    namaKapal: "KM TATAMAILAU",
    workDate: "2026-01-27",
    dateOfAnalysis: "2026-01-27",
    createdDate: "2026-01-28",
    updatedUser: "",
  },
  {
    id: "158427",
    lokasi: "TAHUNA",
    namaKapal: "KM SABUK NUSANTARA 95",
    workDate: "2026-01-28",
    dateOfAnalysis: "2026-01-28",
    createdDate: "2026-01-28",
    updatedUser: "",
  },
  {
    id: "158426",
    lokasi: "TAHUNA",
    namaKapal: "KM SABUK NUSANTARA 95",
    workDate: "2026-01-26",
    dateOfAnalysis: "2026-01-26",
    createdDate: "2026-01-27",
    updatedUser: "",
  },
  {
    id: "158425",
    lokasi: "MAKASSAR",
    namaKapal: "KM SABUK NUSANTARA 52",
    workDate: "2026-01-26",
    dateOfAnalysis: "2026-01-26",
    createdDate: "2026-01-27",
    updatedUser: "",
  },
  {
    id: "158424",
    lokasi: "JAYAPURA",
    namaKapal: "KM SABUK NUSANTARA 56",
    workDate: "2026-01-26",
    dateOfAnalysis: "2026-01-26",
    createdDate: "2026-01-27",
    updatedUser: "",
  },
];

export default function FormQualityPage() {
  const router = useRouter();
  const [isSimpleTable, setIsSimpleTable] = useState(true);
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination Logic
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = mockData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Form Quality" />

        <div className="p-4 sm:p-8 flex-1 overflow-x-hidden">
          {/* Activities Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Create New Activity
            </h2>
            <button
              onClick={() => router.push("/admin/create-quality")}
              className="bg-[#0091d0] hover:bg-[#007bb0] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors mb-8"
            >
              Create Data
            </button>

            <hr className="border-gray-100 mb-6" />
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                List Activities
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSimpleTable(!isSimpleTable)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isSimpleTable ? "bg-[#2d7dd2]" : "bg-gray-200"}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isSimpleTable ? "translate-x-6" : "translate-x-0"}`}
                  />
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Simple Table
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-left min-w-[50px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ...
                    </th>
                    <th className="p-3 text-left min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Lokasi
                    </th>
                    <th className="p-3 text-left min-w-[180px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Nama Kapal
                    </th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Work Date
                    </th>
                    <th className="p-3 text-left min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date Of Analysis
                    </th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Updated User
                    </th>
                    <th className="p-3 text-left min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Function
                    </th>
                  </tr>
                  {/* Filter Row */}
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="p-2"></td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-400"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr
                      key={row.id + "-" + index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-xs text-gray-500">
                        {startIndex + index + 1}
                      </td>
                      <td className="p-3 text-xs font-bold text-gray-800">
                        {row.lokasi}
                      </td>
                      <td className="p-3 text-xs font-bold text-gray-800">
                        {row.namaKapal}
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {row.workDate}
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {row.dateOfAnalysis}
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {row.createdDate}
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {row.updatedUser}
                      </td>
                      <td className="p-3 text-xs font-bold text-gray-700 flex items-center gap-1">
                        <span className="text-gray-800">{row.id}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-blue-400 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button className="bg-blue-500 p-1 rounded hover:bg-blue-600 transition-colors">
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button className="bg-red-500 p-1 rounded hover:bg-red-600 transition-colors">
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <button className="bg-green-500 p-1 rounded hover:bg-green-600 transition-colors">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col lg:flex-row items-center justify-between border-t border-gray-100 pt-4 gap-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 order-2 lg:order-1">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                    className={`text-gray-400 hover:text-gray-600 ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                    title="First Page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`text-gray-400 hover:text-gray-600 ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
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
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <span>Page</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    className="w-12 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20"
                  />
                  <span>of {totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`text-gray-400 hover:text-gray-600 ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""}`}
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
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`text-gray-400 hover:text-gray-600 ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""}`}
                    title="Last Page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 lg:order-2 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="whitespace-nowrap">Results per page</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
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
                  <span className="whitespace-nowrap">
                    Showing {Math.min(startIndex + 1, mockData.length)} -{" "}
                    {Math.min(endIndex, mockData.length)} of{" "}
                    {mockData.length.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
