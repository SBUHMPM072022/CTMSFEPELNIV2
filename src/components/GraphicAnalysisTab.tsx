/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { totalDataMock } from "../data/totalDataMock";
import { parseDateString } from "@/utils/dateHelper";
interface FuelDistribution {
  shipName?: string;
  noPol?: string;
  noTruck?: string;
  loadingPort: string;
  tujuan?: string;
  volumeDO?: string;
  volumeBBL?: string;
  volumeNTSD?: string;
  volumeReceived?: string;
  shipReceived?: string;
  modeSupply: string;
  volumeSFAL?: string;
  volumeSFBD?: string;
}

interface DataPoint {
  date: string;
  value: number;
  r4Value?: number;
  distributions?: FuelDistribution[];
}

// Helper to generate dummy truck distributions
const generateTruckDistributions = (
  count: number,
  baseVol: number,
): FuelDistribution[] => {
  return Array.from({ length: count }).map((_, i) => ({
    noPol: `B ${9000 + i + Math.floor(Math.random() * 900)} XYZ`,
    noTruck: `J ${2000 + i + Math.floor(Math.random() * 900)} ABC`,
    modeSupply: "Truck",
    loadingPort: ["MERAK", "JAKARTA", "SURABAYA", "SEMARANG"][
      Math.floor(Math.random() * 4)
    ],
    tujuan: ["KM KELUD", "KM BUKIT RAYA", "KM WILIS", "KM SINABUNG"][
      Math.floor(Math.random() * 4)
    ],
    volumeDO: `${(baseVol / count).toFixed(1)}KL`,
    shipReceived: `${((baseVol / count) * 0.98).toFixed(1)}KL`,
  }));
};

// Helper to calculate total volume from distributions
const calculateTotalVolume = (distributions?: FuelDistribution[]) => {
  if (!distributions) return 0;
  return distributions.reduce((sum, dist) => {
    const vol = parseFloat(dist.volumeDO?.replace(/[^0-9.]/g, "") || "0");
    return sum + vol;
  }, 0);
};

