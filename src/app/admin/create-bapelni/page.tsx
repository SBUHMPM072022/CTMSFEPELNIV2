"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateBAPelniPage() {
  const router = useRouter();

  /* ── General Information ── */
  const [namaKapal, setNamaKapal] = useState("");
  const [bendera, setBendera] = useState("");
  const [dwtGt, setDwtGt] = useState("");
  const [pemilikKapal, setPemilikKapal] = useState("");
  const [agenPelayaran, setAgenPelayaran] = useState("");
  const [statusKapal, setStatusKapal] = useState("");
  const [mainEngineKapasitas, setMainEngineKapasitas] = useState("");
  const [auxEngineKapasitas, setAuxEngineKapasitas] = useState("");
  const [pelTerakhir, setPelTerakhir] = useState("");
  const [pelTujuan, setPelTujuan] = useState("");
  const [lamaBerlayar, setLamaBerlayar] = useState("");
  const [kapasitasTangkiTimbun, setKapasitasTangkiTimbun] = useState("");
  const [sisaBBM, setSisaBBM] = useState("");
  const [jumlahBBM, setJumlahBBM] = useState("");
  const [tanggalTiba, setTanggalTiba] = useState("");
  const [tanggalPengisian, setTanggalPengisian] = useState("");
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [pengisian, setPengisian] = useState("");
  const [supplyPoint, setSupplyPoint] = useState("");
  const [muatan, setMuatan] = useState("");

  /* ── Upload ── */
  const [uploadFileName, setUploadFileName] = useState("No file chosen");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = () => {
    router.push("/form-entry/ba-pelni");
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
        <Header title="Form BA Pelni / Create" />

        <div className="p-3 md:p-5 flex-1 overflow-x-hidden">
          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className="rounded-t-md overflow-hidden mb-0">
            {/* Section Header */}
            <div className="bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#3b82f6] rounded-sm" />
              General Information
            </div>
          </div>

          <div className="bg-white border border-gray-200 border-t-0 rounded-b-md mb-5 overflow-hidden">
            {/* Nama Kapal */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Nama Kapal
              </label>
              <input
                value={namaKapal}
                onChange={(e) => setNamaKapal(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Bendera */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Bendera
              </label>
              <input
                value={bendera}
                onChange={(e) => setBendera(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* DWT/GT */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                DWT/GT
              </label>
              <input
                value={dwtGt}
                onChange={(e) => setDwtGt(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Pemilik Kapal */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Pemilik Kapal
              </label>
              <input
                value={pemilikKapal}
                onChange={(e) => setPemilikKapal(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Agen Pelayaran */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Agen Pelayaran
              </label>
              <input
                value={agenPelayaran}
                onChange={(e) => setAgenPelayaran(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Status Kapal */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Status Kapal
              </label>
              <input
                value={statusKapal}
                onChange={(e) => setStatusKapal(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Jumlah - Main Engine & Aux Engine */}
            <div className={`flex flex-col md:flex-row md:items-start ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={`${lblBold} mb-2 md:mb-0`} style={{ minWidth: 160, paddingTop: 6 }}>
                Jumlah
              </label>
              <div className="flex-1 w-full space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <label className="text-[12px] font-bold text-gray-700 whitespace-nowrap w-full md:w-[160px]">
                    Main Engine/Kapasitas<br />(ME)
                  </label>
                  <input
                    value={mainEngineKapasitas}
                    onChange={(e) => setMainEngineKapasitas(e.target.value)}
                    className={`${inputCls} w-full md:max-w-[320px]`}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <label className="text-[12px] font-bold text-gray-700 whitespace-nowrap w-full md:w-[160px]">
                    Aux Engine/Kapasitas<br />(AE)
                  </label>
                  <input
                    value={auxEngineKapasitas}
                    onChange={(e) => setAuxEngineKapasitas(e.target.value)}
                    className={`${inputCls} w-full md:max-w-[320px]`}
                  />
                </div>
              </div>
            </div>

            {/* Pel. Terakhir */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Pel. Terakhir
              </label>
              <input
                value={pelTerakhir}
                onChange={(e) => setPelTerakhir(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Pel. Tujuan */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Pel. Tujuan
              </label>
              <input
                value={pelTujuan}
                onChange={(e) => setPelTujuan(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Lama Berlayar */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Lama Berlayar
              </label>
              <input
                value={lamaBerlayar}
                onChange={(e) => setLamaBerlayar(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Kapasitas Tangki Timbun */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Kapasitas Tangki Timbun
              </label>
              <input
                value={kapasitasTangkiTimbun}
                onChange={(e) => setKapasitasTangkiTimbun(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Sisa BBM */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Sisa BBM
              </label>
              <input
                value={sisaBBM}
                onChange={(e) => setSisaBBM(e.target.value)}
                className={`${inputCls} w-full max-w-[220px]`}
              />
            </div>

            {/* Jumlah BBM */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Jumlah BBM
              </label>
              <input
                value={jumlahBBM}
                onChange={(e) => setJumlahBBM(e.target.value)}
                className={`${inputCls} w-full max-w-[220px]`}
              />
            </div>

            {/* Tanggal Tiba */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Tanggal Tiba
              </label>
              <input
                type="date"
                value={tanggalTiba}
                onChange={(e) => setTanggalTiba(e.target.value)}
                className={`${inputCls} w-[200px]`}
              />
            </div>

            {/* Tanggal Pengisian */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Tanggal Pengisian
              </label>
              <input
                type="date"
                value={tanggalPengisian}
                onChange={(e) => setTanggalPengisian(e.target.value)}
                className={`${inputCls} w-[200px]`}
              />
            </div>

            {/* Tanggal Berangkat */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Tanggal Berangkat
              </label>
              <input
                type="date"
                value={tanggalBerangkat}
                onChange={(e) => setTanggalBerangkat(e.target.value)}
                className={`${inputCls} w-[200px]`}
              />
            </div>

            {/* Pengisian */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Pengisian
              </label>
              <input
                value={pengisian}
                onChange={(e) => setPengisian(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Supply Point */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Supply Point
              </label>
              <input
                value={supplyPoint}
                onChange={(e) => setSupplyPoint(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Muatan */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowWhite} px-3 md:px-5 py-3 md:py-4`}>
              <label className={lblBold} style={{ minWidth: 160 }}>
                Muatan
              </label>
              <input
                value={muatan}
                onChange={(e) => setMuatan(e.target.value)}
                className={`${inputCls} w-full max-w-[320px]`}
              />
            </div>

            {/* Upload Quality Result */}
            <div className={`flex flex-col md:flex-row md:items-center ${rowBlue} px-3 md:px-5 py-3 md:py-4`}>
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
