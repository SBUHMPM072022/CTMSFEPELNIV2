"use client";

import { useState, useEffect } from "react";
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
  { no: 1, activities: "Barge Arrived", time: "", date: "", remarks: "" },
  { no: 2, activities: "NOR Tendered", time: "", date: "", remarks: "" },
  { no: 3, activities: "Barge All Fast", time: "", date: "", remarks: "" },
  { no: 4, activities: "Surveyor On Board", time: "", date: "", remarks: "" },
  { no: 5, activities: "Key Meeting", time: "", date: "", remarks: "" },
  { no: 6, activities: "NOR Accepted", time: "", date: "", remarks: "" },
  {
    no: 7,
    activities: "Tank Inspection & Measurement",
    time: "",
    date: "",
    remarks: "",
  },
  { no: 8, activities: "Hoses Connected", time: "", date: "", remarks: "" },
  {
    no: 9,
    activities: "Visual Inspection & Sampling",
    time: "",
    date: "",
    remarks: "",
  },
  {
    no: 10,
    activities: "Tank Inspection & Measurement",
    time: "",
    date: "",
    remarks: "",
  },
  {
    no: 11,
    activities: "Meter Inspection & Verification",
    time: "",
    date: "",
    remarks: "",
  },
  { no: 12, activities: "Valve Sealed", time: "", date: "", remarks: "" },
  { no: 13, activities: "Document On Board", time: "", date: "", remarks: "" },
  {
    no: 14,
    activities: "Surveyor Left Terminal",
    time: "",
    date: "",
    remarks: "",
  },
  { no: 15, activities: "Barge Leave Vessel", time: "", date: "", remarks: "" },
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
export default function AdminCreatePage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      statusDokumen: "baru",
      verifikasi: "belum",
      contract: "",
      spk: "",
      vessel: "",
      cabang: "",
      loadingPort: "",
      area: "",
      terminalTujuan: "",
      bunkerOrder: "",
      receivedOrder: "",
      product: "",
      tanggalKegiatan: "",
      surveyors: [{ level: "", name: "" }],
      timingRows: defaultTimingRows,
      blQuantity: "",
      density: "",
      shoreQuantity: "",
      shoreTanksNomination: "",
      temperatureC: "",
      obq: "",
      sfal: "",
      freeWaterAfterLoading: "",
      shipsQuantityLoaded: "",
      discR1Val: "",
      discR1Pct: "",
      discR1PrimeVal: "",
      discR1PrimePct: "",
      remarkChecks: {
        LOP: false,
        NOAD: false,
        SOF: false,
        Quantity: false,
        Quality: false,
        Time: false,
        ETC: false,
      },
      arrivalDraftFwd: "",
      arrivalDraftAft: "",
      arrivalTrim: "",
      arrivalList: "",
      arrivalTo: "",
      arrivalSeaCondition: "",
      departureDraftFwd: "",
      departureDraftAft: "",
      departureTrim: "",
      departureList: "",
      departureTo: "",
      departureSeaCondition: "",
      catatan: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      router.push("/form-entry/entry");
    },
  });

  /* ── Upload Folder ── */
  const [folderUploadName, setFolderUploadName] = useState("");

  /* ── helpers ── */

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Access the standard webkitRelativePath property on files uploaded via directory selection
      const fullPath = files[0].webkitRelativePath || files[0].name;
      const folderName = fullPath.split('/')[0];
      setFolderUploadName(folderName);
    } else {
      setFolderUploadName("");
    }
  };

  /* ── Calculations ── */
  useEffect(() => {
    const blQty = parseFloat(formik.values.blQuantity) || 0;
    const sfalVal = parseFloat(formik.values.sfal) || 0;

    const r1Val = sfalVal - blQty;
    const r1Pct = blQty !== 0 ? (r1Val / blQty) * 100 : 0;

    formik.setFieldValue("discR1Val", r1Val !== 0 ? r1Val.toFixed(2) : "");
    formik.setFieldValue("discR1Pct", r1Pct !== 0 ? r1Pct.toFixed(2) : "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.blQuantity, formik.values.sfal]);

  /* ── shared styles ── */
  const sectionHeader =
    "bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[7px] rounded-t-md mt-5 first:mt-0";
  const sectionBody =
    "bg-white border border-gray-200 border-t-0 rounded-b-md p-5 mb-0";
   const inputCls =
  "w-full lg:max-w-[250px] px-3 py-[8px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700";
  const qtyInput =
    "px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700";
  const selectCls =
    "px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700 appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22%236B7280%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_stroke-width=%222%22_d=%22M19_9l-7_7-7-7%22%3E%3C/path%3E%3C/svg%3E')] bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat w-full";
  const lblCls = "text-[13px] font-medium text-gray-600 whitespace-nowrap w-full md:w-[300px] mb-1 md:mb-0";
  const subHeader = "flex flex-col md:flex-row md:items-center p-2 rounded bg-white";

  return (
    <FormikProvider value={formik}>
      <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="Admin / Create" />

          <div className="p-3 md:p-5 flex-1 overflow-x-hidden">
            {/* ═══════════════ IDENTIFICATION ═══════════════ */}
            <div className={sectionHeader}>Identification</div>
            <div className={`${sectionBody} space-y-1`}>
              {/* Status Dokumen */}
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <span className={lblCls}>
                  Status Dokumen
                </span>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="statusDokumen"
                      value="baru"
                      checked={formik.values.statusDokumen === "baru"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    Baru
                  </label>
                  <label className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="statusDokumen"
                      value="update"
                      checked={formik.values.statusDokumen === "update"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    Update (Sudah Terverifikasi)
                  </label>
                </div>
              </div>
              {/* Verifikasi */}
              <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
                <span className={lblCls}>
                  Verifikasi
                </span>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="verifikasi"
                      value="belum"
                      checked={formik.values.verifikasi === "belum"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    Belum Terverifikasi
                  </label>
                  <label className="flex items-center gap-[6px] text-[13px] text-gray-600 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="verifikasi"
                      value="sudah"
                      checked={formik.values.verifikasi === "sudah"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-[14px] h-[14px] accent-blue-600"
                    />
                    Sudah Terverifikasi
                  </label>
                </div>
              </div>
              {/* Order */}
              <div className="flex flex-col md:flex-row md:items-center bg-blue-50/50 p-2 rounded">
                <label className={lblCls}>
                  Order
                </label>
                <span className="text-[13px] text-gray-700 font-medium">
                  Pusat
                </span>
              </div>
              {/* Moda */}
              <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
                <label className={lblCls}>
                  Moda
                </label>
                <span className="text-[13px] text-gray-700 font-medium">
                  Kapal
                </span>
              </div>
            </div>

          {/* ═══════════════ GENERAL INFORMATION ═══════════════ */}
          <div className={sectionHeader}>General Information</div>
          <div className={`${sectionBody} space-y-1`}>
            {/* Principal */}
            <div className={subHeader}>
              <label className="text-[13px] font-bold text-gray-700">Principal*</label>
            </div>
            <Row label="Kontrak">
              <div className="flex-1 w-full">
                <input
                  name="contract"
                  value={formik.values.contract}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${formik.touched.contract && formik.errors.contract ? "border-red-500" : ""}`}
                />
                {formik.touched.contract && formik.errors.contract && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.contract}</div>
                )}
              </div>
            </Row>
            <Row label="SPK" bg="bg-white">
              <div className="flex-1 w-full">
                <input
                  name="spk"
                  value={formik.values.spk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${formik.touched.spk && formik.errors.spk ? "border-red-500" : ""}`}
                />
                {formik.touched.spk && formik.errors.spk && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.spk}</div>
                )}
              </div>
            </Row>

            {/* Vessel */}
            <Row label="Vessel*">
              <div className="flex-1 w-full">
                <select
                  name="vessel"
                  value={formik.values.vessel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${selectCls} ${formik.touched.vessel && formik.errors.vessel ? "border-red-500" : ""}`}
                >
                  <option value="">Search Vessel</option>
                  <option value="v1">KM PANGRANGO</option>
                  <option value="v2">KM SANGIANG</option>
                </select>
                {formik.touched.vessel && formik.errors.vessel && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.vessel}</div>
                )}
              </div>
            </Row>

            {/* Job Location */}
            <div className={subHeader}>
              <label className="text-[13px] font-bold text-gray-700">Job Location*</label>
            </div>
            <Row label="Cabang">
              <div className="flex-1 w-full">
                <select
                  name="cabang"
                  value={formik.values.cabang}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${selectCls} ${formik.touched.cabang && formik.errors.cabang ? "border-red-500" : ""}`}
                >
                  <option value="">Search Cabang Pelaksana</option>
                  <option value="c1">Cabang 1</option>
                </select>
                {formik.touched.cabang && formik.errors.cabang && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.cabang}</div>
                )}
              </div>
            </Row>
            <Row label="Loading Port/Terminal" bg="bg-white">
              <div className="flex-1 w-full">
                <select
                  name="loadingPort"
                  value={formik.values.loadingPort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${selectCls} ${formik.touched.loadingPort && formik.errors.loadingPort ? "border-red-500" : ""}`}
                >
                  <option value="">Search Loading Port</option>
                  <option value="lp1">Port 1</option>
                </select>
                {formik.touched.loadingPort && formik.errors.loadingPort && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.loadingPort}</div>
                )}
              </div>
            </Row>
            <Row label="Area">
              <div className="flex-1 w-full">
                <input
                  name="area"
                  value={formik.values.area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                />
              </div>
            </Row>

            {/* Lokasi */}
            <div className={subHeader}>
              <label className="text-[13px] font-bold text-gray-700">Lokasi</label>
            </div>
            <Row label="Terminal Tujuan">
              <div className="flex-1 w-full">
                <select
                  name="terminalTujuan"
                  value={formik.values.terminalTujuan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={selectCls}
                >
                  <option value="">Search Terminal Tujuan</option>
                  <option value="tt1">Terminal 1</option>
                </select>
              </div>
            </Row>
            <Row label="Bunker Order" bg="bg-white">
              <div className="flex-1 w-full">
                <input
                  name="bunkerOrder"
                  value={formik.values.bunkerOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                />
              </div>
            </Row>
            <Row label="Received Order">
              <div className="flex-1 w-full">
                <input
                  name="receivedOrder"
                  value={formik.values.receivedOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                />
              </div>
            </Row>

            {/* Product / Commodity */}
            <Row label="Product / Commodity*" bg="bg-white">
              <div className="flex-1 w-full">
                <input
                  name="product"
                  value={formik.values.product}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Select Cargo"
                  className={`${inputCls} ${formik.touched.product && formik.errors.product ? "border-red-500" : ""}`}
                />
                {formik.touched.product && formik.errors.product && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.product}</div>
                )}
              </div>
            </Row>

            {/* Tanggal Kegiatan */}
            <Row label="Tanggal Kegiatan*">
              <div className="flex-1 w-full">
                <input
                  name="tanggalKegiatan"
                  value={formik.values.tanggalKegiatan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                  className={`${inputCls} ${formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan ? "border-red-500" : ""}`}
                />
                {formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan && (
                  <div className="text-red-500 text-[11px] mt-1">{formik.errors.tanggalKegiatan}</div>
                )}
              </div>
            </Row>

            {/* Surveyor In Charge */}
            <div className="flex flex-col md:flex-row items-start p-2 rounded bg-white">
              <label className="text-[13px] font-bold text-gray-700 whitespace-nowrap w-full md:w-[300px] mb-2 md:mb-0" style={{ paddingTop: 8 }}>
                Surveyor In Charge<span className="text-red-500">*</span>
              </label>
              <div className="flex-1 w-full space-y-3">
                <FieldArray name="surveyors">
                  {({ push, remove }) => (
                    <>
                      {formik.values.surveyors.map((s, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <select
                              name={`surveyors.${idx}.level`}
                              value={s.level}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`${selectCls} w-full ${formik.touched.surveyors?.[idx]?.level && (formik.errors.surveyors as Record<string, string>[])?.[idx]?.level ? "border-red-500" : ""}`}
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
                              className={`${inputCls} w-full ${formik.touched.surveyors?.[idx]?.name && (formik.errors.surveyors as Record<string, string>[])?.[idx]?.name ? "border-red-500" : ""}`}
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
                          {formik.touched.surveyors?.[idx] && (formik.errors.surveyors as Record<string, string>[])?.[idx] && (
                            <div className="text-red-500 text-[11px]">
                              {(formik.errors.surveyors as Record<string, string>[])[idx].level || (formik.errors.surveyors as Record<string, string>[])[idx].name}
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
          <div className={sectionHeader}>Timelog</div>
          <div className={`${sectionBody} space-y-1`}>
            {/* Header Row */}
            <div className="flex items-center mb-1 px-2">
              <div className="w-[300px] text-[12px] font-semibold text-gray-600">Activities</div>
              <div className="w-[160px] text-[12px] font-semibold text-gray-600">Time</div>
              <div className="w-[180px] text-[12px] font-semibold text-gray-600">Date</div>
              <div className="flex-1 text-[12px] font-semibold text-gray-600">Remarks/Delay/Etc</div>
            </div>

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
                  <button type="button" className="p-1 bg-blue-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center">
                    📄
                  </button>
                  <button type="button" className="p-1 bg-amber-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center">
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
                  <button type="button" className="p-1 bg-blue-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center">
                    📄
                  </button>
                  <button type="button" className="p-1 bg-amber-500 text-white rounded text-[10px] w-6 h-6 flex items-center justify-center">
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
          </div>

          {/* ═══════════════ QUANTITY ═══════════════ */}
          <div className={sectionHeader}>Quantity</div>
          <div className={`${sectionBody} space-y-1`}>
            {/* BL Figure header */}
            <div className="flex flex-col md:flex-row md:items-center bg-white p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                BL Figure
              </div>
              <div className="w-[140px] text-[12px] font-semibold text-gray-500 text-center">
                KL @obs
              </div>
            </div>
            <Row label="BL Quantity">
              <input
                name="blQuantity"
                value={formik.values.blQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>

            {/* Meter Figure Based On header */}
            <div className="flex items-center mt-3 pt-3 border-t border-gray-100 bg-white p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Meter Figure Based On
              </div>
              <div className="w-[140px] text-[12px] font-semibold text-gray-500 text-center">
                Flow Meter
              </div>
            </div>
            <Row label="Density@15°C">
              <input
                name="density"
                value={formik.values.density}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>

            {/* Shore Quantity Section */}
            <div className="flex items-center mt-3 pt-3 border-t border-gray-100 bg-white p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Shore Quantity
              </div>
              <div className="w-[140px] text-[12px] font-semibold text-gray-500 text-center">
                KL @obs
              </div>
            </div>
            <Row label="Shore Quantity" bg="bg-white">
              <input
                name="shoreQuantity"
                value={formik.values.shoreQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>
            <Row label="Shore Tanks Nomination">
              <input
                name="shoreTanksNomination"
                value={formik.values.shoreTanksNomination}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>

            {/* Temperature */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Row label="Temperature deg (C)" bg="bg-white">
                <input
                  name="temperatureC"
                  value={formik.values.temperatureC}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${qtyInput} w-full`}
                />
              </Row>
            </div>

            {/* Ship Figure */}
            <div className="flex items-center mt-3 pt-3 border-t border-gray-100 bg-white p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Ship Figure
              </div>
              <div className="w-[140px] text-[12px] font-semibold text-gray-500 text-center">
                KL @obs
              </div>
            </div>
            <Row label="Onboard Quantity (OBQ)">
              <input
                name="obq"
                value={formik.values.obq}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>
            <Row label="Ship's Figure After Loading (SFAL)" bg="bg-white">
              <input
                name="sfal"
                value={formik.values.sfal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${qtyInput} w-full`}
              />
            </Row>
            <Row label="Free Water After Loading">
              <input
                name="freeWaterAfterLoading"
                value={formik.values.freeWaterAfterLoading}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls}${qtyInput} w-full`}
              />
            </Row>
            <Row label="Ship's Quantity Loaded" bg="bg-white">
              <input
                name="shipsQuantityLoaded"
                value={formik.values.shipsQuantityLoaded}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700 w-[140px]"
              />
            </Row>

            {/* Discrepancy */}
            <div className="flex items-center mt-3 pt-3 border-t border-gray-100 bg-white p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Discrepancy
              </div>
              <div className="w-[140px] text-[12px] font-semibold text-gray-500 text-center">
                KL @obs
              </div>
            </div>
            <Row label="Ship's Quantity Loaded vs Bill of Lading (R1)">
              <input
                name="discR1Val"
                value={formik.values.discR1Val}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-3 py-[6px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 text-gray-700 w-[140px]"
                readOnly
              />
            </Row>
            <Row label="" bg="bg-white">
              <div className="flex items-center gap-1">
                <input
                  name="discR1Pct"
                  value={formik.values.discR1Pct}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${qtyInput} w-full bg-gray-100`}
                  readOnly
                />
                <span className="text-[13px] text-gray-600">%</span>
              </div>
            </Row>
          </div>

          {/* ═══════════════ REMARKS & NOTES ═══════════════ */}
          <div className={sectionHeader}>Remarks &amp; Notes</div>
          <div className={`${sectionBody} p-5`}>
            <div className="flex items-center gap-8 flex-wrap">
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
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  {key}
                </label>
              ))}
            </div>
          </div>

          {/* ═══════════════ SHIPS & SEA CONDITION ═══════════════ */}
          <div className="bg-[#f8fafc] border border-gray-100 rounded-md p-6 mb-5">
            <h3 className="text-[14px] font-bold text-gray-700 mb-6 tracking-wide">
              Ships &amp; Sea Condition
            </h3>
            
            <div className="grid grid-cols-2 gap-x-10">
              {/* On Arrival */}
              <div>
                <span className="text-[13px] font-bold text-gray-500 block mb-4 px-3">On Arrival</span>
                <div className="space-y-[6px]">
                  <FieldRow label="Draft FWD/meter" bgClass="bg-[#f0f4f8]">
                    <input
                      name="arrivalDraftFwd"
                      value={formik.values.arrivalDraftFwd}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="Draft AFT/meter" bgClass="bg-transparent">
                    <input
                      name="arrivalDraftAft"
                      value={formik.values.arrivalDraftAft}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="TRIM" bgClass="bg-[#f0f4f8]">
                    <input
                      name="arrivalTrim"
                      value={formik.values.arrivalTrim}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="List" bgClass="bg-transparent">
                    <input
                      name="arrivalList"
                      value={formik.values.arrivalList}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="To" bgClass="bg-[#f0f4f8]">
                    <input
                      name="arrivalTo"
                      value={formik.values.arrivalTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="Sea Condition" bgClass="bg-transparent">
                    <input
                      name="arrivalSeaCondition"
                      value={formik.values.arrivalSeaCondition}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                </div>
              </div>

              {/* On Departure */}
              <div>
                <span className="text-[13px] font-bold text-gray-500 block mb-4 px-3">On Departure</span>
                <div className="space-y-[6px]">
                  <FieldRow label="Draft FWD/meter" bgClass="bg-[#f0f4f8]">
                    <input
                      name="departureDraftFwd"
                      value={formik.values.departureDraftFwd}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="Draft AFT/meter" bgClass="bg-transparent">
                    <input
                      name="departureDraftAft"
                      value={formik.values.departureDraftAft}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="TRIM" bgClass="bg-[#f0f4f8]">
                    <input
                      name="departureTrim"
                      value={formik.values.departureTrim}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="List" bgClass="bg-transparent">
                    <input
                      name="departureList"
                      value={formik.values.departureList}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="To" bgClass="bg-[#f0f4f8]">
                    <input
                      name="departureTo"
                      value={formik.values.departureTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                  <FieldRow label="Sea Condition" bgClass="bg-transparent">
                    <input
                      name="departureSeaCondition"
                      value={formik.values.departureSeaCondition}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${qtyInput} w-full border-gray-200`}
                    />
                  </FieldRow>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ CATATAN LAIN ═══════════════ */}
          <div className={sectionHeader}>Catatan Lain</div>
          <div className={sectionBody}>
            <textarea
              name="catatan"
              value={formik.values.catatan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={5}
              placeholder="Tuliskan catatan tambahan di sini..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y bg-white"
            />
          </div>

          {/* ═══════════════ KELENGKAPAN DOKUMEN ═══════════════ */}
          <div className={sectionHeader}>Kelengkapan Dokumen</div>
          <div className={`${sectionBody} space-y-3`}>
            <ul className="text-[13px] text-gray-700 space-y-[6px] list-none">
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Surat Tugas</li>
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Surat Pengantar Pengiriman / Loading Order / Meter Reading / Delivery Order</li>
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Bill of Lading</li>
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Analysis Report</li>
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Test Report</li>
              <li className="flex items-start gap-2"><span className="text-gray-400">•</span> Dokumen HPL</li>
            </ul>

            {/* Folder Upload */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-[13px] font-bold text-gray-700 whitespace-nowrap flex-shrink-0">
                Upload Folder Dokumen:
              </span>
              <label className="px-4 py-[6px] bg-blue-50 border border-blue-200 rounded text-[13px] text-blue-700 font-medium cursor-pointer hover:bg-blue-100 transition-colors inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0">
                📁 Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFolderChange}
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  {...{ webkitdirectory: "", directory: "" } as any}
                />
              </label>
              <span className="text-[12px] text-gray-400 italic truncate">
                {folderUploadName || "No folder chosen"}
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
  children,
  bg = "bg-blue-50/50",
}: {
  label: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      className={`
        grid
        grid-cols-1
        lg:grid-cols-[280px_1fr]
        items-center
        gap-3
        p-2
        rounded
        ${bg}
      `}
    >
      <label className="text-[13px] font-medium text-gray-600">
        {label}
      </label>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

/* ── Reusable field row for Ships & Sea Condition ── */
function FieldRow({
  label,
  children,
  bgClass = "",
}: {
  label: string;
  children: React.ReactNode;
  bgClass?: string;
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between px-3 py-[6px] rounded-[4px] gap-2 md:gap-0 ${bgClass}`}>
      <span className="text-[13px] font-medium text-gray-600">
        {label}
      </span>
      <div className="w-full md:w-auto">{children}</div>
    </div>
  );
}