// Dummy data for charts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vesselLoadingData: DataPoint[] = [
  {
    date: "01 JAN 2026",
    value: 195,
    distributions: [
      {
        shipName: "LCT Dwi Bayu",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM PANGRANGO",
        volumeDO: "100KL",
        shipReceived: "98KL",
      },
      {
        shipName: "MT Raafiah",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM LAWIT",
        volumeDO: "95KL",
        shipReceived: "93KL",
      },
    ],
  },
  {
    date: "02 JAN 2026",
    value: 185,
    distributions: [
      {
        shipName: "LCT Wira 1",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM SANGIANG",
        volumeDO: "75KL",
        shipReceived: "73KL",
      },
      {
        shipName: "SPOB Petro Energy",
        modeSupply: "Vessel",
        loadingPort: "JAKARTA",
        tujuan: "KM TIDAR",
        volumeDO: "110KL",
        shipReceived: "108KL",
      },
    ],
  },
  {
    date: "03 JAN 2026",
    value: 85,
    distributions: [
      {
        shipName: "SPOB Petro Energy",
        modeSupply: "Vessel",
        loadingPort: "JAKARTA",
        tujuan: "KM GUNUNG DEMPO",
        volumeDO: "85KL",
        shipReceived: "83KL",
      },
    ],
  },
  {
    date: "04 JAN 2026",
    value: 65,
    distributions: [
      {
        shipName: "TK Insam 02",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM AWU",
        volumeDO: "65KL",
        shipReceived: "63KL",
      },
    ],
  },
  {
    date: "06 JAN 2026",
    value: 265,
    distributions: [
      {
        shipName: "LCT Elisa",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM PANGRANGO",
        volumeDO: "50KL",
        shipReceived: "49KL",
      },
      {
        shipName: "SPOB Wavin 1",
        modeSupply: "Vessel",
        loadingPort: "MAKASSAR",
        tujuan: "KM BINAIYA",
        volumeDO: "55KL",
        shipReceived: "54KL",
      },
      {
        shipName: "MT Raafiah",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM DOROLONDA",
        volumeDO: "75KL",
        shipReceived: "73KL",
      },
      {
        shipName: "SPOB Hubmar 12",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM EGON",
        volumeDO: "85KL",
        shipReceived: "83KL",
      },
    ],
  },
  {
    date: "09 JAN 2026",
    value: 140,
    distributions: [
      {
        shipName: "SPOB Petro Energy",
        modeSupply: "Vessel",
        loadingPort: "JAKARTA",
        tujuan: "KM NGGAPULU",
        volumeDO: "140KL",
        shipReceived: "138KL",
      },
    ],
  },
  {
    date: "11 JAN 2026",
    value: 120,
    distributions: [
      {
        shipName: "SPOB Royal Rey 350",
        modeSupply: "Vessel",
        loadingPort: "BALIKPAPAN",
        tujuan: "KM LAMBELU",
        volumeDO: "120KL",
        shipReceived: "118KL",
      },
    ],
  },
  {
    date: "12 JAN 2026",
    value: 90,
    distributions: [
      {
        shipName: "SPOB Royal Rey 350",
        modeSupply: "Vessel",
        loadingPort: "BALIKPAPAN",
        tujuan: "KM BUKIT SIGUNTANG",
        volumeDO: "90KL",
        shipReceived: "88KL",
      },
    ],
  },
  {
    date: "14 JAN 2026",
    value: 155,
    distributions: [
      {
        shipName: "TK Insam 02",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM SINABUNG",
        volumeDO: "155KL",
        shipReceived: "153KL",
      },
    ],
  },
  {
    date: "16 JAN 2026",
    value: 80,
    distributions: [
      {
        shipName: "LCT Perkasa Prima",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM PANGRANGO",
        volumeDO: "80KL",
        shipReceived: "78KL",
      },
    ],
  },
  {
    date: "18 JAN 2026",
    value: 110,
    distributions: [
      {
        shipName: "SPOB Graha Dua Dua",
        modeSupply: "Vessel",
        loadingPort: "JAKARTA",
        tujuan: "KM TIDAR",
        volumeDO: "110KL",
        shipReceived: "108KL",
      },
    ],
  },
  {
    date: "20 JAN 2026",
    value: 130,
    distributions: [
      {
        shipName: "LCT Dwi Bayu",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM PANGRANGO",
        volumeDO: "130KL",
        shipReceived: "128KL",
      },
    ],
  },
  {
    date: "22 JAN 2026",
    value: 95,
    distributions: [
      {
        shipName: "SPOB Royal Rey 350",
        modeSupply: "Vessel",
        loadingPort: "BALIKPAPAN",
        tujuan: "KM LAMBELU",
        volumeDO: "95KL",
        shipReceived: "93KL",
      },
    ],
  },
  {
    date: "25 JAN 2026",
    value: 175,
    distributions: [
      {
        shipName: "MT Elok Selatan",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM TATAMAILAU",
        volumeDO: "175KL",
        shipReceived: "172KL",
      },
    ],
  },
  {
    date: "27 JAN 2026",
    value: 65,
    distributions: [
      {
        shipName: "TK Insam 02",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM EGON",
        volumeDO: "65KL",
        shipReceived: "64KL",
      },
    ],
  },
  {
    date: "29 JAN 2026",
    value: 200,
    distributions: [
      {
        shipName: "SPOB Elisa",
        modeSupply: "Vessel",
        loadingPort: "AMBON",
        tujuan: "KM PANGRANGO",
        volumeDO: "80KL",
        shipReceived: "79KL",
      },
      {
        shipName: "SPOB Royal Rey 350",
        modeSupply: "Vessel",
        loadingPort: "BALIKPAPAN",
        tujuan: "KM BUKIT SIGUNTANG",
        volumeDO: "120KL",
        shipReceived: "118KL",
      },
    ],
  },
  {
    date: "31 JAN 2026",
    value: 180,
    distributions: [
      {
        shipName: "MT Raafiah",
        modeSupply: "Vessel",
        loadingPort: "SURABAYA",
        tujuan: "KM DOROLONDA",
        volumeDO: "180KL",
        shipReceived: "178KL",
      },
    ],
  },
];

