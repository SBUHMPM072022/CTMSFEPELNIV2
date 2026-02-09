'use client';

export default function MapSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">All Transportation with All Cargo (Latest this Month)</h3>
      </div>
      <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Map Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Map Background */}
          <div className="relative w-full h-full">
            {/* Placeholder Map with gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
                {/* Simplified world map paths */}
                <path
                  d="M100,200 Q150,150 200,180 T300,170 T400,190 T500,175 T600,200 T700,180"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <path
                  d="M150,250 Q200,220 250,240 T350,230 T450,250 T550,235 T650,260"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                {/* India region */}
                <ellipse cx="280" cy="200" rx="40" ry="50" fill="#e2e8f0" opacity="0.5" />
                {/* Southeast Asia */}
                <ellipse cx="450" cy="250" rx="60" ry="40" fill="#e2e8f0" opacity="0.5" />
                {/* Indonesia region */}
                <ellipse cx="500" cy="300" rx="100" ry="30" fill="#e2e8f0" opacity="0.5" />
              </svg>
            </div>
            
            {/* Map markers */}
            <div className="absolute inset-0">
              {/* Mumbai marker */}
              <div className="absolute" style={{ left: '35%', top: '35%' }}>
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 shadow-lg"></div>
                  <span className="absolute left-5 top-0 text-xs text-gray-600 whitespace-nowrap bg-white/80 px-1 rounded">Mumbai</span>
                </div>
              </div>
              
              {/* Southeast Asia markers */}
              <div className="absolute" style={{ left: '55%', top: '60%' }}>
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute opacity-75"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full relative z-10 shadow-lg"></div>
                </div>
              </div>
              
              <div className="absolute" style={{ left: '62%', top: '65%' }}>
                <div className="relative">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping absolute opacity-75"></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full relative z-10 shadow-lg"></div>
                </div>
              </div>
              
              <div className="absolute" style={{ left: '70%', top: '70%' }}>
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute opacity-75"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full relative z-10 shadow-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Zoom controls */}
            <div className="absolute left-4 top-4 flex flex-col gap-1">
              <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                <span className="text-gray-600 text-lg font-bold">+</span>
              </button>
              <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                <span className="text-gray-600 text-lg font-bold">−</span>
              </button>
            </div>
            
            {/* Location labels overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute text-[10px] text-gray-500" style={{ left: '25%', top: '30%' }}>Hyderabad</span>
              <span className="absolute text-[10px] text-gray-500" style={{ left: '30%', top: '45%' }}>Bengaluru</span>
              <span className="absolute text-[10px] text-gray-500" style={{ left: '60%', top: '50%' }}>Malaysia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
