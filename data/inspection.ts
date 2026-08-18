// Module isolation
import { ServiceDetail } from "@/types/service"; export { };

// ---------- BASIC SERVICES ARRAY (used in serviceDetails.ts) ----------
export const inspectionServices = [
  {
    id: "full-home-inspection",
    title: "Full Home Safety Inspection",
    hindiTitle: "फुल होम सेफ्टी इंस्पेक्शन",
    price: "FREE with Membership",
    description: "Complete walk-through checkup of plumbing, electrical, and appliance health.",
    hindiDescription: "प्लंबिंग, इलेक्ट्रिकल और अप्लायंस की सेहत की पूरी जांच।"
  },
  {
    id: "electrical-safety-check",
    title: "Electrical Safety Check",
    hindiTitle: "इलेक्ट्रिकल सेफ्टी चेक",
    price: "₹199",
    description: "Inspection of wiring, switches, and earthing for fire and shock safety.",
    hindiDescription: "आग और शॉक से बचाव के लिए वायरिंग, स्विच और अर्थिंग की जांच।"
  },
  {
    id: "plumbing-leak-inspection",
    title: "Plumbing Leak Inspection",
    hindiTitle: "प्लंबिंग लीक इंस्पेक्शन",
    price: "₹149",
    description: "Detecting hidden leaks in pipes, taps, and water tanks before they cause damage.",
    hindiDescription: "नुकसान से पहले पाइप, नल और टंकी में छिपी हुई लीकेज की जांच।"
  },
  {
    id: "termite-inspection",
    title: "Termite & Pest Inspection",
    hindiTitle: "दीमक और पेस्ट इंस्पेक्शन",
    price: "₹249",
    description: "Checking furniture, walls, and woodwork for termite and pest activity.",
    hindiDescription: "फर्नीचर, दीवारों और लकड़ी के काम में दीमक व पेस्ट की जांच।"
  },
  {
    id: "appliance-health-check",
    title: "Appliance Health Checkup",
    hindiTitle: "अप्लायंस हेल्थ चेकअप",
    price: "₹199",
    description: "Preventive checkup of AC, fridge, washing machine, and other appliances.",
    hindiDescription: "एसी, फ्रिज, वाशिंग मशीन और अन्य उपकरणों की निवारक जांच।"
  },
  {
    id: "pre-purchase-inspection",
    title: "Pre-Purchase Property Inspection",
    hindiTitle: "प्री-परचेज़ प्रॉपर्टी इंस्पेक्शन",
    price: "₹999",
    description: "Detailed report on plumbing, electrical, and structural condition before you buy.",
    hindiDescription: "खरीदने से पहले प्लंबिंग, इलेक्ट्रिकल और स्ट्रक्चर की स्थिति की विस्तृत रिपोर्ट।"
  }
];

// ---------- HELPER FUNCTION ----------
const createInspectionService = (
  config: Omit<
    ServiceDetail,
    "rating" | "reviewsCount" | "duration" | "visitCharge" | "labourFree" | "membershipEligible" | "subscriptionPlan" | "visitType" | "materialIncluded" | "emergencyAvailable" | "labourCharge"
  >
): ServiceDetail => ({
  rating: 4.8,
  reviewsCount: 700,
  duration: "30-45 Minutes",
  visitCharge: 0,
  labourFree: true,
  membershipEligible: true,
  subscriptionPlan: "699 Membership",
  visitType: "Home Visit",
  materialIncluded: true,
  emergencyAvailable: false,
  labourCharge: "FREE with Membership",
  library: "MaterialCommunityIcons",
  color: "#00A651",
  route: `/service/${config.id}`,
  ...config,
});

