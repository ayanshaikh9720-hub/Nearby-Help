import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  FileCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  TrendingUp,
  MapPin,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const {
    providers,
    jobRequests,
    bookings,
    serviceCategories,
    disputeReports,
    submitDispute
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stats' | 'verifications' | 'reports' | 'categories'>('stats');

  // Pending verification simulations
  const pendingVerifications = [
    {
      id: 'v-101',
      providerName: 'Suresh Patil',
      service: 'Plumber & Seepage',
      docType: 'Trade Guild Certificate (KA-PL-912)',
      submittedDate: 'Today, 2:15 PM'
    },
    {
      id: 'v-102',
      providerName: 'Arun M.',
      service: 'Carpenter',
      docType: 'Aadhaar Biometric Verification',
      submittedDate: 'Yesterday'
    }
  ];

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* Admin Header */}
      <section className="bg-gradient-to-r from-rose-900 via-slate-900 to-black text-white rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/30 border border-rose-500/40 text-rose-300 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white">Trust & Platform Operations Admin</h1>
              <p className="text-xs text-rose-200">Moderation, Verifications & City Dispatch</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
            All Systems Operational
          </span>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'stats' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'verifications' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verifications ({pendingVerifications.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'reports' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Disputes ({disputeReports.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'categories' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Categories ({serviceCategories.length})
          </button>
        </div>
      </section>

      {/* Tab 1: Operational Metrics */}
      {activeTab === 'stats' && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Users</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">1,480</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">+48 today</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Providers</span>
              <span className="text-xl font-extrabold text-blue-600 font-mono">312</span>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Across 6 Cities</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Jobs Dispatched</span>
              <span className="text-xl font-extrabold text-amber-600 font-mono">{jobRequests.length + 86}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">94% Fill Rate</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Open Disputes</span>
              <span className="text-xl font-extrabold text-rose-600 font-mono">{disputeReports.length}</span>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">0 Escalated</span>
            </div>
          </div>

          {/* Active Cities Footprint */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Nationwide Footprint</span>
              <span className="text-slate-500 font-normal">Expansion Stage 1</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['Bengaluru (Lead)', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'].map(city => (
                <div key={city} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-semibold text-slate-800 text-[11px] truncate">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Verification Queue */}
      {activeTab === 'verifications' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pending Provider Verifications
            </h2>
            <span className="text-[10px] text-slate-500">Aadhaar & Trade Licences</span>
          </div>

          <div className="space-y-2.5">
            {pendingVerifications.map(item => (
              <div
                key={item.id}
                className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.providerName}</h3>
                    <p className="text-[11px] text-slate-600">{item.service}</p>
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mt-1">
                      {item.docType}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{item.submittedDate}</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Approved verification for ${item.providerName}`)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs"
                  >
                    Approve Verification
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Requested re-upload for ${item.providerName}`)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                  >
                    Request Resubmission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Dispute Tickets */}
      {activeTab === 'reports' && (
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Reported Issues & Disputes ({disputeReports.length})
          </h2>

          {disputeReports.length === 0 ? (
            <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
              No open customer or provider dispute tickets.
            </div>
          ) : (
            <div className="space-y-2.5">
              {disputeReports.map(report => (
                <div
                  key={report.id}
                  className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-700">{report.reason}</span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-mono">
                      {report.status}
                    </span>
                  </div>
                  <p className="text-slate-800 text-[11px]">
                    Reported by: <strong>{report.reporterName}</strong> against <strong>{report.targetName}</strong>
                  </p>
                  <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    “{report.details}”
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 4: Categories & Custom Services */}
      {activeTab === 'categories' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Marketplace Categories ({serviceCategories.length})
            </h2>
            <span className="text-[10px] text-slate-500">Predefined & Custom</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {serviceCategories.map(c => (
              <div
                key={c.id}
                className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-slate-500">{c.group} · ₹{c.defaultStartingPrice}</div>
                </div>
                {c.popular && <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-bold">Popular</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
