import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  UserCheck,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LOCATIONS } from '../../data/initialData';
import { LocationInfo, UserMode } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const { setLocation, setUserMode } = useApp();
  const [step, setStep] = useState(1);
  const [selectedLoc, setSelectedLoc] = useState<LocationInfo>(INDIAN_LOCATIONS[0]);
  const [chosenRole, setChosenRole] = useState<'customer' | 'provider' | 'both'>('customer');

  if (!isOpen) return null;

  const handleFinish = () => {
    setLocation(selectedLoc);
    if (chosenRole === 'provider') {
      setUserMode('provider');
    } else {
      setUserMode('customer');
    }
    localStorage.setItem('nh_onboarded', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 space-y-5 text-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-1.5">
          <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
          <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
          <div className={`w-8 h-1 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4 py-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 font-display">
                Welcome to Nearby Help
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed px-4">
                India's local marketplace where people who need help connect with trusted neighborhood service providers in real-time.
              </p>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-left text-xs text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>One Unified Account</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-normal">
                Use the same account to hire technicians or receive local jobs. You can switch between roles at any time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Choose Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-4 py-2 text-left">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Where are you located?</h2>
              <p className="text-xs text-slate-600">Select your base city to see nearby verified technicians</p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
              {INDIAN_LOCATIONS.map(loc => {
                const isSelected = selectedLoc.area === loc.area;

                return (
                  <button
                    key={`${loc.city}-${loc.area}`}
                    type="button"
                    onClick={() => setSelectedLoc(loc)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs">{loc.area}</div>
                        <div className="text-[10px] text-slate-600 font-normal">{loc.city} · {loc.pincode}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Choose initial role */}
        {step === 3 && (
          <div className="space-y-4 py-2 text-left">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">What brings you here?</h2>
              <p className="text-xs text-slate-600">
                You can switch between modes anytime from your profile.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setChosenRole('customer')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  chosenRole === 'customer'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">I need help</h3>
                    <p className="text-[11px] text-slate-600">Find plumbers, electricians, mechanics & services</p>
                  </div>
                </div>
                {chosenRole === 'customer' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setChosenRole('provider')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  chosenRole === 'provider'
                    ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">I provide services</h3>
                    <p className="text-[11px] text-slate-600">Create profile, receive nearby jobs & send quotes</p>
                  </div>
                </div>
                {chosenRole === 'provider' && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setChosenRole('both')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  chosenRole === 'both'
                    ? 'bg-purple-50 border-purple-500 text-purple-950 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">I want both options</h3>
                    <p className="text-[11px] text-slate-600">Book services and also offer my trade skills</p>
                  </div>
                </div>
                {chosenRole === 'both' && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Get Started in {selectedLoc.city}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
