import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, ShieldCheck, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';

interface ProviderProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderProfileEditorModal: React.FC<ProviderProfileEditorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { profile, updateProfile, serviceCategories, addCustomService } = useApp();

  const [name, setName] = useState(profile.name);
  const [businessName, setBusinessName] = useState(profile.businessName || '');
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears || 5);
  const [startingPrice, setStartingPrice] = useState(profile.startingPrice || 249);
  const [serviceAreaRadiusKm, setServiceAreaRadiusKm] = useState(profile.serviceAreaRadiusKm || 8);
  const [about, setAbout] = useState(profile.about || '');
  const [selectedServices, setSelectedServices] = useState<string[]>(profile.providerServices);
  const [customServices, setCustomServices] = useState<string[]>(profile.providerCustomServices || []);
  const [newCustomServiceName, setNewCustomServiceName] = useState('');
  const [newCustomServiceGroup, setNewCustomServiceGroup] = useState<ServiceCategory['group']>('Home Services');
  const [newCustomServicePrice, setNewCustomServicePrice] = useState<number>(299);
  const [languagesStr, setLanguagesStr] = useState(profile.languages.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleService = (svcName: string) => {
    setSelectedServices(prev =>
      prev.includes(svcName) ? prev.filter(s => s !== svcName) : [...prev, svcName]
    );
  };

  const handleAddCustomService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomServiceName.trim()) return;

    addCustomService(
      newCustomServiceName.trim(),
      newCustomServiceGroup,
      newCustomServicePrice,
      'Custom specialised service created by provider.'
    );

    setCustomServices(prev => [...prev, newCustomServiceName.trim()]);
    setNewCustomServiceName('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const langs = languagesStr.split(',').map(l => l.trim()).filter(Boolean);

    updateProfile({
      name,
      businessName,
      experienceYears: Number(experienceYears),
      startingPrice: Number(startingPrice),
      serviceAreaRadiusKm: Number(serviceAreaRadiusKm),
      about,
      providerServices: selectedServices,
      providerCustomServices: customServices,
      languages: langs.length > 0 ? langs : ['English', 'Hindi']
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 leading-tight">Edit Provider Profile</h2>
            <p className="text-xs text-slate-600">List multiple services & custom offerings</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {savedSuccess ? (
            <div className="text-center py-10 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-slate-900">Profile Updated Successfully!</h3>
              <p className="text-xs text-slate-600">Changes are now visible to nearby customers.</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Business Name (Optional):</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Ramesh Electricals"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Pricing & Radius */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Starting Fee (₹):</label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={e => setStartingPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Experience (Yrs):</label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Service Area (Km):</label>
                  <input
                    type="number"
                    value={serviceAreaRadiusKm}
                    onChange={e => setServiceAreaRadiusKm(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Multiple Services Checklist */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800">
                    Select All Services You Provide ({selectedServices.length}):
                  </label>
                  <span className="text-[10px] text-amber-800 font-semibold">Multiple allowed</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50">
                  {serviceCategories.map(cat => {
                    const isChecked = selectedServices.includes(cat.name);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleService(cat.name)}
                        className={`p-1.5 rounded-lg text-left text-[11px] transition-all border flex items-center justify-between ${
                          isChecked
                            ? 'bg-amber-500 text-white font-bold border-amber-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isChecked && <span className="ml-1 text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Services Section */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
                <span className="font-bold text-blue-950 block">
                  Add Custom Specialized Category:
                </span>
                <p className="text-[11px] text-blue-900">
                  Not restricted to predefined categories. Add niche services (e.g. Inverter Wiring, Rooftop Waterproofing, Sofa Dryclean).
                </p>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newCustomServiceName}
                    onChange={e => setNewCustomServiceName(e.target.value)}
                    placeholder="Enter custom service title..."
                    className="flex-1 p-2 rounded-lg border border-blue-200 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomService}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {customServices.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {customServices.map(cs => (
                      <span
                        key={cs}
                        className="bg-white border border-blue-300 text-blue-900 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                      >
                        <span>★ {cs}</span>
                        <button
                          type="button"
                          onClick={() => setCustomServices(prev => prev.filter(c => c !== cs))}
                          className="text-slate-400 hover:text-rose-500 font-bold ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* About description */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">About Your Experience & Work:</label>
                <textarea
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Tell customers about your skills, certifications, and reliability..."
                />
              </div>

              {/* Languages */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">Languages Spoken (comma separated):</label>
                <input
                  type="text"
                  value={languagesStr}
                  onChange={e => setLanguagesStr(e.target.value)}
                  placeholder="e.g. Hindi, English, Kannada"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Save Provider Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
