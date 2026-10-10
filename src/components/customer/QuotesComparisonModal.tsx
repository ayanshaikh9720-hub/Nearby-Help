import React from 'react';
import {
  X,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quote } from '../../types';

interface QuotesComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string | null;
  onQuoteAccepted: (bookingId: string) => void;
  onOpenVerificationInfo: (providerId: string) => void;
}

export const QuotesComparisonModal: React.FC<QuotesComparisonModalProps> = ({
  isOpen,
  onClose,
  requestId,
  onQuoteAccepted,
  onOpenVerificationInfo
}) => {
  const { jobRequests, acceptQuote, providers } = useApp();

  if (!isOpen || !requestId) return null;

  const currentRequest = jobRequests.find(r => r.id === requestId);
  const quotes = currentRequest?.quotes || [];

  const handleSelectQuote = (quoteId: string) => {
    const booking = acceptQuote(requestId, quoteId);
    onClose();
    onQuoteAccepted(booking.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 leading-tight">Compare Provider Quotes</h2>
            <p className="text-xs text-slate-600">
              {currentRequest?.serviceCategory} · {quotes.length} offer(s) received
            </p>
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
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs text-slate-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Compare quotes based on price, distance, and verified experience. Choose the technician that best fits your requirements.
            </p>
          </div>

          {quotes.length === 0 ? (
            <div className="text-center py-8 text-slate-600 space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto animate-spin" />
              <p className="text-sm font-medium">Waiting for quotes from nearby technicians...</p>
              <p className="text-xs">Technicians in your area have been alerted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map(quote => {
                const fullProvider = providers.find(p => p.id === quote.providerId);
                const isSelected = currentRequest?.selectedQuoteId === quote.id;

                return (
                  <div
                    key={quote.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Provider Profile Summary */}
                      <div className="flex items-start gap-3">
                        <img
                          src={quote.providerAvatar}
                          alt={quote.providerName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-slate-900 leading-snug">
                              {quote.providerName}
                            </h3>
                            {quote.isVerified && (
                              <button
                                type="button"
                                onClick={() => onOpenVerificationInfo(quote.providerId)}
                                className="flex items-center gap-0.5 text-[10px] text-blue-700 font-semibold hover:underline"
                                title="Click to view verified credentials"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                                <span>Verified</span>
                              </button>
                            )}
                          </div>

                          {/* Metadata row without pill boxes */}
                          <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                            <span className="flex items-center gap-0.5 font-semibold text-slate-900">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              <span>{quote.providerRating}</span>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{quote.providerDistanceKm} km away</span>
                            {fullProvider?.experienceYears && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{fullProvider.experienceYears} yrs exp</span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            <span>Can reach in ~{quote.estimatedArrivalMins} mins</span>
                          </div>
                        </div>
                      </div>

                      {/* Quoted Price */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-600 block">Quoted Price</span>
                        <div className="font-extrabold text-lg text-slate-900">
                          ₹{quote.amount}
                        </div>
                      </div>
                    </div>

                    {/* Notes from Provider */}
                    {quote.notes && (
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-100">
                        “{quote.notes}”
                      </div>
                    )}

                    {/* Action */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        Pay after work completion (Cash/UPI)
                      </span>

                      {isSelected ? (
                        <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>Accepted</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectQuote(quote.id)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 active:scale-95"
                        >
                          <span>Accept Quote</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