// ---------- DETAILS OBJECT (used in service pages) ----------
export const inspectionDetails: Record<string, ServiceDetail> = {
  "full-home-inspection": createInspectionService({
    id: "full-home-inspection",
    title: "Full Home Safety Inspection",
    hindiTitle: "फुल होम सेफ्टी इंस्पेक्शन",
    icon: "clipboard-check",
    description: "Complete walk-through checkup of plumbing, electrical, and appliance health.",
    hindiDescription: "प्लंबिंग, इलेक्ट्रिकल और अप्लायंस की सेहत की पूरी जांच।",
    variants: [{ title: "1 BHK" }, { title: "2 BHK" }, { title: "3 BHK / Villa" }],
    includes: [
      { title: "Plumbing Check", icon: "water-pump" },
      { title: "Electrical Check", icon: "flash" },
      { title: "Appliance Check", icon: "washing-machine" },
      { title: "Detailed Report", icon: "clipboard-text" }
    ],
    benefits: [{ title: "Catch Issues Early", icon: "shield-check" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  }),

  "electrical-safety-check": createInspectionService({
    id: "electrical-safety-check",
    title: "Electrical Safety Check",
    hindiTitle: "इलेक्ट्रिकल सेफ्टी चेक",
    icon: "flash-alert",
    description: "Inspection of wiring, switches, and earthing for fire and shock safety.",
    hindiDescription: "आग और शॉक से बचाव के लिए वायरिंग, स्विच और अर्थिंग की जांच।",
    variants: [{ title: "Basic Check" }, { title: "Full House Check" }],
    includes: [
      { title: "Wiring Inspection", icon: "cable-data" },
      { title: "Earthing Check", icon: "power-plug" },
      { title: "Load Testing", icon: "gauge" }
    ],
    benefits: [{ title: "Fire Risk Reduction", icon: "fire-off" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  }),

  "plumbing-leak-inspection": createInspectionService({
    id: "plumbing-leak-inspection",
    title: "Plumbing Leak Inspection",
    hindiTitle: "प्लंबिंग लीक इंस्पेक्शन",
    icon: "pipe-leak",
    description: "Detecting hidden leaks in pipes, taps, and water tanks before they cause damage.",
    hindiDescription: "नुकसान से पहले पाइप, नल और टंकी में छिपी हुई लीकेज की जांच।",
    variants: [{ title: "Kitchen & Bathroom" }, { title: "Full House" }],
    includes: [
      { title: "Pipe Check", icon: "pipe" },
      { title: "Tap & Fitting Check", icon: "water" },
      { title: "Tank Inspection", icon: "water-pump" }
    ],
    benefits: [{ title: "Prevent Water Damage", icon: "shield-check" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  }),

  "termite-inspection": createInspectionService({
    id: "termite-inspection",
    title: "Termite & Pest Inspection",
    hindiTitle: "दीमक और पेस्ट इंस्पेक्शन",
    icon: "magnify-scan",
    description: "Checking furniture, walls, and woodwork for termite and pest activity.",
    hindiDescription: "फर्नीचर, दीवारों और लकड़ी के काम में दीमक व पेस्ट की जांच।",
    variants: [{ title: "Furniture Check" }, { title: "Full House Check" }],
    includes: [
      { title: "Furniture Inspection", icon: "table-furniture" },
      { title: "Wall & Woodwork Check", icon: "wall" },
      { title: "Report & Recommendation", icon: "clipboard-text" }
    ],
    benefits: [{ title: "Protect Your Furniture", icon: "shield-check" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  }),

  "appliance-health-check": createInspectionService({
    id: "appliance-health-check",
    title: "Appliance Health Checkup",
    hindiTitle: "अप्लायंस हेल्थ चेकअप",
    icon: "washing-machine",
    description: "Preventive checkup of AC, fridge, washing machine, and other appliances.",
    hindiDescription: "एसी, फ्रिज, वाशिंग मशीन और अन्य उपकरणों की निवारक जांच।",
    variants: [{ title: "Single Appliance" }, { title: "Multiple Appliances" }],
    includes: [
      { title: "Performance Check", icon: "gauge" },
      { title: "Safety Check", icon: "shield-check" },
      { title: "Maintenance Tips", icon: "clipboard-text" }
    ],
    benefits: [{ title: "Extend Appliance Life", icon: "clock-check-outline" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  }),

  "pre-purchase-inspection": createInspectionService({
    id: "pre-purchase-inspection",
    title: "Pre-Purchase Property Inspection",
    hindiTitle: "प्री-परचेज़ प्रॉपर्टी इंस्पेक्शन",
    icon: "home-search",
    description: "Detailed report on plumbing, electrical, and structural condition before you buy.",
    hindiDescription: "खरीदने से पहले प्लंबिंग, इलेक्ट्रिकल और स्ट्रक्चर की स्थिति की विस्तृत रिपोर्ट।",
    variants: [{ title: "Apartment" }, { title: "Independent House" }],
    includes: [
      { title: "Plumbing & Electrical Check", icon: "flash" },
      { title: "Structural Check", icon: "home-city" },
      { title: "Detailed Written Report", icon: "clipboard-text" }
    ],
    benefits: [{ title: "Buy with Confidence", icon: "shield-check" }],
    brandsUsed: ["HandysCompany Certified"],
    category: "inspection"
  })
};

export const homeInspectionServices = Object.values(inspectionDetails);
export const allInspectionServices = Object.values(inspectionDetails);
export default inspectionServices;
