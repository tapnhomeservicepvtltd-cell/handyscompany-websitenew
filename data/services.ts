// ─────────────────────────────────────────────────────────────
// 📝 1. Strong Type Safety & Interfaces
// ─────────────────────────────────────────────────────────────

export interface ServiceDetail {
  id: string;
  title: string;
  price: string;
  description: string;
  includes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export type Category =
  | "Electrical"
  | "Plumbing"
  | "Cleaning"
  | "Appliance"
  | "Carpenter"
  | "Inspection"
  | "Checkup"
  | "OnDemand";

export interface Service {
  id: string;
  title: string;
  hindiTitle: string;
  icon: string;
  category: Category;
  free: boolean;
  route: string;
  noteEn?: string;
  noteHi?: string;
  color?: string;
  image?: string;
  popular?: boolean;
  membership?: boolean;
}

export interface ApplianceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
}

export interface Offer {
  id: string;
  titleKey: string;
  defaultTitle: string;
  hindiTitle: string;
  code: string;
  saveAmount: string;
  colors: [string, string];
  validityText: string;
  tagText: string;
  icon: string;
  active: boolean;
  expiry: Date; // Changed to Date type
}

export interface Review {
  id: string;
  userName: string;
  photo?: string;
  helpful: number;
  rating: number;
  serviceNameEn: string;
  serviceNameHi: string;
  reviewTextEn: string;
  reviewTextHi: string;
  cityNameEn: string;
  cityNameHi: string;
  serviceDate: string;
  verified: boolean;
}

// ─────────────────────────────────────────────────────────────
// 📺 Complete 20+ Daily Home Appliances Dataset
// ─────────────────────────────────────────────────────────────
export const coveredAppliances: ApplianceItem[] = [
  { id: "app_wm", titleEn: "Washing Machine", titleHi: "वाशिंग मशीन", icon: "washing-machine" },
  { id: "app_ref", titleEn: "Refrigerator (Fridge)", titleHi: "रेफ्रिजरेटर (फ्रिज)", icon: "fridge-outline" },
  { id: "app_ro", titleEn: "RO Water Purifier", titleHi: "RO वॉटर प्यूरिफायर", icon: "water-filter" },
  { id: "app_mw", titleEn: "Microwave Oven", titleHi: "माइक्रोवेव ओवन", icon: "microwave" },
  { id: "app_geys", titleEn: "Geyser / Water Heater", titleHi: "गीजर / वॉटर हीटर", icon: "water-boiler" },
  { id: "app_mix", titleEn: "Mixer Grinder / Juicer", titleHi: "मिक्सर ग्राइंडर", icon: "blender" },
  { id: "app_chim", titleEn: "Kitchen Chimney", titleHi: "किचन चिमनी", icon: "fan" },
  { id: "app_tv", titleEn: "Smart TV (LED/LCD)", titleHi: "स्मार्ट टीवी", icon: "television" },
  { id: "app_ac", titleEn: "Air Conditioner", titleHi: "एयर कंडीशनर", icon: "air-conditioner" },
  { id: "app_fan", titleEn: "Ceiling Fan", titleHi: "सीलिंग फैन", icon: "fan" },
  { id: "app_exhaust", titleEn: "Exhaust Fan", titleHi: "एग्जॉस्ट फैन", icon: "fan-chevron-up" },
  { id: "app_induction", titleEn: "Induction Cooktop", titleHi: "इंडक्शन चूल्हा", icon: "stove" },
  { id: "app_hob", titleEn: "Kitchen Hob", titleHi: "हॉब", icon: "stove" },
  { id: "app_motor", titleEn: "Water Motor", titleHi: "वॉटर मोटर", icon: "engine" },
  { id: "app_dish", titleEn: "Dishwasher", titleHi: "डिशवॉशर", icon: "dishwasher" },
  { id: "app_cooler", titleEn: "Air Cooler", titleHi: "एयर कूलर", icon: "air-filter" },
  { id: "app_disp", titleEn: "Water Dispenser", titleHi: "वॉटर डिस्पेंसर", icon: "cup-water" },
  { id: "app_toaster", titleEn: "Toaster", titleHi: "टोस्टर", icon: "toaster-oven" }
];

