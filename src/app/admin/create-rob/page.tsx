"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateROBPage() {
  const router = useRouter();

  /* ── General Information ── */
  const [vessel, setVessel] = useState("");
  const [port, setPort] = useState("");
  const [dateROB, setDateROB] = useState("");

  /* ── Quality Report Of Analysis ── */
  const [robQuantity, setRobQuantity] = useState("");
  const [logBook, setLogBook] = useState("");

  /* ── Different ── */
  const [different, setDifferent] = useState("");

  /* ── Upload ── */
  const [uploadFileName, setUploadFileName] = useState("No file chosen");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = () => {
    router.push("/form-entry/rob");
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
        <Header title="Form ROB / Create" />

        <div className="p-3 md:p-5 flex-1 overflow-x-hidden">
          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className="rounded-t-md overflow-hidden mb-0">
            <div className="bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#3b82f6] rounded-sm" />
              General Information
            </div>
          </div>

          <div className="bg-white border border-gray-200 border-t-0 rounded-b-md mb-5 overflow-hidden">
            {/* Vessel */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Vessel
              </label>
              <input
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Port */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Port
              </label>
              <input
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Date R.O.B */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Date R.O.B
              </label>
              <input
                type="date"
                value={dateROB}
                onChange={(e) => setDateROB(e.target.value)}
                className={`${inputCls} w-[200px]`}
              />
            </div>
          </div>

          {/* ═══════════════ QUALITY REPORT OF ANALYSIS ═══════════════ */}
          <div className="rounded-t-md overflow-hidden mb-0">
            <div className="bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#3b82f6] rounded-sm" />
              Quality Report Of Analysis
            </div>
          </div>

          <div className="bg-white border border-gray-200 border-t-0 rounded-b-md mb-5 overflow-hidden">
            {/* Diesel Oil Vol Obs (KL) - ROB Quantity & Log Book */}
            <div className={`flex flex-col md:flex-row md:items-start ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={`${lblBold} mb-2 md:mb-0`} style={{ minWidth: 160, paddingTop: 6 }}>
                Diesel Oil Vol Obs (KL)
              </label>
              <div className="flex-1 w-full space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <label className="text-[12px] font-bold text-gray-700 whitespace-nowrap w-full md:w-[120px]">
                    ROB Quantity
                  </label>
                  <input
                    value={robQuantity}
                    onChange={(e) => setRobQuantity(e.target.value)}
                    className={`${inputCls} w-full md:max-w-[320px]`}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <label className="text-[12px] font-bold text-gray-700 whitespace-nowrap w-full md:w-[120px]">
                    Log Book
                  </label>
                  <input
                    value={logBook}
                    onChange={(e) => setLogBook(e.target.value)}
                    className={`${inputCls} w-full md:max-w-[320px]`}
                  />
                </div>
              </div>
            </div>

            {/* Different */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Different
              </label>
              <input
                value={different}
                onChange={(e) => setDifferent(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Upload Quality Result */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`} style={{ borderBottom: "none" }}>
              <label className={`${lblBold} mb-2 md:mb-0`} style={{ minWidth: 160 }}>
                Upload Quality<br />Result
              </label>
              <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                <label className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded px-4 py-[6px] text-sm text-gray-700 transition-colors w-full md:w-auto text-center">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{uploadFileName}</span>
              </div>
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
