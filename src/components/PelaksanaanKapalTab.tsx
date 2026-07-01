"use client";

import { useState, useEffect } from "react";

interface PelaksanaanRow {
  id: string;
  no: number;
  namaKapal: string;
  tanggal: string;
  voyage: string;
  kl: string;
  cabang: string;
  spStatus: "Sudah Upload" | "Belum Upload";
  spFileName?: string;
  spData?: Record<string, string>;
  quotationStatus: "Sudah Upload" | "Belum Upload";
  quotationFileName?: string;
  quotationData?: Record<string, string>;
  loadingOrderStatus: "Sudah Upload" | "Belum Upload";
  loadingOrderFileName?: string;
  loadingOrderData?: Record<string, string>;
}

const initialMockData: PelaksanaanRow[] = [
  {
    id: "PK-160001",
    no: 1,
    namaKapal: "KM PANGRANGO",
    tanggal: "2026-01-01",
    voyage: "V.01",
    kl: "150",
    cabang: "AMBON",
    spStatus: "Sudah Upload",
    spFileName: "SP_KM_PANGRANGO_01.pdf",
    quotationStatus: "Sudah Upload",
    quotationFileName: "Quotation_KM_PANGRANGO_01.pdf",
    loadingOrderStatus: "Belum Upload",
  },
  {
    id: "PK-160002",
    no: 2,
    namaKapal: "KM SANGIANG",
    tanggal: "2026-01-02",
    voyage: "V.02",
    kl: "120",
    cabang: "AMBON",
    spStatus: "Sudah Upload",
    spFileName: "SP_KM_SANGIANG_02.pdf",
    quotationStatus: "Belum Upload",
    loadingOrderStatus: "Belum Upload",
  },
  {
    id: "PK-160003",
    no: 3,
    namaKapal: "KM LAMBELU",
    tanggal: "2026-01-11",
    voyage: "V.03",
    kl: "200",
    cabang: "BALIKPAPAN",
    spStatus: "Belum Upload",
    quotationStatus: "Belum Upload",
    loadingOrderStatus: "Belum Upload",
  },
  {
    id: "PK-160004",
    no: 4,
    namaKapal: "KM BUKIT SIGUNTANG",
    tanggal: "2026-01-12",
    voyage: "V.04",
    kl: "180",
    cabang: "BALIKPAPAN",
    spStatus: "Sudah Upload",
    spFileName: "SP_KM_BUKIT_SIGUNTANG_04.pdf",
    quotationStatus: "Sudah Upload",
    quotationFileName: "Quotation_KM_BUKIT_SIGUNTANG_04.pdf",
    loadingOrderStatus: "Sudah Upload",
    loadingOrderFileName: "LO_KM_BUKIT_SIGUNTANG_04.pdf",
  },
  {
    id: "PK-160005",
    no: 5,
    namaKapal: "KM TIDAR",
    tanggal: "2026-01-02",
    voyage: "V.05",
    kl: "250",
    cabang: "JAKARTA",
    spStatus: "Sudah Upload",
    spFileName: "SP_KM_TIDAR_05.pdf",
    quotationStatus: "Sudah Upload",
    quotationFileName: "Quotation_KM_TIDAR_05.pdf",
    loadingOrderStatus: "Belum Upload",
  },
];

type DocType = "spStatus" | "quotationStatus" | "loadingOrderStatus";

