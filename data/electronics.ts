import { ServiceDetail, ServiceItem } from "@/types/service";

// ---------- BASIC SERVICES ARRAY (used in serviceDetails.ts) ----------
export const electricalServices: ServiceItem[] = [
  {
    id: "switch-repair",
    title: "Switch & Socket Repair",
    hindiTitle: "स्विच और सॉकेट रिपेयर",
    category: "electronics",
    price: "₹199",
    description: "Professional repair for all types of light switches and sockets."
  },
  {
    id: "light-repair",
    title: "Light & Chandelier Repair",
    hindiTitle: "लाइट और झूमर रिपेयर",
    category: "electronics",
    price: "₹249",
    description: "Expert repair for LED, Panel, and decorative chandelier lights."
  },
  {
    id: "fan-repair",
    title: "Fan Repair & Maintenance",
    hindiTitle: "पंखे की रिपेयर",
    category: "electronics",
    price: "₹299",
    description: "Complete fan repair including bearing, winding, and regulator check."
  },
  {
    id: "wiring-repair",
    title: "Wiring & Short Circuit Repair",
    hindiTitle: "वायरिंग और शॉर्ट सर्किट रिपेयर",
    category: "electronics",
    price: "₹399",
    description: "Fault finding and expert repair for short circuits and internal wiring issues."
  },
  {
    id: "mcb-fuse-repair",
    title: "MCB & Fuse Repair",
    hindiTitle: "एमसीबी और फ्यूज रिपेयर",
    category: "electronics",
    price: "₹349",
    description: "Repair and replacement of MCB, RCCB, and Distribution Board components."
  },
  {
    id: "inverter-repair",
    title: "Inverter & UPS Repair",
    hindiTitle: "इन्वर्टर और यूपीएस रिपेयर",
    category: "electronics",
    price: "₹499",
    description: "Complete diagnostic and repair service for inverter and battery issues."
  }
];

// ---------- HELPER FUNCTION ----------
const createElectricalService = (
  config: Omit<
    ServiceDetail,
    "rating" | "reviewsCount" | "duration" | "visitCharge" | "labourFree" | "membershipEligible" | "subscriptionPlan" | "visitType" | "materialIncluded" | "emergencyAvailable" | "labourCharge"
  >
): ServiceDetail => ({
  rating: 4.9,
  reviewsCount: 850,
  duration: "45 Minutes",
  visitCharge: 49,
  labourFree: true,
  membershipEligible: true,
  subscriptionPlan: "699 Membership",
  visitType: "Home Visit",
  materialIncluded: false,
  emergencyAvailable: true,
  labourCharge: "FREE",
  library: config.library || "MaterialCommunityIcons",
  color: "#00A651",
  route: `/service/${config.id}`,
  ...config,
});

