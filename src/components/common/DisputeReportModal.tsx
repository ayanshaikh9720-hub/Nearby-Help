import React, { useState } from 'react';
import { X, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DisputeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledTargetName?: string;
  prefilledTargetId?: string;
  prefilledType?: 'provider' | 'customer' | 'review';
}

export const DisputeReportModal: React.FC<DisputeReportModalProps> = ({
  isOpen,
  onClose,
  prefilledTargetName,
  prefilledTargetId,
  prefilledType = 'provider'
}) => {
  const { profile, userMode, submitDispute } = useApp();
  const [targetName, setTargetName] = useState(prefilledTargetName || 'Service Provider');
  const [reason, setReason] = useState('Overcharging / Price Mismatch');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const reasons = [
    'Overcharging / Price Mismatch',
    'Unprofessional or Rude Behavior',
    'No-show / Abandoned Job',
    'Substandard or Incomplete Work',
    'Demand for Direct Offline Cash Without Receipt',
    'Suspicious or Fraudulent Profile',
    'Other Safety Concern'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDispute({
      reporterId: profile.id,
      reporterName: profile.name,
      reporterRole: userMode === 'provider' ? 'provider' : 'customer',
      targetType: prefilledType,
      targetId: prefilledTargetId || 'tgt-unknown',
      targetName: targetName.trim(),
      reason,
      details: details.trim()
    });

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
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">File an Issue / Report</h2>
              <p className="text-xs text-slate-600">Confidential review by Trust & Safety</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-slate-900">Report Registered</h3>
              <p className="text-xs text-slate-600">
                Ticket logged. Our safety moderators review escalated cases within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Target Account / Subject:</label>
                <input
                  type="text"
                  value={targetName}
                  onChange={e => setTargetName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Primary Issue Reason:</label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                >
                  {reasons.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Details & Context:</label>
                <textarea
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  rows={4}
                  placeholder="Explain what occurred, timeline, or agreed terms that were violated..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Submit Official Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
