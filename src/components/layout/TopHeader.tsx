import React, { useState } from 'react';
import { MapPin, Bell, ChevronDown, ShieldCheck, UserCheck, Briefcase, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserMode } from '../../types';

interface TopHeaderProps {
  onOpenLocationModal: () => void;
  onOpenNotifications: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenLocationModal,
  onOpenNotifications
}) => {
  const { userMode, setUserMode, location, notifications, profile, openModal } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleRoleSelect = (mode: UserMode) => {
    setUserMode(mode);
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-md mx-auto px-3.5 py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Mode Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 font-display">
                Nearby Help
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded text-amber-800 bg-amber-50 border border-amber-200">
                IN
              </span>
            </div>
            {/* Quick Location trigger */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors text-left truncate max-w-[170px]"
              title="Change your location"
            >
              <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="truncate font-medium">{location.area}, {location.city}</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            </button>
          </div>
        </div>

        {/* Right side: Role Switcher & Notifications */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-slate-800 shadow-xs"
              aria-label="Switch mode"
            >
              {userMode === 'customer' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Need Help</span>
                </>
              )}
              {userMode === 'provider' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Provide Help</span>
                </>
              )}
              {userMode === 'business' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>Business</span>
                </>
              )}
              {userMode === 'admin' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  <span>Admin</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {/* Role Switcher Menu */}
            {showRoleMenu && (
              <div
                className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                onClick={e => e.stopPropagation()}
              >
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-semibold text-slate-600">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleSelect('customer')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${userMode === 'customer' ? 'font-semibold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-xs">Need Help (Customer)</div>
                      <div className="text-[10px] text-slate-600">Book nearby local services</div>
                    </div>
                  </div>
                  {userMode === 'customer' && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded">Active</span>}
                </button>

                <button
                  onClick={() => handleRoleSelect('provider')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${userMode === 'provider' ? 'font-semibold text-blue-700 bg-blue-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-xs">Provide Help (Partner)</div>
                      <div className="text-[10px] text-slate-600">Receive jobs & send quotes</div>
                    </div>
                  </div>
                  {userMode === 'provider' && <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded">Active</span>}
                </button>

                <button
                  onClick={() => handleRoleSelect('business')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${userMode === 'business' ? 'font-semibold text-purple-700 bg-purple-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="text-xs">Business Enterprise</div>
                      <div className="text-[10px] text-slate-600">Manage crew & multiple staff</div>
                    </div>
                  </div>
                  {userMode === 'business' && <span className="text-[10px] bg-purple-100 text-purple-800 px-1 rounded">Active</span>}
                </button>

                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${userMode === 'admin' ? 'font-semibold text-rose-700 bg-rose-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-rose-600" />
                    <div>
                      <div className="text-xs">Platform Admin</div>
                      <div className="text-[10px] text-slate-600">Verification & moderation</div>
                    </div>
                  </div>
                  {userMode === 'admin' && <span className="text-[10px] bg-rose-100 text-rose-800 px-1 rounded">Active</span>}
                </button>

                <div className="px-3 pt-2 pb-1 border-t border-slate-100 text-[10px] text-slate-600">
                  Logged in as {profile.name}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
