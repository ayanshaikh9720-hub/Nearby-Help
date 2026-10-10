import React, { useState } from 'react';
import {
  Search,
  Zap,
  Sparkles,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Map,
  List,
  Heart,
  AlertCircle,
  HelpCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, Provider, ServiceGroup } from '../../types';
import { CategoryIcon } from '../common/CategoryIcon';
import { DiscoveryMap } from '../common/DiscoveryMap';

interface CustomerHomeProps {
  onOpenNeedHelpNow: (category?: string) => void;
  onOpenAskNearby: () => void;
  onSelectProvider: (provider: Provider) => void;
  onOpenQuotes: (requestId: string) => void;
  onOpenLiveTracking: (bookingId: string) => void;
  onOpenVerificationInfo: (providerId: string) => void;
  onNavigateToSearch: (query?: string, category?: string) => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onOpenNeedHelpNow,
  onOpenAskNearby,
  onSelectProvider,
  onOpenQuotes,
  onOpenLiveTracking,
  onOpenVerificationInfo,
  onNavigateToSearch
}) => {
  const {
    location,
    serviceCategories,
    providers,
    jobRequests,
    bookings,
    favorites,
    toggleFavorite
  } = useApp();

  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Groups list
  const groups: (ServiceGroup | 'All')[] = [
    'All',
    'Home Services',
    'Vehicle Services',
    'Personal Services',
    'Business Services',
    'Custom'
  ];

  // Filter categories by active group
  const displayedCategories = serviceCategories.filter(cat => {
    if (activeGroup === 'All') return true;
    return cat.group === activeGroup;
  });

  // Active bookings that require tracking or attention
  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');

  // Active job requests waiting for quotes
  const pendingRequests = jobRequests.filter(r => r.status === 'quotes_received' || r.status === 'finding_providers');

  // Emergency quick services
  const emergencyServices = [
    { title: 'Puncture / Flat Tyre', catName: 'Puncture', icon: 'CircleDot', eta: '~15 mins' },
    { title: 'Urgent Electrician', catName: 'Electrician', icon: 'Zap', eta: '~20 mins' },
    { title: 'Vehicle Towing', catName: 'Towing', icon: 'Truck', eta: '~25 mins' },
    { title: 'Burst Pipe / Leak', catName: 'Plumber', icon: 'Droplets', eta: '~20 mins' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToSearch(searchQuery.trim());
    }
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* 1. High Impact Hero: Need Help Now & Ask Nearby Smart Assist */}
      <section className="bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        {/* Subtle decorative background curves */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-36 h-36 rounded-full bg-black/10 blur-xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1">
              <span>Hyperlocal Marketplace</span>
              <span>·</span>
              <span>{location.city}</span>
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white leading-tight font-display">
              Need help? Find someone nearby.
            </h1>
            <p className="text-xs text-amber-100/90 leading-relaxed max-w-xs">
              Connect with verified technicians and local experts in {location.area}.
            </p>
          </div>

          {/* Primary CTA: Large Emergency "Need Help Now" button with pulsing radar ring */}
          <div>
            <button
              onClick={() => onOpenNeedHelpNow()}
              className="w-full py-3.5 px-4 bg-white hover:bg-amber-50 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-between group active:scale-[0.98] transition-all relative"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 animate-ping absolute"></span>
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Zap className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-extrabold text-slate-900 leading-tight">Need Help Now</div>
                  <div className="text-[10px] text-slate-700 font-medium">Emergency & urgent requests within 30 mins</div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Secondary Feature: Smart "Ask Nearby" NLP bar */}
          <div className="pt-0.5">
            <button
              onClick={onOpenAskNearby}
              className="w-full py-2.5 px-3.5 bg-black/25 hover:bg-black/35 backdrop-blur-md rounded-xl text-left border border-white/20 flex items-center justify-between transition-colors text-white"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-xs font-semibold text-white truncate">
                  Ask Nearby: “My ceiling is leaking” or “AC won't cool”
                </span>
              </div>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                Diagnose
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Fast Search Bar */}
      <section>
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="What help do you need today? (e.g. Electrician, Puncture)"
            className="w-full text-xs pl-10 pr-20 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Find
          </button>
        </form>
      </section>

      {/* 3. Active Requests & Upcoming Bookings Tracker (if any exist) */}
      {(activeBookings.length > 0 || pendingRequests.length > 0) && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Active Activity in {location.area.split(' ')[0]}
            </h2>
            <span className="text-[10px] text-amber-800 font-semibold">Live updates</span>
          </div>

          <div className="space-y-2">
            {/* Pending quote requests */}
            {pendingRequests.map(req => (
              <div
                key={req.id}
                className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {req.serviceCategory} · {req.status === 'quotes_received' ? `${req.quotes.length} Quotes Received` : 'Broadcasting to Pros'}
                    </span>
                    <span className="text-[11px] text-slate-600 truncate max-w-[200px] block">
                      {req.problemDescription}
                    </span>
                  </div>
                </div>

                {req.quotes.length > 0 ? (
                  <button
                    onClick={() => onOpenQuotes(req.id)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shrink-0 transition-colors shadow-xs"
                  >
                    View Quotes
                  </button>
                ) : (
                  <span className="text-[10px] text-amber-800 font-semibold animate-pulse shrink-0">
                    Searching...
                  </span>
                )}
              </div>
            ))}

            {/* Active confirmed bookings */}
            {activeBookings.map(b => (
              <div
                key={b.id}
                className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={b.providerAvatar}
                    alt={b.providerName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{b.providerName}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded">
                        {b.status === 'on_the_way' ? 'On The Way' : b.status === 'arrived' ? 'Arrived' : 'In Progress'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 block">{b.service} · OTP: {b.otpCode}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLiveTracking(b.id)}
                  className="px-3 py-1.5 bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold rounded-xl shrink-0 transition-colors"
                >
                  Track Live
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Emergency Help Quick Tiles */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Emergency & Quick Response
            </h2>
          </div>
          <span className="text-[10px] text-slate-600">Avg arrival ~20m</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {emergencyServices.map(es => (
            <button
              key={es.title}
              onClick={() => onOpenNeedHelpNow(es.catName)}
              className="p-3 bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 rounded-2xl text-left transition-all group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CategoryIcon name={es.icon} className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700 leading-tight">
                {es.title}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                Arrival: {es.eta}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Category Browser with Group Filter Tabs */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Popular Service Categories
          </h2>
          <button
            onClick={() => onNavigateToSearch()}
            className="text-[11px] font-semibold text-amber-800 hover:underline flex items-center gap-0.5"
          >
            <span>All Services</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Group selector tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {groups.map(grp => (
            <button
              key={grp}
              onClick={() => setActiveGroup(grp)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap shrink-0 border ${
                activeGroup === grp
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {displayedCategories.slice(0, 12).map(cat => (
            <button
              key={cat.id}
              onClick={() => onOpenNeedHelpNow(cat.name)}
              className="p-2.5 bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-2xl flex flex-col items-center justify-center text-center transition-all group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-800 flex items-center justify-center mb-1.5 transition-colors">
                <CategoryIcon name={cat.iconName} className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 group-hover:text-amber-700 leading-tight truncate w-full">
                {cat.name}
              </span>
              <span className="text-[9px] text-slate-600 mt-0.5 font-medium">
                Starts ₹{cat.defaultStartingPrice}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Nearby Service Providers (Discovery Section with Map / List Toggle) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Nearby Providers in {location.area.split(' ')[0]}
            </h2>
            <p className="text-[11px] text-slate-600">Available technicians within 5 km</p>
          </div>

          {/* List vs Map Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Map View"
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Map</span>
            </button>
          </div>
        </div>

        {/* View Mode Switch */}
        {viewMode === 'map' ? (
          <DiscoveryMap
            providers={providers}
            customerArea={location.area}
            onSelectProvider={onSelectProvider}
            onOpenVerificationInfo={onOpenVerificationInfo}
          />
        ) : (
          <div className="space-y-3">
            {providers.map(provider => {
              const isFav = favorites.includes(provider.id);

              return (
                <div
                  key={provider.id}
                  onClick={() => onSelectProvider(provider)}
                  className="p-4 bg-white hover:bg-slate-50/60 border border-slate-200 rounded-2xl transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
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
                              title="Click for verified credentials"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 font-medium">
                          {provider.businessName || 'Independent Technician'}
                        </p>

                        {/* Unboxed Metadata */}
                        <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                          <span className="flex items-center gap-0.5 font-bold text-slate-900">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{provider.rating}</span>
                            <span className="text-slate-600 font-normal">({provider.reviewCount})</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>~{provider.distanceKm} km away</span>
                          <span aria-hidden="true">·</span>
                          <span>{provider.experienceYears} yrs exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark / Favorite */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(provider.id);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Save provider"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Multiple Services tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {provider.services.map(svc => (
                      <span
                        key={svc}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold"
                      >
                        {svc}
                      </span>
                    ))}
                    {provider.customServices?.slice(0, 1).map(csvc => (
                      <span
                        key={csvc}
                        className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-md text-[10px] font-semibold"
                      >
                        ★ {csvc}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action row */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-600 block">Starting Fee</span>
                      <span className="font-extrabold text-sm text-slate-900">₹{provider.startingPrice}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                        provider.status === 'available' ? 'text-emerald-700' : 'text-amber-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${provider.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        <span>{provider.status === 'available' ? 'Available' : 'Busy'}</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProvider(provider);
                        }}
                        className="px-3.5 py-1.5 bg-slate-900 group-hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        View & Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
