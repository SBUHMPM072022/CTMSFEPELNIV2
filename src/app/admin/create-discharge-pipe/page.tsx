"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import NumericInput from "@/components/NumericInput";

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

  const lblCls = "w-full md:w-[300px] text-[13px] font-medium text-gray-600 whitespace-nowrap mb-1 md:mb-0";
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
            <Row label="Status Dokumen" bg="bg-blue-50/50">
              <div className="flex items-center gap-5 translate-y-[1px]">
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
            </Row>

            {/* Verifikasi */}
            <Row label="Verifikasi" bg="">
              <div className="flex items-center gap-5 translate-y-[1px]">
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
            </Row>

            {/* Order + Moda */}
            <Row label="Order" bg="bg-blue-50/50">
              <span className="text-[13px] text-gray-700 font-medium h-[32px] flex items-center">
                Pusat
              </span>
            </Row>
            <Row label="Moda" bg="">
              <span className="text-[13px] text-gray-700 font-medium h-[32px] flex items-center">
                Pipe
              </span>
            </Row>

            {/* Jenis Kapal */}
            <Row label="Jenis Kapal" bg="bg-blue-50/50">
              <select
                name="jenisKapal"
                value={formik.values.jenisKapal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputCls} ${
                    formik.touched.jenisKapal && formik.errors.jenisKapal
                      ? "border-red-500"
                      : ""
                  }`}
                  style={{ width: "250px" }}
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
            <Row label="Kontrak" bg="bg-blue-50/50">
              <select
                    name="contract"
                    value={formik.values.contract}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${
                      formik.touched.contract && formik.errors.contract
                        ? "border-red-500"
                        : ""
                    }`}
                    style={{ maxWidth: 250 }}
                  >
                    <option value="">Pilih Kontrak</option>
                    <option value="kontrak2026(1)">TH.03.09-01/KP/2026</option>
                  <option value="kontrak2026/27(2)">TH.05.01-01/KP-RO1/2026</option>
                  </select>
              {formik.touched.contract && formik.errors.contract && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.contract}</div>
              )}
            </Row>
            <Row label="SPK" bg="">
              <input
                name="spk"
                value={formik.values.spk}
                onChange={formik.handleChange}
                placeholder="Nomer SPK"
                onBlur={formik.handleBlur}
                className={`${inputCls} ${formik.touched.spk && formik.errors.spk ? "border-red-500" : ""}`}
                style={{ maxWidth: 250 }}
              />
              {formik.touched.spk && formik.errors.spk && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.spk}</div>
              )}
            </Row>

            {/* Vessel */}
            <Row label="Vessel*" bg="bg-blue-50/50">
             <select
                  name="vessel"
                  value={formik.values.vessel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${
                    formik.touched.vessel && formik.errors.vessel
                      ? "border-red-500"
                      : ""
                  }`}
                  style={{ maxWidth: 250 }}
                >
                  <option value="">Search Vessel</option>

                  {/* Kapal Penumpang */}
                  <optgroup label="-- Kapal Penumpang --">
                    <option value="KM Pangrango">KM Pangrango</option>
                    <option value="KM Sangiang">KM Sangiang</option>
                    <option value="KM Tatamailau">KM Tatamailau</option>
                    <option value="KM Bukit Siguntang">KM Bukit Siguntang</option>
                    <option value="KM Lambelu">KM Lambelu</option>
                    <option value="KM Tilongkabila">KM Tilongkabila</option>
                    <option value="KM Bukit Raya">KM Bukit Raya</option>
                    <option value="KM Ciremai">KM Ciremai</option>
                    <option value="KM Dobonsolo">KM Dobonsolo</option>
                    <option value="KM Gunung Dempo">KM Gunung Dempo</option>
                    <option value="KM Kelimutu">KM Kelimutu</option>
                    <option value="KM Kelud">KM Kelud</option>
                    <option value="KM Labobar">KM Labobar</option>
                    <option value="KM Nggapulu">KM Nggapulu</option>
                    <option value="KM Tidar">KM Tidar</option>
                    <option value="KM Jetliner">KM Jetliner</option>
                    <option value="KM Sirimau">KM Sirimau</option>
                    <option value="KM Willis">KM Willis</option>
                    <option value="KM Binaiya">KM Binaiya</option>
                    <option value="KM Leuser">KM Leuser</option>
                    <option value="KM Awu">KM Awu</option>
                    <option value="KM Dorolonda">KM Dorolonda</option>
                    <option value="KM Egon">KM Egon</option>
                    <option value="KM Lawit">KM Lawit</option>
                    <option value="KM Sinabung">KM Sinabung</option>
                  </optgroup>

                  {/* Kapal Perintis */}
                  <optgroup label="-- Kapal Perintis --">
                    <option value="KM Sabuk Nusantara 42">KM Sabuk Nusantara 42</option>
                    <option value="KM Sabuk Nusantara 48">KM Sabuk Nusantara 48</option>
                    <option value="KM Sabuk Nusantara 52">KM Sabuk Nusantara 52</option>
                    <option value="KM Sabuk Nusantara 58">KM Sabuk Nusantara 58</option>
                    <option value="KM Sabuk Nusantara 69">KM Sabuk Nusantara 69</option>
                    <option value="KM Sabuk Nusantara 78">KM Sabuk Nusantara 78</option>
                    <option value="KM Sabuk Nusantara 81">KM Sabuk Nusantara 81</option>
                    <option value="KM Sabuk Nusantara 85">KM Sabuk Nusantara 85</option>
                    <option value="KM Sabuk Nusantara 86">KM Sabuk Nusantara 86</option>
                    <option value="KM Sabuk Nusantara 91">KM Sabuk Nusantara 91</option>
                    <option value="KM Sabuk Nusantara 92">KM Sabuk Nusantara 92</option>
                    <option value="KM Sabuk Nusantara 93">KM Sabuk Nusantara 93</option>
                    <option value="KM Sabuk Nusantara 94">KM Sabuk Nusantara 94</option>
                    <option value="KM Sabuk Nusantara 96">KM Sabuk Nusantara 96</option>
                    <option value="KM Sabuk Nusantara 97">KM Sabuk Nusantara 97</option>
                    <option value="KM Sabuk Nusantara 98">KM Sabuk Nusantara 98</option>
                    <option value="KM Sabuk Nusantara 104">KM Sabuk Nusantara 104</option>
                    <option value="KM Sabuk Nusantara 106">KM Sabuk Nusantara 106</option>
                    <option value="KM Sabuk Nusantara 108">KM Sabuk Nusantara 108</option>
                    <option value="KM Sabuk Nusantara 112">KM Sabuk Nusantara 112</option>
                  </optgroup>

                  {/* Kapal Tol Laut */}
                  <optgroup label="-- Kapal Tol Laut --">
                    <option value="KM Logistik Nusantara 01">KM Logistik Nusantara 01</option>
                    <option value="KM Logistik Nusantara 02">KM Logistik Nusantara 02</option>
                    <option value="KM Logistik Nusantara 04">KM Logistik Nusantara 04</option>
                    <option value="KM Logistik Nusantara 05">KM Logistik Nusantara 05</option>
                    <option value="KM Kendhaga Nusantara 8">KM Kendhaga Nusantara 8</option>
                    <option value="KM Kendhaga Nusantara 11">KM Kendhaga Nusantara 11</option>
                    <option value="KM Cemara Nusantara 1">KM Cemara Nusantara 1</option>
                  </optgroup>
                </select>
              {formik.touched.vessel && formik.errors.vessel && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.vessel}</div>
              )}
            </Row>

            {/* Job Location */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className="w-[300px] text-[13px] font-bold text-gray-700">Job Location*</label>
            </div>
            <Row label="Cabang" bg="bg-blue-50/50">
              <select
                    name="cabang"
                    value={formik.values.cabang}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${
                      formik.touched.cabang && formik.errors.cabang
                        ? "border-red-500"
                        : ""
                    }`}
                    style={{ maxWidth: 250 }}
                  >
                  <option value="">Search Cabang Pelaksana</option>
                  <option value="c1">Cabang Medan</option>
                  <option value="c2">Cabang Padang</option>
                  <option value="c3">Cabang Batam</option>
                  <option value="c4">Cabang Bengkulu</option>
                  <option value="c5">Cabang Jakarta</option>
                  <option value="c6">Cabang Semarang</option>
                  <option value="c7">Cabang Surabaya</option>
                  <option value="c8">Cabang Denpasar</option>
                  <option value="c9">Cabang Batulicin</option>
                  <option value="c10">Cabang Makassar</option>
                  <option value="c11"> Cabang Timika</option>
                  <option value="c12">UP Ambon</option>
                  <option value="c13">UP Bitung</option>
                  <option value="c14">UP Kendari</option>
                  <option value="c15">UP Palu</option>
                  <option value="c16">UP Jayapura</option>
                  </select>
              {formik.touched.cabang && formik.errors.cabang && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.cabang}</div>
              )}
            </Row>
            <Row label="Loading Port/Terminal" bg="">
               <select
                    name="loadingPort"
                    value={formik.values.loadingPort}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${
                      formik.touched.loadingPort && formik.errors.loadingPort
                        ? "border-red-500"
                        : ""
                    }`}
                    style={{ maxWidth: 250 }}
                  >
                      <option value="">Search Loading Port</option>
                  <option value="lp1">Pelabuhan Tanjung Priok (Jakarta)</option>
                  <option value="lp2">Pelabuhan Tanjung Emas (Semarang)</option>
                  <option value="lp3">Pelabuhan Tanjung Perak (Surabaya)</option>
                  <option value="lp4">Pelabuhan Soekarno-Hatta (Makassar)</option>
                  <option value="lp5">Pelabuhan Bitung (Bitung)</option>
                  <option value="lp6">Pelabuhan Yos Sudarso (Ambon)</option>
                  <option value="lp7">Pelabuhan Tenau (Kupang)</option>
                  <option value="lp8">Pelabuhan Murhum (Baubau)</option>
                  <option value="lp9">Pelabuhan Sinabang (Simeulue)</option>
                  <option value="lp10">Pelabuhan Teluk Bayur (Padang)</option>
                  <option value="lp11">Pelabuhan Pulau Baai (Bengkulu)</option>
                  <option value="lp12">Pelabuhan Sri Bintan Pura (Tanjung Pinang)</option>
                  <option value="lp13">Pelabuhan Kijang (Bintan)</option>
                  <option value="lp14">Pelabuhan Kotabaru (Kotabaru)</option>
                  <option value="lp15">Pelabuhan Tahuna (Tahuna)</option>
                  <option value="lp16">Pelabuhan Kwandang (Kwandang)</option>
                  <option value="lp17">Pelabuhan Saumlaki (Saumlaki)</option>
                  <option value="lp18">Pelabuhan Ahmad Yani (Ternate)</option>
                  <option value="lp19">Pelabuhan Nusantara (Kendari)</option>
                  <option value="lp20">Pelabuhan Jayapura (Jayapura)</option>
                  <option value="lp21">Pelabuhan Biak (Biak)</option>
                  <option value="lp22">Pelabuhan Merauke (Merauke)</option>
                  <option value="lp23">Pelabuhan Manokwari (Manokwari)</option>
                  <option value="lp24">Pelabuhan Sorong (Sorong)</option>
                  <option value="lp25">Pelabuhan Meulaboh (Meulaboh)</option>
                  <option value="lp26">Pelabuhan Pantoloan (Palu)</option>
                  <option value="lp27">Pelabuhan Cirebon (Cirebon)</option>
                  <option value="lp28">Pelabuhan Merak (Cilegon)</option>
                  <option value="lp29">Pelabuhan Semayang (Balikpapan)</option>
                  <option value="lp30">Pelabuhan Benoa (Bali)</option>
                  <option value="lp31">Pelabuhan Tanjung Wangi (Banyuwangi)</option>
                  <option value="lp32">Pelabuhan Lamongan Shorebase (Lamongan)</option>
                  </select>

              {formik.touched.loadingPort && formik.errors.loadingPort && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.loadingPort}</div>
              )}
            </Row>
            <Row label="Area" bg="bg-blue-50/50">
               <select
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 250 }}
               >
              <option value="">Search Area</option>
                <option value="r1">Jakarta</option>
                <option value="r2">Semarang</option>
                <option value="r3">Surabaya</option>
                <option value="r4">Makassar</option>
                <option value="r5">Bitung</option>
                <option value="r6">Ambon</option>
                <option value="r7">Kupang</option>
                <option value="r8">Bau-Bau</option>
                <option value="r9">Sinabang/Simele</option>
                <option value="r10">Teluk Bayur</option>
                <option value="r11">Bengkulu</option>
                <option value="r12">Tanjung Pinang</option>
                <option value="r13">Kijang</option>
                <option value="r14">Kotabaru</option>
                <option value="r15">Tahuna</option>
                <option value="r16">Kwandang</option>
                <option value="r17">Saumlaki</option>
                <option value="r18">Ternate</option>
                <option value="r19">Kendari</option>
                <option value="r20">Jayapura</option>
                <option value="r21">Biak</option>
                <option value="r22">Merauke</option>
                <option value="r23">Manokwari</option>
                <option value="r24">Sorong</option>
                <option value="r25">Meulaboh</option>
                <option value="r26">Palu</option>
                <option value="r27">Cirebon</option>
                <option value="r28">Cilegon</option>
                <option value="r29">Balikpapan</option>
                <option value="r30">Benoa</option>
                <option value="r31">Banyuwangi</option>
                <option value="r32">Lamongan</option>
              </select>
            </Row>

            {/* Lokasi */}
            <div className="flex flex-col md:flex-row md:items-center p-2 rounded">
              <label className="w-[300px] text-[13px] font-bold text-gray-700">Lokasi</label>
            </div>
            <Row label="Terminal Tujuan" bg="bg-blue-50/50">
               <select
                    name="loadingPort"
                    value={formik.values.loadingPort}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${
                      formik.touched.loadingPort && formik.errors.loadingPort
                        ? "border-red-500"
                        : ""
                    }`}
                    style={{ maxWidth: 250 }}
                  >
                      <option value="">Search Loading Port</option>
                  <option value="lp1">Pelabuhan Tanjung Priok (Jakarta)</option>
                  <option value="lp2">Pelabuhan Tanjung Emas (Semarang)</option>
                  <option value="lp3">Pelabuhan Tanjung Perak (Surabaya)</option>
                  <option value="lp4">Pelabuhan Soekarno-Hatta (Makassar)</option>
                  <option value="lp5">Pelabuhan Bitung (Bitung)</option>
                  <option value="lp6">Pelabuhan Yos Sudarso (Ambon)</option>
                  <option value="lp7">Pelabuhan Tenau (Kupang)</option>
                  <option value="lp8">Pelabuhan Murhum (Baubau)</option>
                  <option value="lp9">Pelabuhan Sinabang (Simeulue)</option>
                  <option value="lp10">Pelabuhan Teluk Bayur (Padang)</option>
                  <option value="lp11">Pelabuhan Pulau Baai (Bengkulu)</option>
                  <option value="lp12">Pelabuhan Sri Bintan Pura (Tanjung Pinang)</option>
                  <option value="lp13">Pelabuhan Kijang (Bintan)</option>
                  <option value="lp14">Pelabuhan Kotabaru (Kotabaru)</option>
                  <option value="lp15">Pelabuhan Tahuna (Tahuna)</option>
                  <option value="lp16">Pelabuhan Kwandang (Kwandang)</option>
                  <option value="lp17">Pelabuhan Saumlaki (Saumlaki)</option>
                  <option value="lp18">Pelabuhan Ahmad Yani (Ternate)</option>
                  <option value="lp19">Pelabuhan Nusantara (Kendari)</option>
                  <option value="lp20">Pelabuhan Jayapura (Jayapura)</option>
                  <option value="lp21">Pelabuhan Biak (Biak)</option>
                  <option value="lp22">Pelabuhan Merauke (Merauke)</option>
                  <option value="lp23">Pelabuhan Manokwari (Manokwari)</option>
                  <option value="lp24">Pelabuhan Sorong (Sorong)</option>
                  <option value="lp25">Pelabuhan Meulaboh (Meulaboh)</option>
                  <option value="lp26">Pelabuhan Pantoloan (Palu)</option>
                  <option value="lp27">Pelabuhan Cirebon (Cirebon)</option>
                  <option value="lp28">Pelabuhan Merak (Cilegon)</option>
                  <option value="lp29">Pelabuhan Semayang (Balikpapan)</option>
                  <option value="lp30">Pelabuhan Benoa (Bali)</option>
                  <option value="lp31">Pelabuhan Tanjung Wangi (Banyuwangi)</option>
                  <option value="lp32">Pelabuhan Lamongan Shorebase (Lamongan)</option>
                  </select>

            </Row>
            <Row label="Bunker Order" bg="">
              <input
                name="bunkerOrderGen"
                value={formik.values.bunkerOrderGen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 120 }}
              />
            </Row>
            <Row label="Received Order" bg="bg-blue-50/50">
              <input
                name="receivedOrder"
                value={formik.values.receivedOrder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputCls}
                style={{ maxWidth: 120 }}
              />
            </Row>

            {/* Product / Commodity */}
            <Row label="Product / Commodity*" bg="">
              <select
                  name="product"
                  value={formik.values.product}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputCls} ${
                    formik.touched.product && formik.errors.product
                      ? "border-red-500"
                      : ""
                  }`}
                  style={{ maxWidth: 250 }}
                >
                  <option value="">Select Cargo</option>
                  <option value="BBM">B40</option>
                </select>
              {formik.touched.product && formik.errors.product && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.product}</div>
              )}
            </Row>

            {/* Tanggal Kegiatan */}
            <Row label="Tanggal Kegiatan*" bg="bg-blue-50/50">
              <input
                name="tanggalKegiatan"
                value={formik.values.tanggalKegiatan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="date"
                className={`${inputCls} ${formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan ? "border-red-500" : ""} w-[160px]`}
                style={{ maxWidth: 250 }}
              />
              {formik.touched.tanggalKegiatan && formik.errors.tanggalKegiatan && (
                <div className="text-red-500 text-[11px] mt-1">{formik.errors.tanggalKegiatan}</div>
              )}
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
                              className={`${inputCls} ${
                              formik.touched.surveyors && formik.errors.surveyors
                                ? "border-red-500"
                                : ""
                            }`}
                            style={{ maxWidth: 250 }}
                            >
                              <option value="">Surveyor Cabang/Pusat</option>
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
            {/* Header Row - Hidden on Mobile */}
            <div className="hidden md:flex items-center mb-1 px-2">
              <div className="w-[300px] text-[12px] font-semibold text-gray-600">Activities</div>
              <div className="w-[160px] text-[12px] font-semibold text-gray-600">Time</div>
              <div className="w-[180px] text-[12px] font-semibold text-gray-600">Date</div>
              <div className="flex-1 text-[12px] font-semibold text-gray-600">Remarks/Delay/Etc</div>
            </div>

            <FieldArray name="timingRows">
              {() => (
                <>
                  {formik.values.timingRows.map((row, idx) => (
                    <div key={idx} className={`flex flex-col md:flex-row md:items-center p-3 md:p-2 rounded gap-3 md:gap-2 mb-2 md:mb-0 border md:border-none border-gray-200 ${idx % 2 === 0 ? "bg-blue-50/50" : "bg-white md:bg-transparent"}`}>
                      {/* Activities */}
                      <div className="w-full md:w-[300px] flex items-start md:items-center gap-2">
                        <span className="text-gray-500 text-[11px] w-4 mt-0.5 md:mt-0">{row.no}.</span>
                        <div className="flex flex-col w-full md:w-auto">
                          <span className="md:hidden text-[10px] font-semibold uppercase text-gray-500 mb-0.5">Activities</span>
                          <span className="text-gray-800 font-medium text-[13px]">{row.activities}</span>
                        </div>
                      </div>
                      
                      {/* Time */}
                      <div className="w-full md:w-[160px] flex flex-col md:flex-row md:items-center gap-1 mt-1 md:mt-0">
                        <span className="text-[10px] text-gray-400 md:hidden uppercase font-bold mb-0.5">Time</span>
                        <div className="flex items-center gap-1 w-full md:w-auto">
                          <input
                            type="time"
                            name={`timingRows.${idx}.time`}
                            value={row.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="px-2 py-1 border border-gray-300 rounded text-xs w-full md:w-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            placeholder="hh:mm"
                          />
                        </div>
                      </div>

                      {/* Date */}
                      <div className="w-full md:w-[180px] flex flex-col md:flex-row md:items-center gap-1 mt-1 md:mt-0">
                        <span className="text-[10px] text-gray-400 md:hidden uppercase font-bold mb-0.5">Date</span>
                        <div className="flex items-center gap-1 w-full md:w-auto">
                          <input
                            type="date"
                            name={`timingRows.${idx}.date`}
                            value={row.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="px-2 py-1 border border-gray-300 rounded text-xs w-full md:w-[105px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row md:items-center gap-1 mt-1 md:mt-0">
                        <span className="text-[10px] text-gray-400 md:hidden uppercase font-bold mb-1 block">Remarks/Delay/Etc</span>
                        <input
                          type="text"
                          name={`timingRows.${idx}.remarks`}
                          value={row.remarks}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="px-2 py-1 border border-gray-300 rounded text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
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
              <Row label="Flow Meter Awal" bg="bg-blue-50/50">
                <input
                  name="flowMeterAwal"
                  value={formik.values.flowMeterAwal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Flow Meter Akhir" bg="">
                <input
                  name="flowMeterAkhir"
                  value={formik.values.flowMeterAkhir}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Different" bg="bg-blue-50/50">
                <input
                  value={flowMeterDifferent}
                  readOnly
                  className={`${inputCls} bg-gray-50`}
                  style={{ maxWidth: 200 }}
                />
              </Row>
            </div>

            {/* Flow Meter — second group */}
            <div className="flex items-center mt-4 p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Flow Meter
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL@Obs
              </div>
            </div>
            <div className="space-y-1">
              <Row label="BL" bg="bg-blue-50/50">
                <NumericInput
                  name="blValue"
                  value={formik.values.blValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Received Vessel/All" bg="">
                <NumericInput
                  name="receivedVesselAll"
                  value={formik.values.receivedVesselAll}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Different" bg="bg-blue-50/50">
                <NumericInput
                  name="flowMeterDifferent2"
                  value={formik.values.flowMeterDifferent2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="OR" bg="">
                <NumericInput
                  name="orValue"
                  value={formik.values.orValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
            </div>

            {/* Ship Figure */}
            <div className="flex items-center mt-4 p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700">
                Ship Figure
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <Row label="Bunker Order" bg="bg-blue-50/50">
                <NumericInput
                  name="bunkerOrder"
                  value={formik.values.bunkerOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Barge Figure After Loading" bg="">
                <NumericInput
                  name="bargeFigureAfterLoading"
                  value={formik.values.bargeFigureAfterLoading}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
            </div>

            {/* In Transit */}
            <div className="flex items-center mt-4 p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                In Transit
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <Row label="Barge Figure After Loading" bg="bg-blue-50/50">
                <NumericInput
                  name="bargeFigureAfterLoading"
                  value={formik.values.bargeFigureAfterLoading}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Barge Figure Before Discharge" bg="">
                <NumericInput
                  name="bargeFigureBeforeDischarge"
                  value={formik.values.bargeFigureBeforeDischarge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
            </div>

            {/* Discharge Port */}
            <div className="flex items-center mt-4 p-2 rounded">
              <div className="w-[300px] text-[13px] font-bold text-gray-700 italic">
                Discharge Port
              </div>
              <div className="w-[150px] text-[12px] font-semibold text-gray-600 text-center">
                KL @obs
              </div>
            </div>
            <div className="space-y-1">
              <Row label="Barge Figure Before Discharge" bg="bg-blue-50/50">
                <NumericInput
                  name="bargeFigureBeforeDischarge"
                  value={formik.values.bargeFigureBeforeDischarge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
              <Row label="Ship Received" bg="">
                <NumericInput
                  name="shipReceived"
                  value={formik.values.shipReceived}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputCls}
                  style={{ maxWidth: 200 }}
                />
              </Row>
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
                <NumericInput
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
                <NumericInput
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
  children,
  bg = "bg-blue-50/50",
}: {
  label: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center p-2 rounded ${bg}`}>
      <label className="w-full md:w-[300px] text-[13px] font-medium text-gray-600 whitespace-nowrap mb-1 md:mb-0">
        {label}
      </label>
      <div className="flex-1 w-full flex flex-col">{children}</div>
    </div>
  );
}
