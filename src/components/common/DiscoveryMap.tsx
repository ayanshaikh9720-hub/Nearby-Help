import React, { useState } from 'react';
import { MapPin, Navigation, Star, CheckCircle, Shield, Layers, Plus, Minus, RotateCcw } from 'lucide-react';
import { Provider } from '../../types';
import { CategoryIcon } from './CategoryIcon';

interface DiscoveryMapProps {
  providers: Provider[];
  customerArea: string;
  selectedCategory?: string;
  onSelectProvider: (provider: Provider) => void;
  onOpenVerificationInfo: (providerId: string) => void;
}

export const DiscoveryMap: React.FC<DiscoveryMapProps> = ({
  providers,
  customerArea,
  selectedCategory,
  onSelectProvider,
  onOpenVerificationInfo
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePinProvider, setActivePinProvider] = useState<Provider | null>(providers[0] || null);

  // Pre-calculated radar coordinates for nearby providers relative to center
  const pinCoordinates = [
    { x: 38, y: 32 },
    { x: 62, y: 28 },
    { x: 74, y: 58 },
    { x: 28, y: 65 },
    { x: 50, y: 72 },
    { x: 20, y: 35 },
  ];

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md select-none">
      {/* Background Grid & Streets Pattern */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 65%),
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease'
        }}
      ></div>

      {/* Simulated Road Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path d="M 0 180 Q 200 210, 450 160" stroke="#94a3b8" strokeWidth="6" fill="none" strokeDasharray="6 4" />
        <path d="M 120 0 Q 180 200, 240 400" stroke="#94a3b8" strokeWidth="8" fill="none" />
        <path d="M 240 190 Q 340 320, 450 360" stroke="#cbd5e1" strokeWidth="5" fill="none" />
      </svg>

      {/* Radar distance circles around center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* 1km ring */}
        <div className="w-36 h-36 rounded-full border border-amber-500/25 flex items-start justify-center">
          <span className="text-[9px] font-mono text-amber-500/60 bg-slate-950/70 px-1 rounded -translate-y-2">
            1 km
          </span>
        </div>
        {/* 3km ring */}
        <div className="absolute -inset-16 rounded-full border border-slate-700/50 flex items-start justify-center">
          <span className="text-[9px] font-mono text-slate-500 bg-slate-950/70 px-1 rounded -translate-y-2">
            3 km
          </span>
        </div>
        {/* 5km ring */}
        <div className="absolute -inset-32 rounded-full border border-slate-800/40 flex items-start justify-center">
          <span className="text-[9px] font-mono text-slate-600 bg-slate-950/70 px-1 rounded -translate-y-2">
            5 km
          </span>
        </div>
      </div>

      {/* Center Pin (Customer Location) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-ping"></span>
          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg ring-4 ring-slate-950">
            YOU
          </div>
        </div>
        <div className="bg-slate-950/90 text-[10px] font-medium text-amber-300 px-2 py-0.5 rounded-full mt-1 border border-amber-500/30 whitespace-nowrap shadow-md">
          {customerArea.split(' ')[0]} (Approx)
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-slate-800 text-white">
        <button
          onClick={() => setZoomLevel(z => Math.min(1.4, z + 0.15))}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200"
          title="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.15))}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200"
          title="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200"
          title="Reset View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Privacy Notice Label on Top Left */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono">
        <Shield className="w-3 h-3 text-amber-500" />
        <span>Approximate Service Zones · Privacy Shielded</span>
      </div>

      {/* Render Provider Markers on the Map */}
      {providers.map((p, index) => {
        const coords = pinCoordinates[index % pinCoordinates.length];
        const isSelected = activePinProvider?.id === p.id;

        return (
          <div
            key={p.id}
            onClick={() => setActivePinProvider(p)}
            style={{
              left: `${coords.x}%`,
              top: `${coords.y}%`,
              transform: `translate(-50%, -50%) scale(${zoomLevel})`
            }}
            className="absolute z-20 cursor-pointer group transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              {/* Pin Bubble */}
              <div
                className={`p-1.5 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/40 scale-125 z-30'
                    : p.status === 'available'
                    ? 'bg-emerald-500 text-white ring-2 ring-slate-950 hover:scale-110'
                    : 'bg-slate-700 text-slate-300 ring-2 ring-slate-950'
                }`}
              >
                <CategoryIcon name="Wrench" className="w-3.5 h-3.5" />
              </div>

              {/* Pin Tag */}
              <div
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-1 whitespace-nowrap shadow-md transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-black scale-105'
                    : 'bg-slate-950/80 text-white group-hover:bg-slate-900 border border-slate-800'
                }`}
              >
                {p.name.split(' ')[0]} · ₹{p.startingPrice}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Popup Card for Selected Provider Pin */}
      {activePinProvider && (
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-2.5">
            <img
              src={activePinProvider.avatar}
              alt={activePinProvider.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900">{activePinProvider.name}</span>
                {activePinProvider.verification.isVerified && (
                  <CheckCircle className="w-3 h-3 text-blue-600 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-600 truncate max-w-[180px]">
                {activePinProvider.services.join(', ')}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                <span className="text-amber-800 font-bold flex items-center">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 mr-0.5" />
                  {activePinProvider.rating}
                </span>
                <span aria-hidden="true">·</span>
                <span>~{activePinProvider.distanceKm} km away</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-800">Starts ₹{activePinProvider.startingPrice}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectProvider(activePinProvider)}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};
