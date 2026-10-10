export type UserMode = 'customer' | 'provider' | 'business' | 'admin';

export type ServiceGroup = 'Home Services' | 'Vehicle Services' | 'Personal Services' | 'Business Services' | 'Custom';

export interface LocationInfo {
  city: string;
  area: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  group: ServiceGroup;
  iconName: string;
  popular?: boolean;
  emergency?: boolean;
  defaultStartingPrice: number;
  description: string;
}

export interface VerificationDetails {
  isVerified: boolean;
  aadhaarVerified: boolean;
  policeVerified: boolean;
  tradeCertified: boolean;
  certName?: string;
  verifiedAt?: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  services: string[]; // Category names or IDs
  customServices?: string[];
  serviceArea: string; // e.g. "Within 8 km of Koramangala"
  distanceKm: number; // approximate for current customer
  startingPrice: number;
  availableDays: string[];
  availableHours: string;
  workPhotos: string[];
  about: string;
  languages: string[];
  status: 'available' | 'busy' | 'offline';
  verification: VerificationDetails;
  isBusiness?: boolean;
  employeesCount?: number;
  city: string;
  area: string;
  coords: { lat: number; lng: number };
  emergencyAvailable?: boolean;
}

export type UrgencyLevel = 'urgent_30min' | 'within_2hrs' | 'today' | 'scheduled';

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video' | 'voice';
  url: string;
  name?: string;
  durationSec?: number;
}

export interface Quote {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  providerDistanceKm: number;
  isVerified: boolean;
  amount: number;
  estimatedArrivalMins: number;
  notes: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export type RequestStatus =
  | 'finding_providers'
  | 'requests_sent'
  | 'quotes_received'
  | 'provider_interested'
  | 'provider_accepted'
  | 'on_the_way'
  | 'arrived'
  | 'work_started'
  | 'completed'
  | 'cancelled';

export interface JobRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhoneMasked: string;
  serviceCategory: string;
  problemDescription: string;
  urgency: UrgencyLevel;
  scheduledDate?: string;
  scheduledTime?: string;
  budgetMax?: number;
  mediaAttachments?: MediaAttachment[];
  location: LocationInfo;
  status: RequestStatus;
  quotes: Quote[];
  selectedQuoteId?: string;
  selectedProviderId?: string;
  createdAt: string;
  otpCode: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'on_the_way'
  | 'arrived'
  | 'started'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  requestId?: string;
  customerId: string;
  customerName: string;
  customerPhoneMasked: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  service: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  approxDistanceKm: number;
  locationArea: string;
  totalAmount: number;
  otpCode: string;
  trackingStage: number; // 0: Confirmed, 1: On the way, 2: Arrived, 3: Started, 4: Completed
  etaMinutes: number;
  createdAt: string;
  receiptId?: string;
  hasCustomerRated?: boolean;
  hasProviderRated?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string; // bookingId or requestId
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'provider';
  text?: string;
  mediaType?: 'image' | 'voice' | 'location';
  mediaUrl?: string;
  voiceDurationSec?: number;
  timestamp: string;
}

export interface JobReceipt {
  id: string;
  bookingId: string;
  customerName: string;
  providerName: string;
  providerBusiness?: string;
  service: string;
  date: string;
  time: string;
  description: string;
  labourAmount: number;
  partsOrMaterialsAmount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: 'Cash on Service' | 'UPI' | 'Nearby Pay Wallet';
  paymentStatus: 'paid' | 'pending';
  referenceNumber: string;
}

export interface Review {
  id: string;
  bookingId: string;
  authorId: string;
  authorName: string;
  authorRole: 'customer' | 'provider';
  targetId: string;
  targetName: string;
  rating: number; // 1-5
  tags: string[];
  comment: string;
  date: string;
  reported?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'quote' | 'job_accepted' | 'status_change' | 'message' | 'alert' | 'system';
  timestamp: string;
  read: boolean;
  targetMode: 'customer' | 'provider' | 'all';
  actionUrl?: string;
}

export interface BusinessTeamMember {
  id: string;
  name: string;
  phone: string;
  role: string;
  specialties: string[];
  status: 'available' | 'busy' | 'off_duty';
  assignedJobsCount: number;
  rating: number;
}

export interface DisputeReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: 'customer' | 'provider';
  targetType: 'provider' | 'customer' | 'review';
  targetId: string;
  targetName: string;
  reason: string;
  details: string;
  status: 'under_review' | 'resolved' | 'dismissed';
  createdAt: string;
}
