import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessDashboard: React.FC = () => {
  const { teamMembers, assignTeamMember, bookings, location } = useApp();
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<string | null>(null);

  const activeJobs = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* Business Header Banner */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/40 text-purple-200 flex items-center justify-center font-extrabold text-lg">
              VK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base text-white">Vikas Tech & CCTV Enterprise</h1>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.2 rounded border border-purple-400/30">
                  Business Pro
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Registered MSME Enterprise · {teamMembers.length} Active Technicians
              </p>
            </div>
          </div>
        </div>

        {/* Business Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-800/60 text-center">
          <div className="p-2.5 bg-purple-950/50 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-purple-300 block">Fleet Staff</span>
            <span className="text-base font-extrabold text-white font-mono">{teamMembers.length} Pros</span>
          </div>

          <div className="p-2.5 bg-purple-950/50 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-purple-300 block">Jobs Active</span>
            <span className="text-base font-extrabold text-amber-300 font-mono">{activeJobs.length}</span>
          </div>

          <div className="p-2.5 bg-purple-950/50 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-purple-300 block">Fleet Rating</span>
            <span className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.8</span>
            </span>
          </div>
        </div>
      </section>

      {/* Technicians & Crew Allocation */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Fleet Technicians & Staff ({teamMembers.length})
            </h2>
            <p className="text-[11px] text-slate-600">Assign incoming requests to crew members</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">{member.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      member.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {member.status === 'available' ? 'Available' : 'Busy on Job'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 block">{member.role}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-0.5">
                    <span>{member.specialties.join(', ')}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-800">★ {member.rating}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-600 block">Assigned Today</span>
                <span className="font-bold text-xs text-slate-900 font-mono">
                  {member.assignedJobsCount} jobs
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Incoming Requests for Crew Assignment */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Incoming Bookings to Dispatch
        </h2>

        {activeJobs.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600">
            All active bookings have been assigned to technicians.
          </div>
        ) : (
          <div className="space-y-2.5">
            {activeJobs.map(job => (
              <div
                key={job.id}
                className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{job.service}</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">₹{job.totalAmount}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Customer: <strong>{job.customerName}</strong> · Location: {job.locationArea}
                </p>

                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[11px] text-slate-600 font-semibold shrink-0">Assign to:</span>
                  <div className="flex-1 flex gap-1 overflow-x-auto pb-1">
                    {teamMembers.map(tm => (
                      <button
                        key={tm.id}
                        type="button"
                        onClick={() => assignTeamMember(tm.id, job.id)}
                        className="px-2 py-1 bg-slate-100 hover:bg-purple-100 text-slate-800 hover:text-purple-900 text-[10px] font-bold rounded-lg whitespace-nowrap transition-colors"
                      >
                        {tm.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
