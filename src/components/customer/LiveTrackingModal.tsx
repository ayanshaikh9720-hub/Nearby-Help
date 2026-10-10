import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  ShieldAlert,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  KeyRound,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
  onOpenChat: (bookingId: string) => void;
  onOpenReceipt: (receiptId: string) => void;
  onOpenReview: (bookingId: string) => void;
  onOpenSafety: () => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  onOpenChat,
  onOpenReceipt,
  onOpenReview,
  onOpenSafety
}) => {
  const { bookings, advanceBookingStatus, completeJobAndGenerateReceipt, userMode, cancelBooking } = useApp();
  const [callingMasked, setCallingMasked] = useState(false);
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  if (!isOpen || !bookingId) return null;

  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return null;

  const stages = [
    { title: 'Booking Confirmed', desc: 'Provider accepted and scheduled' },
    { title: 'On the Way', desc: `ETA ~${booking.etaMinutes || 12} mins · Approaching via main road` },
    { title: 'Arrived at Location', desc: 'Technician reached your landmark. Share OTP.' },
    { title: 'Work in Progress', desc: 'Inspection and service being performed' },
    { title: 'Job Completed', desc: 'Work tested & verified. Digital bill ready.' }
  ];

  const handleSimulateCall = () => {
    setCallingMasked(true);
    setTimeout(() => {
      setCallingMasked(false);
    }, 4000);
  };

  const handleMarkComplete = () => {
    const labour = Math.round(booking.totalAmount * 0.7);
    const parts = booking.totalAmount - labour;
    const rec = completeJobAndGenerateReceipt(
      booking.id,
      labour,
      parts,
      `Standard service delivery for ${booking.service}. Verified and operational.`
    );
    onOpenReceipt(rec.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Live Service Tracking</h2>
            </div>
            <p className="text-xs text-slate-600">Booking #{booking.id.toUpperCase()} · {booking.service}</p>
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
          {/* Simulated Map Radar & Route Visualizer */}
          <div className="relative h-44 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-3.5">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Radar wave circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/20 rounded-full animate-ping pointer-events-none"></div>

            {/* Top badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-emerald-400 text-[11px] font-mono tracking-tight flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-emerald-400 animate-bounce" />
                <span>{booking.trackingStage === 1 ? `En route · ~${booking.etaMinutes} mins` : booking.trackingStage >= 2 ? 'At Customer Location' : 'Preparing tools'}</span>
              </span>

              <span className="px-2 py-0.5 bg-black/40 rounded text-[10px] text-slate-400 font-mono">
                Nearby Help Shield Active
              </span>
            </div>

            {/* Center Visual Map Points */}
            <div className="relative z-10 flex items-center justify-between px-6">
              {/* Provider Location Pin */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-blue-500/30">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-1.5 py-0.5 rounded">
                  {booking.providerName.split(' ')[0]}
                </span>
              </div>

              {/* Connecting animated route line */}
              <div className="flex-1 mx-3 flex items-center justify-center">
                <div className="w-full h-0.5 bg-dashed border-t border-emerald-400/80 relative">
                  <div
                    className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
                    style={{ left: `${Math.min(100, Math.max(10, booking.trackingStage * 25))}%` }}
                  ></div>
                </div>
              </div>

              {/* Customer Landmark Pin */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-amber-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-1.5 py-0.5 rounded truncate max-w-[80px]">
                  {booking.locationArea.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Bottom notice: Privacy Conscious */}
            <div className="relative z-10 text-[10px] text-slate-400 font-mono text-center">
              Approximate route shown. No private home GPS is publicly broadcasted.
            </div>
          </div>

          {/* OTP Box for Security */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-3.5 rounded-2xl border border-amber-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-700 block">Job Start Security OTP:</span>
                <span className="text-xl font-black tracking-widest text-slate-900 font-mono">
                  {booking.otpCode}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 max-w-[140px] text-right">
              Share only after the technician arrives at your door.
            </p>
          </div>

          {/* Provider Card with Masked Call & Chat */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={booking.providerAvatar}
                alt={booking.providerName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">{booking.providerName}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                  <span className="font-semibold text-slate-800">★ {booking.providerRating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{booking.service}</span>
                </div>
                <span className="text-[10px] text-slate-600">Total agreed: ₹{booking.totalAmount}</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateCall}
                disabled={callingMasked}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all shadow-xs"
                title="Call via masked number"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChat(booking.id);
                }}
                className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center transition-all shadow-xs hover:bg-slate-800"
                title="In-app chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calling Feedback Banner */}
          {callingMasked && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 animate-in fade-in flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 animate-bounce" />
              <div>
                <span className="font-bold block">Masked Call Initiated (Nearby Shield)</span>
                <span className="text-[11px] text-emerald-800">
                  Connecting to {booking.providerName} without revealing your private mobile number.
                </span>
              </div>
            </div>
          )}

          {/* Progress Timeline Stepper */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-bold text-slate-800 block">Service Milestones:</span>
            <div className="space-y-2.5">
              {stages.map((stage, idx) => {
                const isPassed = booking.trackingStage >= idx;
                const isCurrent = booking.trackingStage === idx;

                return (
                  <div key={stage.title} className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isPassed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        } ${isCurrent ? 'ring-4 ring-emerald-500/20' : ''}`}
                      >
                        {isPassed ? '✓' : idx + 1}
                      </div>
                      {idx < stages.length - 1 && (
                        <div
                          className={`w-0.5 h-6 ${
                            booking.trackingStage > idx ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : isPassed ? 'text-slate-700' : 'text-slate-400'}`}>
                          {stage.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulation Controls for testing (Allows user to advance steps or provider to manage) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Job Action Controller</span>
              <span className="text-[10px] text-slate-600 font-mono">
                Stage {booking.trackingStage + 1} of 5
              </span>
            </div>

            <div className="flex gap-2">
              {booking.trackingStage < 3 && (
                <button
                  type="button"
                  onClick={() => advanceBookingStatus(booking.id)}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Advance to: {stages[booking.trackingStage + 1]?.title}
                </button>
              )}

              {booking.trackingStage === 3 && (
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Finish Work & Generate Digital Receipt
                </button>
              )}

              {booking.trackingStage === 4 && (
                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      if (booking.receiptId) {
                        onClose();
                        onOpenReceipt(booking.receiptId);
                      }
                    }}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Digital Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenReview(booking.id);
                    }}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Rate & Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom links: Safety & Cancel */}
          <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
            <button
              type="button"
              onClick={onOpenSafety}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Safety Guidelines</span>
            </button>

            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
              <button
                type="button"
                onClick={() => setShowCancelPrompt(true)}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Cancel Booking
              </button>
            )}
          </div>

          {showCancelPrompt && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-rose-900 block">Are you sure you want to cancel?</span>
              <p className="text-rose-800 text-[11px]">
                The technician may have already commenced travel to {booking.locationArea}.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    cancelBooking(booking.id, 'Customer requested cancellation');
                    setShowCancelPrompt(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 bg-rose-600 text-white rounded-lg font-bold"
                >
                  Yes, Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelPrompt(false)}
                  className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  Keep Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
