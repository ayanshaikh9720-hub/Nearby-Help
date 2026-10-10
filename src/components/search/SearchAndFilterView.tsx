import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  CheckCircle,
  SlidersHorizontal,
  Map,
  List,
  Sparkles,
  X,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import { CategoryIcon } from '../common/CategoryIcon';
import { DiscoveryMap } from '../common/DiscoveryMap';

interface SearchAndFilterViewProps {
  initialQuery?: string;
  initialCategory?: string;
  onSelectProvider: (provider: Provider) => void;
  onOpenVerificationInfo: (providerId: string) => void;
}

export const SearchAndFilterView: React.FC<SearchAndFilterViewProps> = ({
  initialQuery = '',
  initialCategory = '',
  onSelectProvider,
  onOpenVerificationInfo
}) => {
  const { providers, serviceCategories, location } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableNowOnly, setAvailableNowOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filter provider list
  const filteredProviders = providers.filter(p => {
    // 1. Text query
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || (p.businessName && p.businessName.toLowerCase().includes(q));
      const matchService = p.services.some(s => s.toLowerCase().includes(q)) || (p.customServices && p.customServices.some(s => s.toLowerCase().includes(q)));
      const matchCity = p.city.toLowerCase().includes(q) || p.area.toLowerCase().includes(q);
      if (!matchName && !matchService && !matchCity) return false;
    }

    // 2. Category
    if (selectedCategory !== 'All') {
      const matchCat = p.services.some(s => s.toLowerCase() === selectedCategory.toLowerCase()) ||
        (p.customServices && p.customServices.some(s => s.toLowerCase() === selectedCategory.toLowerCase()));
      if (!matchCat) return false;
    }

    // 3. Verified
    if (verifiedOnly && !p.verification.isVerified) return false;

    // 4. Available now
    if (availableNowOnly && p.status !== 'available') return false;

    // 5. Rating
    if (minRating > 0 && p.rating < minRating) return false;

    // 6. Max starting price
    if (p.startingPrice > maxPrice) return false;

    return true;
  });

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-150">
      {/* Search Bar & View Mode Toggle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search service, technician, or area..."
              className="w-full text-xs pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              verifiedOnly || availableNowOnly || minRating > 0 || maxPrice < 1000
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* List vs Map Switch */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-bold ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg text-xs font-bold ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Filter Horizontal Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-2.5 py-1 rounded-lg border font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              verifiedOnly
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>✓ Verified Only</span>
          </button>

          <button
            onClick={() => setAvailableNowOnly(!availableNowOnly)}
            className={`px-2.5 py-1 rounded-lg border font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              availableNowOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>Available Now</span>
          </button>

          <button
            onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
            className={`px-2.5 py-1 rounded-lg border font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              minRating === 4.5
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Top Rated (4.5+)</span>
          </button>

          <button
            onClick={() => setMaxPrice(maxPrice === 300 ? 1000 : 300)}
            className={`px-2.5 py-1 rounded-lg border font-semibold whitespace-nowrap transition-colors ${
              maxPrice === 300
                ? 'bg-purple-50 border-purple-300 text-purple-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Under ₹300</span>
          </button>
        </div>
      </div>

      {/* Expandable Filter Drawer */}
      {showFilterDrawer && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Advanced Search Refinements</span>
            <button
              onClick={() => {
                setVerifiedOnly(false);
                setAvailableNowOnly(false);
                setMinRating(0);
                setMaxPrice(1000);
                setSelectedCategory('All');
              }}
              className="text-[11px] text-amber-800 font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Filter by Service Category:</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
            >
              <option value="All">All Categories</option>
              {serviceCategories.map(c => (
                <option key={c.id} value={c.name}>{c.name} ({c.group})</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Max Starting Consultation Fee:</span>
              <span className="font-bold text-slate-900 font-mono">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Discovery Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>Found {filteredProviders.length} matching technician(s) in {location.city}</span>
        <span className="text-[10px] text-slate-600 font-medium">Sorted by distance & rating</span>
      </div>

      {/* Render Results */}
      {viewMode === 'map' ? (
        <DiscoveryMap
          providers={filteredProviders}
          customerArea={location.area}
          selectedCategory={selectedCategory}
          onSelectProvider={onSelectProvider}
          onOpenVerificationInfo={onOpenVerificationInfo}
        />
      ) : (
        <div className="space-y-3">
          {filteredProviders.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-2 text-xs text-slate-600">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No exact matching providers found.</p>
              <p>Try loosening your price or rating filters, or search for another service category.</p>
            </div>
          ) : (
            filteredProviders.map(provider => (
              <div
                key={provider.id}
                onClick={() => onSelectProvider(provider)}
                className="p-4 bg-white hover:bg-slate-50/70 border border-slate-200 rounded-2xl transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                          {provider.name}
                        </h3>
                        {provider.verification.isVerified && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenVerificationInfo(provider.id);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                            title="Verified credentials"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600">
                        {provider.businessName || 'Independent Pro'}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                        <span className="flex items-center gap-0.5 font-bold text-slate-900">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{provider.rating}</span>
                          <span className="text-slate-600 font-normal">({provider.reviewCount})</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>~{provider.distanceKm} km</span>
                        <span aria-hidden="true">·</span>
                        <span>{provider.experienceYears} yrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-600 block">Starts at</span>
                    <span className="font-extrabold text-sm text-slate-900 font-mono">
                      ₹{provider.startingPrice}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {provider.services.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
