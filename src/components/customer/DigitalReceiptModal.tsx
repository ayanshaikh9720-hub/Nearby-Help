import React from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  FileText,
  IndianRupee,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobReceipt } from '../../types';

interface DigitalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptId: string | null;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({
  isOpen,
  onClose,
  receiptId
}) => {
  const { jobReceipts } = useApp();

  if (!isOpen || !receiptId) return null;

  const receipt = jobReceipts.find(r => r.id === receiptId) || jobReceipts[0];
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Nearby Help Receipt - ${receipt.referenceNumber}`,
        text: `Digital Service Record for ${receipt.service} by ${receipt.providerName}. Total: ₹${receipt.finalAmount}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`Nearby Help Receipt #${receipt.referenceNumber} | ${receipt.service} | ₹${receipt.finalAmount}`);
      alert('Receipt summary copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Digital Service Record</h2>
              <p className="text-xs text-slate-600 font-mono">{receipt.referenceNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/50">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Stamp & Status */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-600 tracking-wider block">
                  Service Category
                </span>
                <span className="text-sm font-bold text-slate-900">{receipt.service}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Job Completed & Paid</span>
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-600 uppercase font-semibold block mb-0.5">
                  Customer
                </span>
                <span className="font-bold text-slate-900 block">{receipt.customerName}</span>
                <span className="text-[11px] text-slate-600">Bengaluru, India</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-600 uppercase font-semibold block mb-0.5">
                  Service Partner
                </span>
                <span className="font-bold text-slate-900 block">{receipt.providerName}</span>
                <span className="text-[11px] text-slate-600 truncate block">
                  {receipt.providerBusiness || 'Verified Independent Pro'}
                </span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center justify-between text-xs text-slate-600 border-y border-slate-100 py-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{receipt.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{receipt.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Nearby Verified</span>
              </div>
            </div>

            {/* Scope / Work Performed */}
            <div>
              <span className="text-[11px] uppercase font-semibold text-slate-600 tracking-wider block mb-1">
                Work Summary & Notes
              </span>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {receipt.description}
              </p>
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Labour & Inspection Charges</span>
                <span className="font-medium text-slate-900 font-mono">₹{receipt.labourAmount}</span>
              </div>

              {receipt.partsOrMaterialsAmount > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Parts & Consumables</span>
                  <span className="font-medium text-slate-900 font-mono">₹{receipt.partsOrMaterialsAmount}</span>
                </div>
              )}

              {receipt.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Promotional Discount</span>
                  <span className="font-medium font-mono">-₹{receipt.discount}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                <span>Total Amount Paid</span>
                <span className="text-base text-slate-900 font-mono">₹{receipt.finalAmount}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <span>Payment Mode</span>
                <span className="font-semibold text-slate-800">{receipt.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
