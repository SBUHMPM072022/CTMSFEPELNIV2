"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateKapalPage() {
  const router = useRouter();

  /* ── General Information ── */
  const [namaKapal, setNamaKapal] = useState("");
  const [voyage, setVoyage] = useState("");
  const [jam, setJam] = useState("");
  const [tanggal, setTanggal] = useState("");

  /* ── Tangki Table ── */
  const [tangkiList, setTangkiList] = useState([
    { id: Date.now(), name: "", cm: "", liter: "" },
  ]);

  const handleAddTangki = () => {
    setTangkiList([
      ...tangkiList,
      { id: Date.now(), name: "", cm: "", liter: "" },
    ]);
  };

  const handleRemoveTangki = (id: number) => {
    if (tangkiList.length > 1) {
      setTangkiList(tangkiList.filter((item) => item.id !== id));
    } else {
      // Clear the single row if it's the last one
      setTangkiList([{ id: Date.now(), name: "", cm: "", liter: "" }]);
    }
  };

  const handleTangkiChange = (id: number, field: string, value: string) => {
    setTangkiList(
      tangkiList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalQuantity = tangkiList.reduce((sum, item) => {
    const literVal = parseFloat(item.liter) || 0;
    return sum + literVal;
  }, 0);

  const handleSubmit = () => {
    router.push("/form-entry/kapal");
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
        <Header title="Form Kapal / Create" />

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

            {/* Voyage */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Voyage
              </label>
              <input
                value={voyage}
                onChange={(e) => setVoyage(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Jam */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Jam
              </label>
              <input
                value={jam}
                onChange={(e) => setJam(e.target.value)}
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

            {/* Tabel Tangki */}
            <div className={`flex flex-col md:flex-row md:items-start ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={`${lblBold} mb-2 md:mb-0`} style={{ minWidth: 160, paddingTop: 6 }}>
                Tabel Tangki
              </label>
              <div className="flex-1 w-full space-y-4">
                {tangkiList.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 p-3 md:p-0 border md:border-none border-gray-200 rounded-md bg-white md:bg-transparent">
                    <input
                      value={item.name}
                      onChange={(e) =>
                        handleTangkiChange(item.id, "name", e.target.value)
                      }
                      placeholder="Tangki Name"
                      className={`${inputCls} w-full md:w-[240px]`}
                    />
                    <div className="flex items-center gap-2">
                    <label className="text-[13px] font-bold text-gray-800 min-w-[30px]">
                      CM
                    </label>
                    <input
                      type="number"
                      value={item.cm}
                      onChange={(e) =>
                        handleTangkiChange(item.id, "cm", e.target.value)
                      }
                      className={`${inputCls} flex-1 md:w-[140px]`}
                    />
                    </div>
                    <div className="flex items-center gap-2">
                    <label className="text-[13px] font-bold text-gray-800 min-w-[30px]">
                      Liter
                    </label>
                    <input
                      type="number"
                      value={item.liter}
                      onChange={(e) =>
                        handleTangkiChange(item.id, "liter", e.target.value)
                      }
                      className={`${inputCls} flex-1 md:w-[240px]`}
                    />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-2 mt-2 md:mt-0">
                      <button
                        type="button"
                        onClick={handleAddTangki}
                        className="p-2 md:p-0 text-blue-500 hover:text-blue-600 transition-colors border md:border-none border-blue-200 rounded"
                        title="Add Row"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:h-5 md:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTangki(item.id)}
                        className="p-2 md:p-0 text-red-500 hover:text-red-600 transition-colors border md:border-none border-red-200 rounded"
                        title="Delete Row"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:h-5 md:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Quantity */}
            <div
              className={`flex items-center ${rowWhite} px-5 py-4`}
              style={{ borderBottom: "none" }}
            >
              <label className={lblBold} style={{ minWidth: 160 }}>
                Total Quantity
              </label>
              <input
                value={totalQuantity}
                readOnly
                className={`${inputCls} w-full max-w-[320px] bg-gray-50`}
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
