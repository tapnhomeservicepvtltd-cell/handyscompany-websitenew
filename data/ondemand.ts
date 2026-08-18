import { ServiceItem } from "@/types/service";

export const ONDEMAND_THEME = "#F59E0B";
export const ONDEMAND_PRIMARY_COLOR = "#D97706";

export const onDemandServices: ServiceItem[] = [
  {
    id: "ondemand_driver",
    title: "Driver on Demand",
    hindiTitle: "ड्राइवर ऑन डिमांड",
    rating: 4.8,
    reviewsCount: 312,
    price: "₹399",
    duration: "4 - 8 Hrs",
    description: "Hire a professional driver for local city travel or outstation trips.",
    category: "ondemand",
    icon: "car",
    images: ["driver-ondemand"],
    popular: true,
    membershipEligible: false,
    subscriptionPlan: "Pay per trip",
    visitType: "Flexible",
    materialIncluded: false,
    emergencyAvailable: true,
    labourCharge: "₹399",
  },
  {
    id: "ondemand_tour_guide",
    title: "Tourist Guide (Bodhgaya)",
    hindiTitle: "टूरिस्ट गाइड (बोधगया)",
    rating: 4.9,
    reviewsCount: 420,
    price: "₹499 / Day",
    duration: "Full Day",
    description: "Verified local guide for Bodhgaya temples, Sujata Garh, and sightseeing.",
    category: "ondemand",
    icon: "map-marker-radius",
    images: ["tourist-guide"],
    popular: true,
    membershipEligible: false,
    subscriptionPlan: "Per Day",
    visitType: "Scheduled",
    materialIncluded: false,
    emergencyAvailable: false,
    labourCharge: "₹499",
  },
  {
    id: "ondemand_scooty",
    title: "Scooty / Bike Rental",
    hindiTitle: "स्कूटी रेंटल",
    rating: 4.8,
    reviewsCount: 315,
    price: "₹350 / Day",
    duration: "Full Day",
    description: "Rent a scooty or bike for easy travel around Bodhgaya and Gaya.",
    category: "ondemand",
    icon: "motorbike",
    images: ["scooty-rental"],
    popular: true,
    membershipEligible: false,
    subscriptionPlan: "Per Day",
    visitType: "Pickup/Delivery",
    materialIncluded: false,
    emergencyAvailable: false,
    labourCharge: "₹350",
  },
  {
    id: "ondemand_panditji",
    title: "Pandit Ji / Purohit",
    hindiTitle: "पंडित जी / पुरोहित",
    rating: 4.9,
    reviewsCount: 540,
    price: "₹501",
    duration: "1 - 3 Hrs",
    description: "Book an experienced Pandit Ji for Pind Daan, Hawan, or Griha Pravesh.",
    category: "ondemand",
    icon: "om",
    images: ["pandit-ji"],
    popular: true,
    membershipEligible: false,
    subscriptionPlan: "Per Puja",
    visitType: "Scheduled",
    materialIncluded: false,
    emergencyAvailable: false,
    labourCharge: "₹501",
  },
  {
    id: "ondemand_tiffin",
    title: "Tiffin & Homemade Food",
    hindiTitle: "टिफिन व घरेलू खाना",
    rating: 4.7,
    reviewsCount: 220,
    price: "₹70 / meal",
    duration: "Daily",
    description: "Hygienic, home-cooked daily meals delivered to your doorstep.",
    category: "ondemand",
    icon: "food",
    images: ["tiffin-service"],
    membershipEligible: false,
    subscriptionPlan: "Monthly Available",
    visitType: "Delivery",
    materialIncluded: true,
    emergencyAvailable: false,
    labourCharge: "₹70",
  },
  {
    id: "ondemand_job",
    title: "Local Job Search & Hiring",
    hindiTitle: "लोकल जॉब सर्च",
    rating: 4.5,
    reviewsCount: 95,
    price: "FREE",
    duration: "Instant",
    description: "Find local helpers, delivery boys, or shop staff easily.",
    category: "ondemand",
    icon: "briefcase",
    images: ["local-jobs"],
    membershipEligible: true,
    subscriptionPlan: "Free Access",
    visitType: "Online",
    materialIncluded: false,
    emergencyAvailable: false,
    labourCharge: "FREE",
  },
  {
    id: "ondemand_tutor",
    title: "Home Tutor",
    hindiTitle: "होम ट्यूशन",
    rating: 4.8,
    reviewsCount: 150,
    price: "₹1500 / mo",
    duration: "Monthly",
    description: "Find verified local tuition teachers for CBSE, ICSE, or BSEB students.",
    category: "ondemand",
    icon: "school",
    images: ["home-tutor"],
    membershipEligible: false,
    subscriptionPlan: "Monthly",
    visitType: "Scheduled",
    materialIncluded: false,
    emergencyAvailable: false,
    labourCharge: "₹1500",
  },
  {
    id: "ondemand_errand",
    title: "Local Errand / Delivery Boy",
    hindiTitle: "लोकल कूरियर बॉय",
    rating: 4.6,
    reviewsCount: 180,
    price: "₹99",
    duration: "1 Hr",
    description: "Send a boy to deliver packages, buy groceries, or get medicines.",
    category: "ondemand",
    icon: "moped",
    images: ["errand-boy"],
    membershipEligible: true,
    subscriptionPlan: "Discounted for Members",
    visitType: "Instant",
    materialIncluded: false,
    emergencyAvailable: true,
    labourCharge: "₹99",
  },
  {
    id: "ondemand_carwash",
    title: "Car Wash at Home",
    hindiTitle: "कार वाश एट होम",
    rating: 4.7,
    reviewsCount: 210,
    price: "₹299",
    duration: "1 Hr",
    description: "Professional exterior and interior car cleaning at your doorstep.",
    category: "ondemand",
    icon: "car-wash",
    images: ["car-wash"],
    popular: true,
    membershipEligible: true,
    subscriptionPlan: "699 Membership",
    visitType: "Scheduled",
    materialIncluded: true,
    emergencyAvailable: false,
    labourCharge: "₹299",
  },
  {
    id: "ondemand_laundry",
    title: "Laundry & Ironing",
    hindiTitle: "लॉन्ड्री व प्रेस",
    rating: 4.8,
    reviewsCount: 290,
    price: "₹15 / cloth",
    duration: "24 Hrs",
    description: "Pickup and drop laundry service with professional ironing.",
    category: "ondemand",
    icon: "washing-machine",
    images: ["laundry"],
    membershipEligible: false,
    subscriptionPlan: "Per Cloth",
    visitType: "Scheduled",
    materialIncluded: true,
    emergencyAvailable: false,
    labourCharge: "₹15",
  }
];