// ---------- DETAILS OBJECT ----------
export const electricalDetails: Record<string, ServiceDetail> = {
  // ⚡ SWITCH & SOCKET
  "switch-repair": createElectricalService({
    id: "switch-repair",
    title: "Switch & Socket Repair",
    hindiTitle: "स्विच और सॉकेट रिपेयर",
    icon: "power-plug",
    description: "Professional repair for all types of light switches and sockets.",
    variants: [
      { title: "Light Switch" },
      { title: "Power Socket" },
      { title: "USB Socket" },
      { title: "Dimmer Switch" }
    ],
    includes: [
      { title: "Inspection", icon: "eye" },
      { title: "Switch/Socket Repair", icon: "tools" },
      { title: "Wiring Check", icon: "cable-data" },
      { title: "Testing", icon: "check" }
    ],
    benefits: [
      { title: "Spark Protection", icon: "flash-off" },
      { title: "Safe Wiring", icon: "shield-check" }
    ],
    brandsUsed: ["Havells", "Anchor", "Schneider", "Legrand"],
    faq: [{ question: "Visit charge?", answer: "₹49." }],
    category: "offer"
  }),

  // 💡 LIGHT REPAIR
  "light-repair": createElectricalService({
    id: "light-repair",
    title: "Light & Chandelier Repair",
    hindiTitle: "लाइट और झूमर रिपेयर",
    icon: "lightbulb-outline",
    description: "Expert repair for LED, Panel, and decorative chandelier lights.",
    variants: [
      { title: "LED Light" },
      { title: "Tube Light" },
      { title: "Chandelier" },
      { title: "Sensor Light" }
    ],
    includes: [
      { title: "Bulb/Driver Check", icon: "lightbulb" },
      { title: "Wiring Repair", icon: "cable-data" },
      { title: "Fixture Cleaning", icon: "broom" },
      { title: "Testing", icon: "check" }
    ],
    benefits: [
      { title: "Bright Illumination", icon: "lightbulb" },
      { title: "Safe Fittings", icon: "check-circle" }
    ],
    brandsUsed: ["Philips", "Syska", "Havells", "Bajaj"],
    category: "offer"
  }),

  // 🪭 FAN REPAIR
  "fan-repair": createElectricalService({
    id: "fan-repair",
    title: "Fan Repair & Maintenance",
    hindiTitle: "पंखे की रिपेयर",
    icon: "fan",
    description: "Complete fan repair including bearing, winding, and regulator check.",
    variants: [
      { title: "Ceiling Fan" },
      { title: "Exhaust Fan" },
      { title: "Wall Fan" },
      { title: "Table Fan" }
    ],
    includes: [
      { title: "Bearing Check", icon: "cog" },
      { title: "Capacitor Replace", icon: "resistor-nodes" },
      { title: "Speed Testing", icon: "speedometer" },
      { title: "Noise Fix", icon: "volume-off" }
    ],
    benefits: [
      { title: "Silent Operation", icon: "volume-off" },
      { title: "Smooth Speed", icon: "speedometer" }
    ],
    brandsUsed: ["Crompton", "Usha", "Orient", "Havells"],
    category: "offer"
  }),

  // 🔌 WIRING & FAULTS
  "wiring-repair": createElectricalService({
    id: "wiring-repair",
    title: "Wiring & Short Circuit Repair",
    hindiTitle: "वायरिंग और शॉर्ट सर्किट रिपेयर",
    icon: "cable-data",
    description: "Fault finding and expert repair for short circuits and internal wiring issues.",
    variants: [
      { title: "Short Circuit" },
      { title: "Main Line Repair" },
      { title: "Internal Wiring" },
      { title: "Earthing Fault" }
    ],
    includes: [
      { title: "Fault Detection", icon: "flash-alert" },
      { title: "Wire Replacement", icon: "cable" },
      { title: "Joint Repair", icon: "tools" },
      { title: "Safety Audit", icon: "shield-check" }
    ],
    benefits: [
      { title: "Fire Safety", icon: "fire-off" },
      { title: "Stable Current", icon: "pulse" }
    ],
    brandsUsed: ["Polycab", "Havells", "Finolex"],
    category: "offer"
  }),

  // 🛡 MCB & DB
  "mcb-fuse-repair": createElectricalService({
    id: "mcb-fuse-repair",
    title: "MCB & Fuse Repair",
    hindiTitle: "एमसीबी और फ्यूज रिपेयर",
    icon: "fuse",
    description: "Repair and replacement of MCB, RCCB, and Distribution Board components.",
    variants: [
      { title: "MCB" },
      { title: "RCCB" },
      { title: "ELCB" },
      { title: "Fuse" }
    ],
    includes: [
      { title: "Tripping Inspection", icon: "flash" },
      { title: "MCB Replacement", icon: "electric-switch" },
      { title: "DB Box Audit", icon: "check-circle" }
    ],
    benefits: [
      { title: "Overload Protection", icon: "shield-alert" }
    ],
    brandsUsed: ["L&T", "Siemens", "Havells"],
    category: "offer"
  }),

  // 🔋 POWER BACKUP
  "inverter-repair": createElectricalService({
    id: "inverter-repair",
    title: "Inverter & UPS Repair",
    hindiTitle: "इन्वर्टर और यूपीएस रिपेयर",
    icon: "battery-charging",
    description: "Complete diagnostic and repair service for inverter and battery issues.",
    variants: [
      { title: "Inverter Repair" },
      { title: "Battery Service" },
      { title: "UPS Repair" },
      { title: "Stabilizer Fix" }
    ],
    includes: [
      { title: "Terminal Cleaning", icon: "battery" },
      { title: "Voltage Test", icon: "flash" },
      { title: "Circuit Check", icon: "cog" }
    ],
    benefits: [
      { title: "Uninterrupted Power", icon: "battery-high" }
    ],
    brandsUsed: ["Luminous", "Microtek", "Exide", "Amaron"],
    category: "offer"
  })
};


export default electricalServices;
