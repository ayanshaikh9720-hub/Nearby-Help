import React, { useState } from 'react';
import { X, MapPin, Navigation, Search, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LOCATIONS } from '../../data/initialData';
import { LocationInfo } from '../../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { location, setLocation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>(location.city);
  const [detectingGps, setDetectingGps] = useState(false);

  if (!isOpen) return null;

  const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'];

  const filteredLocations = INDIAN_LOCATIONS.filter(loc => {
    const matchesCity = loc.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch =
      loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.pincode.includes(searchQuery);
    return searchQuery ? (loc.area.toLowerCase().includes(searchQuery.toLowerCase()) || loc.pincode.includes(searchQuery)) : matchesCity;
  });

  const handleSelectLocation = (loc: LocationInfo) => {
    setLocation(loc);
    onClose();
  };

  const handleDetectGPS = () => {
    setDetectingGps(true);
    setTimeout(() => {
      setDetectingGps(false);
      // Set to high-accuracy Koramangala or user's city
      const detected = INDIAN_LOCATIONS[0];
      setLocation({
        ...detected,
        area: 'Koramangala 5th Block (Current GPS)'
      });
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 leading-tight">Choose Your Location</h2>
            <p className="text-xs text-slate-600">Find local service providers in your neighborhood</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Use Current Location Button */}
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={detectingGps}
            className="w-full p-3 bg-amber-50 hover:bg-amber-100/70 border border-amber-200 rounded-xl flex items-center justify-between transition-colors text-amber-900 font-bold"
          >
            <div className="flex items-center gap-2.5">
              <Navigation className={`w-4 h-4 text-amber-600 ${detectingGps ? 'animate-spin' : ''}`} />
              <span>{detectingGps ? 'Detecting Precise Location...' : 'Use Current Device Location'}</span>
            </div>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-800">
              GPS
            </span>
          </button>

          {/* Search Area / Pincode */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search area, neighborhood, or 6-digit pincode..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
            />
          </div>

          {/* City selector chips */}
          <div>
            <span className="text-slate-600 font-bold block mb-1.5 text-[11px] uppercase tracking-wider">
              Select City:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cities.map(city => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                    selectedCity === city
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Localities list */}
          <div>
            <span className="text-slate-600 font-bold block mb-2 text-[11px] uppercase tracking-wider">
              Available Localities in {selectedCity}:
            </span>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredLocations.map(loc => {
                const isCurrent = location.area === loc.area && location.city === loc.city;

                return (
                  <button
                    key={`${loc.city}-${loc.area}`}
                    type="button"
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all text-left ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-3.5 h-3.5 ${isCurrent ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{loc.area}</div>
                        <div className="text-[10px] text-slate-600">{loc.city} · Pincode: {loc.pincode}</div>
                      </div>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
