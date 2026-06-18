"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateJadwalPengerjaanKapalPage() {
  const router = useRouter();

  /* ── General Information ── */
  const [namaKapal, setNamaKapal] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [voyage, setVoyage] = useState("");
  const [kl, setKl] = useState("");
  const [cabang, setCabang] = useState("");

  const handleSubmit = () => {
    // Save to localStorage to simulate appearing on the dashboard
    const newRecord = {
      id: `PK-${Date.now().toString().slice(-6)}`,
      no: Date.now(), // Will be recalculated on the dashboard
      namaKapal: namaKapal || "-",
      tanggal: tanggal || "-",
      voyage: voyage || "-",
      kl: kl || "-",
      cabang: cabang || "-",
      spStatus: "Belum Upload",
      quotationStatus: "Belum Upload",
      loadingOrderStatus: "Belum Upload",
    };
    
    const existingData = JSON.parse(localStorage.getItem("pelaksanaanData") || "[]");
    localStorage.setItem("pelaksanaanData", JSON.stringify([...existingData, newRecord]));

    router.push("/dashboard/performance-report");
  };

  /* ── shared styles ── */
  const inputCls =
    "px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700";
  const lblBold = "text-[13px] font-bold text-gray-800 whitespace-nowrap";
  const rowWhite = "bg-white border-b border-gray-200";
  const rowBlue = "bg-[#eef3fb] border-b border-gray-200";

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Form Jadwal Pengerjaan Kapal / Create" />

        <div className="p-3 md:p-5 flex-1 overflow-x-hidden">
          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className="rounded-t-md overflow-hidden mb-0">
            <div className="bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#3b82f6] rounded-sm" />
              General Information
            </div>
          </div>

          <div className="bg-white border border-gray-200 border-t-0 rounded-b-md mb-5 overflow-hidden">
            {/* Nama Kapal */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Nama Kapal
              </label>
              <input
                value={namaKapal}
                onChange={(e) => setNamaKapal(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Tanggal */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Tanggal
              </label>
              <input
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Voyage */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Voyage
              </label>
              <input
                value={voyage}
                onChange={(e) => setVoyage(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* KL */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                KL
              </label>
              <input
                value={kl}
                onChange={(e) => setKl(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Cabang */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`} style={{ borderBottom: "none" }}>
              <label className={`${lblBold} mb-2 md:mb-0`} style={{ minWidth: 160 }}>
                Cabang
              </label>
              <input
                value={cabang}
                onChange={(e) => setCabang(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>
          </div>

          {/* ═══════════════ SUBMIT ═══════════════ */}
          <div className="pt-2 pb-8">
            <button
              onClick={handleSubmit}
              className="bg-[#5b93d3] hover:bg-[#4a7fc0] text-white px-8 py-[10px] rounded-md text-sm font-bold uppercase tracking-wide transition-colors shadow-sm"
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
