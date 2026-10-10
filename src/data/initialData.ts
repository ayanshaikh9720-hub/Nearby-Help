import { ServiceCategory, Provider, JobRequest, Booking, ChatMessage, AppNotification, JobReceipt, Review, BusinessTeamMember, LocationInfo } from '../types';

export const INDIAN_LOCATIONS: LocationInfo[] = [
  { city: 'Bengaluru', area: 'Koramangala 5th Block', pincode: '560034', lat: 12.9352, lng: 77.6245 },
  { city: 'Bengaluru', area: 'HSR Layout Sector 2', pincode: '560102', lat: 12.9121, lng: 77.6446 },
  { city: 'Bengaluru', area: 'Indiranagar 100ft Road', pincode: '560038', lat: 12.9784, lng: 77.6408 },
  { city: 'Mumbai', area: 'Andheri West (Lokhandwala)', pincode: '400053', lat: 19.1363, lng: 72.8277 },
  { city: 'Mumbai', area: 'Bandra West (Pali Hill)', pincode: '400050', lat: 19.0596, lng: 72.8295 },
  { city: 'Delhi NCR', area: 'Lajpat Nagar Central Market', pincode: '110024', lat: 28.5677, lng: 77.2433 },
  { city: 'Delhi NCR', area: 'Connaught Place Outer Circle', pincode: '110001', lat: 28.6315, lng: 77.2167 },
  { city: 'Hyderabad', area: 'Madhapur (Cyber Towers)', pincode: '500081', lat: 17.4483, lng: 78.3742 },
  { city: 'Pune', area: 'Kothrud (Paud Road)', pincode: '411038', lat: 18.5074, lng: 73.8077 },
  { city: 'Chennai', area: 'T. Nagar (Pondy Bazaar)', pincode: '600017', lat: 13.0418, lng: 80.2341 },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // Home Services
  { id: 'electrician', name: 'Electrician', group: 'Home Services', iconName: 'Zap', popular: true, emergency: true, defaultStartingPrice: 199, description: 'Wiring, MCB tripping, fan, switchboard, inverter, lighting' },
  { id: 'plumber', name: 'Plumber', group: 'Home Services', iconName: 'Wrench', popular: true, emergency: true, defaultStartingPrice: 249, description: 'Leaking pipe, tap repair, flush tank, drainage block, basin installation' },
  { id: 'carpenter', name: 'Carpenter', group: 'Home Services', iconName: 'Hammer', popular: true, defaultStartingPrice: 299, description: 'Door latch, hinge repair, furniture assembly, wardrobe sliding track' },
  { id: 'painter', name: 'Painter', group: 'Home Services', iconName: 'Paintbrush', popular: false, defaultStartingPrice: 499, description: 'Wall touch-ups, interior painting, waterproofing coat, texture wall' },
  { id: 'cleaner', name: 'Cleaner', group: 'Home Services', iconName: 'Sparkles', popular: true, defaultStartingPrice: 349, description: 'Deep home cleaning, bathroom scrubbing, sofa shampoo, kitchen de-greasing' },
  { id: 'ac-repair', name: 'AC Repair', group: 'Home Services', iconName: 'Wind', popular: true, emergency: true, defaultStartingPrice: 399, description: 'Gas refill, cooling issue, water leakage, filter cleaning, noise' },
  { id: 'refrigerator-repair', name: 'Refrigerator Repair', group: 'Home Services', iconName: 'Refrigerator', popular: false, defaultStartingPrice: 299, description: 'Not cooling, defrost error, compressor humming, gas leak' },
  { id: 'washing-machine-repair', name: 'Washing Machine Repair', group: 'Home Services', iconName: 'Disc', popular: false, defaultStartingPrice: 349, description: 'Drain issue, drum not spinning, vibration, power board error' },
  { id: 'appliance-repair', name: 'Appliance Repair', group: 'Home Services', iconName: 'Tv', popular: false, defaultStartingPrice: 249, description: 'Microwave, geyser, mixer grinder, water purifier, chimney' },
  { id: 'pest-control', name: 'Pest Control', group: 'Home Services', iconName: 'ShieldAlert', popular: false, defaultStartingPrice: 599, description: 'Cockroach gel treatment, termite proofing, bed bugs, ant removal' },
  { id: 'roofer', name: 'Roofer', group: 'Home Services', iconName: 'Home', popular: false, defaultStartingPrice: 699, description: 'Roof tile fixing, asbestos sheet repair, terrace shed, leak fixing' },
  { id: 'waterproofing', name: 'Waterproofing', group: 'Home Services', iconName: 'Droplets', popular: true, defaultStartingPrice: 799, description: 'Ceiling leakage, seepage treatment, bathroom floor coating' },

  // Vehicle Services
  { id: 'mechanic', name: 'Mechanic', group: 'Vehicle Services', iconName: 'Tool', popular: true, emergency: true, defaultStartingPrice: 299, description: 'Engine check, brake overhaul, clutch tuning, oil change, road assist' },
  { id: 'car-repair', name: 'Car Repair', group: 'Vehicle Services', iconName: 'Car', popular: true, emergency: true, defaultStartingPrice: 499, description: 'Accident breakdown, radiator overheat, suspension, alternator' },
  { id: 'bike-repair', name: 'Bike Repair', group: 'Vehicle Services', iconName: 'Bike', popular: true, emergency: true, defaultStartingPrice: 199, description: 'Scooter/bike starting problem, chain slack, spark plug, brake shoe' },
  { id: 'puncture', name: 'Puncture', group: 'Vehicle Services', iconName: 'CircleDot', popular: true, emergency: true, defaultStartingPrice: 149, description: 'Tubeless tyre puncture, tube replacement, air check, doorstep tyre repair' },
  { id: 'battery-service', name: 'Battery Service', group: 'Vehicle Services', iconName: 'BatteryCharging', popular: false, emergency: true, defaultStartingPrice: 249, description: 'Jump start, dead car battery, acid check, new battery fitment' },
  { id: 'car-wash', name: 'Car Wash', group: 'Vehicle Services', iconName: 'Waves', popular: false, defaultStartingPrice: 399, description: 'Doorstep foam wash, interior vacuuming, tyre shine, wax polish' },
  { id: 'towing', name: 'Towing', group: 'Vehicle Services', iconName: 'Truck', popular: false, emergency: true, defaultStartingPrice: 899, description: 'Flatbed tow truck, motorcycle lift, hydraulic winch recovery' },

  // Personal Services
  { id: 'barber', name: 'Barber', group: 'Personal Services', iconName: 'Scissors', popular: true, defaultStartingPrice: 199, description: 'Haircut at home, beard trim, head massage, hair coloring' },
  { id: 'beautician', name: 'Beautician', group: 'Personal Services', iconName: 'HeartHandshake', popular: true, defaultStartingPrice: 399, description: 'Waxing, facial, cleanup, manicure, pedicure, threading' },
  { id: 'tutor', name: 'Tutor', group: 'Personal Services', iconName: 'BookOpen', popular: false, defaultStartingPrice: 499, description: 'Math, Science, English, CBSE/ICSE syllabus, competitive exam prep' },
  { id: 'fitness-trainer', name: 'Fitness Trainer', group: 'Personal Services', iconName: 'Activity', popular: false, defaultStartingPrice: 599, description: 'Weight loss, yoga instructor, home gym training, posture coaching' },
  { id: 'photographer', name: 'Photographer', group: 'Personal Services', iconName: 'Camera', popular: false, defaultStartingPrice: 1499, description: 'Birthday shoot, family portrait, product photography, event coverage' },
  { id: 'makeup-artist', name: 'Makeup Artist', group: 'Personal Services', iconName: 'Palette', popular: false, defaultStartingPrice: 999, description: 'Party makeup, bridal trial, saree draping, hairstyling' },

  // Business Services
  { id: 'computer-repair', name: 'Computer Repair', group: 'Business Services', iconName: 'Laptop', popular: true, defaultStartingPrice: 349, description: 'Laptop screen replacement, Windows OS format, SSD upgrade, virus removal' },
  { id: 'printer-repair', name: 'Printer Repair', group: 'Business Services', iconName: 'Printer', popular: false, defaultStartingPrice: 299, description: 'Cartridge refill, paper jam, rollers replacement, Wi-Fi printing setup' },
  { id: 'cctv-installation', name: 'CCTV Installation', group: 'Business Services', iconName: 'Shield', popular: true, defaultStartingPrice: 699, description: 'IP camera setup, DVR/NVR cabling, mobile app remote view configuration' },
  { id: 'wifi-technician', name: 'Internet/Wi-Fi Technician', group: 'Business Services', iconName: 'Wifi', popular: true, emergency: true, defaultStartingPrice: 299, description: 'Fiber cable splice, router mesh setup, dead zone extension, LAN cabling' },
  { id: 'welder-fabricator', name: 'Welder/Fabricator', group: 'Business Services', iconName: 'Flame', popular: false, defaultStartingPrice: 499, description: 'Iron grill repair, gate hinge welding, window frame, railing modification' },
  { id: 'delivery-helper', name: 'Delivery/Helper', group: 'Business Services', iconName: 'Package', popular: false, defaultStartingPrice: 199, description: 'Shift heavy furniture, local parcel pickup, market errand runner, loading' },
  { id: 'printing-services', name: 'Printing Services', group: 'Business Services', iconName: 'FileText', popular: false, defaultStartingPrice: 150, description: 'Visiting cards, flex banners, brochure print, spiral binding' },
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    name: 'Ramesh Kumar',
    businessName: 'Ramesh Electrical & AC Works',
    avatar: '/src/assets/images/hero_service_electrician_1790560964865.jpg',
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 9,
    services: ['Electrician', 'AC Repair', 'Appliance Repair'],
    customServices: ['Inverter Backup Wiring', 'Smart Switch Setup'],
    serviceArea: 'Within 7 km of Koramangala',
    distanceKm: 1.2,
    startingPrice: 199,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableHours: '8:00 AM - 9:30 PM',
    workPhotos: [
      '/src/assets/images/hero_service_electrician_1790560964865.jpg',
      '/src/assets/images/hero_banner_community_1790561002847.jpg'
    ],
    about: 'Government certified master electrician with 9+ years experience in domestic & commercial electrical troubleshooting. Specialised in MCB tripping, AC power lines, and emergency restorations.',
    languages: ['Hindi', 'Kannada', 'English'],
    status: 'available',
    emergencyAvailable: true,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: true,
      tradeCertified: true,
      certName: 'ITI Electrical Trade License #KA-BLR-8841',
      verifiedAt: '15 Jan 2026'
    },
    city: 'Bengaluru',
    area: 'Koramangala 4th Block',
    coords: { lat: 12.9340, lng: 77.6250 }
  },
  {
    id: 'prov-2',
    name: 'Salim Pathan',
    businessName: 'QuickFix Two-Wheeler & Auto Care',
    avatar: '/src/assets/images/hero_service_mechanic_1790560978857.jpg',
    rating: 4.8,
    reviewCount: 98,
    experienceYears: 12,
    services: ['Mechanic', 'Bike Repair', 'Puncture', 'Battery Service', 'Towing'],
    customServices: ['Doorstep Carburetor Tuning', 'Emergency Jump Start Van'],
    serviceArea: 'Within 10 km',
    distanceKm: 1.8,
    startingPrice: 149,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: '7:30 AM - 10:00 PM',
    workPhotos: [
      '/src/assets/images/hero_service_mechanic_1790560978857.jpg'
    ],
    about: 'Equipped mobile response van for immediate breakdown & puncture assistance on bikes, scooters, and cars. We bring air compressor, patch kit, and jump cables to your location.',
    languages: ['Hindi', 'Marathi', 'English'],
    status: 'available',
    emergencyAvailable: true,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: true,
      tradeCertified: true,
      certName: 'Automobile Service Technician Council Reg #MH-7712',
      verifiedAt: '03 Feb 2026'
    },
    city: 'Bengaluru',
    area: 'HSR Layout Sector 1',
    coords: { lat: 12.9150, lng: 77.6400 }
  },
  {
    id: 'prov-3',
    name: 'Suresh Patil',
    businessName: 'Patil Plumbing & Seepage Solutions',
    avatar: '/src/assets/images/hero_service_plumber_1790560991666.jpg',
    rating: 4.7,
    reviewCount: 84,
    experienceYears: 11,
    services: ['Plumber', 'Waterproofing', 'Roofer'],
    customServices: ['Thermal Seepage Detection', 'Underground Tank Cleaning'],
    serviceArea: 'Within 8 km',
    distanceKm: 2.4,
    startingPrice: 249,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableHours: '7:00 AM - 9:00 PM',
    workPhotos: [
      '/src/assets/images/hero_service_plumber_1790560991666.jpg'
    ],
    about: 'Expert in persistent water leakage, wall seepage proofing, concealed pipe blockages, pressure booster pumps, and Jaquar/Kohler sanitary fittings.',
    languages: ['Kannada', 'Telugu', 'Hindi'],
    status: 'available',
    emergencyAvailable: true,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: false,
      tradeCertified: true,
      certName: 'Karnataka Plumbing Guild Master Certificate',
      verifiedAt: '12 Nov 2025'
    },
    city: 'Bengaluru',
    area: 'BTM 2nd Stage',
    coords: { lat: 12.9160, lng: 77.6100 }
  },
  {
    id: 'prov-4',
    name: 'Sunita Sharma',
    businessName: 'GlowPro Salon & Bridal at Home',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 167,
    experienceYears: 8,
    services: ['Beautician', 'Barber', 'Makeup Artist'],
    customServices: ['Organic Fruit Facial', 'Pre-Bridal Package'],
    serviceArea: 'Within 6 km',
    distanceKm: 3.1,
    startingPrice: 399,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: '9:00 AM - 8:00 PM',
    workPhotos: [],
    about: 'Certified cosmetologist offering hygienic salon services at your doorstep. We use disposable sheets, sanitized kits, and premium skin-friendly brands.',
    languages: ['Hindi', 'English'],
    status: 'available',
    emergencyAvailable: false,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: true,
      tradeCertified: true,
      certName: 'CIDESCO Trained Aesthetician #IN-889',
      verifiedAt: '20 Dec 2025'
    },
    city: 'Bengaluru',
    area: 'Indiranagar',
    coords: { lat: 12.9780, lng: 77.6400 }
  },
  {
    id: 'prov-5',
    name: 'Arun M.',
    businessName: 'WoodCraft Furniture & Carpentry',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 53,
    experienceYears: 15,
    services: ['Carpenter'],
    customServices: ['Custom Shoe Racks', 'Acoustic Door Padding'],
    serviceArea: 'Within 12 km',
    distanceKm: 3.8,
    startingPrice: 299,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: '9:00 AM - 8:00 PM',
    workPhotos: [],
    about: 'Precision woodwork, modular kitchen hinge adjustments, lock change, door trimming during monsoons, and custom furniture polishing.',
    languages: ['Kannada', 'Tamil', 'Hindi', 'English'],
    status: 'busy',
    emergencyAvailable: false,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: false,
      tradeCertified: false,
      verifiedAt: '18 Jan 2026'
    },
    city: 'Bengaluru',
    area: 'Domlur',
    coords: { lat: 12.9609, lng: 77.6387 }
  },
  {
    id: 'prov-6',
    name: 'Vikas Networks & Security',
    businessName: 'Vikas Tech & CCTV Enterprise',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 115,
    experienceYears: 7,
    services: ['CCTV Installation', 'Internet/Wi-Fi Technician', 'Computer Repair'],
    customServices: ['Office Mesh Wi-Fi', 'Bio-metric Attendance Setup'],
    serviceArea: 'All Bangalore Urban',
    distanceKm: 2.1,
    startingPrice: 349,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: '8:30 AM - 8:30 PM',
    workPhotos: [],
    about: 'Registered business with 6 mobile technicians. We handle home and office networking, fiber optic joints, CCTV night-vision cameras, and quick PC repairs.',
    languages: ['English', 'Hindi', 'Kannada'],
    status: 'available',
    isBusiness: true,
    employeesCount: 6,
    emergencyAvailable: true,
    verification: {
      isVerified: true,
      aadhaarVerified: true,
      policeVerified: true,
      tradeCertified: true,
      certName: 'MSME Registered Udyam #UDYAM-KR-03-009124',
      verifiedAt: '05 Jan 2026'
    },
    city: 'Bengaluru',
    area: 'Koramangala 1st Block',
    coords: { lat: 12.9279, lng: 77.6271 }
  }
];

