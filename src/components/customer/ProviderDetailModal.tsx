import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Calendar,
  Languages,
  Heart,
  Share2,
  ShieldCheck,
  Briefcase,
  AlertTriangle,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';

interface ProviderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string | null;
  onRequestQuote: (provider: Provider) => void;
  onOpenVerificationInfo: (providerId: string) => void;
  onReportProvider: (provider: Provider) => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  isOpen,
  onClose,
  providerId,
  onRequestQuote,
  onOpenVerificationInfo,
  onReportProvider
}) => {
  const { providers, favorites, toggleFavorite, reviews } = useApp();

  if (!isOpen || !providerId) return null;

  const provider = providers.find(p => p.id === providerId) || providers[0];
  const isFav = favorites.includes(provider.id);
  const providerReviews = reviews.filter(r => r.targetId === provider.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Image & Header */}
        <div className="relative h-44 bg-slate-800">
          <img
            src={provider.avatar}
            alt={provider.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => toggleFavorite(provider.id)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Name & Rating Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white z-10">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg text-white leading-tight drop-shadow-sm">
                {provider.name}
              </h2>
              {provider.verification.isVerified && (
                <button
                  type="button"
                  onClick={() => onOpenVerificationInfo(provider.id)}
                  className="flex items-center gap-1 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full hover:bg-blue-600"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-200 font-medium">
              {provider.businessName || 'Independent Certified Professional'}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{provider.rating}</span>
                <span className="text-slate-400 font-normal">({provider.reviewCount} reviews)</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>{provider.experienceYears} Years Exp</span>
              <span aria-hidden="true">·</span>
              <span>~{provider.distanceKm} km away</span>
            </div>
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Status & Starting Price Banner */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-600 block uppercase font-semibold">Starting Consultation</span>
              <span className="text-base font-extrabold text-slate-900">₹{provider.startingPrice}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-600 block uppercase font-semibold">Availability</span>
              <span className={`inline-flex items-center gap-1 font-bold ${
                provider.status === 'available' ? 'text-emerald-700' : 'text-amber-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${provider.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                <span>{provider.status === 'available' ? 'Available Today' : 'Busy right now'}</span>
              </span>
            </div>
          </div>

          {/* Multiple Services Offered */}
          <div>
            <span className="text-xs font-bold text-slate-800 block mb-1.5">
              Services Offered ({provider.services.length + (provider.customServices?.length || 0)}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {provider.services.map(svc => (
                <span
                  key={svc}
                  className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-semibold text-xs"
                >
                  {svc}
                </span>
              ))}
              {provider.customServices?.map(csvc => (
                <span
                  key={csvc}
                  className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold text-xs"
                >
                  ★ {csvc}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <span className="text-xs font-bold text-slate-800 block mb-1">About the Technician:</span>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {provider.about}
            </p>
          </div>

          {/* Operational Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Service Radius:</span>
              </div>
              <p className="font-bold text-slate-800">{provider.serviceArea}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Working Hours:</span>
              </div>
              <p className="font-bold text-slate-800">{provider.availableHours}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Languages className="w-3.5 h-3.5 text-purple-600" />
                <span>Languages:</span>
              </div>
              <p className="font-bold text-slate-800">{provider.languages.join(', ')}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Working Days:</span>
              </div>
              <p className="font-bold text-slate-800">{provider.availableDays.join(', ')}</p>
            </div>
          </div>

          {/* Work Photos Portfolio */}
          {provider.workPhotos && provider.workPhotos.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-1.5">
                Work Photos & Completed Jobs ({provider.workPhotos.length}):
              </span>
              <div className="grid grid-cols-2 gap-2">
                {provider.workPhotos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`Work showcase ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-24 object-cover rounded-xl border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Verified Credentials Card */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-blue-950 block">Verified Background & Skills</span>
                <span className="text-[11px] text-blue-800">
                  {provider.verification.certName || 'Government ID and trade registration verified'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenVerificationInfo(provider.id)}
              className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50"
            >
              Details
            </button>
          </div>

          {/* Recent Reviews */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Customer Reviews ({providerReviews.length}):
              </span>
              <span className="text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{provider.rating} of 5.0</span>
              </span>
            </div>

            {providerReviews.length === 0 ? (
              <p className="text-slate-600 italic p-3 bg-slate-50 rounded-xl">
                No recent written reviews yet. Be the first to leave one after service!
              </p>
            ) : (
              <div className="space-y-2">
                {providerReviews.map(rev => (
                  <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.authorName}</span>
                      <span className="text-amber-800 font-bold">★ {rev.rating}.0</span>
                    </div>
                    {rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-600">
                        {rev.tags.map(t => (
                          <span key={t} className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-slate-700 text-xs mt-1">“{rev.comment}”</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safety & Report link */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-600">
              Need help or spotted incorrect details?
            </span>
            <button
              type="button"
              onClick={() => onReportProvider(provider)}
              className="text-[11px] text-rose-600 hover:underline font-semibold"
            >
              Report Provider
            </button>
          </div>
        </div>

        {/* Sticky Bottom Action */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestQuote(provider);
            }}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Request Quote from {provider.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