// ─────────────────────────────────────────────────────────────
// ⚡ Dynamic Services Database
// ─────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    id: "ser_1",
    title: "Plumbing",
    hindiTitle: "प्लंबिंग",
    icon: "water-pump",
    category: "Plumbing",
    free: true,
    route: "/payment-gateway",
    noteEn: "Labour FREE",
    noteHi: "लेबर फ्री",
    popular: true,
    membership: true,
    color: "#00A651"
  },
  {
    id: "ser_2",
    title: "Electrical",
    hindiTitle: "इलेक्ट्रिकल",
    icon: "flash",
    category: "Electrical",
    free: true,
    route: "/payment-gateway",
    noteEn: "Labour FREE",
    noteHi: "लेबर फ्री",
    popular: true,
    membership: true,
    color: "#00A651"
  },
  {
    id: "ser_3",
    title: "Carpenter",
    hindiTitle: "कारपेंटर",
    icon: "hammer",
    category: "Carpenter",
    free: true,
    route: "/payment-gateway",
    noteEn: "Labour FREE",
    noteHi: "लेबर फ्री",
    popular: true,
    membership: true,
    color: "#00A651"
  },
  {
    id: "ser_4",
    title: "Appliance Repair",
    hindiTitle: "अप्लायंस रिपेयर",
    icon: "washing-machine",
    category: "Appliance",
    free: true,
    route: "/payment-gateway",
    noteEn: "Labour FREE for all household appliances. Spare Parts & Materials Extra.",
    noteHi: "घर में उपयोग होने वाले सभी उपकरणों की लेबर फ्री। स्पेयर पार्ट्स अलग से।",
    popular: true,
    membership: true,
    color: "#00A651"
  },
  {
    id: "ser_5",
    title: "Monthly Inspection",
    hindiTitle: "मंथली इंस्पेक्शन",
    icon: "calendar-check",
    category: "Inspection",
    free: true,
    route: "/payment-gateway",
    noteEn: "Regular Checkup Included",
    noteHi: "नियमित जांच शामिल",
    popular: false,
    membership: true,
    color: "#00A651"
  },
  {
    id: "ser_6",
    title: "Home Cleaning",
    hindiTitle: "होम क्लीनिंग",
    icon: "broom",
    category: "Cleaning",
    free: true,
    route: "/payment-gateway",
    noteEn: "One-Time FREE Deep Home Cleaning (Customer Pays Only for Chemicals)",
    noteHi: "वन-टाइम FREE डीप होम क्लीनिंग (कस्टमर सिर्फ केमिकल का charge दें)",
    popular: true,
    membership: true,
    color: "#00A651"
  }
];

// ─────────────────────────────────────────────────────────────
// 🎟️ Promotional Offers with ISO Expiry Control
// ─────────────────────────────────────────────────────────────
export const promotionalOffers: Offer[] = [
  {
    id: "off_1",
    titleKey: "Monsoon Magic",
    defaultTitle: "Home Cleaning Premium",
    hindiTitle: "होम क्लीनिंग प्रीमियम",
    code: "HOME500",
    saveAmount: "SAVE ₹500",
    colors: ["#00A651", "#008C45"],
    validityText: "Valid Till Today",
    tagText: "HOT DEAL",
    icon: "broom",
    active: true,
    expiry: new Date("2026-08-15"), // Parsed to Date object
  },
  {
    id: "off_2",
    titleKey: "Freedom Offer",
    defaultTitle: "Full AC Service",
    hindiTitle: "फुल एसी सर्विस",
    code: "ACFREE",
    saveAmount: "SAVE ₹350",
    colors: ["#007AFF", "#0057D9"],
    validityText: "Valid Till Sunday",
    tagText: "SUPER SAVER",
    icon: "air-conditioner",
    active: true,
    expiry: new Date("2026-08-30"), // Parsed to Date object
  },
  {
    id: "off_3",
    titleKey: "Mega Cashback",
    defaultTitle: "Complete Kitchen Deep Clean",
    hindiTitle: "किचन डीप क्लीनिंग",
    code: "KITCHEN20",
    saveAmount: "SAVE ₹600",
    colors: ["#E91E63", "#AD1457"],
    validityText: "Valid Till 10 PM",
    tagText: "LIMITED",
    icon: "silverware-fork-knife",
    active: true,
    expiry: new Date("2026-07-20"), // Parsed to Date object
  }
];

