import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  UserX,
  FileWarning,
  CheckCircle,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SafetyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDispute: () => void;
}

export const SafetyCenterModal: React.FC<SafetyCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenDispute
}) => {
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleTriggerSosAlert = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Trust & Safety Center</h2>
              <p className="text-xs text-slate-600">Safe doorstep interactions & emergency protocols</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/80 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Emergency SOS Banner */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-rose-900 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Emergency Assistance (India)</span>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                24/7 National
              </span>
            </div>

            <p className="text-xs text-rose-800 leading-relaxed">
              If you feel unsafe or in danger, immediately contact official emergency response services.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:112"
                className="py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 112 (Police)</span>
              </a>

              <button
                type="button"
                onClick={handleTriggerSosAlert}
                className="py-2.5 px-3 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Alert Emergency Contact</span>
              </button>
            </div>

            {sosSent && (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 font-medium">
                ✓ SOS Alert sent to your saved emergency contact with live session details.
              </div>
            )}
          </div>

          {/* Golden Rules for Home Visits */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              5 Golden Rules for Doorstep Services:
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">1.</span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Verify Identity & Face:</strong> Check that the technician matches the profile photo and name before letting them inside.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">2.</span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">OTP Exchange:</strong> Share your 4-digit Job Start OTP only when the technician has physically arrived at your doorstep.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">3.</span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Never Pay Full in Advance:</strong> Pay labour charges only after the repair or service has been inspected and tested.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">4.</span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">In-App Chat Record:</strong> Communicate instructions and agreed quotes through the Nearby Help chat for a digital audit trail.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">5.</span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Digital Receipt Requirement:</strong> Always ensure a Digital Service Record is finalized on the app for warranty claims.
                </p>
              </div>
            </div>
          </div>

          {/* Reporting & Action Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDispute();
              }}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileWarning className="w-4 h-4 text-amber-600" />
                <span>File a Service Dispute / Issue Report</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDispute();
              }}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-rose-600" />
                <span>Report Suspicious User or Provider</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
