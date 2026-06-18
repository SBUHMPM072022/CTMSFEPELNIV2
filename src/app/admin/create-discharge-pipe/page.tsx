"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";

/* ──────────────── types ──────────────── */
interface TimingRow {
  no: number;
  activities: string;
  time: string;
  date: string;
  remarks: string;
}



const defaultTimingRows: TimingRow[] = [
  { no: 1, activities: "Inspector Arrived Terminal", time: "", date: "", remarks: "" },
  { no: 2, activities: "Key Meeting", time: "", date: "", remarks: "" },
  { no: 3, activities: "Line Verification", time: "", date: "", remarks: "" },
  { no: 4, activities: "Tank Inspection & Meter Ver Initial", time: "", date: "", remarks: "" },
  { no: 5, activities: "Certificate of Quality", time: "", date: "", remarks: "" },
  { no: 6, activities: "Transfer Commenced", time: "", date: "", remarks: "" },
  { no: 7, activities: "Transfer Completed", time: "", date: "", remarks: "" },
  { no: 8, activities: "Ulage & Calculation After Transfer", time: "", date: "", remarks: "" },
];

const validationSchema = Yup.object().shape({
  contract: Yup.string().required("Kontrak is required"),
  spk: Yup.string().required("SPK is required"),
  vessel: Yup.string().required("Vessel is required"),
  cabang: Yup.string().required("Cabang is required"),
  loadingPort: Yup.string().required("Loading Port is required"),
  product: Yup.string().required("Product is required"),
  tanggalKegiatan: Yup.string().required("Tanggal Kegiatan is required"),
  surveyors: Yup.array().of(
    Yup.object().shape({
      level: Yup.string().required("Level is required"),
      name: Yup.string().required("Name is required"),
    })
  ).min(1, "At least one surveyor is required"),
});

