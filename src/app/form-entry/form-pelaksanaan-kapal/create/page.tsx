"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  namaKapal: Yup.string().required("Nama Kapal is required"),
  tanggal: Yup.string().required("Tanggal is required"),
  voyage: Yup.string().required("Voyage is required"),
  kl: Yup.string().required("KL is required"),
  cabang: Yup.string().required("Cabang is required"),
  verification: Yup.string().required("Verification is required"),
  product: Yup.string().required("Product is required"),
});

export default function CreateFormPelaksanaanKapal() {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      namaKapal: "",
      tanggal: "",
      voyage: "",
      kl: "",
      cabang: "",
      suratTanggal: "",
      suratWaktu: "",
      folderFile: null as File | null,
      verification: "",
      comment: "",
      product: "",
      baFile: null as File | null,
    },
    validationSchema,
    onSubmit: () => {
      // simulate success toast
      setToastMsg("Data successfully created.");
      setTimeout(() => {
        router.push("/form-entry/form-pelaksanaan-kapal");
      }, 1500);
    },
  });

  const handleKLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(Number(rawValue)) && rawValue !== '') {
      formik.setFieldValue('kl', Number(rawValue).toLocaleString('en-US'));
    } else if (rawValue === '') {
      formik.setFieldValue('kl', '');
    }
  };

  const lblBold = "text-[13px] font-bold text-gray-800 whitespace-nowrap mb-2 md:mb-0 w-full md:w-[200px] shrink-0";
  const rowWhite = "bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-start md:items-center px-4 md:px-6 py-3 md:py-4";
  const rowBlue = "bg-[#eef3fb] border-b border-gray-200 flex flex-col md:flex-row md:items-start md:items-center px-4 md:px-6 py-3 md:py-4";
  const inputCls = "w-full md:max-w-[400px] px-3 py-[8px] border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#5b93d3] focus:border-[#5b93d3] bg-white text-gray-700 transition-colors";
  
  const sectionHeader = "bg-[#1a2744] text-white text-[13px] font-bold px-4 py-[10px] flex items-center gap-2 border-b border-[#1a2744]";

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {toastMsg}
        </div>
      )}

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Form Pelaksanaan Kapal / Create" />

        {/* Card Padding: Mobile 16px (p-4), Desktop 24px (md:p-6) */}
        <div className="p-4 md:p-6 flex-1 overflow-x-hidden">
          
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm mb-6">
              
              {/* === General Information === */}
              <div className={sectionHeader}>
                <div className="w-[3px] h-4 bg-[#5b93d3] rounded-sm" />
                General Information
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Nama Kapal <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <select
                    name="namaKapal"
                    value={formik.values.namaKapal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.namaKapal && formik.errors.namaKapal ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select Vessel</option>
                    <option value="KM Pangrango">KM Pangrango</option>
                    <option value="KM Sangiang">KM Sangiang</option>
                    <option value="KM Tatamailau">KM Tatamailau</option>
                    <option value="KM Bukit Siguntang">KM Bukit Siguntang</option>
                  </select>
                  {formik.touched.namaKapal && formik.errors.namaKapal && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.namaKapal}</div>
                  )}
                </div>
              </div>

              <div className={rowBlue}>
                <label className={lblBold}>Tanggal <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <input
                    type="date"
                    name="tanggal"
                    value={formik.values.tanggal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.tanggal && formik.errors.tanggal ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formik.touched.tanggal && formik.errors.tanggal && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.tanggal}</div>
                  )}
                </div>
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Voyage <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <input
                    type="text"
                    name="voyage"
                    placeholder="Enter Voyage"
                    value={formik.values.voyage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.voyage && formik.errors.voyage ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formik.touched.voyage && formik.errors.voyage && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.voyage}</div>
                  )}
                </div>
              </div>

              <div className={rowBlue}>
                <label className={lblBold}>KL <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <input
                    type="text"
                    name="kl"
                    placeholder="Enter Quantity (KL)"
                    value={formik.values.kl}
                    onChange={handleKLChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.kl && formik.errors.kl ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formik.touched.kl && formik.errors.kl && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.kl}</div>
                  )}
                </div>
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Cabang <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <select
                    name="cabang"
                    value={formik.values.cabang}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.cabang && formik.errors.cabang ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select Branch</option>
                    <option value="Cabang Medan">Cabang Medan</option>
                    <option value="Cabang Padang">Cabang Padang</option>
                    <option value="Cabang Jakarta">Cabang Jakarta</option>
                    <option value="Cabang Surabaya">Cabang Surabaya</option>
                  </select>
                  {formik.touched.cabang && formik.errors.cabang && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.cabang}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm mb-6">
              {/* === Surat Penunjukkan === */}
              <div className={sectionHeader}>
                <div className="w-[3px] h-4 bg-[#5b93d3] rounded-sm" />
                Surat Penunjukkan
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Tanggal</label>
                <div className="w-full md:flex-1">
                  <input
                    type="date"
                    name="suratTanggal"
                    value={formik.values.suratTanggal}
                    onChange={formik.handleChange}
                    className={`${inputCls} border-gray-300`}
                  />
                </div>
              </div>

              <div className={rowBlue}>
                <label className={lblBold}>Waktu</label>
                <div className="w-full md:flex-1">
                  <input
                    type="time"
                    name="suratWaktu"
                    value={formik.values.suratWaktu}
                    onChange={formik.handleChange}
                    className={`${inputCls} border-gray-300`}
                  />
                </div>
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Upload Folder</label>
                <div className="w-full md:flex-1">
                  <div className="flex items-center w-full md:max-w-[400px] border border-gray-300 rounded overflow-hidden bg-white">
                    <label className="bg-gray-100 px-4 py-[8px] text-sm font-medium text-gray-700 cursor-pointer border-r border-gray-300 hover:bg-gray-200 transition-colors shrink-0">
                      Choose File
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            formik.setFieldValue("folderFile", e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <span className="px-3 py-[8px] text-sm text-gray-500 truncate flex-1">
                      {formik.values.folderFile ? formik.values.folderFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm mb-6">
              {/* === Quotation === */}
              <div className={sectionHeader}>
                <div className="w-[3px] h-4 bg-[#5b93d3] rounded-sm" />
                Quotation
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Verification <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <select
                    name="verification"
                    value={formik.values.verification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.verification && formik.errors.verification ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Options</option>
                    <option value="Verified">Verified</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                  {formik.touched.verification && formik.errors.verification && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.verification}</div>
                  )}
                </div>
              </div>

              <div className={rowBlue}>
                <label className={lblBold} style={{ marginTop: '10px' }}>Comment</label>
                <div className="w-full md:flex-1">
                  <textarea
                    name="comment"
                    placeholder="Write your comments here..."
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    rows={3}
                    className={`w-full md:max-w-[400px] px-3 py-[8px] border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#5b93d3] focus:border-[#5b93d3] bg-white text-gray-700 resize-y min-h-[80px]`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm mb-6">
              {/* === Loading Order === */}
              <div className={sectionHeader}>
                <div className="w-[3px] h-4 bg-[#5b93d3] rounded-sm" />
                Loading Order
              </div>

              <div className={rowWhite}>
                <label className={lblBold}>Product <span className="text-red-500">*</span></label>
                <div className="w-full md:flex-1">
                  <input
                    type="text"
                    name="product"
                    placeholder="Enter Product Name"
                    value={formik.values.product}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputCls} ${formik.touched.product && formik.errors.product ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formik.touched.product && formik.errors.product && (
                    <div className="text-red-500 text-[11px] mt-1">{formik.errors.product}</div>
                  )}
                </div>
              </div>

              <div className={rowBlue}>
                <label className={lblBold}>Upload Berita Acara Cabang</label>
                <div className="w-full md:flex-1">
                  <div className="flex items-center w-full md:max-w-[400px] border border-gray-300 rounded overflow-hidden bg-white">
                    <label className="bg-gray-100 px-4 py-[8px] text-sm font-medium text-gray-700 cursor-pointer border-r border-gray-300 hover:bg-gray-200 transition-colors shrink-0">
                      Choose File
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            formik.setFieldValue("baFile", e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <span className="px-3 py-[8px] text-sm text-gray-500 truncate flex-1">
                      {formik.values.baFile ? formik.values.baFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* === Submit Button === */}
            <div className="flex justify-start pb-8">
              <button
                type="submit"
                className="w-full md:w-auto bg-[#5b93d3] hover:bg-[#4a7fc0] text-white px-8 py-[10px] rounded-md text-sm font-bold tracking-wide transition-colors shadow-sm uppercase"
              >
                Submit
              </button>
            </div>
            
          </form>

        </div>
      </div>
    </div>
  );
}