export default function PelaksanaanKapalTab() {
  const [data, setData] = useState<PelaksanaanRow[]>(initialMockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");
  const [vesselFilter, setVesselFilter] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("pelaksanaanData") || "[]");
    if (savedData.length > 0) {
      // Re-number the items sequentially
      const combined = [...initialMockData, ...savedData].map((item, idx) => ({
        ...item,
        no: idx + 1
      }));
      setData(combined);
    }
  }, []);

  const filteredData = data.filter((row) => {
    const matchVessel = vesselFilter
      ? row.namaKapal.toLowerCase().includes(vesselFilter.toLowerCase())
      : true;
    let matchDate = true;
    if (appliedFilterDate || appliedEndDate) {
      let afterStart = true;
      if (appliedFilterDate) {
         afterStart = row.tanggal >= appliedFilterDate;
      }
      let beforeEnd = true;
      if (appliedEndDate) {
         beforeEnd = row.tanggal <= appliedEndDate;
      }
      matchDate = afterStart && beforeEnd;
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

  const openModal = (rowNo: number, docType: DocType) => {
    setSelectedDocType(docType);
    
    const row = data.find(r => r.no === rowNo);
    let currentData = {};
    if (row) {
      if (docType === "spStatus") {
        currentData = row.spData || (row.spFileName ? { fileName: row.spFileName } : {});
      } else if (docType === "quotationStatus") {
        currentData = row.quotationData || (row.quotationFileName ? { fileName: row.quotationFileName } : {});
      } else if (docType === "loadingOrderStatus") {
        currentData = row.loadingOrderData || (row.loadingOrderFileName ? { fileName: row.loadingOrderFileName } : {});
      }
    }
    setFormData(currentData);
    setIsModalOpen(true);
  };

  const getDocName = (docType: DocType | null) => {
    switch (docType) {
      case "spStatus":
        return "Surat Penunjukkan (SP)";
      case "quotationStatus":
        return "Quotation";
      case "loadingOrderStatus":
        return "Loading Order";
      default:
        return "Dokumen";
    }
  };

  const renderStatus = (status: string, rowNo: number, docType: DocType) => {
    const isUploaded = status === "Sudah Upload";
    const displayStatus = isUploaded ? "Completed" : "Pending";

    return (
      <div className="flex justify-center">
        <div
          className={`inline-flex items-center h-7 rounded overflow-hidden border transition-all ${
            isUploaded
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {/* Status Label */}
          <span className="px-2.5 text-[10px] font-bold uppercase tracking-wider">
            {displayStatus}
          </span>
          
          {/* Action Icons Section */}
          <div
            className={`flex items-center h-full border-l px-1 ${
              isUploaded ? "border-green-200 bg-green-100/50" : "border-red-200 bg-red-100/50"
            }`}
          >
            <button
              onClick={() => openModal(rowNo, docType)}
              className={`p-1 hover:bg-white/60 rounded transition-colors ${
                isUploaded ? "text-green-600 hover:text-green-800" : "text-red-600 hover:text-red-800"
              }`}
              title="View Information"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFormInputs = () => {
    const isEmpty = !formData || Object.keys(formData).length === 0;
    
    if (isEmpty) {
      return (
        <div className="py-8 text-center flex flex-col items-center justify-center">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p className="text-gray-500 font-medium text-sm">No information available.</p>
        </div>
      );
    }

    const renderFileDisplay = () => {
      if (!formData.fileName) return <p className="text-sm font-medium text-gray-800">-</p>;
      return (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden mr-3">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
            <span className="text-sm font-semibold text-gray-800 truncate">{formData.fileName}</span>
          </div>
          <button onClick={() => alert(`Downloading: ${formData.fileName}`)} className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded shadow-sm hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-1.5 transition-colors flex-shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Unduh
          </button>
        </div>
      );
    };
    
    if (selectedDocType === "spStatus") {
       return (
         <div className="space-y-4">
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">SP Number</label>
             <p className="text-sm font-medium text-gray-800">{formData.spNumber || '-'}</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Tanggal</label>
             <p className="text-sm font-medium text-gray-800">{formData.tanggal || '-'}</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Waktu</label>
             <p className="text-sm font-medium text-gray-800">{formData.waktu || '-'}</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Uploaded Document</label>
             {renderFileDisplay()}
           </div>
         </div>
       );
    }
    if (selectedDocType === "quotationStatus") {
       return (
         <div className="space-y-4">
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Verification Status</label>
             <p className="text-sm font-medium text-gray-800">{formData.verification || '-'}</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Comment</label>
             <p className="text-sm font-medium text-gray-800">{formData.comment || '-'}</p>
           </div>
         </div>
       );
    }
    if (selectedDocType === "loadingOrderStatus") {
       return (
         <div className="space-y-4">
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Product</label>
             <p className="text-sm font-medium text-gray-800">{formData.produk || '-'}</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Uploaded Berita Acara Cabang</label>
             {renderFileDisplay()}
           </div>
         </div>
       );
    }
    return null;
  }

  return (
    <div className="p-4 md:p-6 flex-1 overflow-x-hidden relative">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">Pelaksanaan Kapal</h2>
          </div>
        </div>

        <div className="p-5">
          {/* Filter Duration */}
          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-md">
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
            <button onClick={() => { setAppliedFilterDate(filterDate); setAppliedEndDate(endDate); setCurrentPage(1); setPageInput("1"); }} className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md">
              Apply Filter
            </button>
          </div>

          {/* Vessel Filter & Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">Vessel</span>
              <div className="relative w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" value={vesselFilter} onChange={(e) => { setVesselFilter(e.target.value); setCurrentPage(1); setPageInput("1"); }} placeholder="Cari nama vessel..." className="w-full sm:w-auto pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:min-w-[200px]" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 text-left min-w-[40px] text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
                  <th className="p-3 text-left min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="p-3 text-left min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Kapal</th>
                  <th className="p-3 text-center min-w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="p-3 text-center min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Voyage</th>
                  <th className="p-3 text-center min-w-[80px] text-xs font-semibold text-gray-500 uppercase tracking-wider">KL</th>
                  <th className="p-3 text-left min-w-[120px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Cabang</th>
                  <th className="p-3 text-center min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Surat Penunjukkan (SP)</th>
                  <th className="p-3 text-center min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Quotation</th>
                  <th className="p-3 text-center min-w-[150px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Loading Order</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.no} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-xs text-gray-500">{row.no}</td>
                    <td className="p-3 text-xs font-medium text-gray-700">{row.id}</td>
                    <td className="p-3 text-xs font-bold text-gray-800 whitespace-nowrap">{row.namaKapal}</td>
                    <td className="p-3 text-xs text-gray-600 text-center whitespace-nowrap">{row.tanggal}</td>
                    <td className="p-3 text-xs text-gray-600 text-center">{row.voyage}</td>
                    <td className="p-3 text-xs text-gray-600 text-center">{row.kl}</td>
                    <td className="p-3 text-xs text-gray-600">{row.cabang}</td>
                    <td className="p-3 text-center whitespace-nowrap">{renderStatus(row.spStatus, row.no, "spStatus")}</td>
                    <td className="p-3 text-center whitespace-nowrap">{renderStatus(row.quotationStatus, row.no, "quotationStatus")}</td>
                    <td className="p-3 text-center whitespace-nowrap">{renderStatus(row.loadingOrderStatus, row.no, "loadingOrderStatus")}</td>
                  </tr>
                ))}
              </tbody>
              {filteredData.length > 0 && (
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td className="p-3 text-xs font-extrabold text-gray-800 text-center" colSpan={10}>
                      TOTAL = {filteredData.length} KAPAL
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col lg:flex-row items-center justify-between border-t border-gray-100 pt-4 gap-6">
            <div className="flex items-center gap-4 order-2 lg:order-1">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span>Page</span>
                <input type="number" min="1" max={totalPages} value={pageInput} onChange={(e) => setPageInput(e.target.value)} onBlur={() => { const p = parseInt(pageInput); if (!isNaN(p)) goToPage(p); }} onKeyDown={(e) => { if (e.key === "Enter") { const p = parseInt(pageInput); if (!isNaN(p)) goToPage(p); } }} className="w-12 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20" />
                <span>of {totalPages}</span>
              </div>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 lg:order-2 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="whitespace-nowrap">Results per page</span>
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); setPageInput("1"); }} className="border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 bg-white">
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
                <span className="whitespace-nowrap">Showing {Math.min(startIndex + 1, filteredData.length)} - {endIndex} of {filteredData.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload/View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all">
            <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-800 capitalize">
                Information {getDocName(selectedDocType)}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {renderFormInputs()}

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#0091d0] text-white text-sm font-medium rounded-lg hover:bg-[#007bb0] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
