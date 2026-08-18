// ============================================================
// types/service.ts – Complete Production-Ready Service Types
// ============================================================

// ===== ENUMS / UNION TYPES =====

export type ServiceCategory =
  | "electrical"
  | "plumbing"
  | "carpenter"
  | "cleaning"
  | "painting"
  | "pest-control"
  | "home-appliances"
  | "appliance"
  | "inspection"
  | "installation"
  | "maid"
  | "men-salon"
  | "women-salon"
  | "spa"
  | "massage"
  | "membership"
  | "offer"
  | "electronics"
  | "ondemand"
  | "most-booked"
  | "threading"
  | "waxing"
  | "facial"
  | "haircare"
  | "manicure"
  | "pedicure"
  | "bridal"
  | "skincare"
  | "other";

export type ServicePackageType = "Basic" | "Standard" | "Premium" | "Luxury";
export type TechnicianLevel = "Junior" | "Senior" | "Master" | "Expert" | "Gold" | "Silver" | "Diamond" | "Elite";
export type ServiceType = "visit" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
export type SchemaType = "Service" | "LocalBusiness" | "ProfessionalService";
export type StaffGender = "Male" | "Female" | "Any" | "Unknown";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Junior" | "Senior" | "Master";
export type FAQCategory = "General" | "Pricing" | "Safety" | "Booking" | "Aftercare" | "Technical";

// ===== SUPPORTING TYPES =====

export interface ReviewItem {
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date?: string;
  city?: string;
  verified?: boolean;
  verifiedBooking?: boolean;
  serviceName?: string;
  helpfulCount?: number;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQ {
  category?: FAQCategory;
  question: string;
  answer: string;
}

export interface Benefit {
  title: string;
  icon: string;
}

export interface Technician {
  id?: string;
  name?: string;
  photo?: string;
  phone?: string;
  rating: number;
  experience: string;
  jobs?: number;
  badge?: string;
  verified?: boolean;
  backgroundChecked?: boolean;
  policeVerified?: boolean;
  languages?: string[];
  gender?: StaffGender;
  designation?: string;
  employeeId?: string;
  specialization?: string[];
}

export interface Breadcrumb {
  title: string;
  url: string;
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
}

// ===== RICH TYPES =====

export interface Plan {
  id: string;
  name: string;
  hindiName?: string;
  price: string;
  duration?: string;
  description?: string;
  popular?: boolean;
}

export type IncludeItem =
  | string
  | {
      title: string;
      hindiTitle?: string;
      icon: string;
    };

export type VariantItem =
  | string
  | {
      id?: string;
      title: string;
      hindiTitle?: string;
      image?: string;
      price?: string;
      description?: string;
      popular?: boolean;
      icon?: string;
      library?: string;
      brand?: string;
      priceDiff?: number;
    };

export interface Availability {
  availableToday: boolean;
  slotsLeft?: number;
  nextAvailable?: string;
  estimatedArrival?: string;
}

export interface Badge {
  title: string;
  color?: string;
  icon?: string;
}

export interface TrustPoint {
  title: string;
  icon?: string;
}

// ===== PRICING & OFFER =====

export interface Pricing {
  servicePrice: number;
  visitCharge: number;
  labourCharge: number;
  materialCharge: boolean;
  gstIncluded: boolean;
  currency?: string;
  currencyCode?: string;
}

export interface Offer {
  discount: number;
  saveAmount: number;
  coupon: string;
  startDate?: string;
  endDate?: string;
  expires?: string; // kept for backward compatibility
}

export interface Cancellation {
  freeBeforeHours: number;
  chargeAfter: number;
}

export interface Reschedule {
  allowed: boolean;
  times: number;
}

export interface ServiceGuarantee {
  days: number;
  type: string;
}

// ===== SERVICE STEP =====

export interface ServiceStep {
  title: string;
  hindiTitle?: string;
  description?: string;
  icon?: string;
  duration?: string;
  image?: string;
}

// ===== EXPECTED RESULT =====

export interface ExpectedResult {
  duration: string;
  visibleIn: string;
  maintenance: string;
}

// ===== BEFORE/AFTER & VIDEO =====

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface Video {
  title: string;
  url: string;
}

// ===== CONSULTATION (AI) =====

export interface Consultation {
  required: boolean;
  questions: string[];
}

// ===== BEAUTICIAN / PROFESSIONAL =====

export interface BeautyProfessional {
  certification: string;
  academy: string;
  experience: string;
}

// ===== FREQUENCY & SESSIONS =====

export interface Frequency {
  recommendedEvery: string;
}

export interface Sessions {
  recommended: number;
  completed: number;
}

// ===== HOME REQUIREMENTS =====

export interface HomeRequirements {
  powerSocket?: boolean;
  chair?: boolean;
  mirror?: boolean;
  water?: boolean;
  other?: string[];
  additionalRequirements?: string[];
}

// ===== WORKSPACE =====

export interface Workspace {
  minimumSpace: string;
  chairRequired: boolean;
}

// ===== DIFFICULTY =====

export interface Difficulty {
  level: SkillLevel;
  estimatedSkill: SkillLevel;
  minimumExperience: string;
}

// ===== BOOKING FLOW =====

export interface BookingFlow {
  otpRequired: boolean;
  advancePayment: boolean;
  scheduleRequired: boolean;
  allowInstantBooking: boolean;
}

// ===== ANALYTICS =====

export interface Analytics {
  bookingCount: number;
  views?: number;
  clicks?: number;
  wishlist?: number;
  repeatBookingRate: number;
  conversionRate: number;
  favoritePercentage: number;
  averageRating?: number;
  totalRevenue?: number;
}

// ============================================================
// MAIN SERVICE INTERFACE
// ============================================================

export interface ServiceItem {
  // ===== BASIC =====
  id: string;
  slug?: string;
  title: string;
  hindiTitle?: string;
  description?: string;
  hindiDescription?: string;
  shortDescription?: string;
  shortHindiDescription?: string;
  category: ServiceCategory;
  subCategory?: string;
  route?: string;
  icon?: string;
  library?: string;
  color?: string;
  popular?: boolean;
  featured?: boolean;
  priority?: number;

