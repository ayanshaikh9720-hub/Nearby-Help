import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNavigation, TabKey } from './components/layout/BottomNavigation';

// Screens
import { CustomerHome } from './components/customer/CustomerHome';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { BusinessDashboard } from './components/business/BusinessDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SearchAndFilterView } from './components/search/SearchAndFilterView';
import { RequestsListView } from './components/requests/RequestsListView';
import { MessagesView } from './components/chat/MessagesView';
import { ProfileView } from './components/profile/ProfileView';

// Modals
import { LocationModal } from './components/common/LocationModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { AskNearbyModal } from './components/customer/AskNearbyModal';
import { NeedHelpNowModal } from './components/customer/NeedHelpNowModal';
import { ProviderDetailModal } from './components/customer/ProviderDetailModal';
import { QuotesComparisonModal } from './components/customer/QuotesComparisonModal';
import { LiveTrackingModal } from './components/customer/LiveTrackingModal';
import { DigitalReceiptModal } from './components/customer/DigitalReceiptModal';
import { RatingReviewModal } from './components/customer/RatingReviewModal';
import { VerificationInfoModal } from './components/common/VerificationInfoModal';
import { SafetyCenterModal } from './components/common/SafetyCenterModal';
import { DisputeReportModal } from './components/common/DisputeReportModal';
import { ProviderProfileEditorModal } from './components/provider/ProviderProfileEditorModal';
import { ProviderVerificationModal } from './components/provider/ProviderVerificationModal';
import { OnboardingModal } from './components/common/OnboardingModal';
import { Provider } from './types';

