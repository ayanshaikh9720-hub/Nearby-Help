import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Upload, FileText, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProviderVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderVerificationModal: React.FC<ProviderVerificationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { profile, submitProviderVerification } = useApp();
  const [aadhaar, setAadhaar] = useState('XXXX-XXXX-9182');
  const [tradeCert, setTradeCert] = useState('National Trade Certificate / ITI');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProviderVerification(aadhaar, tradeCert);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Partner Verification</h2>
              <p className="text-xs text-slate-600">Apply for the ✓ Verified trust badge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-slate-900">Documents Submitted!</h3>
              <p className="text-xs text-slate-600">
                Auto-authenticating with government registry & skills council...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 block">Benefits of Verified Status:</span>
                <ul className="list-disc pl-4 text-blue-800 text-[11px] space-y-0.5">
                  <li>Up to 3.5× higher customer quote acceptance rate</li>
                  <li>Prominent “✓ Verified” trust badge on search & map</li>
                  <li>Eligible for emergency high-value job broadcasts</li>
                </ul>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Government ID (Aadhaar or PAN):</label>
                <input
                  type="text"
                  value={aadhaar}
                  onChange={e => setAadhaar(e.target.value)}
                  placeholder="Enter 12-digit Aadhaar / 10-digit PAN"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Trade Certification / Skill License:</label>
                <input
                  type="text"
                  value={tradeCert}
                  onChange={e => setTradeCert(e.target.value)}
                  placeholder="e.g. ITI Electrician / National Skill Certificate / Plumbing License"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center space-y-1">
                <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                <span className="font-semibold text-slate-700 block">Certificate Document / Photo Attached</span>
                <span className="text-[10px] text-slate-600">id_certificate_verified.pdf (Uploaded)</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                >
                  Submit for Instant Verification
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
