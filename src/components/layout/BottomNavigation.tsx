import React from 'react';
import { Home, Search, ClipboardList, MessageSquare, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type TabKey = 'home' | 'search' | 'requests' | 'messages' | 'profile';

interface BottomNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const { userMode, jobRequests, bookings, chats } = useApp();

  // Compute active badge counts
  const activeBookingsCount = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length;
  const activeRequestsCount = jobRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  const requestsBadge = userMode === 'provider' ? activeRequestsCount : (activeBookingsCount + activeRequestsCount);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 px-1">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'home' ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Tab 2: Search & Map */}
        <button
          onClick={() => onTabChange('search')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'search' ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Search"
        >
          <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Search</span>
        </button>

        {/* Tab 3: Requests / Jobs */}
        <button
          onClick={() => onTabChange('requests')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'requests' ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Requests"
        >
          <div className="relative">
            <ClipboardList className={`w-5 h-5 ${activeTab === 'requests' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {requestsBadge > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-[16px] h-4 bg-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {requestsBadge}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">{userMode === 'provider' ? 'Jobs' : 'Requests'}</span>
        </button>

        {/* Tab 4: Messages */}
        <button
          onClick={() => onTabChange('messages')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'messages' ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Messages"
        >
          <div className="relative">
            <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {chats.length > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-[16px] h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {chats.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Messages</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'profile' ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Profile"
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
