import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserMode,
  LocationInfo,
  ServiceCategory,
  Provider,
  JobRequest,
  Booking,
  Quote,
  ChatMessage,
  JobReceipt,
  Review,
  AppNotification,
  BusinessTeamMember,
  DisputeReport,
  UrgencyLevel,
  MediaAttachment
} from '../types';
import {
  INDIAN_LOCATIONS,
  SERVICE_CATEGORIES,
  INITIAL_PROVIDERS,
  INITIAL_JOB_REQUESTS,
  INITIAL_BOOKINGS,
  INITIAL_RECEIPTS,
  INITIAL_REVIEWS,
  INITIAL_CHATS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TEAM_MEMBERS
} from '../data/initialData';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isProviderActive: boolean;
  businessName?: string;
  experienceYears?: number;
  about?: string;
  startingPrice?: number;
  serviceAreaRadiusKm?: number;
  providerServices: string[];
  providerCustomServices: string[];
  providerStatus: 'available' | 'busy' | 'offline';
  isVerified: boolean;
  aadhaarStatus: 'not_submitted' | 'under_review' | 'verified';
  tradeCertStatus: 'not_submitted' | 'under_review' | 'verified';
  languages: string[];
}

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  serviceCategories: ServiceCategory[];
  addCustomService: (name: string, group: ServiceCategory['group'], startingPrice: number, description: string) => void;
  providers: Provider[];
  updateProviderStatus: (providerId: string, status: 'available' | 'busy' | 'offline') => void;
  jobRequests: JobRequest[];
  createJobRequest: (data: {
    serviceCategory: string;
    problemDescription: string;
    urgency: UrgencyLevel;
    scheduledDate?: string;
    scheduledTime?: string;
    budgetMax?: number;
    mediaAttachments?: MediaAttachment[];
  }) => string;
  cancelJobRequest: (requestId: string) => void;
  sendQuote: (requestId: string, amount: number, notes: string, etaMins: number) => void;
  acceptQuote: (requestId: string, quoteId: string) => Booking;
  bookings: Booking[];
  advanceBookingStatus: (bookingId: string) => void;
  cancelBooking: (bookingId: string, reason?: string) => void;
  jobReceipts: JobReceipt[];
  completeJobAndGenerateReceipt: (bookingId: string, labour: number, parts: number, notes: string) => JobReceipt;
  chats: ChatMessage[];
  sendChatMessage: (conversationId: string, text?: string, mediaType?: 'image' | 'voice' | 'location', mediaUrl?: string, voiceDurationSec?: number) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  favorites: string[];
  toggleFavorite: (providerId: string) => void;
  disputeReports: DisputeReport[];
  submitDispute: (report: Omit<DisputeReport, 'id' | 'createdAt' | 'status'>) => void;
  teamMembers: BusinessTeamMember[];
  assignTeamMember: (memberId: string, bookingId: string) => void;
  submitProviderVerification: (aadhaarNum: string, certName: string) => void;
  // Modal states triggers
  activeModal: string | null;
  activeModalData: any;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userMode, setUserModeState] = useState<UserMode>(() => {
    return (localStorage.getItem('nh_mode') as UserMode) || 'customer';
  });

  const [location, setLocationState] = useState<LocationInfo>(() => {
    const saved = localStorage.getItem('nh_location');
    return saved ? JSON.parse(saved) : INDIAN_LOCATIONS[0];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nh_profile');
    return saved ? JSON.parse(saved) : {
      id: 'cust-me',
      name: 'Ayan Shaikh',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      isProviderActive: true,
      businessName: 'Ayan Pro Services',
      experienceYears: 6,
      about: 'Multidisciplinary technician & local handyman providing fast, dependable services in Bengaluru.',
      startingPrice: 249,
      serviceAreaRadiusKm: 8,
      providerServices: ['Electrician', 'Plumber', 'AC Repair'],
      providerCustomServices: ['Smart Home Wiring', 'Inverter Setup'],
      providerStatus: 'available',
      isVerified: true,
      aadhaarStatus: 'verified',
      tradeCertStatus: 'verified',
      languages: ['English', 'Hindi', 'Kannada']
    };
  });

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem('nh_categories');
    return saved ? JSON.parse(saved) : SERVICE_CATEGORIES;
  });

  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('nh_providers');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [jobRequests, setJobRequests] = useState<JobRequest[]>(() => {
    const saved = localStorage.getItem('nh_requests');
    return saved ? JSON.parse(saved) : INITIAL_JOB_REQUESTS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('nh_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [jobReceipts, setJobReceipts] = useState<JobReceipt[]>(() => {
    const saved = localStorage.getItem('nh_receipts');
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('nh_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nh_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('nh_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nh_favs');
    return saved ? JSON.parse(saved) : ['prov-1'];
  });

  const [disputeReports, setDisputeReports] = useState<DisputeReport[]>([]);
  const [teamMembers, setTeamMembers] = useState<BusinessTeamMember[]>(INITIAL_TEAM_MEMBERS);

  // Global Modal Navigation Trigger
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeModalData, setActiveModalData] = useState<any>(null);

  const openModal = (modalName: string, data?: any) => {
    setActiveModal(modalName);
    setActiveModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveModalData(null);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nh_mode', userMode);
  }, [userMode]);

  useEffect(() => {
    localStorage.setItem('nh_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('nh_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nh_categories', JSON.stringify(serviceCategories));
  }, [serviceCategories]);

  useEffect(() => {
    localStorage.setItem('nh_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('nh_requests', JSON.stringify(jobRequests));
  }, [jobRequests]);

  useEffect(() => {
    localStorage.setItem('nh_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('nh_receipts', JSON.stringify(jobReceipts));
  }, [jobReceipts]);

  useEffect(() => {
    localStorage.setItem('nh_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('nh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nh_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nh_favs', JSON.stringify(favorites));
  }, [favorites]);

  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
  };

  const setLocation = (loc: LocationInfo) => {
    setLocationState(loc);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const addCustomService = (name: string, group: ServiceCategory['group'], startingPrice: number, description: string) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat: ServiceCategory = {
      id,
      name,
      group,
      iconName: 'Wrench',
      defaultStartingPrice: startingPrice,
      description,
      popular: false
    };
    setServiceCategories(prev => [...prev, newCat]);
    setProfile(prev => ({
      ...prev,
      providerCustomServices: [...prev.providerCustomServices, name]
    }));
  };

  const updateProviderStatus = (providerId: string, status: 'available' | 'busy' | 'offline') => {
    setProviders(prev => prev.map(p => p.id === providerId ? { ...p, status } : p));
    if (providerId === 'prov-me' || providerId === profile.id) {
      setProfile(prev => ({ ...prev, providerStatus: status }));
    }
  };

  const createJobRequest = (data: {
    serviceCategory: string;
    problemDescription: string;
    urgency: UrgencyLevel;
    scheduledDate?: string;
    scheduledTime?: string;
    budgetMax?: number;
    mediaAttachments?: MediaAttachment[];
  }): string => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newRequest: JobRequest = {
      id: newId,
      customerId: profile.id,
      customerName: profile.name,
      customerPhoneMasked: '+91 98•••• 4321',
      serviceCategory: data.serviceCategory,
      problemDescription: data.problemDescription,
      urgency: data.urgency,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      budgetMax: data.budgetMax || 400,
      mediaAttachments: data.mediaAttachments || [],
      location: location,
      status: 'finding_providers',
      quotes: [],
      createdAt: 'Just now',
      otpCode: randomOtp
    };

    setJobRequests(prev => [newRequest, ...prev]);

    // Add local notification
    const newNotif: AppNotification = {
      id: `n-${Date.now()}`,
      title: 'Searching for Nearby Providers',
      body: `Your request for ${data.serviceCategory} has been broadcast to verified experts in ${location.area}.`,
      type: 'alert',
      timestamp: 'Just now',
      read: false,
      targetMode: 'customer'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Simulate providers picking up request within 3-5 seconds
    setTimeout(() => {
      setJobRequests(prev => prev.map(req => {
        if (req.id !== newId) return req;

        // Find matching nearby providers
        const matching = providers.filter(p =>
          p.services.some(s => s.toLowerCase().includes(data.serviceCategory.toLowerCase())) ||
          (p.customServices && p.customServices.some(s => s.toLowerCase().includes(data.serviceCategory.toLowerCase())))
        );

        const firstProv = matching[0] || providers[0];
        const secondProv = matching[1] || providers[1];

        const initialQuotes: Quote[] = [
          {
            id: `q-${Date.now()}-1`,
            requestId: newId,
            providerId: firstProv.id,
            providerName: firstProv.name,
            providerAvatar: firstProv.avatar,
            providerRating: firstProv.rating,
            providerDistanceKm: firstProv.distanceKm,
            isVerified: firstProv.verification.isVerified,
            amount: Math.max(firstProv.startingPrice, (data.budgetMax ? Math.round(data.budgetMax * 0.85) : 320)),
            estimatedArrivalMins: 15,
            notes: `Ready with certified tools for ${data.serviceCategory}. Near ${location.area}.`,
            createdAt: 'Just now',
            status: 'pending'
          }
        ];

        if (secondProv && secondProv.id !== firstProv.id) {
          initialQuotes.push({
            id: `q-${Date.now()}-2`,
            requestId: newId,
            providerId: secondProv.id,
            providerName: secondProv.name,
            providerAvatar: secondProv.avatar,
            providerRating: secondProv.rating,
            providerDistanceKm: secondProv.distanceKm + 0.6,
            isVerified: secondProv.verification.isVerified,
            amount: Math.max(secondProv.startingPrice, (data.budgetMax ? Math.round(data.budgetMax * 1.05) : 420)),
            estimatedArrivalMins: 25,
            notes: `Expert technician. 100% genuine parts and transparent quotation.`,
            createdAt: 'Just now',
            status: 'pending'
          });
        }

        return {
          ...req,
          status: 'quotes_received',
          quotes: initialQuotes
        };
      }));

      setNotifications(prev => [
        {
          id: `n-${Date.now()}-q`,
          title: `Quotes Received for ${data.serviceCategory}!`,
          body: `Nearby technicians sent competitive quotes. Compare price, rating & ETA.`,
          type: 'quote',
          timestamp: 'Just now',
          read: false,
          targetMode: 'customer'
        },
        ...prev
      ]);
    }, 3500);

    return newId;
  };

  const cancelJobRequest = (requestId: string) => {
    setJobRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'cancelled' } : r));
  };

  const sendQuote = (requestId: string, amount: number, notes: string, etaMins: number) => {
    const quoteId = `q-${Date.now()}`;
    const newQuote: Quote = {
      id: quoteId,
      requestId,
      providerId: profile.id,
      providerName: profile.name,
      providerAvatar: profile.avatar,
      providerRating: 4.9,
      providerDistanceKm: 1.5,
      isVerified: profile.isVerified,
      amount,
      estimatedArrivalMins: etaMins,
      notes: notes || 'Available immediately to assist with clean service.',
      createdAt: 'Just now',
      status: 'pending'
    };

    setJobRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        status: 'quotes_received',
        quotes: [newQuote, ...req.quotes]
      };
    }));

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Quote Sent to Customer',
        body: `Your quote of ₹${amount} was submitted for job ${requestId}.`,
        type: 'quote',
        timestamp: 'Just now',
        read: false,
        targetMode: 'provider'
      },
      ...prev
    ]);
  };

  const acceptQuote = (requestId: string, quoteId: string): Booking => {
    const req = jobRequests.find(r => r.id === requestId);
    const quote = req?.quotes.find(q => q.id === quoteId);

    const bookingId = `book-${Date.now().toString().slice(-4)}`;
    const newBooking: Booking = {
      id: bookingId,
      requestId,
      customerId: req ? req.customerId : profile.id,
      customerName: req ? req.customerName : profile.name,
      customerPhoneMasked: req ? req.customerPhoneMasked : '+91 98•••• 4321',
      providerId: quote ? quote.providerId : 'prov-1',
      providerName: quote ? quote.providerName : 'Ramesh Kumar',
      providerAvatar: quote ? quote.providerAvatar : '/src/assets/images/hero_service_electrician_1790560964865.jpg',
      providerRating: quote ? quote.providerRating : 4.9,
      service: req ? req.serviceCategory : 'Home Service',
      date: req?.scheduledDate || 'Today',
      timeSlot: req?.scheduledTime || 'Immediate',
      status: 'confirmed',
      approxDistanceKm: quote ? quote.providerDistanceKm : 1.5,
      locationArea: req ? req.location.area : location.area,
      totalAmount: quote ? quote.amount : 350,
      otpCode: req ? req.otpCode : '5892',
      trackingStage: 0, // Confirmed
      etaMinutes: quote ? quote.estimatedArrivalMins : 18,
      createdAt: 'Just now'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update job request status
    setJobRequests(prev => prev.map(r => {
      if (r.id !== requestId) return r;
      return {
        ...r,
        status: 'provider_accepted',
        selectedQuoteId: quoteId,
        selectedProviderId: quote?.providerId
      };
    }));

    // Notifications
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Booking Confirmed: ${newBooking.service}`,
        body: `${newBooking.providerName} accepted your booking. Share OTP ${newBooking.otpCode} on arrival.`,
        type: 'job_accepted',
        timestamp: 'Just now',
        read: false,
        targetMode: 'customer'
      },
      ...prev
    ]);

    // Add initial greeting in chat
    setChats(prev => [
      {
        id: `chat-${Date.now()}`,
        conversationId: bookingId,
        senderId: newBooking.providerId,
        senderName: newBooking.providerName,
        senderRole: 'provider',
        text: `Namaste! I have confirmed your request for ${newBooking.service}. I am preparing my tools and heading over shortly.`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    return newBooking;
  };

  const advanceBookingStatus = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      let nextStage = b.trackingStage + 1;
      let nextStatus: Booking['status'] = b.status;

      if (nextStage === 1) {
        nextStatus = 'on_the_way';
      } else if (nextStage === 2) {
        nextStatus = 'arrived';
      } else if (nextStage === 3) {
        nextStatus = 'started';
      } else if (nextStage >= 4) {
        nextStage = 4;
        nextStatus = 'completed';
      }

      return {
        ...b,
        trackingStage: nextStage,
        status: nextStatus,
        etaMinutes: Math.max(0, b.etaMinutes - 5)
      };
    }));
  };

  const cancelBooking = (bookingId: string, reason?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      return { ...b, status: 'cancelled' };
    }));

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Booking Cancelled',
        body: `Booking ${bookingId} was cancelled. ${reason ? `Reason: ${reason}` : ''}`,
        type: 'alert',
        timestamp: 'Just now',
        read: false,
        targetMode: 'all'
      },
      ...prev
    ]);
  };

  const completeJobAndGenerateReceipt = (bookingId: string, labour: number, parts: number, notes: string): JobReceipt => {
    const booking = bookings.find(b => b.id === bookingId);
    const receiptId = `rec-${Date.now().toString().slice(-4)}`;
    const finalAmount = labour + parts;

    const newReceipt: JobReceipt = {
      id: receiptId,
      bookingId,
      customerName: booking ? booking.customerName : profile.name,
      providerName: booking ? booking.providerName : 'Verified Technician',
      service: booking ? booking.service : 'Service Assistance',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      description: notes || 'Service completed successfully according to specifications.',
      labourAmount: labour,
      partsOrMaterialsAmount: parts,
      discount: 0,
      finalAmount,
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      referenceNumber: `NH-REC-${Date.now().toString().slice(-6)}`
    };

    setJobReceipts(prev => [newReceipt, ...prev]);

    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      return {
        ...b,
        status: 'completed',
        trackingStage: 4,
        receiptId
      };
    }));

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Job Completed & Receipt Ready',
        body: `Digital service receipt of ₹${finalAmount} generated for ${booking?.service}.`,
        type: 'status_change',
        timestamp: 'Just now',
        read: false,
        targetMode: 'customer'
      },
      ...prev
    ]);

    return newReceipt;
  };

  const sendChatMessage = (
    conversationId: string,
    text?: string,
    mediaType?: 'image' | 'voice' | 'location',
    mediaUrl?: string,
    voiceDurationSec?: number
  ) => {
    const isCustomer = userMode === 'customer';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: profile.id,
      senderName: profile.name,
      senderRole: isCustomer ? 'customer' : 'provider',
      text,
      mediaType,
      mediaUrl,
      voiceDurationSec,
      timestamp: 'Just now'
    };

    setChats(prev => [...prev, newMsg]);

    // Simulate smart quick reply after 2 seconds if customer sent
    if (isCustomer) {
      setTimeout(() => {
        const replyText = text?.toLowerCase().includes('landmark') || text?.toLowerCase().includes('gate')
          ? 'Understood, thank you! I can see the gate landmark now.'
          : text?.toLowerCase().includes('otp')
          ? 'Thank you for sharing the OTP. Verified successfully on my device.'
          : 'Thank you for the update! Reaching in just a few minutes.';

        setChats(c => [
          ...c,
          {
            id: `msg-${Date.now()}-reply`,
            conversationId,
            senderId: 'prov-partner',
            senderName: 'Service Provider',
            senderRole: 'provider',
            text: replyText,
            timestamp: 'Just now'
          }
        ]);
      }, 2000);
    }
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Today'
    };
    setReviews(prev => [newRev, ...prev]);

    // Mark booking as rated
    setBookings(prev => prev.map(b => {
      if (b.id !== review.bookingId) return b;
      return review.authorRole === 'customer'
        ? { ...b, hasCustomerRated: true }
        : { ...b, hasProviderRated: true };
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev =>
      prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]
    );
  };

  const submitDispute = (report: Omit<DisputeReport, 'id' | 'createdAt' | 'status'>) => {
    const newReport: DisputeReport = {
      ...report,
      id: `dsp-${Date.now()}`,
      createdAt: 'Just now',
      status: 'under_review'
    };
    setDisputeReports(prev => [newReport, ...prev]);
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Dispute Ticket Raised',
        body: `Nearby Help Trust & Safety team has received report #${newReport.id}. Priority review underway.`,
        type: 'alert',
        timestamp: 'Just now',
        read: false,
        targetMode: 'all'
      },
      ...prev
    ]);
  };

  const assignTeamMember = (memberId: string, bookingId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;

    setTeamMembers(prev => prev.map(m =>
      m.id === memberId ? { ...m, assignedJobsCount: m.assignedJobsCount + 1, status: 'busy' } : m
    ));

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: `Job Assigned to ${member.name}`,
        body: `Technician ${member.name} has been assigned to booking #${bookingId}.`,
        type: 'status_change',
        timestamp: 'Just now',
        read: false,
        targetMode: 'provider'
      },
      ...prev
    ]);
  };

  const submitProviderVerification = (aadhaarNum: string, certName: string) => {
    setProfile(prev => ({
      ...prev,
      aadhaarStatus: 'under_review',
      tradeCertStatus: 'under_review'
    }));

    // Auto approve in test/demo mode after 2 seconds
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        isVerified: true,
        aadhaarStatus: 'verified',
        tradeCertStatus: 'verified'
      }));
      setNotifications(prev => [
        {
          id: `n-v-${Date.now()}`,
          title: '✓ Verification Approved!',
          body: `Your Aadhaar ID and Trade Certificate (${certName || 'ITI Certificate'}) have been successfully verified.`,
          type: 'alert',
          timestamp: 'Just now',
          read: false,
          targetMode: 'provider'
        },
        ...prev
      ]);
    }, 2500);
  };

  return (
    <AppContext.Provider
      value={{
        userMode,
        setUserMode,
        location,
        setLocation,
        profile,
        updateProfile,
        serviceCategories,
        addCustomService,
        providers,
        updateProviderStatus,
        jobRequests,
        createJobRequest,
        cancelJobRequest,
        sendQuote,
        acceptQuote,
        bookings,
        advanceBookingStatus,
        cancelBooking,
        jobReceipts,
        completeJobAndGenerateReceipt,
        chats,
        sendChatMessage,
        reviews,
        addReview,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        favorites,
        toggleFavorite,
        disputeReports,
        submitDispute,
        teamMembers,
        assignTeamMember,
        submitProviderVerification,
        activeModal,
        activeModalData,
        openModal,
        closeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
