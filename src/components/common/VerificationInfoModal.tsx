import React from 'react';
import { X, CheckCircle, ShieldCheck, FileCheck, UserCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VerificationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string | null;
}

export const VerificationInfoModal: React.FC<VerificationInfoModalProps> = ({
  isOpen,
  onClose,
  providerId
}) => {
  const { providers } = useApp();

  if (!isOpen || !providerId) return null;

  const provider = providers.find(p => p.id === providerId) || providers[0];
  const v = provider.verification;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Verified Partner Status</h2>
              <p className="text-xs text-slate-600">{provider.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-700 leading-relaxed">
            The <span className="font-bold text-blue-600">✓ Verified</span> badge confirms that the specific credentials listed below were independently verified with valid government/trade records.
          </div>

          {/* Verification Checklist */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            {/* 1. Aadhaar ID */}
            <div className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                v.aadhaarVerified ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 text-slate-500'
              }`}>
                {v.aadhaarVerified ? '✓' : '—'}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Government Identity (Aadhaar/PAN)</span>
                <span className="text-[11px] text-slate-600">
                  {v.aadhaarVerified ? 'Full name and biometric ID verified' : 'Not submitted or optional'}
                </span>
              </div>
            </div>

            {/* 2. Trade Certification */}
            <div className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                v.tradeCertified ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 text-slate-500'
              }`}>
                {v.tradeCertified ? '✓' : '—'}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Trade / Skill Certification</span>
                <span className="text-[11px] text-slate-600">
                  {v.certName || (v.tradeCertified ? 'Trade guild / ITI certification verified' : 'Self-taught practitioner with verified reviews')}
                </span>
              </div>
            </div>

            {/* 3. Police / Background Check */}
            <div className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                v.policeVerified ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 text-slate-500'
              }`}>
                {v.policeVerified ? '✓' : '—'}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Local Police Verification</span>
                <span className="text-[11px] text-slate-600">
                  {v.policeVerified ? 'Clean record verified with local police station' : 'In process / Standard tier'}
                </span>
              </div>
            </div>
          </div>

          {/* Mandatory Transparency & Safety Disclaimer */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Safety & Discretion Notice</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-normal">
              Verification authenticates identity and trade documentation provided by the service partner. It does not constitute an insurance policy, a lifetime guarantee of workmanship, or a substitute for personal caution when inviting technicians into your home.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
