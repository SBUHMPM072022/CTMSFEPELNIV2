'use client';

import { useState } from 'react';

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
}

interface DataPoint {
  date: string;
  value: number;
  distributions?: FuelDistribution[];
}

// Helper to generate dummy truck distributions
const generateTruckDistributions = (count: number, baseVol: number): FuelDistribution[] => {
  return Array.from({ length: count }).map((_, i) => ({
    noPol: `B ${9000 + i + Math.floor(Math.random() * 900)} XYZ`,
    noTruck: `J ${2000 + i + Math.floor(Math.random() * 900)} ABC`,
    modeSupply: 'Truck',
    loadingPort: ['MERAK', 'JAKARTA', 'SURABAYA', 'SEMARANG'][Math.floor(Math.random() * 4)],
    tujuan: ['KM KELUD', 'KM BUKIT RAYA', 'KM WILIS', 'KM SINABUNG'][Math.floor(Math.random() * 4)],
    volumeDO: `${(baseVol / count).toFixed(1)}KL`,
    shipReceived: `${(baseVol / count * 0.98).toFixed(1)}KL`
  }));
};

// Dummy data for charts
const vesselLoadingData: DataPoint[] = [
  { 
    date: '01 JAN 2026', 
    value: 600, 
    distributions: [{ shipName: 'SPOB PETRO MINOY', modeSupply: 'Vessel', loadingPort: 'JAKARTA', tujuan: 'KM KELUD', volumeDO: '600KL', shipReceived: '590KL' }] 
  },
  { date: '03 JAN 2026', value: 200, distributions: [{ shipName: 'SPOB KECIL', modeSupply: 'Vessel', loadingPort: 'MERAK', tujuan: 'KM TIDAR', volumeDO: '200KL', shipReceived: '195KL' }] },
  { date: '05 JAN 2026', value: 400, distributions: [{ shipName: 'KM LAWIT', modeSupply: 'Vessel', loadingPort: 'SURABAYA', tujuan: 'KM BUKIT SIGUNTANG', volumeDO: '400KL', shipReceived: '390KL' }] },
  { date: '07 JAN 2026', value: 150, distributions: [{ shipName: 'SPOB TEST', modeSupply: 'Vessel', loadingPort: 'JAKARTA', tujuan: 'KM UMSINI', volumeDO: '150KL', shipReceived: '148KL' }] },
  { date: '09 JAN 2026', value: 800, distributions: [{ shipName: 'SPOB MARINA', modeSupply: 'Vessel', loadingPort: 'MAKASSAR', tujuan: 'KM CIREMAI', volumeDO: '800KL', shipReceived: '780KL' }] },
  { date: '11 JAN 2026', value: 100, distributions: [{ shipName: 'MT KECIL', modeSupply: 'Vessel', loadingPort: 'MERAK', tujuan: 'KM LEUSER', volumeDO: '100KL', shipReceived: '98KL' }] },
  { date: '13 JAN 2026', value: 300, distributions: [{ shipName: 'MT SEDANG', modeSupply: 'Vessel', loadingPort: 'SURABAYA', tujuan: 'KM AWU', volumeDO: '300KL', shipReceived: '295KL' }] },
  { date: '15 JAN 2026', value: 250, distributions: [{ shipName: 'SPOB JAYA', modeSupply: 'Vessel', loadingPort: 'BALIKPAPAN', tujuan: 'KM TATAMAILAU', volumeDO: '250KL', shipReceived: '245KL' }] },
  { date: '17 JAN 2026', value: 500, distributions: [{ shipName: 'MT GARUDA', modeSupply: 'Vessel', loadingPort: 'MERAK', tujuan: 'KM TIDAR', volumeDO: '500KL', shipReceived: '490KL' }] },
  { date: '19 JAN 2026', value: 150, distributions: [{ shipName: 'SPOB MINI', modeSupply: 'Vessel', loadingPort: 'JAKARTA', tujuan: 'KM BUKIT RAYA', volumeDO: '150KL', shipReceived: '145KL' }] },
  { date: '21 JAN 2026', value: 200, distributions: [{ shipName: 'MT ALAM', modeSupply: 'Vessel', loadingPort: 'SURABAYA', tujuan: 'KM NGGAPULU', volumeDO: '200KL', shipReceived: '196KL' }] },
  { date: '23 JAN 2026', value: 100, distributions: [{ shipName: 'SPOB LAUT', modeSupply: 'Vessel', loadingPort: 'MAKASSAR', tujuan: 'KM TILONGKABILA', volumeDO: '100KL', shipReceived: '98KL' }] },
  { date: '25 JAN 2026', value: 450, distributions: [{ shipName: 'SPOB JAYA', modeSupply: 'Vessel', loadingPort: 'BALIKPAPAN', tujuan: 'KM DOBONSOLO', volumeDO: '450KL', shipReceived: '440KL' }] },
  { date: '27 JAN 2026', value: 350, distributions: [{ shipName: 'MT SAMUDRA', modeSupply: 'Vessel', loadingPort: 'MERAK', tujuan: 'KM CIREMAI', volumeDO: '350KL', shipReceived: '340KL' }] },
];