// ─────────────────────────────────────────────────────────────
// ⭐ Customer Reviews
// ─────────────────────────────────────────────────────────────
export const customerReviews: Review[] = [
  {
    id: "rev_1",
    userName: "Aman Verma",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    helpful: 142,
    rating: 5,
    serviceNameEn: "Appliance Repair (Fridge)",
    serviceNameHi: "अप्लायंस रिपेयर (फ्रिज)",
    reviewTextEn: "My refrigerator stopped cooling suddenly. Booked HandysCompany, technician arrived within 15 minutes! Labour was completely free under membership, paid only for the relay part. Fantastic experience!",
    reviewTextHi: "मेरा फ्रिज अचानक ठंडा होना बंद हो गया था। मैंने हैंडीसकंपनी बुक की, टेक्नीशियन 15 मिनट में आ गया! मेंबरशिप के तहत लेबर बिल्कुल फ्री थी, सिर्फ पार्ट के पैसे दिए। बहुत ही बढ़िया अनुभव!",
    cityNameEn: "AP Colony, Gaya",
    cityNameHi: "एपी कॉलोनी, गया",
    serviceDate: "Today",
    verified: true
  },
  {
    id: "rev_2",
    userName: "Priya Sharma",
    photo: undefined, // Changed from "" to undefined
    helpful: 98,
    rating: 5,
    serviceNameEn: "Full Home Deep Cleaning",
    serviceNameHi: "फुल Home Deep Cleaning",
    reviewTextEn: "Used my one-time free deep home cleaning benefit today. The crew spent 4 hours and made my kitchen and bathrooms shine like new. Only paid ₹180 for special chemicals. Absolute value for money!",
    reviewTextHi: "आज अपनी वन-टाइम FREE डीप होम क्लीनिंग बेनिफिट का यूज़ किया। टीम ने 4 घंटे लगाए... सिर्फ स्पेशल केमिकल्स के ₹180 दिए। पैसा वसूल!",
    cityNameEn: "Rampur, Gaya",
    cityNameHi: "रामपुर, गया",
    serviceDate: "2 days ago",
    verified: true
  },
  {
    id: "rev_3",
    userName: "Rohit Singh",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    helpful: 76,
    rating: 5,
    serviceNameEn: "Electrical (Wiring Fix)",
    serviceNameHi: "इलेक्ट्रिकल (वायरिंग फिक्स)",
    reviewTextEn: "Had a short circuit in the house. Booked emergency service and the electrician came within 20 mins. Very professional, fixed everything and even gave safety tips. Labour free with membership!",
    reviewTextHi: "घर में शॉर्ट सर्किट हो गया था। इमरजेंसी सर्विस बुक की और इलेक्ट्रीशियन 20 मिनट में आ गया। बहुत प्रोफेशनल, सब ठीक किया... लेबर फ्री!",
    cityNameEn: "K.P. Road, Gaya",
    cityNameHi: "के.पी. रोड, गया",
    serviceDate: "5 days ago",
    verified: true
  },
  {
    id: "rev_4",
    userName: "Sneha Patel",
    photo: "https://images.unsplash.com/photo-1494790108372-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    helpful: 210,
    rating: 5,
    serviceNameEn: "Monthly Home Inspection",
    serviceNameHi: "मंथली होम इंस्पेक्शन",
    reviewTextEn: "The monthly inspection service is a lifesaver! They check everything from plumbing to electrical and give a detailed report. Caught a small leak before it became a big problem. Highly recommend!",
    reviewTextHi: "मंथली इंस्पेक्शन सर्विस बहुत ही बढ़िया है! वे प्लंबिंग से लेकर इलेक्ट्रिकल तक सब check करते हैं... बहुत रिकमेंड करती हूँ!",
    cityNameEn: "M.G. Road, Gaya",
    cityNameHi: "एम.जी. रोड, गया",
    serviceDate: "1 week ago",
    verified: true
  },
  
];

// ─────────────────────────────────────────────────────────────
// 📦 Utility Functions
// ─────────────────────────────────────────────────────────────
export const getActiveOffers = (): Offer[] => {
  const today = new Date();
  // Set time to 00:00:00 for accurate date comparison
  today.setHours(0, 0, 0, 0); 
  
  return promotionalOffers.filter(
    (offer) => offer.active && offer.expiry >= today
  );
};

export const getServicesByCategory = (category: Category): Service[] => {
  return services.filter((service) => service.category === category);
};

export const getMembershipServices = (): Service[] => {
  return services.filter((service) => service.membership && service.free);
};

export const getPopularServices = (): Service[] => {
  return services.filter((service) => service.popular);
};

export const getVerifiedReviews = (): Review[] => {
  return customerReviews
    .filter((review) => review.verified)
    .sort((a, b) => b.helpful - a.helpful);
};

// ─────────────────────────────────────────────────────────────
// 🛠️ Fixed Component UI Arrays & Missing Data (Fixes Invisible Section)
// ─────────────────────────────────────────────────────────────

// Core fixed data used by your screen rendering code
export interface LabourFreeHomeService {
  id: string;
  title: string;
  icon: string;
  library: string;
  color: string;
}

