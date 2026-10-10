import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  Star,
  ArrowRight,
  ShieldCheck,
  Send,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, JobRequest } from '../../types';

interface RequestsListViewProps {
  onOpenLiveTracking: (bookingId: string) => void;
  onOpenQuotes: (requestId: string) => void;
  onOpenReceipt: (receiptId: string) => void;
  onOpenReview: (bookingId: string, role?: 'provider' | 'customer') => void;
  onOpenChat: (bookingId: string) => void;
}

export const RequestsListView: React.FC<RequestsListViewProps> = ({
  onOpenLiveTracking,
  onOpenQuotes,
  onOpenReceipt,
  onOpenReview,
  onOpenChat
}) => {
  const { userMode, jobRequests, bookings, cancelJobRequest } = useApp();
  const [filterTab, setFilterTab] = useState<'active' | 'completed' | 'all'>('active');

  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const pendingRequests = jobRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-base text-slate-900 leading-tight">
            {userMode === 'provider' ? 'My Jobs & Assignments' : 'My Requests & Bookings'}
          </h1>
          <p className="text-xs text-slate-600">Track milestones, live tracking & digital receipts</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setFilterTab('active')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              filterTab === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Active ({userMode === 'provider' ? activeBookings.length + pendingRequests.length : activeBookings.length + pendingRequests.length})
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              filterTab === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            History ({completedBookings.length})
          </button>
        </div>
      </div>

      {/* ACTIVE SECTION */}
      {filterTab !== 'completed' && (
        <div className="space-y-4">
          {/* 1. Pending Broadcast Requests waiting for Quotes */}
          {userMode === 'customer' && pendingRequests.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Broadcast Requests ({pendingRequests.length})
              </span>

              {pendingRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 bg-white border border-amber-300 rounded-2xl shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                        {req.quotes.length > 0 ? `${req.quotes.length} Quotes Received` : 'Broadcasting Nearby'}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{req.serviceCategory}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">{req.location.area}</p>
                    </div>

                    <span className="text-xs font-extrabold text-slate-900 font-mono">
                      Budget: ₹{req.budgetMax}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                    “{req.problemDescription}”
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => cancelJobRequest(req.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                    >
                      Cancel Broadcast
                    </button>

                    {req.quotes.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => onOpenQuotes(req.id)}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                      >
                        <span>Compare {req.quotes.length} Quotes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs text-amber-800 font-medium animate-pulse">
                        Awaiting provider responses...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Ongoing Confirmed Bookings */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Ongoing Bookings ({activeBookings.length})
            </span>

            {activeBookings.length === 0 && pendingRequests.length === 0 ? (
              <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-2 text-xs text-slate-600">
                <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800 text-sm">No active jobs or requests right now.</p>
                <p>When you request help or accept a quote, it will appear here with live milestone updates.</p>
              </div>
            ) : (
              activeBookings.map(b => (
                <div
                  key={b.id}
                  className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.providerAvatar}
                        alt={b.providerName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900">{b.service}</h3>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            {b.status === 'on_the_way' ? 'On The Way' : b.status === 'arrived' ? 'Arrived' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {userMode === 'provider' ? `Customer: ${b.customerName}` : `Partner: ${b.providerName}`}
                        </p>
                        <span className="text-[11px] text-slate-600">{b.locationArea}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-slate-900 font-mono">₹{b.totalAmount}</span>
                      <span className="text-[10px] text-slate-600 block">OTP: {b.otpCode}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onOpenChat(b.id)}
                      className="font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Open Messages
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenLiveTracking(b.id)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1"
                    >
                      <span>Track Status</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* COMPLETED HISTORY SECTION */}
      {filterTab !== 'active' && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Completed Service History ({completedBookings.length})
          </span>

          {completedBookings.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-1 text-xs text-slate-600">
              <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No completed bookings yet.</p>
              <p>Your finished services and receipts will be permanently archived here.</p>
            </div>
          ) : (
            completedBookings.map(b => (
              <div
                key={b.id}
                className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-slate-900">{b.service}</h3>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                        Completed
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      {userMode === 'provider' ? `Customer: ${b.customerName}` : `Partner: ${b.providerName}`} · {b.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm text-slate-900 font-mono">₹{b.totalAmount}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">Paid (UPI)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {b.receiptId && (
                    <button
                      type="button"
                      onClick={() => onOpenReceipt(b.receiptId!)}
                      className="flex items-center gap-1 font-bold text-blue-700 hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Digital Receipt</span>
                    </button>
                  )}

                  {!b.hasCustomerRated ? (
                    <button
                      type="button"
                      onClick={() => onOpenReview(b.id, 'provider')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold"
                    >
                      Rate Partner
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Review Submitted</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
