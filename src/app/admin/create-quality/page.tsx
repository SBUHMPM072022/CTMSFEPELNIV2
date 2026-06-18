"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const QUALITY_PARAMETERS = [
  { name: "Calculated Centane Index", unit: "-", specMin: "48", specMax: "-", method: "ASTM D4737-21" },
  { name: "Density at 15C", unit: "kg/m3", specMin: "815", specMax: "880", method: "ASTM D4052-22" },
  { name: "Kinematic Viscosity at 40°C", unit: "mm2/s", specMin: "2.0", specMax: "5.0", method: "ASTM D445-23" },
  { name: "Sulfur Content", unit: "% wt", specMin: "-", specMax: "0.2", method: "ASTM D4294-21" },
  { name: "Distillation Temperature at 90 % vol", unit: "°C", specMin: "-", specMax: "370", method: "ASTM D86-23" },
  { name: "Flash Point PMcc", unit: "°C", specMin: "52", specMax: "-", method: "ASTM D93-20" },
  { name: "Pour Point", unit: "°C", specMin: "-", specMax: "18", method: "ASTM D97-17b (2022)" },
  { name: "Carbon Residue", unit: "% wt", specMin: "-", specMax: "0.1", method: "ASTM D4530-15 (2020)" },
  { name: "Water Content", unit: "mg/kg", specMin: "-", specMax: "380", method: "ASTM D6304-20" },
  { name: "FAME Content", unit: "% vol", specMin: "40", specMax: "-", method: "ASTM D7371-14" },
  { name: "Copper Strip Corrosion", unit: "Class", specMin: "-", specMax: "Class 1", method: "ASTM D130-19" },
  { name: "Ash Content", unit: "% wt", specMin: "-", specMax: "0.01", method: "ASTM D482-19" },
  { name: "Sediment Content", unit: "% wt", specMin: "-", specMax: "0.01", method: "ASTM D473-22" },
  { name: "Strong Acid Number", unit: "mg KOH/g", specMin: "0", specMax: "-", method: "ASTM D974-22" },
  { name: "Total Acid Number", unit: "mg KOH/g", specMin: "-", specMax: "0.6", method: "ASTM D664-18e2" },
  { name: "Visual Appearance", unit: "-", specMin: "Clear & Bright", specMax: "-", method: "Visual" },
  { name: "Color ASTM", unit: "No. ASTM", specMin: "-", specMax: "3", method: "ASTM D1500-12 (2017)" },
  { name: "Oxidation Stability at 140°C (RSSOT)", unit: "Minutes", specMin: "45", specMax: "-", method: "ASTM D7545-14 (2019)" },
];