/* ──────────────── component ──────────────── */
export default function DischargePipeCreatePage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      statusDokumen: "baru",
      verifikasi: "belum_terverifikasi",
      jenisKapal: "",
      contract: "",
      spk: "",
      vessel: "",
      cabang: "",
      loadingPort: "",
      area: "",
      terminalTujuan: "",
      bunkerOrderGen: "",
      receivedOrder: "",
      product: "",
      tanggalKegiatan: "",
      surveyors: [{ level: "", name: "" }],
      timingRows: defaultTimingRows,
      flowMeterAwal: "",
      flowMeterAkhir: "",
      blValue: "",
      receivedVesselAll: "",
      flowMeterDifferent2: "",
      orValue: "",
      bunkerOrder: "",
      bargeFigureAfterLoading: "",
      bargeFigureBeforeDischarge: "",
      shipReceived: "",
      robBeforeBunker: "",
      robAfterBunker: "",
      remarkChecks: {
        LOP: false,
        NOAD: false,
        SOF: false,
        Quantity: false,
        Time: false,
        ETC: false,
      },
      catatan: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      router.push("/form-entry/entry");
    },
  });

  const [uploadFileName, setUploadFileName] = useState("No file chosen");

  // Calculations
  const flowMeterAwalNum = parseFloat(formik.values.flowMeterAwal) || 0;
  const flowMeterAkhirNum = parseFloat(formik.values.flowMeterAkhir) || 0;
  const flowMeterDifferent = (flowMeterAkhirNum - flowMeterAwalNum).toFixed(2);

  const bunkerOrderNum = parseFloat(formik.values.bunkerOrder) || 0;
  const bargeAfterNum = parseFloat(formik.values.bargeFigureAfterLoading) || 0;
  const bargeBeforeNum = parseFloat(formik.values.bargeFigureBeforeDischarge) || 0;
  const shipReceivedNum = parseFloat(formik.values.shipReceived) || 0;

  const r1ValAuto = (bargeAfterNum - bunkerOrderNum).toFixed(2);
  const r1PctAuto = bunkerOrderNum !== 0 ? ((parseFloat(r1ValAuto) / bunkerOrderNum) * 100).toFixed(2) : "0.00";
  const r2ValAuto = (bargeBeforeNum - bargeAfterNum).toFixed(2);
  const r2PctAuto = bunkerOrderNum !== 0 ? ((parseFloat(r2ValAuto) / bunkerOrderNum) * 100).toFixed(2) : "0.00";
  const r3ValAuto = (shipReceivedNum - bargeBeforeNum).toFixed(2);
  const r3PctAuto = bunkerOrderNum !== 0 ? ((parseFloat(r3ValAuto) / bunkerOrderNum) * 100).toFixed(2) : "0.00";
  const r4ValAuto = (shipReceivedNum - bunkerOrderNum).toFixed(2);
  const r4PctAuto = bunkerOrderNum !== 0 ? ((parseFloat(r4ValAuto) / bunkerOrderNum) * 100).toFixed(2) : "0.00";

  /* ── helpers ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadFileName(file ? file.name : "No file chosen");
  };

  /* ── styles ── */
  const inputCls =
    "w-full px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700";
  const selectCls =
    "w-full px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700 appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22%236B7280%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_stroke-width=%222%22_d=%22M19_9l-7_7-7-7%22%3E%3C/path%3E%3C/svg%3E')] bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat";
  const lblCls = "w-full md:w-[300px] text-[13px] font-medium text-gray-600 whitespace-nowrap mb-1 md:mb-0";
  const lblW = 300;
  const sectionHeaderCls =
    "bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] rounded-t-md";
  const sectionBodyCls =
    "bg-white border border-gray-200 border-t-0 rounded-b-md p-5 mb-5";

  return (
    <FormikProvider value={formik}>
      <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Admin / Create" />

        <div className="p-3 md:p-5 flex-1 overflow-x-hidden space-y-0">
          {/* ═══════════════ IDENTIFICATION ═══════════════ */}
          <div className={sectionHeaderCls}>Identification</div>
          <div className={`${sectionBodyCls} space-y-1`}>
            {/* Status Dokumen */}
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <span className={lblCls}>
                Status Dokumen
              </span>
              <div className="flex items-center gap-5">
                {[
                  { val: "baru" as const, text: "Baru" },
                  {
                    val: "update" as const,
                    text: "Update (Sudah Terverifikasi)",
                  },
                ].map((opt) => (
                  <label
                    key={opt.val}
                    className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="statusDokumen"
                      value={opt.val}
                      checked={formik.values.statusDokumen === opt.val}
                      onChange={formik.handleChange}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    {opt.text}
                  </label>
                ))}
              </div>
            </div>
            {/* Verifikasi */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <span className={lblCls}>
                Verifikasi
              </span>
              <div className="flex items-center gap-5">
                {[
                  {
                    val: "belum_terverifikasi" as const,
                    text: "Belum Terverifikasi",
                  },
                  {
                    val: "sudah_terverifikasi" as const,
                    text: "Sudah Terverifikasi",
                  },
                ].map((opt) => (
                  <label
                    key={opt.val}
                    className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="verifikasi"
                      value={opt.val}
                      checked={formik.values.verifikasi === opt.val}
                      onChange={formik.handleChange}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    {opt.text}
                  </label>
                ))}
              </div>
            </div>
            {/* Order + Moda */}
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>
                Order
              </label>
              <span className="text-[13px] text-gray-700 font-medium">
                Pusat
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className={lblCls}>
                Moda
              </label>
              <span className="text-[13px] text-gray-700 font-medium">
                Pipe
              </span>
            </div>
            {/* Jenis Kapal */}
            <Row label="Jenis Kapal" w={lblW} bg="bg-blue-50/50">
              <select
                name="jenisKapal"
                value={formik.values.jenisKapal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${selectCls} w-[280px] shadow-sm hover:border-blue-400 transition-colors`}
              >
                <option value="">-- Pilih Jenis Kapal --</option>
                <option value="kapal_penumpang">Kapal Penumpang</option>
                <option value="kapal_perintis">Kapal Perintis</option>
                <option value="kapal_tol_laut">Kapal Tol Laut</option>
              </select>
            </Row>
          </div>

          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className={sectionHeaderCls}>General Information</div>
          <div className={`${sectionBodyCls} space-y-1`}>
            {/* Principal */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className="w-[300px] text-[13px] font-bold text-gray-700">Principal*</label>
            </div>
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>Kontrak</label>
              <div className="flex flex-col flex-1">
                <input
                  name="contract"
                  value={formik.values.contract}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Search Contract"
                  className={`${inputCls} ${formik.touched.contract && formik.errors.contract ? "border-red-500" : ""}`}
                  style={{ maxWidth: 250 }}
                />
                {formik.touched.contract && formik.errors.contract && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.contract}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className={lblCls}>SPK</label>
              <div className="flex flex-col flex-1">
                <input
                  name="spk"
                  value={formik.values.spk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${formik.touched.spk && formik.errors.spk ? "border-red-500" : ""}`}
                  style={{ maxWidth: 250 }}
                />
                {formik.touched.spk && formik.errors.spk && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.spk}</div>
                )}
              </div>
            </div>

            {/* Vessel */}
            <Row label="Vessel*" w={lblW} bg="bg-blue-50/50">
              <div className="flex flex-col flex-1">
                <input
                  name="vessel"
                  value={formik.values.vessel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Search Vessel"
                  className={`${inputCls} ${formik.touched.vessel && formik.errors.vessel ? "border-red-500" : ""}`}
                  style={{ maxWidth: 300 }}
                />
                {formik.touched.vessel && formik.errors.vessel && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.vessel}</div>
                )}
              </div>
            </Row>

            {/* Job Location */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className="w-[300px] text-[13px] font-bold text-gray-700">Job Location*</label>
            </div>
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>Cabang</label>
              <div className="flex flex-col flex-1">
                <input
                  name="cabang"
                  value={formik.values.cabang}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Search Cabang Pelaksana"
                  className={`${inputCls} ${formik.touched.cabang && formik.errors.cabang ? "border-red-500" : ""}`}
                  style={{ maxWidth: 250 }}
                />
                {formik.touched.cabang && formik.errors.cabang && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.cabang}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className={lblCls}>Loading Port/Terminal</label>
              <div className="flex flex-col flex-1">
                <input
                  name="loadingPort"
                  value={formik.values.loadingPort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Search Loading Port"
                  className={`${inputCls} ${formik.touched.loadingPort && formik.errors.loadingPort ? "border-red-500" : ""}`}
                  style={{ maxWidth: 250 }}
                />
                {formik.touched.loadingPort && formik.errors.loadingPort && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.loadingPort}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>Area</label>
              <input
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 250 }}
              />
            </div>

            {/* Lokasi */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className="w-[300px] text-[13px] font-bold text-gray-700">Lokasi</label>
            </div>
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>Terminal Tujuan</label>
              <input
                name="terminalTujuan"
                value={formik.values.terminalTujuan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Search Terminal Tujuan"
                className={inputCls}
                style={{ maxWidth: 250 }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className={lblCls}>Bunker Order</label>
              <input
                name="bunkerOrderGen"
                value={formik.values.bunkerOrderGen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 120 }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
              <label className={lblCls}>Received Order</label>
              <input
                name="receivedOrder"
                value={formik.values.receivedOrder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 120 }}
              />
            </div>

            {/* Product / Commodity */}
            <Row label="Product / Commodity*" w={lblW} bg="">
              <div className="flex flex-col flex-1">
                <input
                  name="product"
                  value={formik.values.product}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Select Cargo"
                  className={`${inputCls} ${formik.touched.product && formik.errors.product ? "border-red-500" : ""}`}
                  style={{ maxWidth: 250 }}
                />
                {formik.touched.product && formik.errors.product && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.product}</div>
                )}
              </div>
            </Row>

            {/* Tanggal Kegiatan */}
            <Row label="Tanggal Kegiatan*" w={lblW} bg="bg-blue-50/50">
              <div className="flex flex-col flex-1">
                <input
                  name="tanggalKegiatan"
                  value={formik.values.tanggalKegiatan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                  className={`${inputCls} ${formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan ? "border-red-500" : ""} w-[160px]`}
                />
                {formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.tanggalKegiatan}</div>
                )}
              </div>
            </Row>

            {/* Surveyor In Charge */}
            <div className="flex flex-col md:flex-row items-start p-2 rounded">
              <label
                className={lblCls}
                style={{ paddingTop: 8 }}
              >
                Surveyor In Charge<span className="text-red-500">*</span>
              </label>
              <div className="flex-1 w-full space-y-3">
                <FieldArray name="surveyors">
                  {({ push, remove }) => (
                    <>
                      {formik.values.surveyors.map((s, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <select
                              name={`surveyors.${idx}.level`}
                              value={s.level}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`${selectCls} ${formik.touched.surveyors?.[idx]?.level && (formik.errors.surveyors?.[idx] as Record<string, string>)?.level ? "border-red-500" : ""} w-full md:w-[200px]`}
                            >
                              <option value="">--Choose Level--</option>
                              <option value="pusat">Pusat</option>
                              <option value="cabang">Cabang</option>
                            </select>
                            <input
                              name={`surveyors.${idx}.name`}
                              value={s.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`${inputCls} ${formik.touched.surveyors?.[idx]?.name && (formik.errors.surveyors?.[idx] as Record<string, string>)?.name ? "border-red-500" : ""} w-full md:w-[200px]`}
                            />
                            <button
                              type="button"
                              onClick={() => push({ level: "", name: "" })}
                              className="text-blue-500 hover:text-blue-600 text-lg leading-none font-bold"
                              title="Add"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (formik.values.surveyors.length > 1) {
                                  remove(idx);
                                }
                              }}
                              className="text-red-500 hover:text-red-600 text-lg leading-none"
                              title="Remove"
                            >
                              🗑
                            </button>
                          </div>
                          {formik.touched.surveyors?.[idx] && (formik.errors.surveyors?.[idx] as Record<string, string>) && (
                            <div className="text-red-500 text-[11px] mt-1">
                              {(formik.errors.surveyors?.[idx] as Record<string, string>)?.level || (formik.errors.surveyors?.[idx] as Record<string, string>)?.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          {/* ═══════════════ TIMELOG ═══════════════ */}
          <div className={sectionHeaderCls}>Timelog</div>
          <div className={`${sectionBodyCls} space-y-1`}>
            {/* Header Row */}
            <div className="flex items-center mb-1 px-2">
              <div className="w-[300px] text-[12px] font-semibold text-gray-600">Activities</div>
              <div className="w-[160px] text-[12px] font-semibold text-gray-600">Time</div>
              <div className="w-[180px] text-[12px] font-semibold text-gray-600">Date</div>
              <div className="flex-1 text-[12px] font-semibold text-gray-600">Remarks/Delay/Etc</div>
            </div>

            <FieldArray name="timingRows">
              {() => (
                <>
                  {formik.values.timingRows.map((row, idx) => (
                    <div key={idx} className={`flex items-center p-2 rounded gap-2 ${idx % 2 === 0 ? "bg-blue-50/50" : ""}`}>
                      <div className="w-[300px] flex items-center gap-2">
                        <span className="text-gray-500 text-[11px] w-4">{row.no}.</span>
                        <span className="text-gray-800 font-medium text-[13px]">{row.activities}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="w-[160px] flex items-center gap-1">
                        <input
                          type="time"
                          name={`timingRows.${idx}.time`}
                          value={row.time}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="px-2 py-1 border border-gray-300 rounded text-xs w-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="hh:mm"
                        />
                        <button className="p-1 bg-blue-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center whitespace-nowrap">
                          📄
                        </button>
                        <button className="p-1 bg-amber-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center whitespace-nowrap">
                          📋
                        </button>
                      </div>

                      {/* Date */}
                      <div className="w-[180px] flex items-center gap-1">
                        <input
                          type="date"
                          name={`timingRows.${idx}.date`}
                          value={row.date}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="px-2 py-1 border border-gray-300 rounded text-xs w-[105px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="dd/mm/yyyy"
                        />
                        <button className="p-1 bg-blue-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center whitespace-nowrap">
                          📄
                        </button>
                        <button className="p-1 bg-amber-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center whitespace-nowrap">
                          📋
                        </button>
                      </div>

                      {/* Remarks */}
                      <div className="flex-1">
                        <input
                          type="text"
                          name={`timingRows.${idx}.remarks`}
                          value={row.remarks}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="px-2 py-1 border border-gray-300 rounded text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Remarks/Delay/Etc"
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
          </div>

          {/* ═══════════════ QUANTITY ═══════════════ */}
          <div className={sectionHeaderCls}>Quantity</div>
          <div className={`${sectionBodyCls} space-y-2`}>
            {/* Flow Meter — first group */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Flow Meter
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL@Obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Flow Meter Awal
                </div>
                <input
                  name="flowMeterAwal"
                  value={formik.values.flowMeterAwal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Flow Meter Akhir
                </div>
                <input
                  name="flowMeterAkhir"
                  value={formik.values.flowMeterAkhir}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-bold text-gray-600">
                  Different
                </div>
                <input
                  value={flowMeterDifferent}
                  readOnly
                  className={`${inputCls} bg-gray-50`}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Flow Meter — second group */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Flow Meter
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL@Obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-bold text-gray-600">
                  BL
                </div>
                <input
                  name="blValue"
                  value={formik.values.blValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-bold text-gray-600">
                  Received Vessel/All
                </div>
                <input
                  name="receivedVesselAll"
                  value={formik.values.receivedVesselAll}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-bold text-gray-600">
                  Different
                </div>
                <input
                  name="flowMeterDifferent2"
                  value={formik.values.flowMeterDifferent2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-bold text-gray-600">
                  OR
                </div>
                <input
                  name="orValue"
                  value={formik.values.orValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Ship Figure */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Ship Figure
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Bunker Order
                </div>
                <input
                  name="bunkerOrder"
                  value={formik.values.bunkerOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Barge Figure After Loading
                </div>
                <input
                  name="bargeFigureAfterLoading"
                  value={formik.values.bargeFigureAfterLoading}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* In Transit */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                In Transit
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Barge Figure After Loading
                </div>
                <input
                  name="bargeFigureAfterLoading"
                  value={formik.values.bargeFigureAfterLoading}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Barge Figure Before Discharge
                </div>
                <input
                  name="bargeFigureBeforeDischarge"
                  value={formik.values.bargeFigureBeforeDischarge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Discharge Port */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                Discharge Port
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Barge Figure Before Discharge
                </div>
                <input
                  name="bargeFigureBeforeDischarge"
                  value={formik.values.bargeFigureBeforeDischarge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Ship Received
                </div>
                <input
                  name="shipReceived"
                  value={formik.values.shipReceived}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Outturn */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                Outturn
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Bunker Order
                </div>
                <input
                  name="bunkerOrder"
                  value={formik.values.bunkerOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  Ship Received (Pelni)
                </div>
                <input
                  name="shipReceived"
                  value={formik.values.shipReceived}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* ROB */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                ROB
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  ROB Before Bunker
                </div>
                <input
                  name="robBeforeBunker"
                  value={formik.values.robBeforeBunker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <div className="w-[300px] text-[13px] font-medium text-gray-600">
                  ROB After Bunker
                </div>
                <input
                  name="robAfterBunker"
                  value={formik.values.robAfterBunker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Discrepancy */}
            <div className="flex items-center mt-4">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                Discrepancy
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              {/* R1 */}
              <div className="bg-blue-50/50 p-2 rounded space-y-1">
                <div className="flex items-center">
                  <div className="w-[300px] text-[13px] font-bold text-gray-600">
                    R1
                  </div>
                  <input
                    value={r1ValAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-[300px]" />
                  <input
                    value={r1PctAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                  <span className="text-[13px] text-gray-500 font-medium ml-1">
                    %
                  </span>
                </div>
              </div>
              {/* R2 */}
              <div className="bg-blue-50/50 p-2 rounded space-y-1">
                <div className="flex items-center">
                  <div className="w-[300px] text-[13px] font-bold text-gray-600">
                    R2
                  </div>
                  <input
                    value={r2ValAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-[300px]" />
                  <input
                    value={r2PctAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                  <span className="text-[13px] text-gray-500 font-medium ml-1">
                    %
                  </span>
                </div>
              </div>
              {/* R3 */}
              <div className="bg-blue-50/50 p-2 rounded space-y-1">
                <div className="flex items-center">
                  <div className="w-[300px] text-[13px] font-bold text-gray-600">
                    R3
                  </div>
                  <input
                    value={r3ValAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-[300px]" />
                  <input
                    value={r3PctAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                  <span className="text-[13px] text-gray-500 font-medium ml-1">
                    %
                  </span>
                </div>
              </div>
              {/* R4 */}
              <div className="bg-blue-50/50 p-2 rounded space-y-1">
                <div className="flex items-center">
                  <div className="w-[300px] text-[13px] font-bold text-gray-600">
                    R4
                  </div>
                  <input
                    value={r4ValAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-[300px]" />
                  <input
                    value={r4PctAuto}
                    readOnly
                    className={`${inputCls} bg-gray-50`}
                    style={{ maxWidth: 200 }}
                  />
                  <span className="text-[13px] text-gray-500 font-medium ml-1">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ REMARKS & NOTES ═══════════════ */}
          <div className={sectionHeaderCls}>Remarks &amp; Notes</div>
          <div className={sectionBodyCls}>
            {/* Checkboxes */}
            <div className="flex items-center gap-6 flex-wrap mb-6">
              {Object.entries(formik.values.remarkChecks).map(([key, val]) => (
                <label
                  key={key}
                  className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    name={`remarkChecks.${key}`}
                    checked={val}
                    onChange={formik.handleChange}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  {key}
                </label>
              ))}
            </div>

            {/* Catatan lain */}
            <div className="mb-4">
              <label className="text-[13px] font-bold text-gray-700 block mb-2">
                Catatan lain
              </label>
              <textarea
                name="catatan"
                value={formik.values.catatan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
              />
            </div>
          </div>

          {/* ═══════════════ KELENGKAPAN DOKUMEN ═══════════════ */}
          <div className="bg-white border border-gray-200 rounded-md p-5 mb-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[13px] font-bold text-gray-700 mb-2">
                  Kelengkapan Dokumen
                </p>
                <ul className="text-[13px] text-gray-600 pl-4 space-y-1">
                  <li>- Surat Tugas</li>
                  <li>
                    - Surat Pengantar Pengiriman/Loading Order/Meter
                    Reading/Delivery Order
                  </li>
                  <li>- Bill of Lading</li>
                  <li>- Analysis Report</li>
                  <li>- Test Report</li>
                  <li>- Dokumen HPL</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <label className="text-[13px] font-bold text-gray-700">
                Upload File
              </label>
              <label className="px-4 py-[6px] bg-gray-100 border border-gray-300 rounded text-[13px] text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <span className="text-[12px] text-gray-400">
                {uploadFileName}
              </span>
            </div>
          </div>

          {/* ═══════════════ SUBMIT ═══════════════ */}
          <div className="pt-6 pb-8 flex justify-start">
            <button
              type="button"
              onClick={() => formik.handleSubmit()}
              className="bg-[#1a2744] hover:bg-[#243352] text-white px-10 py-[10px] rounded-md text-[13px] font-bold transition-colors shadow-md uppercase tracking-wide"
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
    </FormikProvider>
  );
}

/* ── Reusable row component ── */
function Row({
  label,
  w,
  children,
  bg = "bg-blue-50/50",
}: {
  label: string;
  w: number;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center p-2 rounded gap-1 md:gap-0 ${bg}`}>
      <label
        className="text-[13px] font-medium text-gray-600 whitespace-nowrap mb-1 md:mb-0 w-full md:min-w-[var(--w)]"
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        style={{ "--w": `${w}px` } as any}
      >
        {label}
      </label>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