const truckLoadingData: DataPoint[] = [
  { date: '01 JAN 2026', value: 0.6, distributions: generateTruckDistributions(5, 0.6) },
  { date: '03 JAN 2026', value: 0.5, distributions: generateTruckDistributions(6, 0.5) },
  { date: '05 JAN 2026', value: 0.7, distributions: generateTruckDistributions(7, 0.7) },
  { date: '07 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
  { date: '09 JAN 2026', value: 1.1, distributions: generateTruckDistributions(7, 1.1) },
  { date: '11 JAN 2026', value: 0.3, distributions: generateTruckDistributions(5, 0.3) },
  { date: '13 JAN 2026', value: 0.4, distributions: generateTruckDistributions(6, 0.4) },
  { date: '15 JAN 2026', value: 0.5, distributions: generateTruckDistributions(5, 0.5) },
  { date: '17 JAN 2026', value: 0.9, distributions: generateTruckDistributions(7, 0.9) },
  { date: '19 JAN 2026', value: 0.3, distributions: generateTruckDistributions(5, 0.3) },
  { date: '21 JAN 2026', value: 0.5, distributions: generateTruckDistributions(6, 0.5) },
  { date: '23 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
  { date: '25 JAN 2026', value: 0.8, distributions: generateTruckDistributions(7, 0.8) },
  { date: '27 JAN 2026', value: 0.6, distributions: generateTruckDistributions(6, 0.6) },
];

const vesselDischargeData: DataPoint[] = [
  { date: '01 JAN 2026', value: 0.7, distributions: [{ shipName: 'KM SINAR RAYA', modeSupply: 'VESSEL', tujuan: 'BATAM D1', volumeDO: '120KL', volumeReceived: '120KL', loadingPort: 'JAKARTA' }] },
  { date: '03 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM LABOBAR', modeSupply: 'VESSEL', tujuan: 'SORONG D2', volumeDO: '150KL', volumeReceived: '145KL', loadingPort: 'SURABAYA' }] },
  { date: '05 JAN 2026', value: 0.6, distributions: [{ shipName: 'KM NGGAPULU', modeSupply: 'VESSEL', tujuan: 'AMBON D3', volumeDO: '180KL', volumeReceived: '175KL', loadingPort: 'MAKASSAR' }] },
  { date: '07 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM DOROLONDA', modeSupply: 'VESSEL', tujuan: 'BATAM D1', volumeDO: '100KL', volumeReceived: '98KL', loadingPort: 'MERAK' }] },
  { date: '09 JAN 2026', value: 1.0, distributions: [{ shipName: 'KM UMSINI', modeSupply: 'VESSEL', tujuan: 'MAKASSAR', volumeDO: '200KL', volumeReceived: '198KL', loadingPort: 'SURABAYA' }] },
  { date: '11 JAN 2026', value: 0.3, distributions: [{ shipName: 'KM BUKIT RAYA', modeSupply: 'VESSEL', tujuan: 'PONTIANAK', volumeDO: '80KL', volumeReceived: '78KL', loadingPort: 'JAKARTA' }] },
  { date: '13 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM BINAIYA', modeSupply: 'VESSEL', tujuan: 'BENOA', volumeDO: '120KL', volumeReceived: '118KL', loadingPort: 'SURABAYA' }] },
  { date: '15 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM LEUSER', modeSupply: 'VESSEL', tujuan: 'TIMIKA', volumeDO: '150KL', volumeReceived: '145KL', loadingPort: 'AMBON' }] },
  { date: '17 JAN 2026', value: 0.8, distributions: [{ shipName: 'KM SIRIMAU', modeSupply: 'VESSEL', tujuan: 'MANOKWARI', volumeDO: '250KL', volumeReceived: '245KL', loadingPort: 'SORONG' }] },
  { date: '19 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM AWU', modeSupply: 'VESSEL', tujuan: 'KUPANG', volumeDO: '100KL', volumeReceived: '98KL', loadingPort: 'SURABAYA' }] },
  { date: '21 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM TATAMAILAU', modeSupply: 'VESSEL', tujuan: 'BITUNG', volumeDO: '130KL', volumeReceived: '128KL', loadingPort: 'MAKASSAR' }] },
  { date: '23 JAN 2026', value: 0.3, distributions: [{ shipName: 'KM TILONGKABILA', modeSupply: 'VESSEL', tujuan: 'GORONTALO', volumeDO: '90KL', volumeReceived: '88KL', loadingPort: 'BITUNG' }] },
  { date: '25 JAN 2026', value: 0.7, distributions: [{ shipName: 'KM WILIS', modeSupply: 'VESSEL', tujuan: 'LABUAN BAJO', volumeDO: '210KL', volumeReceived: '205KL', loadingPort: 'MAKASSAR' }] },
  { date: '27 JAN 2026', value: 0.6, distributions: [{ shipName: 'KM SANGIANG', modeSupply: 'VESSEL', tujuan: 'AMBON', volumeDO: '180KL', volumeReceived: '175KL', loadingPort: 'SORONG' }] },
];