const formatIndo = (val: number, decimals: number = 3) => {
  return val.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatDate = (d: string) => {
  if (!d || d === "-") return "-";
  const parts = d.split("-");
  if (parts.length === 3) {
    return `${parts[0]} ${parts[1].toUpperCase()} 20${parts[2]}`;
  }
  return d.toUpperCase();
};

const groupAllTotalData = (
  vesselFilter: string = "",
  appliedFilterDate: string = "",
) => {
  const groupedVessel = new Map<
    string,
    { value: number; r4Value: number; distributions: FuelDistribution[] }
  >();
  const groupedTruck = new Map<
    string,
    { value: number; r4Value: number; distributions: FuelDistribution[] }
  >();
  const groupedPipe = new Map<
    string,
    { value: number; r4Value: number; distributions: FuelDistribution[] }
  >();

  totalDataMock.forEach((row) => {
    if (!row.loadingFieldDate || row.loadingFieldDate === "-") return;
    if (
      vesselFilter &&
      !row.vessel.toLowerCase().includes(vesselFilter.toLowerCase())
    )
      return;

    if (appliedFilterDate) {
      const rowDate = parseDateString(row.loadingFieldDate);
      const inputDate = new Date(appliedFilterDate);
      if (!rowDate) return;
      if (
        rowDate.getFullYear() !== inputDate.getFullYear() ||
        rowDate.getMonth() !== inputDate.getMonth() ||
        rowDate.getDate() !== inputDate.getDate()
      ) {
        return;
      }
    }

    const dateStr = formatDate(row.loadingFieldDate);
    const port = row.port?.toUpperCase() || "";

    let mode: "Vessel" | "Truck" | "Pipeline" = "Vessel";
    if (port.includes("KENDARI")) {
      mode = "Truck";
    } else if (port.includes("BITUNG") || port.includes("KUPANG")) {
      mode = "Pipeline";
    }

    const targetMap =
      mode === "Vessel"
        ? groupedVessel
        : mode === "Truck"
          ? groupedTruck
          : groupedPipe;

    if (!targetMap.has(dateStr)) {
      targetMap.set(dateStr, { value: 0, r4Value: 0, distributions: [] });
    }

    const group = targetMap.get(dateStr)!;
    group.value += row.deliveryOrder.kl;
    group.r4Value += row.difference.clerk;

    if (mode === "Vessel") {
      group.distributions.push({
        shipName: row.vessel,
        modeSupply: "Vessel",
        loadingPort: row.port,
        volumeDO: `${formatIndo(row.deliveryOrder.kl)}KL`,
        volumeSFAL: `${formatIndo(row.bargeFigAfterLoading.kl)}KL`,
        volumeSFBD: `${formatIndo(row.bargeFigBeforeDischarge.kl)}KL`,
        shipReceived: `${formatIndo(row.shipReceived.kl)}KL`,
      });
    } else if (mode === "Truck") {
      const counts = [2, 5, 7];
      const truckCount = counts[row.no % 3];

      for (let i = 0; i < truckCount; i++) {
        const splitDO = row.deliveryOrder.kl / truckCount;
        const splitRecv = row.shipReceived.kl / truckCount;

        group.distributions.push({
          shipName: row.vessel,
          modeSupply: "Truck",
          loadingPort: row.port,
          noPol: `B ${1000 + ((row.no * 37 + i * 11) % 9000)} XYZ`,
          volumeDO: `${formatIndo(splitDO)}KL`,
          shipReceived: `${formatIndo(splitRecv)}KL`,
        });
      }
    } else {
      group.distributions.push({
        shipName: row.vessel,
        modeSupply: "Pipeline",
        loadingPort: row.port,
        volumeDO: `${formatIndo(row.deliveryOrder.kl)}KL`,
        shipReceived: `${formatIndo(row.shipReceived.kl)}KL`,
      });
    }
  });

  const getArray = (map: Map<string, { value: number; r4Value: number; distributions: FuelDistribution[] }>) =>
    Array.from(map.entries())
      .map(([date, data]) => ({
        date,
        value: data.value,
        r4Value: data.r4Value,
        distributions: data.distributions,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    vessel: getArray(groupedVessel),
    truck: getArray(groupedTruck),
    pipe: getArray(groupedPipe),
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modaSupplyTypes = ["All", "Truck", "Vessel", "Pipe"];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modaTypes = ["Loading", "Discharge"];

interface LineChartProps {
  title: string;
  data: DataPoint[];
  isVesselLoading?: boolean;
}

function LineChart({ title, data, isVesselLoading }: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    point: DataPoint;
    x: number;
    y: number;
  } | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const chartWidth = 700;
  const chartHeight = 230;
  const padding = { top: 40, right: 30, bottom: 70, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate Nice Scale
  const values = data.map((d) => d.value);
  const rawMin = data.length > 0 ? Math.min(...values) : 0;
  const rawMax = data.length > 0 ? Math.max(...values) : 100;

  // Ensure we include 0 if it's close or if we have negative values
  const minAdjusted = Math.min(rawMin, 0);
  const maxAdjusted = Math.max(rawMax, rawMin === rawMax ? rawMin + 1 : rawMax);

  const calculateNiceScale = (min: number, max: number, maxTicks = 6) => {
    const range = max - min;
    const roughStep = range / (maxTicks - 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(roughStep) || 1)));
    const residual = Math.abs(roughStep) / magnitude;

    let step;
    if (residual < 1.5) step = 1 * magnitude;
    else if (residual < 3.5) step = 2 * magnitude;
    else if (residual < 7.5) step = 5 * magnitude;
    else step = 10 * magnitude;

    const niceMin = Math.floor(min / step) * step;
    const niceMax = Math.ceil(max / step) * step;

    const ticks = [];
    // Use a small epsilon to avoid floating point issues in the loop
    for (let t = niceMax; t >= niceMin - step / 100; t -= step) {
      ticks.push(t);
    }

    return { min: niceMin, max: niceMax, ticks };
  };

  const {
    min: niceMin,
    max: niceMax,
    ticks: yAxisTicks,
  } = calculateNiceScale(minAdjusted, maxAdjusted);

  const xScale = (index: number) =>
    padding.left + (index / Math.max(1, data.length - 1)) * innerWidth;

  const yScale = (value: number) =>
    padding.top +
    innerHeight -
    ((value - niceMin) / (niceMax - niceMin || 1)) * innerHeight;

  // Create smooth curve path
  const smoothPath = data.reduce((acc, point, index, arr) => {
    const x = xScale(index);
    const y = yScale(point.value);

    if (index === 0) return `M ${x} ${y}`;

    const prevX = xScale(index - 1);
    const prevY = yScale(arr[index - 1].value);
    const cpX = (prevX + x) / 2;

    return `${acc} C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
  }, "");

  const handleMouseEnter = (point: DataPoint, index: number) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    if (point.distributions && point.distributions.length > 0) {
      setHoveredPoint({ point, x: xScale(index), y: yScale(point.value) });
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredPoint(null);
    }, 2000); // 2 seconds delay
    setHideTimeout(timeout);
  };

  const clearHover = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setHoveredPoint(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Y-axis labels */}
          {yAxisTicks.map((val, index) => (
            <text
              key={index}
              x={padding.left - 10}
              y={yScale(val)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-[10px] font-medium fill-gray-500"
            >
              {formatIndo(val, val === Math.floor(val) ? 0 : 2)}
            </text>
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={index}
              x={xScale(index)}
              y={chartHeight - padding.bottom + 20}
              textAnchor="end"
              className="text-[10px] fill-gray-500 font-medium"
              transform={`rotate(-45, ${xScale(index)}, ${chartHeight - padding.bottom + 20})`}
            >
              {point.date}
            </text>
          ))}

          {/* Grid lines */}
          {yAxisTicks.map((val, index) => (
            <line
              key={index}
              x1={padding.left}
              y1={yScale(val)}
              x2={chartWidth - padding.right}
              y2={yScale(val)}
              stroke={val === 0 ? "#9ca3af" : "#e5e7eb"}
              strokeWidth={val === 0 ? "1.5" : "1"}
              strokeDasharray={val === 0 ? "" : "4,4"}
            />
          ))}

          {/* Line path without glow */}
          <path d={smoothPath} fill="none" stroke="#3b82f6" strokeWidth="2" />

          {/* Data point labels and interactive markers (simple) */}
          {data.map((point, index) => (
            <g key={index}>
              <text
                x={xScale(index)}
                y={yScale(point.value) - 10}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-blue-600"
              >
                {formatIndo(
                  point.value,
                  niceMax - niceMin < 2 ? 2 : 0
                )}
              </text>
              <circle
                cx={xScale(index)}
                cy={yScale(point.value)}
                r="4"
                fill="#ffffff"
                stroke="#3b82f6"
                strokeWidth="2"
                className="cursor-pointer hover:r-[6px] transition-all"
                onMouseEnter={() => handleMouseEnter(point, index)}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          ))}
        </svg>

        {/* Improved Modern Tooltip */}
        {hoveredPoint && hoveredPoint.point.distributions && (
          <div
            className="absolute bg-white rounded-xl shadow-2xl p-0 z-50 text-xs min-w-[320px] max-w-[400px] border border-gray-100 overflow-hidden transition-opacity duration-200"
            style={{
              left: `${(hoveredPoint.x / chartWidth) * 100}%`,
              top: `${(hoveredPoint.y / chartHeight) * 100}%`,
              transform: "translate(10px, -50%)", // Move to right (10px offset) and center vertically relative to point
              zIndex: 100, // Ensure it's above everything
            }}
            onMouseEnter={() => {
              if (hideTimeout) {
                clearTimeout(hideTimeout);
                setHideTimeout(null);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* Tooltip Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 pb-4 relative">
              <button
                onClick={clearHover}
                className="absolute top-2 right-2 text-white/70 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex justify-between items-center text-white mb-1 pr-6">
                <span className="font-bold text-sm">
                  {hoveredPoint.point.date}
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                  {hoveredPoint.point.distributions.length} Data Points
                </span>
              </div>
              <div className="text-blue-100 text-[10px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Total Volume:{" "}
                {calculateTotalVolume(hoveredPoint.point.distributions)} KL
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar bg-gray-50/50">
              {hoveredPoint.point.distributions.map((dist, idx) => (
                <div
                  key={idx}
                  className="p-3 border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-xs">
                          {dist.shipName || dist.noPol || "Unknown Transport"}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                          {dist.modeSupply}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                        {dist.noPol && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            No POL:{" "}
                            <span className="font-medium text-gray-900">
                              {dist.noPol}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                          Port:{" "}
                          <span className="font-medium text-gray-900">
                            {dist.loadingPort}
                          </span>
                        </div>
                        {dist.tujuan && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                            Dest:{" "}
                            <span className="font-medium text-gray-900">
                              {dist.tujuan}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                          Vol. DO:{" "}
                          <span className="font-medium text-gray-900">
                            {dist.volumeDO}
                          </span>
                        </div>
                        {dist.volumeSFAL && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                            Vol SFAL:{" "}
                            <span className="font-medium text-gray-900">
                              {dist.volumeSFAL}
                            </span>
                          </div>
                        )}
                        {dist.volumeSFBD && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                            Vol SFBD:{" "}
                            <span className="font-medium text-gray-900">
                              {dist.volumeSFBD}
                            </span>
                          </div>
                        )}
                        {dist.shipReceived && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            Recv:{" "}
                            <span className="font-medium text-gray-900">
                              {dist.shipReceived}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GraphicAnalysisTab() {
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilterDate, setAppliedFilterDate] = useState("");
  const [selectedModaSupply, setSelectedModaSupply] = useState("All");
  const [selectedModa, setSelectedModa] = useState("Discharge");
  const [vesselFilter, setVesselFilter] = useState("");

  let filteredVesselLoadingData = vesselFilter
    ? vesselLoadingData
        .map((p) => ({
          ...p,
          distributions: p.distributions?.filter(
            (d) =>
              (d.tujuan || "")
                .toLowerCase()
                .includes(vesselFilter.toLowerCase()) ||
              (d.shipName || "")
                .toLowerCase()
                .includes(vesselFilter.toLowerCase()),
          ),
        }))
        .filter((p) => p.distributions && p.distributions.length > 0)
        .map((p) => ({
          ...p,
          value: calculateTotalVolume(p.distributions),
        }))
    : vesselLoadingData;

  if (appliedFilterDate) {
    const inputDate = new Date(appliedFilterDate);
    filteredVesselLoadingData = filteredVesselLoadingData.filter((p) => {
      const rowDate = parseDateString(p.date);
      if (!rowDate) return false;
      return (
        rowDate.getFullYear() === inputDate.getFullYear() &&
        rowDate.getMonth() === inputDate.getMonth() &&
        rowDate.getDate() === inputDate.getDate()
      );
    });
  }

  const allGroupedDischargeData = groupAllTotalData(
    vesselFilter,
    appliedFilterDate,
  );
  const vesselDischargeData: DataPoint[] = allGroupedDischargeData.vessel;
  const truckDischargeData: DataPoint[] = allGroupedDischargeData.truck;
  const pipelineDischargeData: DataPoint[] = allGroupedDischargeData.pipe;

  return (
    <div className="p-6">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">
              Graphic Analysis
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

          {/* Moda Supply Filter */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Moda Supply</span>
            <div className="flex gap-2">
              {modaSupplyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedModaSupply(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition-all ${
                    selectedModaSupply === type
                      ? "bg-[#2d7dd2] text-white border-[#2d7dd2]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Moda Filter */}
          {/* <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600 w-24">Moda</span>
            <div className="flex gap-2">
              {modaTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedModa(type)}
                  className={`px-4 py-1 rounded-md text-sm border transition-all ${
                    selectedModa === type
                      ? "bg-[#2d7dd2] text-white border-[#2d7dd2]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div> */}

          {/* Vessel Filter */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-600 w-24">Vessel</span>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={vesselFilter}
                onChange={(e) => setVesselFilter(e.target.value)}
                placeholder="Cari nama vessel..."
                className="pl-9 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-[200px]"
              />
              {vesselFilter && (
                <button
                  onClick={() => setVesselFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            {/* {selectedModa === "Loading" && (
              <>
                {/* Graphic Loading (Vessel) */}
            {/*     <LineChart
                  title="Graphic Loading (Vessel)"
                  data={filteredVesselLoadingData}
                  isVesselLoading={true}
                />
              </>
            )} */}

            {selectedModa === "Discharge" && (
              <>
                {(selectedModaSupply === "All" ||
                  selectedModaSupply === "Vessel") && (
                  <LineChart
                    title="Bunker Disrepancy (Pelni Ship vs DO)"
                    data={vesselDischargeData.map((d) => ({
                      ...d,
                      value: d.r4Value ?? 0,
                    }))}
                  />
                )}

                {(selectedModaSupply === "All" ||
                  selectedModaSupply === "Truck") && (
                  <LineChart
                    title="Bunker Disrepancy (Truck vs DO)"
                    data={truckDischargeData.map((d) => ({
                      ...d,
                      value: d.r4Value ?? 0,
                    }))}
                  />
                )}

                {(selectedModaSupply === "All" ||
                  selectedModaSupply === "Pipe") && (
                  <LineChart
                    title="Bunker Disrepancy (Pipeline vs DO)"
                    data={pipelineDischargeData.map((d) => ({
                      ...d,
                      value: d.r4Value ?? 0,
                    }))}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
