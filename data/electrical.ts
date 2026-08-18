// ============================================================
// lib/electricalServices.ts – इलेक्ट्रिकल सेवाएँ (50 Complete Services)
// ServiceItem Interface with 50 production-grade items
// ============================================================

import {
  Analytics,
  Availability,
  Badge,
  Benefit,
  BookingFlow,
  Cancellation,
  Difficulty,
  IncludeItem,
  Pricing,
  Reschedule,
  ServiceGuarantee,
  ServiceItem,
  TrustPoint
} from "@/types/service";

export const ELECTRICAL_THEME = "#00A651";
export const ELECTRICAL_PRIMARY_COLOR = "#00A651";

const defaultIncludes: IncludeItem[] = [
  { title: "Safety Check", icon: "shield-check" },
  { title: "Certified Electrician", icon: "badge" },
  { title: "Testing & Validation", icon: "check-circle" }
];

const defaultBenefits: Benefit[] = [
  { title: "Safety First", icon: "shield-check" },
  { title: "Certified Professional", icon: "account-check" },
  { title: "15 Days Service Guarantee", icon: "certificate" }
];

const defaultBadges: Badge[] = [
  { title: "Verified Electrician", color: "#4CAF50", icon: "check-circle" }
];

const defaultTrustPoints: TrustPoint[] = [
  { title: "Licensed & Insured", icon: "shield-check" },
  { title: "Safety Certified", icon: "security" },
  { title: "Satisfaction Guarantee", icon: "thumb-up" }
];

const defaultAvailability: Availability = {
  availableToday: true,
  slotsLeft: 6,
  nextAvailable: "30 mins",
  estimatedArrival: "30-45 mins"
};

const createElectricalService = (
  service: Partial<ServiceItem> & Pick<ServiceItem, "id" | "title" | "hindiTitle" | "description" | "hindiDescription" | "icon" | "price">
): ServiceItem => {
  return {
    rating: 4.8,
    reviewsCount: 420,
    duration: "30-60 Mins",
    visitCharge: 49,
    labourFree: true,
    membershipEligible: true,
    subscriptionPlan: "699 Membership",
    visitType: "Home Visit",
    materialIncluded: false,
    emergencyAvailable: true,
    labourCharge: "FREE",
    library: "MaterialCommunityIcons",
    color: ELECTRICAL_THEME,
    route: `/service/${service.id}`,
    category: "electrical",
    includes: defaultIncludes,
    benefits: defaultBenefits,
    badges: defaultBadges,
    trustPoints: defaultTrustPoints,
    availability: defaultAvailability,
    variants: [],
    features: [],
    plans: [],
    faq: [],
    images: [],
    similarServices: [],
    reviews: [],
    popular: true,
    brandsUsed: ["Havells", "Anchor", "Schneider", "Legrand", "Philips"],
    ...service,
  };
};