const truckDischargeData: DataPoint[] = [
  { date: '01 JAN 2026', value: 0.8, distributions: generateTruckDistributions(6, 0.8) },
  { date: '03 JAN 2026', value: 0.5, distributions: generateTruckDistributions(5, 0.5) },
  { date: '05 JAN 2026', value: 0.7, distributions: generateTruckDistributions(6, 0.7) },
  { date: '07 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
  { date: '09 JAN 2026', value: 1.2, distributions: generateTruckDistributions(7, 1.2) },
  { date: '11 JAN 2026', value: 0.3, distributions: generateTruckDistributions(5, 0.3) },
  { date: '13 JAN 2026', value: 0.5, distributions: generateTruckDistributions(6, 0.5) },
  { date: '15 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
  { date: '17 JAN 2026', value: 0.9, distributions: generateTruckDistributions(7, 0.9) },
  { date: '19 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
  { date: '21 JAN 2026', value: 0.6, distributions: generateTruckDistributions(6, 0.6) },
  { date: '23 JAN 2026', value: 0.5, distributions: generateTruckDistributions(5, 0.5) },
  { date: '25 JAN 2026', value: 0.7, distributions: generateTruckDistributions(6, 0.7) },
  { date: '27 JAN 2026', value: 0.4, distributions: generateTruckDistributions(5, 0.4) },
];

const pipelineDischargeData: DataPoint[] = [
  { date: '01 JAN 2026', value: 0.6, distributions: [{ shipName: 'KM TATAMAILAU', modeSupply: 'PIPE', volumeDO: '150KL', shipReceived: '99KL', loadingPort: 'JAKARTA' }] },
  { date: '03 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM SANGIANG', modeSupply: 'PIPE', volumeDO: '100KL', shipReceived: '95KL', loadingPort: 'SURABAYA' }] },
  { date: '05 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM PANGRANGO', modeSupply: 'PIPE', volumeDO: '120KL', shipReceived: '115KL', loadingPort: 'AMBON' }] },
  { date: '07 JAN 2026', value: 0.3, distributions: [{ shipName: 'KM NGGAPULU', modeSupply: 'PIPE', volumeDO: '80KL', shipReceived: '78KL', loadingPort: 'MAKASSAR' }] },
  { date: '09 JAN 2026', value: 0.9, distributions: [{ shipName: 'KM GUNUNG DEMPO', modeSupply: 'PIPE', volumeDO: '200KL', shipReceived: '195KL', loadingPort: 'JAKARTA' }] },
  { date: '11 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM DOBONSOLO', modeSupply: 'PIPE', volumeDO: '90KL', shipReceived: '88KL', loadingPort: 'SURABAYA' }] },
  { date: '13 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM CIREMAI', modeSupply: 'PIPE', volumeDO: '130KL', shipReceived: '125KL', loadingPort: 'MAKASSAR' }] },
  { date: '15 JAN 2026', value: 0.6, distributions: [{ shipName: 'KM TATA', modeSupply: 'PIPE', volumeDO: '140KL', shipReceived: '135KL', loadingPort: 'AMBON' }] },
  { date: '17 JAN 2026', value: 1.0, distributions: [{ shipName: 'KM SINABUNG', modeSupply: 'PIPE', volumeDO: '250KL', shipReceived: '245KL', loadingPort: 'JAKARTA' }] },
  { date: '19 JAN 2026', value: 0.3, distributions: [{ shipName: 'KM KELUD', modeSupply: 'PIPE', volumeDO: '70KL', shipReceived: '68KL', loadingPort: 'SURABAYA' }] },
  { date: '21 JAN 2026', value: 0.4, distributions: [{ shipName: 'KM LAWIT', modeSupply: 'PIPE', volumeDO: '100KL', shipReceived: '98KL', loadingPort: 'MAKASSAR' }] },
  { date: '23 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM BUKIT RAYA', modeSupply: 'PIPE', volumeDO: '110KL', shipReceived: '108KL', loadingPort: 'AMBON' }] },
  { date: '25 JAN 2026', value: 0.7, distributions: [{ shipName: 'KM WILIS', modeSupply: 'PIPE', volumeDO: '180KL', shipReceived: '175KL', loadingPort: 'JAKARTA' }] },
  { date: '27 JAN 2026', value: 0.5, distributions: [{ shipName: 'KM LEUSER', modeSupply: 'PIPE', volumeDO: '120KL', shipReceived: '118KL', loadingPort: 'SURABAYA' }] },
];