export default function CreateQualityPage() {
  const router = useRouter();

  // General Information State
  const [vessel, setVessel] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [typeOfSample, setTypeOfSample] = useState("");
  const [dateReceived, setDateReceived] = useState("");
  const [dateOfAnalysis, setDateOfAnalysis] = useState("");
  const [testedFor, setTestedFor] = useState("");
  const [form, setForm] = useState("");
  const [volume, setVolume] = useState("");
  const [packing, setPacking] = useState("");
  const [sampleIdentification, setSampleIdentification] = useState("");

  // Quality Report State — one result per parameter
  const [qualityResults, setQualityResults] = useState<Record<string, string>>(
    () => Object.fromEntries(QUALITY_PARAMETERS.map((p) => [p.name, ""]))
  );

  const handleResultChange = (paramName: string, value: string) => {
    setQualityResults((prev) => ({ ...prev, [paramName]: value }));
  };

  const [uploadFileName, setUploadFileName] = useState("No file chosen");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    console.log({
      vessel, lokasi, typeOfSample, dateReceived, dateOfAnalysis, testedFor, form, volume, packing, sampleIdentification,
      qualityResults,
    });
    router.push("/form-entry/quality");
  };

  const inputCls = "w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-800 text-[13px]";
  const sectionHeaderCls = "bg-[#1e293b] text-white px-4 py-2 text-[14px] font-bold rounded-t-lg uppercase tracking-wider shadow-sm";
  const sectionBodyCls = "bg-[#f8fafc] border border-gray-200 border-t-0 p-6 rounded-b-lg mb-6 shadow-sm";

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Quality Form" />
        <div className="p-4 md:p-8 flex-1 overflow-y-auto overflow-x-hidden max-w-[1250px] mx-auto w-full">
          
          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className={sectionHeaderCls}>General Information</div>
          <div className={sectionBodyCls}>
            <div className="grid grid-cols-1 gap-4 md:gap-5">
              
              <Row label="Vessel" w={180}>
                <input value={vessel} onChange={(e)=>setVessel(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
              
              <Row label="Lokasi" w={180}>
                <input value={lokasi} onChange={(e)=>setLokasi(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
              
              <Row label="Type Of Sample" w={180}>
                <input value={typeOfSample} onChange={(e)=>setTypeOfSample(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
              
              <Row label="Date Received" w={180}>
                <input type="date" value={dateReceived} onChange={(e)=>setDateReceived(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
              
              <Row label="Date of Analysis" w={180}>
                <input type="date" value={dateOfAnalysis} onChange={(e)=>setDateOfAnalysis(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
              
              <Row label="Tested for" w={180}>
                <input value={testedFor} onChange={(e)=>setTestedFor(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>

              <div className="flex flex-col md:flex-row items-start gap-1 md:gap-4 py-2">
                <label className="text-[14px] font-bold text-gray-800 whitespace-nowrap mb-2 md:mb-0" style={{ minWidth: 180, paddingTop: 10 }}>
                  Description Of Sample
                </label>
                <div className="flex-1 w-full space-y-4 bg-blue-50/40 p-4 md:p-5 rounded-lg border border-blue-100/50">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <label className="text-[13px] font-bold text-gray-700 w-full md:w-24">Form</label>
                    <input value={form} onChange={(e)=>setForm(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <label className="text-[13px] font-bold text-gray-700 w-full md:w-24">Volume</label>
                    <input value={volume} onChange={(e)=>setVolume(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <label className="text-[13px] font-bold text-gray-700 w-full md:w-24">Packing</label>
                    <input value={packing} onChange={(e)=>setPacking(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
                  </div>
                </div>
              </div>
              <Row label="Sample Identification" w={180}>
                <input value={sampleIdentification} onChange={(e)=>setSampleIdentification(e.target.value)} className={inputCls} style={{ maxWidth: 400 }} />
              </Row>
            </div>
          </div>

          {/* ═══════════════ QUALITY REPORT OF ANALYSIS ═══════════════ */}
          <div className={sectionHeaderCls}>Quality Report of Analysis</div>
          <div className="bg-[#f8fafc] border border-gray-200 border-t-0 rounded-b-lg mb-6 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-bold text-gray-600 w-[260px]">
                      Parameters
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-gray-600 w-[80px]">
                      Units
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-600 w-[200px]">
                      Results
                    </th>
                    <th
                      colSpan={2}
                      className="px-4 py-3 text-center font-bold text-gray-600 border-x border-gray-100"
                    >
                      Specifications B40 CN 48*
                      <div className="flex mt-1 border-t border-gray-100">
                        <div className="w-1/2 py-1 border-r border-gray-100">MIN</div>
                        <div className="w-1/2 py-1">MAX</div>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                      Methods
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {QUALITY_PARAMETERS.map((param) => (
                    <tr key={param.name} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        {param.name}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">
                        {param.unit}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={qualityResults[param.name] || ""}
                          onChange={(e) => handleResultChange(param.name, e.target.value)}
                          placeholder="..."
                          className="w-full px-3 py-1.5 border border-gray-200 rounded text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
                        />
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

          {/* ═══════════════ UPLOAD & SUBMIT ═══════════════ */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-4 md:p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-gray-800 uppercase tracking-tight">Upload Quality Result</label>
              </div>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-white border border-gray-300 rounded px-4 py-2 text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  Choose File
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <span className="text-[12px] text-gray-400 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{uploadFileName}</span>
              </div>
            </div>
            <button 
              onClick={handleSubmit} 
              className="bg-[#5d9bfb] hover:bg-[#4a8cf4] text-white px-10 py-3 rounded-lg text-[14px] font-extrabold transition-all shadow-md active:bg-[#3b82f6] uppercase tracking-[1px] w-full md:w-auto"
            >
              Submit Form
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function Row({ label, w, children }: { label: string, w: number, children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
      <label className="text-[14px] font-bold text-gray-800 whitespace-nowrap mb-1 md:mb-0" style={{ minWidth: w }}>
        {label}
      </label>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