export const onDemandDetailsList = [
  {
    id: "ondemand_driver",
    title: "Driver on Demand",
    price: "₹399",
    description: "Hire a professional, verified driver for your car. Safe and reliable driving for local city travel, outstation trips, or airport pick/drop.",
    includes: [
      "Professional & verified driver",
      "Flexible timings (4 to 8 Hrs)",
      "Local city travel or outstation",
      "Valid commercial driving license"
    ],
    faqs: [
      { question: "Is the driver verified?", answer: "Yes, all our drivers are background verified with valid IDs and driving licenses." },
      { question: "What if I need the driver for outstation?", answer: "Outstation charges may vary based on days and night-stay. The initial booking covers the base rate." }
    ]
  },
  {
    id: "ondemand_tour_guide",
    title: "Tourist Guide (Bodhgaya)",
    price: "₹499 / Day",
    description: "Book a certified and knowledgeable local guide for Bodhgaya temples, Mahabodhi Temple, Sujata Garh, and nearby sightseeing.",
    includes: [
      "Verified local guide",
      "Knowledge of history and culture",
      "Full day availability",
      "Customized itinerary planning"
    ],
    faqs: [
      { question: "Do they speak English?", answer: "Yes, you can request an English-speaking guide at the time of booking." },
      { question: "Does the price include transport?", answer: "No, this price is only for the guide's service. Transport must be arranged separately." }
    ]
  },
  {
    id: "ondemand_scooty",
    title: "Scooty / Bike Rental",
    price: "₹350 / Day",
    description: "Rent a well-maintained scooty or bike for easy and quick travel around Bodhgaya and Gaya. Hassle-free booking and pickup.",
    includes: [
      "Well-maintained vehicle",
      "1 Helmet included",
      "Full day rental (12 Hrs)",
      "Instant booking confirmation"
    ],
    faqs: [
      { question: "Do I need to pay a security deposit?", answer: "A refundable security deposit and original ID are required at the time of pickup." },
      { question: "Is fuel included?", answer: "No, the vehicle is provided with a minimum fuel level. You must refuel it as per your need." }
    ]
  },
  {
    id: "ondemand_panditji",
    title: "Pandit Ji / Purohit",
    price: "₹501",
    description: "Book a highly experienced and knowledgeable Pandit Ji for Pind Daan, Satyanarayan Katha, Griha Pravesh, Hawan, and other pujas.",
    includes: [
      "Experienced Purohit",
      "Proper Vedic rituals",
      "Pind Daan & Hawan expertise",
      "Flexible scheduling"
    ],
    faqs: [
      { question: "Do they bring Puja Samagri?", answer: "No, the Pandit Ji will provide you with a list of items to buy, or you can request them to bring it for an extra cost." },
      { question: "Can they perform Pind Daan?", answer: "Yes, our Pandits specialize in Pind Daan and Gaya Shraddh rituals." }
    ]
  },
  {
    id: "ondemand_carwash",
    title: "Car Wash at Home",
    price: "₹299",
    description: "Professional exterior and interior car cleaning at your doorstep. We use high-quality foam and microfiber cloths.",
    includes: [
      "Exterior foam wash",
      "Interior vacuuming & dusting",
      "Tyre polishing",
      "Dashboard cleaning"
    ],
    faqs: [
      { question: "Do I need to provide water?", answer: "Yes, access to a water connection and electricity (for vacuum) is required at your location." }
    ]
  },
  {
    id: "ondemand_laundry",
    title: "Laundry & Ironing",
    price: "₹15 / cloth",
    description: "Hassle-free pickup and drop laundry service with professional washing and ironing.",
    includes: [
      "Doorstep pickup & drop",
      "Stain removal & washing",
      "Crisp ironing",
      "Folded & packed delivery"
    ],
    faqs: [
      { question: "When will I get my clothes back?", answer: "Standard delivery time is 24-48 hours from the time of pickup." }
    ]
  },
  {
    id: "ondemand_tiffin",
    title: "Tiffin & Homemade Food",
    price: "₹70",
    description: "Hygienic, delicious, and healthy home-cooked daily meals delivered straight to your doorstep.",
    includes: [
      "Fresh homemade food",
      "Roti, Rice, Dal, Sabzi",
      "Hygienic packaging",
      "Doorstep delivery"
    ],
    faqs: [
      { question: "Can I subscribe monthly?", answer: "Yes, monthly subscriptions are available at discounted rates." }
    ]
  },
  {
    id: "ondemand_errand",
    title: "Local Errand / Delivery Boy",
    price: "₹99",
    description: "Need something from the market? Send our reliable errand boy to buy groceries, medicines, or deliver a local courier.",
    includes: [
      "Instant pickup",
      "Market purchases",
      "Document delivery",
      "Safe handling"
    ],
    faqs: [
      { question: "Is there a weight limit?", answer: "Yes, the maximum weight allowed is usually 10-15 kg for two-wheeler deliveries." }
    ]
  },
  {
    id: "ondemand_job",
    title: "Local Job Search & Hiring",
    price: "FREE",
    description: "Looking for staff for your shop, office, or home? We help you connect with reliable local helpers and staff.",
    includes: [
      "Requirement posting",
      "Candidate matching",
      "Local verified helpers",
      "Instant connection"
    ],
    faqs: [
      { question: "Is there any commission?", answer: "No, this is a free connection service to help locals find jobs." }
    ]
  },
  {
    id: "ondemand_tutor",
    title: "Home Tutor",
    price: "₹1500 / mo",
    description: "Find verified and experienced local tuition teachers for your children (CBSE, ICSE, or BSEB).",
    includes: [
      "Verified local teachers",
      "Subject specific tutoring",
      "Flexible timings",
      "Monthly progress updates"
    ],
    faqs: [
      { question: "Do you offer demo classes?", answer: "Yes, most of our tutors offer a 1-day free demo class." }
    ]
  }
];

export const onDemandDetails = onDemandDetailsList.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, any>);