const modaSupplyTypes = ['All', 'Truck', 'Vessel', 'Pipe'];
const modaTypes = ['Loading', 'Discharge'];

interface LineChartProps {
  title: string;
  data: DataPoint[];
  maxValue: number;
  yAxisLabels: string[];
  isVesselLoading?: boolean;
}

function LineChart({ title, data, maxValue, yAxisLabels, isVesselLoading }: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ point: DataPoint; x: number; y: number } | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const chartWidth = 700;
  const chartHeight = 180;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight;

  // Create smooth curve path
  const smoothPath = data.reduce((acc, point, index, arr) => {
    const x = xScale(index);
    const y = yScale(point.value);
    
    if (index === 0) return `M ${x} ${y}`;
    
    const prevX = xScale(index - 1);
    const prevY = yScale(arr[index - 1].value);
    const cpX = (prevX + x) / 2;
    
    return `${acc} C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
  }, '');

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
        <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
          {/* Y-axis labels */}
          {yAxisLabels.map((label, index) => (
            <text
              key={index}
              x={padding.left - 10}
              y={padding.top + (innerHeight / (yAxisLabels.length - 1)) * index}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-400"
            >
              {label}
            </text>
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={index}
              x={xScale(index)}
              y={chartHeight - 5}
              textAnchor="middle"
              className="text-[9px] fill-gray-400"
              transform={`rotate(-45, ${xScale(index)}, ${chartHeight - 5})`}
            >
              {point.date}
            </text>
          ))}

          {/* Grid lines */}
          {yAxisLabels.map((_, index) => (
            <line
              key={index}
              x1={padding.left}
              y1={padding.top + (innerHeight / (yAxisLabels.length - 1)) * index}
              x2={chartWidth - padding.right}
              y2={padding.top + (innerHeight / (yAxisLabels.length - 1)) * index}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          {/* Line path */}
          <path
            d={smoothPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={xScale(index)}
              cy={yScale(point.value)}
              r="5"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:r-7 transition-all"
              onMouseEnter={() => handleMouseEnter(point, index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </svg>

        {/* Improved Modern Tooltip */}
        {hoveredPoint && hoveredPoint.point.distributions && (
          <div 
            className="absolute bg-white rounded-xl shadow-2xl p-0 z-50 text-xs min-w-[320px] max-w-[400px] border border-gray-100 overflow-hidden transition-opacity duration-200"
            style={{
              left: `${(hoveredPoint.x / chartWidth) * 100}%`,
              top: `${(hoveredPoint.y / chartHeight) * 100}%`,
              transform: 'translate(10px, -50%)', // Move to right (10px offset) and center vertically relative to point
              zIndex: 100 // Ensure it's above everything
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex justify-between items-center text-white mb-1 pr-6">
                <span className="font-bold text-sm">{hoveredPoint.point.date}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                  {hoveredPoint.point.distributions.length} Data Points
                </span>
              </div>
              <div className="text-blue-100 text-[10px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Total Volume: {hoveredPoint.point.value}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar bg-gray-50/50">
              {hoveredPoint.point.distributions.map((dist, idx) => (
                <div key={idx} className="p-3 border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-xs">
                          {dist.shipName || dist.noPol || 'Unknown Transport'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                          {dist.modeSupply}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                        {dist.noTruck && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            Truck: <span className="font-medium text-gray-900">{dist.noTruck}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-gray-600">
                           <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                           Port: <span className="font-medium text-gray-900">{dist.loadingPort}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                           <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                           Dest: <span className="font-medium text-gray-900">{dist.tujuan}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                           <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                           Vol. DO: <span className="font-medium text-gray-900">{dist.volumeDO}</span>
                        </div>
                        {dist.shipReceived && (
                           <div className="flex items-center gap-1.5 text-gray-600">
                             <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                             Recv: <span className="font-medium text-gray-900">{dist.shipReceived}</span>
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedModaSupply, setSelectedModaSupply] = useState('All');
  const [selectedModa, setSelectedModa] = useState('Loading');

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-base font-semibold text-gray-800">Dashboard</h2>
          </div>
        </div>

        <div className="p-5">
          {/* Filter Duration */}
          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-md">
            <p className="text-sm text-gray-700 font-medium mb-3">Filter Duration</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <label className="text-xs text-gray-400 block">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <span className="text-gray-300 text-xl">›</span>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <label className="text-xs text-gray-400 block">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-[#2d7dd2] to-[#45a3e5] text-white py-2 rounded-md text-sm font-medium hover:from-[#2570be] hover:to-[#3d93d4] transition-all shadow-md">
              Filter Duration
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
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Moda Filter */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-600 w-24">Moda</span>
            <div className="flex gap-2">
              {modaTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedModa(type)}
                  className={`px-4 py-1 rounded-md text-sm border transition-all ${
                    selectedModa === type
                      ? 'bg-[#2d7dd2] text-white border-[#2d7dd2]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            {selectedModa === 'Loading' && (
              <>
                {/* Graphic Loading (Vessel) */}
                <LineChart
                  title="Graphic Loading (Vessel)"
                  data={vesselLoadingData}
                  maxValue={900}
                  yAxisLabels={['900', '800', '700', '600', '500', '400', '300', '200', '100', '0']}
                  isVesselLoading={true}
                />

                {/* Graphic Loading (Truck) */}
                <LineChart
                  title="Graphic Loading (Truck)"
                  data={truckLoadingData}
                  maxValue={1.2}
                  yAxisLabels={['1.2', '1', '0.8', '0.6', '0.4', '0.2', '0']}
                />
              </>
            )}

            {selectedModa === 'Discharge' && (
              <>
                {/* Graphic Discharge (Vessel) */}
                <LineChart
                  title="Graphic Discharge (Vessel)"
                  data={vesselDischargeData}
                  maxValue={1.2}
                  yAxisLabels={['1.2', '1', '0.8', '0.6', '0.4', '0.2', '0']}
                />

                {/* Graphic Discharge (Truck) */}
                <LineChart
                  title="Graphic Discharge (Truck)"
                  data={truckDischargeData}
                  maxValue={1.4}
                  yAxisLabels={['1.4', '1.2', '1', '0.8', '0.6', '0.4', '0.2', '0']}
                />

                {/* Graphic Discharge (Pipeline) */}
                <LineChart
                  title="Graphic Discharge (Pipeline)"
                  data={pipelineDischargeData}
                  maxValue={1.2}
                  yAxisLabels={['1.2', '1', '0.8', '0.6', '0.4', '0.2', '0']}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
