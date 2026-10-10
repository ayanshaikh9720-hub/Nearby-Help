import React, { useState } from 'react';
import { X, Sparkles, Mic, MicOff, Camera, Video, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryIcon } from '../common/CategoryIcon';

interface AskNearbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategoryAndProceed: (categoryName: string, problemText: string, media?: any[]) => void;
}

export const AskNearbyModal: React.FC<AskNearbyModalProps> = ({
  isOpen,
  onClose,
  onSelectCategoryAndProceed
}) => {
  const { serviceCategories, providers, location } = useApp();
  const [problemQuery, setProblemQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceRecorded, setHasVoiceRecorded] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ id: string; name: string; type: 'image' | 'video'; url: string }[]>([]);
  const [analyzedSuggestions, setAnalyzedSuggestions] = useState<{
    categories: string[];
    analysis: string;
    estimatedCost: string;
    urgencyHint: string;
  } | null>(null);

  if (!isOpen) return null;

  // Real-time problem diagnosis algorithm (NLP keyword matching)
  const diagnoseProblem = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes('leak') || lower.includes('ceiling') || lower.includes('seep') || lower.includes('water') || lower.includes('pipe') || lower.includes('tap')) {
      return {
        categories: ['Plumber', 'Waterproofing', 'Roofer'],
        analysis: 'Water seepage or pipe leakage detected. Immediate shutoff valve check recommended.',
        estimatedCost: '₹250 - ₹800',
        urgencyHint: 'High · May cause structural dampness'
      };
    }
    if (lower.includes('ac') || lower.includes('cool') || lower.includes('gas') || lower.includes('air conditioner')) {
      return {
        categories: ['AC Repair', 'Electrician', 'Appliance Repair'],
        analysis: 'Refrigerant gas deficit, compressor tripping or clogged air condenser coils.',
        estimatedCost: '₹399 - ₹1,200',
        urgencyHint: 'Medium · Technician will check refrigerant pressure'
      };
    }
    if (lower.includes('spark') || lower.includes('mcb') || lower.includes('trip') || lower.includes('current') || lower.includes('fan') || lower.includes('switch') || lower.includes('light') || lower.includes('electric')) {
      return {
        categories: ['Electrician', 'Appliance Repair'],
        analysis: 'Short circuit, overloaded phase neutral balance, or burnt switchboard terminal.',
        estimatedCost: '₹199 - ₹450',
        urgencyHint: 'High · Avoid touching switchboard with bare hands'
      };
    }
    if (lower.includes('puncture') || lower.includes('tyre') || lower.includes('flat') || lower.includes('air') || lower.includes('wheel')) {
      return {
        categories: ['Puncture', 'Bike Repair', 'Mechanic', 'Car Repair'],
        analysis: 'Tyre puncture or valve stem leak. Mobile technician can fix on spot.',
        estimatedCost: '₹149 - ₹300',
        urgencyHint: 'Immediate · Do not ride on flat rim'
      };
    }
    if (lower.includes('bike') || lower.includes('scooter') || lower.includes('car') || lower.includes('start') || lower.includes('battery') || lower.includes('breakdown')) {
      return {
        categories: ['Mechanic', 'Bike Repair', 'Battery Service', 'Towing'],
        analysis: 'Battery discharge, spark plug fouling, or fuel injection blockage.',
        estimatedCost: '₹249 - ₹650',
        urgencyHint: 'High · Doorstep jumpstart or towing available'
      };
    }
    if (lower.includes('door') || lower.includes('lock') || lower.includes('wood') || lower.includes('cabinet') || lower.includes('table') || lower.includes('furniture')) {
      return {
        categories: ['Carpenter'],
        analysis: 'Wood swelling due to humidity, hinge misalignment or mortise lock jammed.',
        estimatedCost: '₹299 - ₹600',
        urgencyHint: 'Normal · Carpenter brings replacement hinges & planer'
      };
    }
    if (lower.includes('clean') || lower.includes('bathroom') || lower.includes('sofa') || lower.includes('dust') || lower.includes('pest') || lower.includes('cockroach')) {
      return {
        categories: ['Cleaner', 'Pest Control'],
        analysis: 'Deep sanitation or chemical insect elimination needed.',
        estimatedCost: '₹349 - ₹1,100',
        urgencyHint: 'Scheduled · Deep cleaning or pest fumigation'
      };
    }
    if (lower.includes('wifi') || lower.includes('internet') || lower.includes('cable') || lower.includes('laptop') || lower.includes('pc') || lower.includes('computer')) {
      return {
        categories: ['Internet/Wi-Fi Technician', 'Computer Repair', 'CCTV Installation'],
        analysis: 'Optical fiber break, router configuration reset, or Windows boot error.',
        estimatedCost: '₹299 - ₹700',
        urgencyHint: 'Medium · Hardware diagnostic & line test'
      };
    }
    // Default smart suggestion
    return {
      categories: ['Electrician', 'Plumber', 'Carpenter'],
      analysis: 'General maintenance issue. Select the most relevant specialist below to broadcast.',
      estimatedCost: '₹199 - ₹500',
      urgencyHint: 'Standard doorstep service'
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setProblemQuery(val);
    if (val.trim().length >= 4) {
      setAnalyzedSuggestions(diagnoseProblem(val));
    } else {
      setAnalyzedSuggestions(null);
    }
  };

  const handleVoiceToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds(s => {
          if (s >= 5) {
            clearInterval(timer);
            setIsRecording(false);
            setHasVoiceRecorded(true);
            setProblemQuery(q => q ? `${q} [Voice Note Recorded: 6s]` : 'My kitchen tap pipe is leaking heavily and the wooden cabinet underneath is getting wet.');
            setAnalyzedSuggestions(diagnoseProblem('kitchen tap pipe is leaking heavily'));
            return 5;
          }
          return s + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setHasVoiceRecorded(true);
    }
  };

  const handleAddSamplePhoto = () => {
    setAttachedFiles(prev => [
      ...prev,
      {
        id: `att-${Date.now()}`,
        name: 'problem_snapshot.jpg',
        type: 'image',
        url: '/src/assets/images/hero_service_plumber_1790560991666.jpg'
      }
    ]);
  };

  const handleAddSampleVideo = () => {
    setAttachedFiles(prev => [
      ...prev,
      {
        id: `att-${Date.now()}`,
        name: 'water_leak_clip.mp4',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ]);
  };

  const handleQuickExample = (exampleText: string) => {
    setProblemQuery(exampleText);
    setAnalyzedSuggestions(diagnoseProblem(exampleText));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 leading-tight">Ask Nearby</h2>
              <p className="text-xs text-slate-600">Smart problem finder for any local issue</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Describe your issue in your own words:
            </label>
            <div className="relative">
              <textarea
                value={problemQuery}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g. My ceiling has dark damp patches and water is dripping... or AC stopped cooling and making a buzzing noise..."
                className="w-full text-sm rounded-xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Quick Examples */}
          <div>
            <span className="text-[11px] text-slate-600 font-medium block mb-1.5">Try asking:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickExample('My ceiling is leaking water')}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                “My ceiling is leaking”
              </button>
              <button
                type="button"
                onClick={() => handleQuickExample('Main MCB trips whenever AC turns on')}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                “MCB trips when AC turns on”
              </button>
              <button
                type="button"
                onClick={() => handleQuickExample('Scooter tyre is completely flat')}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                “Scooter tyre is completely flat”
              </button>
            </div>
          </div>

          {/* Multimodal input row: Voice, Photo, Video */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">
              Add multimedia for accurate estimates:
            </span>
            <div className="flex items-center gap-2">
              {/* Voice button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : hasVoiceRecorded
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Recording ({recordingSeconds}s)...</span>
                  </>
                ) : hasVoiceRecorded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Voice Attached</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-amber-600" />
                    <span>Record Voice</span>
                  </>
                )}
              </button>

              {/* Photo button */}
              <button
                type="button"
                onClick={handleAddSamplePhoto}
                className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <Camera className="w-4 h-4 text-blue-600" />
                <span>Add Photo</span>
              </button>

              {/* Video button */}
              <button
                type="button"
                onClick={handleAddSampleVideo}
                className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <Video className="w-4 h-4 text-purple-600" />
                <span>Add Video</span>
              </button>
            </div>

            {/* Attached files preview */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {attachedFiles.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded text-[11px] text-slate-700"
                  >
                    {file.type === 'image' ? <Camera className="w-3 h-3 text-blue-500" /> : <Video className="w-3 h-3 text-purple-500" />}
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFiles(prev => prev.filter(f => f.id !== file.id))}
                      className="text-slate-400 hover:text-rose-500 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI / Smart Analysis Card */}
          {analyzedSuggestions && (
            <div className="p-4 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-xl border border-amber-200/80 shadow-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Diagnosis & Recommendations</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{analyzedSuggestions.analysis}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white/80 p-2 rounded-lg border border-amber-100">
                  <span className="text-[10px] text-slate-600 block">Estimated Cost:</span>
                  <span className="font-bold text-slate-900">{analyzedSuggestions.estimatedCost}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-lg border border-amber-100">
                  <span className="text-[10px] text-slate-600 block">Suggested Urgency:</span>
                  <span className="font-bold text-amber-800">{analyzedSuggestions.urgencyHint}</span>
                </div>
              </div>

              {/* Matching Suggested Categories */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  Matching Services ({analyzedSuggestions.categories.length}) — Tap to post request:
                </span>
                <div className="space-y-2">
                  {analyzedSuggestions.categories.map(catName => {
                    const matchedCat = serviceCategories.find(c => c.name.toLowerCase() === catName.toLowerCase());
                    const matchedProvidersCount = providers.filter(p =>
                      p.services.some(s => s.toLowerCase().includes(catName.toLowerCase()))
                    ).length;

                    return (
                      <button
                        key={catName}
                        onClick={() => onSelectCategoryAndProceed(catName, problemQuery, attachedFiles)}
                        className="w-full p-2.5 bg-white hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-xl flex items-center justify-between text-left transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <CategoryIcon name={matchedCat?.iconName || 'Wrench'} className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                              {catName}
                            </div>
                            <div className="text-[10px] text-slate-600">
                              Starting from ₹{matchedCat?.defaultStartingPrice || 249} · {matchedProvidersCount || 3} verified pros nearby
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                          <span>Select</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!analyzedSuggestions && problemQuery.trim().length === 0 && (
            <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-600 space-y-1">
              <AlertCircle className="w-5 h-5 mx-auto text-slate-400" />
              <p className="text-xs font-medium text-slate-600">No technical knowledge needed</p>
              <p className="text-[11px] text-slate-600">
                Just explain what broke, leaked, or stopped working. Nearby Help will find the right local tradesperson for you in {location.area}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
