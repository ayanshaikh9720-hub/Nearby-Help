import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Heart,
  MapPin,
  Clock,
  Star,
  Settings,
  ShieldAlert,
  Briefcase,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  FileText,
  LogOut,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserMode, Provider } from '../../types';

interface ProfileViewProps {
  onOpenLocationModal: () => void;
  onOpenSafetyCenter: () => void;
  onOpenProviderEditor: () => void;
  onOpenVerificationModal: () => void;
  onSelectProvider: (provider: Provider) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenLocationModal,
  onOpenSafetyCenter,
  onOpenProviderEditor,
  onOpenVerificationModal,
  onSelectProvider
}) => {
  const {
    profile,
    updateProfile,
    userMode,
    setUserMode,
    location,
    providers,
    favorites,
    toggleFavorite,
    jobReceipts,
    reviews
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'favorites' | 'receipts'>('profile');

  // Favorite providers
  const favProviders = providers.filter(p => favorites.includes(p.id));

  // Reviews authored by this user
  const myAuthoredReviews = reviews.filter(r => r.authorId === profile.id);

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-150">
      {/* Profile Header Card */}
      <section className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base text-slate-900 leading-tight">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600">{profile.phone}</p>
              <div className="flex items-center gap-1 text-[11px] text-amber-800 font-medium mt-0.5">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span>{location.area}, {location.city}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenProviderEditor}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Unified Dual-Mode Switcher */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Current App Mode:</span>
            <span className="text-[10px] text-slate-600 font-mono">1 Account · Both Roles</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setUserMode('customer')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                userMode === 'customer'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Need Help</span>
            </button>

            <button
              onClick={() => setUserMode('provider')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                userMode === 'provider'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Provide Help</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sub Tabs: Profile Settings | Saved Favorites | Receipts */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
            activeSubTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Preferences
        </button>
        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
            activeSubTab === 'favorites' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Saved Pros ({favorites.length})
        </button>
        <button
          onClick={() => setActiveSubTab('receipts')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
            activeSubTab === 'receipts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Receipts ({jobReceipts.length})
        </button>
      </div>

      {/* Tab 1: Preferences & Quick Access */}
      {activeSubTab === 'profile' && (
        <div className="space-y-3 text-xs">
          {/* Partner Verification Status Card */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-blue-950 block">Government & Trade Verification</span>
                <span className="text-[11px] text-blue-800">
                  {profile.isVerified
                    ? 'Aadhaar ID & Trade Certification are fully verified.'
                    : 'Upload Aadhaar & Trade license to get the ✓ Verified badge.'}
                </span>
              </div>
            </div>
            {!profile.isVerified && (
              <button
                onClick={onOpenVerificationModal}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-xl font-bold shrink-0 hover:bg-blue-700"
              >
                Verify Now
              </button>
            )}
          </div>

          {/* Action List Items */}
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xs">
            <button
              onClick={onOpenLocationModal}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-600" />
                <div>
                  <span className="font-bold text-slate-800 block">Default Location</span>
                  <span className="text-[11px] text-slate-600">{location.area}, {location.city} ({location.pincode})</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onOpenSafetyCenter}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <div>
                  <span className="font-bold text-slate-800 block">Trust & Safety Center</span>
                  <span className="text-[11px] text-slate-600">Dispute tickets, emergency contacts & safe doorstep rules</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onOpenProviderEditor}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-800 block">Service Offerings & Rates</span>
                  <span className="text-[11px] text-slate-600">
                    {profile.providerServices.length} active service categories · Custom services
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Monetization / Future Architecture Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px] space-y-1">
            <span className="font-bold text-slate-800 block">Nearby Help Marketplace Policy</span>
            <p>
              Free to discover and list services. Future monetization tiers (featured badges, provider subscriptions, business leads) will remain optional.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Favorite Providers */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-3">
          {favProviders.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-1 text-xs text-slate-600">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No saved providers yet.</p>
              <p>Bookmark trusted technicians using the heart icon to quickly rebook them anytime.</p>
            </div>
          ) : (
            favProviders.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProvider(p)}
                className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                    <p className="text-[11px] text-slate-600">{p.services.join(', ')}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-0.5">
                      <span className="font-bold text-slate-800">★ {p.rating}</span>
                      <span aria-hidden="true">·</span>
                      <span>Starts ₹{p.startingPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(p.id);
                  }}
                  className="p-2 text-rose-500 hover:text-slate-400"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Receipts */}
      {activeSubTab === 'receipts' && (
        <div className="space-y-3">
          {jobReceipts.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-1 text-xs text-slate-600">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No service receipts yet.</p>
            </div>
          ) : (
            jobReceipts.map(rec => (
              <div
                key={rec.id}
                className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rec.service}</span>
                  <span className="font-bold text-slate-900 font-mono">₹{rec.finalAmount}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Partner: <strong>{rec.providerName}</strong> · Date: {rec.date}
                </div>
                <div className="text-[10px] font-mono text-slate-600 bg-slate-50 p-2 rounded-lg">
                  Ref: {rec.referenceNumber} · {rec.paymentMethod} ({rec.paymentStatus})
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
