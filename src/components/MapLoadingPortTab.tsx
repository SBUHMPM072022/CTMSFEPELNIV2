"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { totalDataMock } from "@/data/totalDataMock";
import { parseDateString } from "@/utils/dateHelper";

const MapWithMarkers = dynamic(() => import("./MapWithMarkers"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-gray-500 font-medium">
      Loading Map...
    </div>
  ),
});

const JenisKapalList = ["All", "Penumpang", "Perintis", "Tol Laut"];
const modaTypesList = ["All", "Truck", "Vessel", "Pipeline"];
const productTypesList = ["B-40"];
const clientsList = ["PT.PELNI (Persero)"];

export default function MapLoadingPortTab() {
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [selectedJenisKapal, setSelectedJenisKapal] = useState("All");
  const [selectedModa, setSelectedModa] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [client, setClient] = useState("PT.PELNI (Persero)");

  // Filter the mock data based on the selected criteria
  const filteredData = useMemo(() => {
    return totalDataMock.filter((row) => {
      // Filter Jenis Kapal
      let allowJenisKapal = true;
      if (selectedJenisKapal !== "All") {
        const vesselName = (row.vessel || "").toLowerCase();
        const isPerintis = vesselName.startsWith("sabuk nusantara");
        const isTolLaut = [
          "cemara nusantara",
          "logistik nusantara",
          "kendhaga nusantara",
        ].some((t) => vesselName.includes(t));
        const isPenumpang = !isPerintis && !isTolLaut;

        if (selectedJenisKapal === "Perintis" && !isPerintis)
          allowJenisKapal = false;
        if (selectedJenisKapal === "Tol Laut" && !isTolLaut)
          allowJenisKapal = false;
        if (selectedJenisKapal === "Penumpang" && !isPenumpang)
          allowJenisKapal = false;
      }

      // Filter Moda Supply
      let allowModa = true;
      if (selectedModa !== "All") {
        const portName = (row.port || "").toLowerCase();
        const isTruck = portName === "kendari";
        const isPipeline = portName === "bitung" || portName === "kupang";
        const isVessel = !isTruck && !isPipeline;

        if (selectedModa === "Truck" && !isTruck) allowModa = false;
        if (selectedModa === "Pipeline" && !isPipeline) allowModa = false;
        if (selectedModa === "Vessel" && !isVessel) allowModa = false;
      }

      let matchDate = true;
      if (appliedFilterDate) {
        const rowDate = parseDateString(row.loadingFieldDate);
        const inputDate = new Date(appliedFilterDate);
        if (rowDate) {
          matchDate =
            rowDate.getFullYear() === inputDate.getFullYear() &&
            rowDate.getMonth() === inputDate.getMonth() &&
            rowDate.getDate() === inputDate.getDate();
        } else {
          matchDate = false;
        }
      }

      return allowJenisKapal && allowModa && matchDate;
    });
  }, [selectedJenisKapal, selectedModa, appliedFilterDate]);

  // Group the filtered data by Port and assign coordinates
  const mapData = useMemo(() => {
    const groups: Record<
      string,
      { port: string; freq: number; volume: number; coords: [number, number] }
    > = {};
    const portCoordinates: Record<string, [number, number]> = {
      Ambon: [-3.695, 128.181],
      Balikpapan: [-1.267, 116.825],
      Bitung: [1.445, 125.183],
      Jakarta: [-6.175, 106.827],
      Kendari: [-3.972, 122.589],
      Kupang: [-10.158, 123.583],
      Makassar: [-5.147, 119.432],
      Sorong: [-0.864, 131.254],
      Surabaya: [-7.25, 112.768],
    };

    filteredData.forEach((row) => {
      const port = row.port;
      if (!groups[port]) {
        groups[port] = {
          port: port,
          freq: 0,
          volume: 0,
          coords: portCoordinates[port] || [-0.789, 113.921], // Fallback center
        };
      }
      groups[port].freq += 1;
      groups[port].volume += row.deliveryOrder?.kl || 0;
    });

    return Object.values(groups);
  }, [filteredData]);

  // Summary statistics
  const totalLocation = mapData.length;
  const totalFreq = mapData.reduce((sum, item) => sum + item.freq, 0);
  const totalVolume = mapData.reduce((sum, item) => sum + item.volume, 0);

  const formatIndo = (val: number) => {
    return val.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              Map Location Port
            </h2>
          </div>
        </div>

        <div className="p-5">
          {/* Filter Duration */}
          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-md">
            <p className="text-sm text-gray-500 mb-3">Filter Duration</p>
            <div className="flex items-center gap-3">
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
              <div className="flex-1">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setAppliedFilterDate(filterDate)}
              className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md"
            >
              Apply Filter
            </button>
          </div>

          {/* Jenis Kapal */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
            <span className="text-sm text-gray-600 sm:w-24">Jenis Kapal</span>
            <div className="flex flex-wrap gap-2">
              {JenisKapalList.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedJenisKapal(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedJenisKapal === type
                      ? "bg-[#2d7dd2] text-white border-[#2d7dd2]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Moda Type */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
            <span className="text-sm text-gray-600 sm:w-24">Moda Supply</span>
            <div className="flex flex-wrap gap-2">
              {modaTypesList.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedModa(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedModa === type
                      ? "bg-[#2d7dd2] text-white border-[#2d7dd2]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Product Type */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
            <span className="text-sm text-gray-600 sm:w-24">Product Type</span>
            <div className="flex flex-wrap gap-2">
              {productTypesList.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedProduct(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedProduct === type
                      ? "bg-[#2d7dd2] text-white border-[#2d7dd2]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Client */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-6">
            <span className="text-sm text-gray-600 sm:w-24">Client</span>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:min-w-[200px] sm:w-auto"
            >
              {clientsList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Map Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden relative">
            <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center z-20 relative">
              <span className="text-sm font-medium text-gray-600">
                All Transportation with All Cargo
              </span>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                {filteredData.length} Records Found
              </span>
            </div>

            <div className="relative h-[450px] bg-blue-50 w-full z-0">
              <MapWithMarkers data={mapData} />

              {/* Data Map Information Panel */}
              <div className="absolute left-2 right-2 bottom-2 sm:left-3 sm:bottom-3 sm:right-auto bg-[#f2f7f9]/60 backdrop-blur-md rounded-lg shadow-md p-3 sm:p-4 z-[1000] sm:min-w-[280px]">
                <h4 className="font-bold text-sm text-gray-800 mb-2 sm:mb-3">
                  Data Map Information
                </h4>
                <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between sm:grid sm:grid-cols-2 gap-2 text-gray-600">
                    <span>Total Location</span>
                    <span className="font-bold text-gray-800 text-right sm:text-left">
                      : {totalLocation} Location
                    </span>
                  </div>
                  <div className="flex justify-between sm:grid sm:grid-cols-2 gap-2 text-gray-600">
                    <span>Total Frequency</span>
                    <span className="font-bold text-gray-800 text-right sm:text-left">
                      : {totalFreq.toLocaleString("id-ID")} Activities
                    </span>
                  </div>
                  <div className="flex justify-between sm:grid sm:grid-cols-2 gap-2 text-gray-600">
                    <span>Total Volume</span>
                    <span className="font-bold text-gray-800 text-right sm:text-left">
                      : {formatIndo(totalVolume)} KL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