export const INITIAL_JOB_REQUESTS: JobRequest[] = [
  {
    id: 'req-101',
    customerId: 'cust-me',
    customerName: 'Ayan S.',
    customerPhoneMasked: '+91 98•••• 4321',
    serviceCategory: 'Plumber',
    problemDescription: 'Water is heavily leaking from the bathroom angle valve under the geyser. Need immediate fix to avoid flooding.',
    urgency: 'urgent_30min',
    budgetMax: 500,
    mediaAttachments: [
      { id: 'm-1', type: 'image', url: '/src/assets/images/hero_service_plumber_1790560991666.jpg', name: 'leaking_pipe_photo.jpg' }
    ],
    location: INDIAN_LOCATIONS[0],
    status: 'quotes_received',
    otpCode: '4829',
    createdAt: '15 mins ago',
    quotes: [
      {
        id: 'q-1',
        requestId: 'req-101',
        providerId: 'prov-3',
        providerName: 'Suresh Patil',
        providerAvatar: '/src/assets/images/hero_service_plumber_1790560991666.jpg',
        providerRating: 4.7,
        providerDistanceKm: 2.4,
        isVerified: true,
        amount: 350,
        estimatedArrivalMins: 20,
        notes: 'I have genuine heavy brass angle valves and teflon tape in my toolkit. Can reach in 20 minutes.',
        createdAt: '10 mins ago',
        status: 'pending'
      },
      {
        id: 'q-2',
        requestId: 'req-101',
        providerId: 'prov-1',
        providerName: 'Ramesh Kumar',
        providerAvatar: '/src/assets/images/hero_service_electrician_1790560964865.jpg',
        providerRating: 4.9,
        providerDistanceKm: 1.2,
        isVerified: true,
        amount: 300,
        estimatedArrivalMins: 15,
        notes: 'Nearby in 4th block right now. Can come inspect and replace the valve immediately.',
        createdAt: '6 mins ago',
        status: 'pending'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-801',
    requestId: 'req-98',
    customerId: 'cust-me',
    customerName: 'Ayan S.',
    customerPhoneMasked: '+91 98•••• 4321',
    providerId: 'prov-1',
    providerName: 'Ramesh Kumar',
    providerAvatar: '/src/assets/images/hero_service_electrician_1790560964865.jpg',
    providerRating: 4.9,
    service: 'Electrician',
    date: 'Today',
    timeSlot: 'Immediate (Urgent)',
    status: 'on_the_way',
    approxDistanceKm: 1.2,
    locationArea: 'Koramangala 5th Block',
    totalAmount: 350,
    otpCode: '7291',
    trackingStage: 1, // On the way
    etaMinutes: 12,
    createdAt: '25 mins ago'
  },
  {
    id: 'book-750',
    customerId: 'cust-me',
    customerName: 'Ayan S.',
    customerPhoneMasked: '+91 98•••• 4321',
    providerId: 'prov-2',
    providerName: 'Salim Pathan',
    providerAvatar: '/src/assets/images/hero_service_mechanic_1790560978857.jpg',
    providerRating: 4.8,
    service: 'Bike Repair',
    date: 'Yesterday',
    timeSlot: '4:00 PM',
    status: 'completed',
    approxDistanceKm: 1.8,
    locationArea: 'Koramangala 5th Block',
    totalAmount: 480,
    otpCode: '3104',
    trackingStage: 4,
    etaMinutes: 0,
    createdAt: 'Yesterday',
    receiptId: 'rec-391',
    hasCustomerRated: true,
    hasProviderRated: true
  }
];

export const INITIAL_RECEIPTS: JobReceipt[] = [
  {
    id: 'rec-391',
    bookingId: 'book-750',
    customerName: 'Ayan S.',
    providerName: 'Salim Pathan',
    providerBusiness: 'QuickFix Two-Wheeler & Auto Care',
    service: 'Bike Repair & Puncture',
    date: '26 Sep 2026',
    time: '4:45 PM',
    description: 'Doorstep rear tubeless puncture repair, chain lubricant spray and front brake wire tightening.',
    labourAmount: 250,
    partsOrMaterialsAmount: 230,
    discount: 0,
    finalAmount: 480,
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    referenceNumber: 'NH-REC-2026-98124'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'book-750',
    authorId: 'cust-me',
    authorName: 'Ayan S.',
    authorRole: 'customer',
    targetId: 'prov-2',
    targetName: 'Salim Pathan',
    rating: 5,
    tags: ['Punctual', 'Fair Pricing', 'Courteous', 'Clean Work'],
    comment: 'Salim reached within 20 minutes when my scooter tyre went flat. Had all tools in his mobile kit. Honest and reasonable pricing!',
    date: 'Yesterday'
  },
  {
    id: 'rev-2',
    bookingId: 'book-750',
    authorId: 'prov-2',
    authorName: 'Salim Pathan',
    authorRole: 'provider',
    targetId: 'cust-me',
    targetName: 'Ayan S.',
    rating: 5,
    tags: ['Clear Directions', 'Quick OTP Share', 'Immediate Payment'],
    comment: 'Great customer, explained the exact landmark and made UPI payment right after work was tested.',
    date: 'Yesterday'
  },
  {
    id: 'rev-3',
    bookingId: 'book-legacy-1',
    authorId: 'user-priya',
    authorName: 'Priya K.',
    authorRole: 'customer',
    targetId: 'prov-1',
    targetName: 'Ramesh Kumar',
    rating: 5,
    tags: ['Punctual', 'Expert Troubleshooting'],
    comment: 'Ramesh fixed our main circuit breaker that had been tripping for 2 days. Very knowledgeable and polite.',
    date: '3 days ago'
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'c-1',
    conversationId: 'book-801',
    senderId: 'prov-1',
    senderName: 'Ramesh Kumar',
    senderRole: 'provider',
    text: 'Namaste sir! I have accepted your request and started my bike from 4th block. Arriving in ~12 mins.',
    timestamp: '12 mins ago'
  },
  {
    id: 'c-2',
    conversationId: 'book-801',
    senderId: 'cust-me',
    senderName: 'Ayan S.',
    senderRole: 'customer',
    text: 'Great, thanks Ramesh. The flat is on the 2nd floor, building has blue gates next to the pharmacy.',
    timestamp: '10 mins ago'
  },
  {
    id: 'c-3',
    conversationId: 'book-801',
    senderId: 'prov-1',
    senderName: 'Ramesh Kumar',
    senderRole: 'provider',
    text: 'Got it! I am carrying standard replacement valves and multimeter with me.',
    timestamp: '8 mins ago'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Quote Received! (₹300)',
    body: 'Ramesh Kumar submitted a quote for your urgent Plumbing request.',
    type: 'quote',
    timestamp: '6 mins ago',
    read: false,
    targetMode: 'customer'
  },
  {
    id: 'notif-2',
    title: 'Provider is On The Way',
    body: 'Ramesh Kumar is en route to your location. ETA ~12 mins.',
    type: 'status_change',
    timestamp: '12 mins ago',
    read: false,
    targetMode: 'customer'
  },
  {
    id: 'notif-3',
    title: 'Incoming Job Nearby (1.2 km)',
    body: 'Customer in Koramangala 5th Block needs urgent plumbing inspection.',
    type: 'quote',
    timestamp: '15 mins ago',
    read: true,
    targetMode: 'provider'
  }
];

export const INITIAL_TEAM_MEMBERS: BusinessTeamMember[] = [
  { id: 'tm-1', name: 'Deepak Rao', phone: '+91 97•••• 1122', role: 'Senior CCTV Specialist', specialties: ['CCTV Installation', 'Networking'], status: 'available', assignedJobsCount: 4, rating: 4.9 },
  { id: 'tm-2', name: 'Manoj Gowda', phone: '+91 96•••• 3344', role: 'Fiber & Wi-Fi Engineer', specialties: ['Internet/Wi-Fi Technician'], status: 'busy', assignedJobsCount: 2, rating: 4.7 },
  { id: 'tm-3', name: 'Tanveer Ahmed', phone: '+91 95•••• 5566', role: 'Hardware & OS Technician', specialties: ['Computer Repair', 'Printer Repair'], status: 'available', assignedJobsCount: 3, rating: 4.8 }
];
