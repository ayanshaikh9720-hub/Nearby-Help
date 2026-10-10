import React, { useState } from 'react';
import {
  Bell,
  Power,
  TrendingUp,
  Clock,
  MapPin,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Send,
  MessageSquare,
  FileText,
  Star,
  ShieldCheck,
  Plus,
  Camera,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobRequest, Booking } from '../../types';

interface ProviderDashboardProps {
  onOpenLiveTracking: (bookingId: string) => void;
  onOpenChat: (bookingId: string) => void;
  onOpenReceipt: (receiptId: string) => void;
  onOpenProfileEditor: () => void;
  onOpenVerificationModal: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
  onOpenLiveTracking,
  onOpenChat,
  onOpenReceipt,
  onOpenProfileEditor,
  onOpenVerificationModal
}) => {
  const {
    profile,
    updateProfile,
    jobRequests,
    bookings,
    sendQuote,
    advanceBookingStatus,
    completeJobAndGenerateReceipt,
    location,
    jobReceipts
  } = useApp();

  const [customQuoteModalReq, setCustomQuoteModalReq] = useState<JobRequest | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<string>('350');
  const [quoteEta, setQuoteEta] = useState<string>('20');
  const [quoteNotes, setQuoteNotes] = useState<string>('Equipped with professional tools and ready to assist.');
  const [declinedRequestIds, setDeclinedRequestIds] = useState<string[]>([]);

  // Active incoming jobs for this provider
  const incomingRequests = jobRequests.filter(
    r => r.status !== 'completed' && r.status !== 'cancelled' && !declinedRequestIds.includes(r.id)
  );

  // Today's jobs
  const todayBookings = bookings.filter(b => b.status !== 'cancelled');
  const completedJobsCount = bookings.filter(b => b.status === 'completed').length;
  const totalEarnings = jobReceipts.reduce((acc, curr) => acc + curr.finalAmount, 0) || 1680;

  const toggleAvailability = () => {
    const nextStatus = profile.providerStatus === 'available' ? 'offline' : 'available';
    updateProfile({ providerStatus: nextStatus });
  };

  const handleDeclineRequest = (reqId: string) => {
    setDeclinedRequestIds(prev => [...prev, reqId]);
  };

  const handleOpenSendQuoteModal = (req: JobRequest) => {
    setCustomQuoteModalReq(req);
    setQuoteAmount(req.budgetMax?.toString() || '350');
  };

  const handleSubmitCustomQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuoteModalReq) return;

    const amt = parseInt(quoteAmount, 10) || 350;
    const eta = parseInt(quoteEta, 10) || 20;

    sendQuote(customQuoteModalReq.id, amt, quoteNotes, eta);
    setCustomQuoteModalReq(null);
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* 1. Provider Status & Availability Bar */}
      <section className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-base text-white leading-tight">
                    {profile.name}
                  </h1>
                  {profile.isVerified ? (
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-1.5 py-0.2 rounded border border-blue-500/30">
                      ✓ Verified
                    </span>
                  ) : (
                    <button
                      onClick={onOpenVerificationModal}
                      className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.2 rounded border border-amber-500/30 hover:underline"
                    >
                      Get Verified
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  {profile.businessName || 'Local Service Partner'}
                </p>
              </div>
            </div>

            {/* Online / Offline switch */}
            <button
              onClick={toggleAvailability}
              className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                profile.providerStatus === 'available'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{profile.providerStatus === 'available' ? 'Online' : 'Offline'}</span>
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
            <div className="p-2.5 bg-slate-800/60 rounded-xl">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Earnings Today</span>
              <span className="text-base font-extrabold text-amber-400 font-mono">₹{totalEarnings}</span>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-xl">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Jobs Done</span>
              <span className="text-base font-extrabold text-white font-mono">{completedJobsCount}</span>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-xl">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Partner Rating</span>
              <span className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. New Incoming Job Alert Banner */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Nearby Job Requests ({incomingRequests.length})
            </h2>
          </div>
          <span className="text-[10px] text-slate-600">Broadcast within your service radius</span>
        </div>

        {incomingRequests.length === 0 ? (
          <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-1 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">No pending nearby jobs right now.</p>
            <p className="text-[11px] text-slate-600">
              Keep your availability status <strong className="text-emerald-600">Online</strong> to receive instant alerts when customers post in {location.area}.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {incomingRequests.map(req => (
              <div
                key={req.id}
                className="p-4 bg-white border-2 border-amber-400/80 rounded-2xl shadow-sm space-y-3 animate-in fade-in"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      New Job Nearby
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {req.serviceCategory} Assistance
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>~1.2 km away ({req.location.area})</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-emerald-800">
                        Budget: ₹{req.budgetMax || 350}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-600 font-mono">{req.createdAt}</span>
                </div>

                {/* Problem description */}
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                  “{req.problemDescription}”
                </p>

                {/* Media preview if any */}
                {req.mediaAttachments && req.mediaAttachments.length > 0 && (
                  <div className="flex items-center gap-2 text-[11px] text-blue-700 font-semibold">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Customer attached {req.mediaAttachments.length} reference photo(s)</span>
                  </div>
                )}

                {/* Action Buttons: Accept / Send Quote / Decline */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleOpenSendQuoteModal(req)}
                    className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Quote</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sendQuote(req.id, req.budgetMax || 350, 'Accepted direct customer budget.', 15);
                    }}
                    className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Accept Direct
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeclineRequest(req.id)}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Today's Bookings & In-Progress Jobs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Today's Active Schedule ({todayBookings.length})
          </h2>
          <span className="text-[10px] text-slate-600">Milestone manager</span>
        </div>

        {todayBookings.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600">
            No active jobs in your schedule right now.
          </div>
        ) : (
          <div className="space-y-3">
            {todayBookings.map(b => (
              <div
                key={b.id}
                className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">{b.service}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {b.status === 'completed' ? 'Completed' : b.status === 'on_the_way' ? 'En Route' : 'Scheduled'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Customer: <strong className="text-slate-800">{b.customerName}</strong> ({b.locationArea})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-900 block font-mono">₹{b.totalAmount}</span>
                    <span className="text-[10px] text-slate-600">Agreed Quote</span>
                  </div>
                </div>

                {/* Tracking Milestones for the Provider */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>Job Progress:</span>
                    <span className="font-mono text-emerald-700">
                      {b.trackingStage === 0 && 'Awaiting Start'}
                      {b.trackingStage === 1 && 'On The Way (En Route)'}
                      {b.trackingStage === 2 && 'Arrived at Doorstep'}
                      {b.trackingStage === 3 && 'Service In Progress'}
                      {b.trackingStage === 4 && 'Completed & Billed'}
                    </span>
                  </div>

                  {b.trackingStage < 4 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => advanceBookingStatus(b.id)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors"
                      >
                        {b.trackingStage === 0 && 'Start Journey (On The Way)'}
                        {b.trackingStage === 1 && 'Mark Reached / Arrived'}
                        {b.trackingStage === 2 && 'Verify OTP & Start Work'}
                        {b.trackingStage === 3 && 'Complete Service'}
                      </button>
                    </div>
                  )}

                  {b.trackingStage === 4 && b.receiptId && (
                    <button
                      type="button"
                      onClick={() => onOpenReceipt(b.receiptId!)}
                      className="w-full py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Generated Digital Receipt</span>
                    </button>
                  )}
                </div>

                {/* Contact Customer in App */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenChat(b.id)}
                    className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-950"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>In-App Message Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenLiveTracking(b.id)}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Full Live Tracking →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Provider Profile Management Card */}
      <section className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              My Profile & Services
            </h3>
            <p className="text-[11px] text-slate-600">
              {profile.providerServices.length} listed services · Starting ₹{profile.startingPrice}
            </p>
          </div>
          <button
            onClick={onOpenProfileEditor}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {profile.providerServices.map(svc => (
            <span
              key={svc}
              className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-lg"
            >
              {svc}
            </span>
          ))}
          {profile.providerCustomServices?.map(csvc => (
            <span
              key={csvc}
              className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold rounded-lg"
            >
              ★ {csvc}
            </span>
          ))}
        </div>
      </section>

      {/* Custom Quote Modal */}
      {customQuoteModalReq && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-base text-slate-900">
                Send Custom Quote: {customQuoteModalReq.serviceCategory}
              </h3>
              <button onClick={() => setCustomQuoteModalReq(null)} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitCustomQuote} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Your Quoted Amount (₹):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={e => setQuoteAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Estimated Arrival (Minutes):</label>
                <input
                  type="number"
                  value={quoteEta}
                  onChange={e => setQuoteEta(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Notes for Customer:</label>
                <textarea
                  value={quoteNotes}
                  onChange={e => setQuoteNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Submit Quote
                </button>
                <button
                  type="button"
                  onClick={() => setCustomQuoteModalReq(null)}
                  className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