export const labourFreeHomeServices: LabourFreeHomeService[] = [
  {
    id: "electrical",
    title: "Electrical",
    icon: "plug-circle-bolt",
    library: "FontAwesome6",
    color: "#00A651",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    icon: "pipe-wrench",
    library: "MaterialCommunityIcons",
    color: "#00A651",
  },
  {
    id: "carpenter",
    title: "Carpenter",
    icon: "saw-blade",
    library: "MaterialCommunityIcons",
    color: "#00A651",
  },
  {
    id: "appliance",
    title: "Home Appliance",
    icon: "washing-machine",
    library: "MaterialCommunityIcons",
    color: "#00A651",
  },
  {
    id: "free-cleaning",
    title: "Deep Cleaning",
    icon: "spray-bottle",
    library: "MaterialCommunityIcons",
    color: "#00A651",
  },
  {
    id: "inspection",
    title: "Inspection",
    icon: "clipboard-search",
    library: "MaterialCommunityIcons",
    color: "#00A651",
  },
];

import { carpenterServices } from "./carpenter";
import { cleaningServices as fullCleaningList } from "./cleaning";
import { electricalServices } from "./electrical";
import { applianceServices } from "./homeAppliance";
import { installationServices as fullInstallationList } from "./installation";
import { maidDetailsList as fullMaidList } from "./maid";
import { menSalonServices as fullMenSalon } from "./menSalon";
import { paintingServices as fullPaintingList } from "./painting";
import { pestControlServices as fullPestControl } from "./pestControl";
import { plumbingServices as fullPlumbingList } from "./plumbing";
import { womenSalonServices as fullWomenSalon } from "./womenSalon";
import { onDemandServices as localOnDemandList } from "./ondemand";

import {
  religiousServices,
  tourismServices,
  foodServices,
  transportServices,
  commercialServices,
  propertyServices,
  rentalServices,
  courierServices,
  businessServices,
  governmentServices,
  eventServices,
  petServices,
  shoppingServices,
  utilityServices,
  healthcareServices,
  emergencyServices,
  helperServices,
  pilgrimServices,
} from "./superApp";

// Dynamically mapped or safety-allocated category-wise Arrays
export const freeServices = services.filter(s => s.free);
export const cleaningServices = fullCleaningList || services.filter(s => s.category === "Cleaning");
export const electronicsServices = applianceServices || services.filter(s => s.category === "Appliance");
export const maidServices = fullMaidList || [];
export const menSalonServices = fullMenSalon || [];
export const womenSalonServices = fullWomenSalon || [];
export const installationServices = fullInstallationList || [];
export const pestControlServices = fullPestControl || [];
export const paintingServices = fullPaintingList || [];
export const onDemandServices = localOnDemandList || [];

// Integrated SuperApp Services directly into Master Service Catalog
export const superAppUnifiedServices = [
  ...religiousServices,
  ...tourismServices,
  ...foodServices,
  ...transportServices,
  ...commercialServices,
  ...propertyServices,
  ...rentalServices,
  ...courierServices,
  ...businessServices,
  ...governmentServices,
  ...eventServices,
  ...petServices,
  ...shoppingServices,
  ...utilityServices,
  ...healthcareServices,
  ...emergencyServices,
  ...helperServices,
  ...pilgrimServices,
];

export const categoryData = {
  free: freeServices,
  maid: maidServices,
  men: menSalonServices,
  women: womenSalonServices,
  installation: installationServices,
  electronics: electronicsServices,
  cleaning: cleaningServices,
  pest: pestControlServices,
  painting: paintingServices,
  ondemand: [
    ...onDemandServices,
    ...superAppUnifiedServices.map((item, idx) => ({
      id: `sa_${item.slug}_${idx}`,
      title: item.name,
      hindiTitle: item.nameHi,
      rating: 4.8,
      reviewsCount: 150 + (idx * 7) % 300,
      price: `₹${item.basePrice}`,
      duration: "Flex",
      description: item.name,
      category: "ondemand" as const,
      icon: item.icon || "wrench",
      images: [item.slug],
      popular: true,
      membershipEligible: false,
      subscriptionPlan: "Standard",
      visitType: "Scheduled",
      materialIncluded: false,
      emergencyAvailable: true,
      labourCharge: `₹${item.basePrice}`,
    })),
  ],
};

// 🎯 Filtered Lists Reference
export const allElectricalServices = electricalServices || services.filter((item) => item.category === "Electrical");
export const allPlumbingServices = fullPlumbingList || services.filter((item) => item.category === "Plumbing");
export const allCarpenterServices = carpenterServices || services.filter((item) => item.category === "Carpenter");
export const allHomeApplianceServices = applianceServices || services.filter((item) => item.category === "Appliance");
export const allInspectionServices = services.filter((item) => item.category === "Inspection");
export const allFreeCleaningServices = fullCleaningList || services.filter((item) => item.category === "Cleaning");