// --- EXACT 31 INFOGRAPHIC SERVICES ---
export const electricalServices: ServiceItem[] = [
  createElectricalService({ id: "switch-repair", title: "Switch Repair", hindiTitle: "स्विच रिपेयर", price: "₹99", icon: "power-plug", description: "Repairing loose or faulty switches." }),
  createElectricalService({ id: "switch-socket-install", title: "Switch & Socket Installation", hindiTitle: "स्विच और सॉकेट इंस्टॉलेशन", price: "₹149", icon: "power-plug", description: "Installing modular switches and power sockets." }),
  createElectricalService({ id: "fan-repair", title: "Fan Repair", hindiTitle: "फैन रिपेयर", price: "₹199", icon: "fan", description: "Ceiling fan noise, speed, and capacitor repair." }),
  createElectricalService({ id: "fan-install", title: "Fan Installation", hindiTitle: "फैन इंस्टॉलेशन", price: "₹249", icon: "fan", description: "New ceiling fan assembly and fitting." }),
  createElectricalService({ id: "exhaust-fan-service", title: "Exhaust Fan Service", hindiTitle: "एग्जॉस्ट फैन सर्विस", price: "₹229", icon: "fan", description: "Kitchen & bathroom exhaust fan repair and cleaning." }),
  createElectricalService({ id: "light-repair", title: "Light Repair", hindiTitle: "लाइट रिपेयर", price: "₹99", icon: "lightbulb-outline", description: "Fixing flickering lights and broken holders." }),
  createElectricalService({ id: "led-fitting", title: "LED Fitting", hindiTitle: "एलईडी फिटिंग", price: "₹149", icon: "ceiling-light", description: "Fitting surface and concealed LED panel lights." }),
  createElectricalService({ id: "chandelier-install", title: "Chandelier Installation", hindiTitle: "झाड़-फानूस इंस्टॉलेशन", price: "₹599", icon: "hexagon-outline", description: "Assembling and ceiling mounting of chandeliers." }),
  createElectricalService({ id: "chandelier-repair", title: "Chandelier Repair", hindiTitle: "झाड़-फानूस रिपेयर", price: "₹399", icon: "hexagon-outline", description: "Repairing crystal chandelier wiring and holders." }),
  createElectricalService({ id: "geyser-repair", title: "Geyser Repair", hindiTitle: "गीजर रिपेयर", price: "₹299", icon: "water-boiler", description: "Geyser thermostat, coil, and leakage fix." }),
  createElectricalService({ id: "geyser-point-wiring", title: "Geyser Point Wiring", hindiTitle: "गीजर पॉइंट वायरिंग", price: "₹349", icon: "water-boiler", description: "16A heavy power wiring point for bathroom geysers." }),
  createElectricalService({ id: "ac-electrical-point", title: "AC Electrical Point", hindiTitle: "एसी इलेक्ट्रिकल पॉइंट", price: "₹299", icon: "air-conditioner", description: "Heavy AC power socket and MCB point fitting." }),
  createElectricalService({ id: "ac-power-wiring", title: "AC Power Wiring", hindiTitle: "एसी पावर वायरिंग", price: "₹399", icon: "air-conditioner", description: "Heavy-duty 4sqmm wiring from main DB to AC." }),
  createElectricalService({ id: "inverter-repair", title: "Inverter Repair", hindiTitle: "इनवर्टर रिपेयर", price: "₹349", icon: "battery-charging", description: "Inverter card, fuse, and output power troubleshooting." }),
  createElectricalService({ id: "inverter-install", title: "Inverter Installation", hindiTitle: "इनवर्टर इंस्टॉलेशन", price: "₹499", icon: "battery-charging", description: "Complete home inverter setup and line connection." }),
  createElectricalService({ id: "battery-connection", title: "Battery Connection", hindiTitle: "बैटरी कनेक्शन", price: "₹199", icon: "battery", description: "Inverter battery terminal cleanup and acid check." }),
  createElectricalService({ id: "mcb-repair", title: "MCB Repair", hindiTitle: "एमसीबी रिपेयर", price: "₹199", icon: "fuse", description: "Replacing tripping or burnt MCB switches." }),
  createElectricalService({ id: "db-box-repair", title: "DB Box Repair", hindiTitle: "डीबी बॉक्स रिपेयर", price: "₹349", icon: "view-grid", description: "Distribution box rewiring and busbar cleanup." }),
  createElectricalService({ id: "short-circuit", title: "Short Circuit Check & Repair", hindiTitle: "शॉर्ट सर्किट रिपेयर", price: "₹299", icon: "alert-decagram", description: "Emergency short circuit detection and phase fault repair." }),
  createElectricalService({ id: "main-line-repair", title: "Main Line Repair", hindiTitle: "मेन लाइन रिपेयर", price: "₹499", icon: "flash", description: "Repairing main service wire and meter line faults." }),
  createElectricalService({ id: "house-wiring", title: "House Wiring", hindiTitle: "हाउस वायरिंग", price: "₹999", icon: "cable", description: "Complete house concealed or open casing wiring." }),
  createElectricalService({ id: "extension-board", title: "Extension Board Repair", hindiTitle: "एक्सटेंशन बोर्ड रिपेयर", price: "₹129", icon: "power-socket-us", description: "Fixing burnt extension boards and heavy spike guards." }),
  createElectricalService({ id: "earthing-install", title: "Earthing Installation", hindiTitle: "अर्थिंग इंस्टॉलेशन", price: "₹1,299", icon: "shield-check", description: "Chemical copper rod earthing for appliance safety." }),
  createElectricalService({ id: "doorbell-repair", title: "Doorbell Repair", hindiTitle: "डोरबेल रिपेयर", price: "₹99", icon: "bell-outline", description: "Fixing chime, transformer, and bell button wiring." }),
  createElectricalService({ id: "doorbell-install", title: "Doorbell Installation", hindiTitle: "डोरबेल इंस्टॉलेशन", price: "₹149", icon: "bell-outline", description: "Installing music doorbells and smart video doorbells." }),
  createElectricalService({ id: "cooler-repair", title: "Cooler Repair", hindiTitle: "कूलर रिपेयर", price: "₹249", icon: "air-conditioner", description: "Air cooler motor rewiring, pump, and switch repair." }),
  createElectricalService({ id: "tv-repair", title: "TV Electrical Repair", hindiTitle: "टीवी इलेक्ट्रिकल रिपेयर", price: "₹299", icon: "television", description: "Fixing TV power supply board and wall mount socket." }),
  createElectricalService({ id: "stabilizer-repair", title: "Stabilizer Repair", hindiTitle: "स्टेबलाइजर रिपेयर", price: "₹299", icon: "flash", description: "Voltage stabilizer relay and transformer repair." }),
  createElectricalService({ id: "pump-motor-panel", title: "Pump Motor Panel Repair", hindiTitle: "पंप मोटर पैनल रिपेयर", price: "₹399", icon: "engine", description: "Submersible pump starter panel and capacitor fix." }),
  createElectricalService({ id: "cctv-install", title: "CCTV Installation", hindiTitle: "सीसीटीवी इंस्टॉलेशन", price: "₹499", icon: "camera", description: "CCTV camera mounting, power SMPS, and DVR setup." }),
  createElectricalService({ id: "smart-lock-install", title: "Smart Lock Installation", hindiTitle: "स्मार्ट लॉक इंस्टॉलेशन", price: "₹599", icon: "lock-smart", description: "Fingerprint digital smart door lock fitting." }),
  createElectricalService({ id: "electrical-hero", title: "Electrical Safety Audit & Inspection", hindiTitle: "इलेक्ट्रिकल सेफ्टी निरीक्षण", price: "₹499", icon: "shield-account", description: "Safe, Reliable, Expert Electrical Care." }),
];

export const homeElectricalCategories = [
  { id: "electrical_switch", title: "Switch & Socket", icon: "power-plug" },
  { id: "electrical_fan", title: "Fan Repair", icon: "fan" },
  { id: "electrical_light", title: "Light Repair", icon: "lightbulb-outline" },
  { id: "electrical_ac", title: "AC Repair", icon: "air-conditioner" },
  { id: "electrical_geyser", title: "Geyser Repair", icon: "water-boiler" },
  { id: "electrical_inverter", title: "Inverter Repair", icon: "battery-charging" },
  { id: "electrical_wiring", title: "Wiring", icon: "cable" },
  { id: "electrical_smart", title: "Smart Home", icon: "home-automation" }
];

export const homeElectricalServices = electricalServices.slice(0, 8);
export const allElectricalServices = electricalServices;

export default electricalServices;