  // ===== PRICING =====
  price?: string;
  originalPrice?: string;
  discount?: string;
  startingPrice?: string;
  labourCharge?: string;
  labourFree?: boolean;
  visitCharge?: number;
  materialIncluded?: boolean;
  materialExtra?: boolean;
  subscriptionPlan?: string;
  membershipRequired?: boolean;
  membershipEligible?: boolean;

  // ===== TIME =====
  duration?: string;
  serviceType?: ServiceType;
  visitType?: string;
  technicianArrival?: string;
  emergencyAvailable?: boolean;
  expressService?: boolean;

  // ===== CONTENT =====
  variants?: VariantItem[];
  includes?: IncludeItem[];
  benefits?: Benefit[];
  features?: string[];
  whyChooseUs?: string[];
  usp?: string[];
  highlights?: string[];
  brandsUsed?: string[];
  similarServices?: string[];
  relatedServices?: string[];
  tags?: string[];
  plans?: Plan[];
  badges?: Badge[];
  trustPoints?: TrustPoint[];
  categoryIcon?: string;
  availability?: Availability;
  heroImage?: string;
  serviceProcess?: ServiceStep[];
  beforeService?: string[];
  afterService?: string[];
  cancellationPolicy?: string;
  replacementPolicy?: string;
  documentsRequired?: string[];
  terms?: string[];

  // ===== NEW FIELDS =====
  packageType?: ServicePackageType;
  pricing?: Pricing;
  offer?: Offer;
  cancellation?: Cancellation;
  reschedule?: Reschedule;
  serviceGuarantee?: ServiceGuarantee;
  safety?: string[];
  tools?: string[];
  products?: string[];
  technicianLevel?: TechnicianLevel;
  customerPreparation?: string[];
  afterCare?: string[];
  notSuitableFor?: string[];
  recommendedWith?: string[];
  comboServices?: string[];
  analytics?: Analytics;
  difficulty?: Difficulty;
  bookingFlow?: BookingFlow;

  // ===== SALON-SPECIFIC =====
  skinType?: string[];
  hairType?: string[];
  expectedResult?: ExpectedResult;
  contraindications?: string[];
  patchTestRequired?: boolean;
  avoidIngredients?: string[];
  beautician?: BeautyProfessional;
  beforeAfter?: BeforeAfter[];
  videos?: Video[];
  recommendedFor?: string[];
  occasion?: string[];
  frequency?: Frequency;
  sessions?: Sessions;
  ageGroup?: string[];
  homeRequirements?: HomeRequirements;
  workspace?: Workspace;
  consumables?: string[];
  preferredSlots?: string[];
  staffGender?: StaffGender;
  consultation?: Consultation;

  // ===== MEDIA =====
  thumbnail?: string;
  banner?: string;
  gallery?: string[];
  images?: string[];
  imageAlt?: string[];
  imageTitle?: string[];
  imageCaption?: string[];
  video?: string;

  // ===== FAQ =====
  faq?: FAQ[];
  commonQuestions?: string[];

  // ===== TECHNICIAN =====
  technician?: Technician | null;

  // ===== REVIEWS =====
  rating?: number;
  reviewsCount?: number;
  aggregateRating?: AggregateRating;
  reviews?: ReviewItem[];
  bookingCount?: number;

  // ===== LOCATION =====
  city?: string;
  state?: string;
  country?: string;
  serviceAreas?: string[];
  postalCodes?: string[];

  // ===== SEO =====
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  searchKeywords?: string[];
  relatedKeywords?: string[];
  voiceKeywords?: string[];
  canonicalUrl?: string;
  metaRobots?: string;
  includeInSitemap?: boolean;
  indexable?: boolean;
  language?: string;
  breadcrumb?: Breadcrumb[];
  schemaType?: SchemaType;
  faqSchema?: boolean;
  structuredData?: any;

  // ===== SOCIAL =====
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;

  // ===== AI SEARCH =====
  aiSummary?: string;
  problemSolved?: string[];
  idealFor?: string[];
  preparationTips?: string[];
  afterServiceTips?: string[];
  safetyInstructions?: string[];

  // ===== MARKETING =====
  offerText?: string;
  offerEnds?: string;
  couponCode?: string;
  trustBadges?: string[];
  verifiedProfessional?: boolean;
  policeVerified?: boolean;
  backgroundVerified?: boolean;
  insuranceCovered?: boolean;
  warranty?: string;
  support24x7?: boolean;
  callToAction?: string;

  // ===== SYSTEM =====
  author?: string;
  publisher?: string;
  publishedAt?: string;
  updatedAt?: string;
  trackingId?: string;
}

export interface ServiceDetail extends ServiceItem {}

// ===== UTILITY TYPES =====

export type ServiceFilter = {
  category?: ServiceCategory;
  popular?: boolean;
  featured?: boolean;
  packageType?: ServicePackageType;
  staffGender?: StaffGender;
  minPrice?: number;
  maxPrice?: number;
  skinType?: string;
  hairType?: string;
  ageGroup?: string;
  occasion?: string;
};

export type ServiceSort = {
  field: keyof ServiceItem;
  order: "asc" | "desc";
};