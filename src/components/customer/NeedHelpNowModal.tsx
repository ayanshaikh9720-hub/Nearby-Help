import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  MapPin,
  Clock,
  IndianRupee,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Radio,
  Send,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UrgencyLevel, MediaAttachment } from '../../types';
import { CategoryIcon } from '../common/CategoryIcon';

interface NeedHelpNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: string;
  prefilledProblem?: string;
  initialMedia?: any[];
  onOpenQuotes: (requestId: string) => void;
}

export const NeedHelpNowModal: React.FC<NeedHelpNowModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory,
  prefilledProblem,
  initialMedia,
  onOpenQuotes
}) => {
  const { serviceCategories, location, createJobRequest, jobRequests } = useApp();

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || 'Electrician');
  const [problemDescription, setProblemDescription] = useState(prefilledProblem || '');
  const [urgency, setUrgency] = useState<UrgencyLevel>('urgent_30min');
  const [budget, setBudget] = useState<number>(350);
  const [customBudgetInput, setCustomBudgetInput] = useState<string>('350');
  const [mediaAttachments, setMediaAttachments] = useState<MediaAttachment[]>(initialMedia || []);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedCategory) setSelectedCategory(preselectedCategory);
    if (prefilledProblem) setProblemDescription(prefilledProblem);
    if (initialMedia) setMediaAttachments(initialMedia);
  }, [preselectedCategory, prefilledProblem, initialMedia]);

  if (!isOpen) return null;

  // Track the active submitted request in real time
  const currentRequest = submittedRequestId ? jobRequests.find(r => r.id === submittedRequestId) : null;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      return;
    }

    setSubmitting(true);
    const budgetVal = parseInt(customBudgetInput, 10) || budget || 350;

    const reqId = createJobRequest({
      serviceCategory: selectedCategory,
      problemDescription,
      urgency,
      budgetMax: budgetVal,
      mediaAttachments
    });

    setSubmittedRequestId(reqId);
    setSubmitting(false);
  };

  const handleAddSamplePhoto = () => {
    setMediaAttachments(prev => [
      ...prev,
      {
        id: `att-${Date.now()}`,
        type: 'image',
        name: 'site_photo.jpg',
        url: '/src/assets/images/hero_service_electrician_1790560964865.jpg'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-tight">Need Help Now</h2>
              <p className="text-[11px] text-slate-600">Urgent broadcast to nearby verified specialists</p>
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
        <div className="p-5 overflow-y-auto">
          {!submittedRequestId ? (
            <form onSubmit={handleBroadcast} className="space-y-4">
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  1. Select Required Service:
                </label>
                <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {serviceCategories.map(cat => {
                    const isSelected = selectedCategory === cat.name;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`p-2 rounded-xl text-left text-xs transition-all border flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-white font-semibold border-amber-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <CategoryIcon name={cat.iconName} className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Problem Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  2. Describe the Problem:
                </label>
                <textarea
                  value={problemDescription}
                  onChange={e => setProblemDescription(e.target.value)}
                  required
                  rows={2}
                  placeholder="e.g. Sparking in kitchen main switch, or sudden leak in geyser inlet pipe..."
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
                />
              </div>

              {/* Step 3: Location */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-600 block">Service Location:</span>
                    <span className="font-semibold text-slate-900">{location.area}, {location.city} ({location.pincode})</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Confirmed
                </span>
              </div>

              {/* Step 4: Urgency Level */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  3. How quickly do you need help?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('urgent_30min')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs ${
                      urgency === 'urgent_30min'
                        ? 'bg-rose-50 border-rose-500 text-rose-800 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-[11px]">Urgent</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block">~30 mins</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('within_2hrs')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs ${
                      urgency === 'within_2hrs'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[11px]">Today</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block">Within 2 hrs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('scheduled')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs ${
                      urgency === 'scheduled'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[11px]">Later</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block">Schedule slot</span>
                  </button>
                </div>
              </div>

              {/* Step 5: Approximate Budget */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    4. Approximate Budget (₹):
                  </label>
                  <span className="text-[11px] text-slate-600">Providers can offer custom quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  {[250, 400, 600, 1000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setBudget(amt);
                        setCustomBudgetInput(amt.toString());
                      }}
                      className={`flex-1 py-1.5 text-xs rounded-lg border font-semibold transition-all ${
                        budget === amt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <div className="w-24 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-semibold">₹</span>
                    <input
                      type="number"
                      value={customBudgetInput}
                      onChange={e => {
                        setCustomBudgetInput(e.target.value);
                        setBudget(parseInt(e.target.value, 10) || 0);
                      }}
                      placeholder="Custom"
                      className="w-full text-xs pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Photo */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleAddSamplePhoto}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium"
                >
                  <Camera className="w-4 h-4 text-slate-500" />
                  <span>Attach Photo/Video ({mediaAttachments.length})</span>
                </button>
                {mediaAttachments.length > 0 && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {mediaAttachments.length} file attached
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || !problemDescription.trim()}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Broadcasting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Broadcast to Nearby Providers</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-600 mt-2">
                  🔒 Approximate area shared. Exact address is never publicly exposed.
                </p>
              </div>
            </form>
          ) : (
            /* Live Request Lifecycle Status Tracker */
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 text-amber-600 border border-amber-200 mb-2 relative">
                  <Radio className="w-7 h-7 animate-pulse text-amber-600" />
                  <span className="absolute inset-0 rounded-full border border-amber-400 animate-ping opacity-30"></span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {currentRequest?.quotes && currentRequest.quotes.length > 0
                    ? `${currentRequest.quotes.length} Nearby Quotes Received!`
                    : 'Broadcasting to Verified Providers'}
                </h3>
                <p className="text-xs text-slate-600">
                  {currentRequest?.serviceCategory} · {currentRequest?.location.area}
                </p>
              </div>

              {/* Status Stepper */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>Broadcast Lifecycle</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 font-semibold px-2 py-0.5 rounded border border-amber-200">
                    Live Status
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* Step 1 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-slate-800 font-medium">Finding nearby qualified providers</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-slate-800 font-medium">Requests sent to available technicians within 5 km</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      currentRequest?.quotes && currentRequest.quotes.length > 0
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {currentRequest?.quotes && currentRequest.quotes.length > 0 ? '✓' : '...'}
                    </div>
                    <span className="text-slate-800 font-medium">
                      {currentRequest?.quotes && currentRequest.quotes.length > 0
                        ? `${currentRequest.quotes.length} technician(s) interested with competitive quotes`
                        : 'Waiting for providers to submit quotes...'}
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                      4
                    </div>
                    <span>Customer reviews & accepts quote</span>
                  </div>
                </div>
              </div>

              {/* Incoming Quotes Trigger */}
              {currentRequest?.quotes && currentRequest.quotes.length > 0 ? (
                <div className="space-y-2">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Compare Quotes</span>
                      <span className="text-[11px] text-slate-600">
                        Offers starting from ₹{Math.min(...currentRequest.quotes.map(q => q.amount))}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenQuotes(currentRequest.id);
                      }}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>View {currentRequest.quotes.length} Quotes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-600">
                  <p>Broadcasting to technicians in {location.area}... Responses usually arrive within 30 seconds.</p>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Keep Running in Background
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