const MainAppContent: React.FC = () => {
  const { userMode, setUserMode } = useApp();

  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Modal Visibility States
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAskNearbyModal, setShowAskNearbyModal] = useState(false);
  const [showNeedHelpNowModal, setShowNeedHelpNowModal] = useState(false);
  const [needHelpCategory, setNeedHelpCategory] = useState<string | undefined>();
  const [needHelpProblem, setNeedHelpProblem] = useState<string | undefined>();
  const [needHelpMedia, setNeedHelpMedia] = useState<any[] | undefined>();

  const [selectedProviderDetail, setSelectedProviderDetail] = useState<Provider | null>(null);
  const [activeQuotesRequestId, setActiveQuotesRequestId] = useState<string | null>(null);
  const [activeTrackingBookingId, setActiveTrackingBookingId] = useState<string | null>(null);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [activeReviewBookingId, setActiveReviewBookingId] = useState<string | null>(null);
  const [reviewTargetRole, setReviewTargetRole] = useState<'provider' | 'customer'>('provider');

  const [verificationModalProviderId, setVerificationModalProviderId] = useState<string | null>(null);
  const [showSafetyCenterModal, setShowSafetyCenterModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeTargetName, setDisputeTargetName] = useState<string | undefined>();

  const [showProviderEditorModal, setShowProviderEditorModal] = useState(false);
  const [showProviderVerificationModal, setShowProviderVerificationModal] = useState(false);

  // Search view props passing
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [searchInitialCategory, setSearchInitialCategory] = useState('All');

  // Messages view initial booking
  const [activeChatBookingId, setActiveChatBookingId] = useState<string | null>(null);

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('nh_onboarded');
  });

  const handleOpenNeedHelpNow = (category?: string) => {
    setNeedHelpCategory(category);
    setNeedHelpProblem(undefined);
    setNeedHelpMedia(undefined);
    setShowNeedHelpNowModal(true);
  };

  const handleAskNearbyProceed = (catName: string, problemText: string, media?: any[]) => {
    setShowAskNearbyModal(false);
    setNeedHelpCategory(catName);
    setNeedHelpProblem(problemText);
    setNeedHelpMedia(media);
    setShowNeedHelpNowModal(true);
  };

  const handleSelectProvider = (prov: Provider) => {
    setSelectedProviderDetail(prov);
  };

  const handleRequestQuoteFromProvider = (prov: Provider) => {
    setSelectedProviderDetail(null);
    setNeedHelpCategory(prov.services[0] || 'Electrician');
    setNeedHelpProblem(`Requesting direct service consultation from ${prov.name}`);
    setShowNeedHelpNowModal(true);
  };

  const handleReportProvider = (prov: Provider) => {
    setSelectedProviderDetail(null);
    setDisputeTargetName(prov.name);
    setShowDisputeModal(true);
  };

  const handleOpenQuotes = (requestId: string) => {
    setActiveQuotesRequestId(requestId);
  };

  const handleQuoteAccepted = (bookingId: string) => {
    setActiveQuotesRequestId(null);
    setActiveTrackingBookingId(bookingId);
  };

  const handleOpenLiveTracking = (bookingId: string) => {
    setActiveTrackingBookingId(bookingId);
  };

  const handleOpenReceipt = (receiptId: string) => {
    setActiveReceiptId(receiptId);
  };

  const handleOpenReview = (bookingId: string, role?: 'provider' | 'customer') => {
    setActiveReviewBookingId(bookingId);
    setReviewTargetRole(role || 'provider');
  };

  const handleOpenChat = (bookingId: string) => {
    setActiveChatBookingId(bookingId);
    setActiveTab('messages');
  };

  const handleOpenVerificationInfo = (providerId: string) => {
    setVerificationModalProviderId(providerId);
  };

  const handleNavigateToSearch = (query?: string, category?: string) => {
    setSearchInitialQuery(query || '');
    setSearchInitialCategory(category || 'All');
    setActiveTab('search');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center font-sans antialiased text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Mobile Application Viewport Frame */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 flex flex-col shadow-2xl relative border-x border-slate-200/70 pb-20">
        {/* Top Header */}
        <TopHeader
          onOpenLocationModal={() => setShowLocationModal(true)}
          onOpenNotifications={() => setShowNotificationsModal(true)}
        />

        {/* Main Body per Active Tab */}
        <main className="flex-1 px-4 pt-3.5 pb-2">
          {activeTab === 'home' && (
            <>
              {userMode === 'customer' && (
                <CustomerHome
                  onOpenNeedHelpNow={handleOpenNeedHelpNow}
                  onOpenAskNearby={() => setShowAskNearbyModal(true)}
                  onSelectProvider={handleSelectProvider}
                  onOpenQuotes={handleOpenQuotes}
                  onOpenLiveTracking={handleOpenLiveTracking}
                  onOpenVerificationInfo={handleOpenVerificationInfo}
                  onNavigateToSearch={handleNavigateToSearch}
                />
              )}
              {userMode === 'provider' && (
                <ProviderDashboard
                  onOpenLiveTracking={handleOpenLiveTracking}
                  onOpenChat={handleOpenChat}
                  onOpenReceipt={handleOpenReceipt}
                  onOpenProfileEditor={() => setShowProviderEditorModal(true)}
                  onOpenVerificationModal={() => setShowProviderVerificationModal(true)}
                />
              )}
              {userMode === 'business' && <BusinessDashboard />}
              {userMode === 'admin' && <AdminDashboard />}
            </>
          )}

          {activeTab === 'search' && (
            <SearchAndFilterView
              initialQuery={searchInitialQuery}
              initialCategory={searchInitialCategory}
              onSelectProvider={handleSelectProvider}
              onOpenVerificationInfo={handleOpenVerificationInfo}
            />
          )}

          {activeTab === 'requests' && (
            <RequestsListView
              onOpenLiveTracking={handleOpenLiveTracking}
              onOpenQuotes={handleOpenQuotes}
              onOpenReceipt={handleOpenReceipt}
              onOpenReview={handleOpenReview}
              onOpenChat={handleOpenChat}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesView
              initialBookingId={activeChatBookingId}
              onOpenLiveTracking={handleOpenLiveTracking}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              onOpenLocationModal={() => setShowLocationModal(true)}
              onOpenSafetyCenter={() => setShowSafetyCenterModal(true)}
              onOpenProviderEditor={() => setShowProviderEditorModal(true)}
              onOpenVerificationModal={() => setShowProviderVerificationModal(true)}
              onSelectProvider={handleSelectProvider}
            />
          )}
        </main>

        {/* Fixed Bottom Ergonomic Touch Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={tab => setActiveTab(tab)}
        />

        {/* --- Global Modals & Dialogs --- */}
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
        />

        <NotificationsModal
          isOpen={showNotificationsModal}
          onClose={() => setShowNotificationsModal(false)}
          onNavigateToRequests={() => setActiveTab('requests')}
        />

        <AskNearbyModal
          isOpen={showAskNearbyModal}
          onClose={() => setShowAskNearbyModal(false)}
          onSelectCategoryAndProceed={handleAskNearbyProceed}
        />

        <NeedHelpNowModal
          isOpen={showNeedHelpNowModal}
          onClose={() => setShowNeedHelpNowModal(false)}
          preselectedCategory={needHelpCategory}
          prefilledProblem={needHelpProblem}
          initialMedia={needHelpMedia}
          onOpenQuotes={handleOpenQuotes}
        />

        <ProviderDetailModal
          isOpen={!!selectedProviderDetail}
          onClose={() => setSelectedProviderDetail(null)}
          providerId={selectedProviderDetail?.id || null}
          onRequestQuote={handleRequestQuoteFromProvider}
          onOpenVerificationInfo={handleOpenVerificationInfo}
          onReportProvider={handleReportProvider}
        />

        <QuotesComparisonModal
          isOpen={!!activeQuotesRequestId}
          onClose={() => setActiveQuotesRequestId(null)}
          requestId={activeQuotesRequestId}
          onQuoteAccepted={handleQuoteAccepted}
          onOpenVerificationInfo={handleOpenVerificationInfo}
        />

        <LiveTrackingModal
          isOpen={!!activeTrackingBookingId}
          onClose={() => setActiveTrackingBookingId(null)}
          bookingId={activeTrackingBookingId}
          onOpenChat={handleOpenChat}
          onOpenReceipt={handleOpenReceipt}
          onOpenReview={handleOpenReview}
          onOpenSafety={() => setShowSafetyCenterModal(true)}
        />

        <DigitalReceiptModal
          isOpen={!!activeReceiptId}
          onClose={() => setActiveReceiptId(null)}
          receiptId={activeReceiptId}
        />

        <RatingReviewModal
          isOpen={!!activeReviewBookingId}
          onClose={() => setActiveReviewBookingId(null)}
          bookingId={activeReviewBookingId}
          targetRole={reviewTargetRole}
        />

        <VerificationInfoModal
          isOpen={!!verificationModalProviderId}
          onClose={() => setVerificationModalProviderId(null)}
          providerId={verificationModalProviderId}
        />

        <SafetyCenterModal
          isOpen={showSafetyCenterModal}
          onClose={() => setShowSafetyCenterModal(false)}
          onOpenDispute={() => setShowDisputeModal(true)}
        />

        <DisputeReportModal
          isOpen={showDisputeModal}
          onClose={() => {
            setShowDisputeModal(false);
            setDisputeTargetName(undefined);
          }}
          prefilledTargetName={disputeTargetName}
        />

        <ProviderProfileEditorModal
          isOpen={showProviderEditorModal}
          onClose={() => setShowProviderEditorModal(false)}
        />

        <ProviderVerificationModal
          isOpen={showProviderVerificationModal}
          onClose={() => setShowProviderVerificationModal(false)}
        />

        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={() => setShowOnboarding(false)}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
