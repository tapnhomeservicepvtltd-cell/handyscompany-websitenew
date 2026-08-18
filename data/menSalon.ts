import { ServiceItem } from "@/types/service";

export const MEN_THEME = "#2563EB";

const createMenItem = (
  config: Partial<ServiceItem> & Pick<ServiceItem, "id" | "title" | "hindiTitle" | "price" | "description" | "hindiDescription">
): ServiceItem => ({
  rating: 4.8,
  reviewsCount: 710,
  duration: "30-45 Mins",
  visitCharge: 0,
  labourFree: true,
  membershipEligible: true,
  subscriptionPlan: "699 Membership",
  visitType: "Home Visit",
  materialIncluded: true,
  emergencyAvailable: true,
  labourCharge: "FREE",
  library: "MaterialCommunityIcons",
  color: MEN_THEME,
  route: `/service/${config.id}`,
  category: "men-salon",
  icon: config.icon || "content-cut",
  includes: [
    { title: "Single-Use Disposable Towel", icon: "shield-check" },
    { title: "Sanitized Scissors & Trimmer", icon: "sanitizer" },
    { title: "Post-Service Cleanup", icon: "broom" }
  ],
  benefits: [
    { title: "Experienced Barber at Home", icon: "account-check" },
    { title: "100% Hygienic Kits", icon: "shield" }
  ],
  brandsUsed: ["L'Oreal Professionnel", "Schwarzkopf", "Nivea Men", "O3+", "Streax"],
  ...config,
});

export const menSalonServices: ServiceItem[] = [
  createMenItem({ id: "men_haircut", title: "Men's Classic Haircut & Styling", hindiTitle: "हेयरकट व हेयर स्टाइलिंग", price: "₹199", icon: "content-cut", description: "Professional haircut tailored to your face shape, neck shave, & hair styling.", hindiDescription: "चेहरे के अनुसार प्रोफेशनल हेयरकट, गर्दन की शेव व स्टाइलिंग।" }),
  createMenItem({ id: "men_beard_trim", title: "Beard Shaping & Styling", hindiTitle: "बियर्ड शेपिंग व स्टाइलिंग", price: "₹129", icon: "face-man-shaved", description: "Precision razor edging, beard trimming, & nourishing beard oil application.", hindiDescription: "ब्लेड से फिनिशिंग, बियर्ड ट्रिमिंग व बियर्ड ऑयल मसाज।" }),
  createMenItem({ id: "men_hair_color", title: "Men's Hair Color / Black Henna", hindiTitle: "हेयर कलर व डाई", price: "₹299", icon: "brush", description: "Ammonia-free natural black/brown shade hair coloring by professional barber.", hindiDescription: "अमोनिया फ्री नेचुरल ब्लैक/ब्राउन हेयर कलरिंग।" }),
  createMenItem({ id: "men_facial", title: "Men's O3+ De-Tan Glow Facial", hindiTitle: "ओ3+ डी-टैन ग्लो फेशियल", price: "₹599", icon: "sparkles", description: "Deep skin exfoliation, tan removal pack, and relaxing face massage.", hindiDescription: "त्वचा की गंदगी व टैनिंग हटाने वाला ओ3+ फेशियल।" }),
  createMenItem({ id: "men_head_massage", title: "Relaxing Hot Oil Head Massage", hindiTitle: "हॉट ऑयल हेड मसाज", price: "₹199", icon: "spa", description: "15-minute soothing scalp massage with Navratna / Almond oil.", hindiDescription: "15 मिनट की बादाम/नवरत्न तेल से सिर की मालिश।" }),
  createMenItem({ id: "men_pedicure", title: "Men's Foot Care Pedicure", hindiTitle: "मेन पेडीक्योर फुट केयर", price: "₹499", icon: "foot-print", description: "Dead skin scrubbing, nail trimming, heel crack filing, & foot massage.", hindiDescription: "पैरों की जमी गंदगी, एड़ी की दरारें साफ करना व मसाज।" }),
  createMenItem({ id: "men_manicure", title: "Men's Hand Care Manicure", hindiTitle: "मेन मेनिक्योर हैंड केयर", price: "₹399", icon: "hand-wash", description: "Nail shaping, cuticle cleaning, hand scrub, and moisturizing massage.", hindiDescription: "नाखूनों की शेपिंग, क्यूटिकल सफाई व हैंड मसाज।" }),
  createMenItem({ id: "men_clean_up", title: "Charcoal Face Cleanup", hindiTitle: "चारकोल फेस क्लीनअप", price: "₹349", icon: "face-man", description: "Blackhead removal, charcoal peel-off mask, and skin pore cleansing.", hindiDescription: "ब्लैकहेड्स हटाने व स्किन पोर्स सफाई के लिए चारकोल मास्क।" }),
  createMenItem({ id: "men_beard_color", title: "Beard Color / Mustache Dye", hindiTitle: "बियर्ड व मूंछ कलर", price: "₹199", icon: "brush", description: "Safe skin-friendly grey beard coverage in natural shades.", hindiDescription: "सफेद दाढ़ी व मूंछों का सेफ नेचुरल कलर।" }),
  createMenItem({ id: "men_hair_spa", title: "Anti-Dandruff Hair Spa", hindiTitle: "एंटी-डैंड्रफ हेयर स्पा", price: "₹499", icon: "shower", description: "Scalp cream massage, deep steam, & anti-dandruff hair wash.", hindiDescription: "सिर की खुजली व डैंड्रफ दूर करने वाला हेयर स्पा।" }),
  createMenItem({ id: "men_shave", title: "Clean Shave with Hot Towel", hindiTitle: "हॉट टॉवल क्लीन शेव", price: "₹99", icon: "face-man-shaved", description: "Hot steam towel wrap, smooth foam lather, blade shave, & aftershave.", hindiDescription: "हॉट टॉवल स्टीम, फोम शेव व आफ्टरशेव लोशन।" }),
  createMenItem({ id: "men_head_shave", title: "Head Shave (Ballding Clean)", hindiTitle: "सिर मुंडन / क्लीन हेड शेव", price: "₹199", icon: "account", description: "Smooth head shave with fresh blade, Dettol wash, & scalp oil.", hindiDescription: "सिर का मुंडन, डेटॉल वॉश व स्कैल्प ऑयल।" }),
  createMenItem({ id: "men_kid_haircut", title: "Kids Haircut at Home", hindiTitle: "बच्चों का हेयरकट", price: "₹149", icon: "face-man-outline", description: "Gentle & patient scissor haircut for young boys at home comfort.", hindiDescription: "घर पर छोटे बच्चों का प्यार से हेयरकट।" }),
  createMenItem({ id: "men_hair_keratin", title: "Hair Keratin Smoothing", hindiTitle: "हेयर केराटिन स्मूथनिंग", price: "₹999", icon: "hair-dryer", description: "Frizz control protein treatment for silky straight men's hair.", hindiDescription: "बालों को सिल्क व सीधा करने वाला केराटिन ट्रीटमेंट।" }),
  createMenItem({ id: "men_detan_pack", title: "Face & Neck Instaglow De-Tan", hindiTitle: "फेस व नेक डी-टैन पैक", price: "₹249", icon: "sun-thermometer", description: "Instant sun tan removal pack for face, ears, and neck area.", hindiDescription: "चेहरे व गर्दन की धूप की कालिमा हटाने वाला पैक।" }),
  createMenItem({ id: "men_eyebrow_thread", title: "Eyebrow & Nose Hair Trim", hindiTitle: "आइब्रो व नाक बाल ट्रिमिंग", price: "₹79", icon: "scissors-cutting", description: "Trimming overgrown eyebrow edges, ear hair, and nose hair.", hindiDescription: "आइब्रो सेट करना, कान व नाक के बाल ट्रिम।" }),
  createMenItem({ id: "men_face_bleach", title: "Gold Face Bleach Glow", hindiTitle: "गोल्ड फेस ब्लीच", price: "₹199", icon: "creation", description: "Mild skin lighting gold bleach for instant party glow.", hindiDescription: "चेहरे की रंगत निखारने वाला गोल्ड ब्लीच।" }),
  createMenItem({ id: "men_back_massage", title: "Shoulder & Back Relaxation", hindiTitle: "शोल्डर व बैक मसाज", price: "₹299", icon: "human-handsup", description: "20-minute deep tissue massage for neck stiffness and lower back.", hindiDescription: "गर्दन व पीठ के दर्द के लिए 20 मिनट की मालिश।" }),
  createMenItem({ id: "men_waxing_chest", title: "Chest & Stomach Waxing", hindiTitle: "चेस्ट व स्टमक वैक्सिंग", price: "₹399", icon: "arm-flex", description: "Rica painless strip waxing for smooth hairless chest & stomach.", hindiDescription: "चेस्ट के बालों को सफाई से हटाने वाली रिका वैक्सिंग।" }),
  createMenItem({ id: "men_grooming_package", title: "Full Grooming Package (Cut+Beard+Face)", hindiTitle: "फुल ग्रूमिंग पैकेज", price: "₹599", icon: "account-star", description: "Haircut, beard styling, facial clean up, & head massage combo.", hindiDescription: "हेयरकट, बियर्ड स्टाइल, फेशियल व हेड मसाज कॉम्बो।" }),
  createMenItem({ id: "men_groom_wedding", title: "Groom Wedding Makeover", hindiTitle: "दूल्हा वेडिंग मेकओवर", price: "₹1,999", icon: "crown", description: "Pre-wedding facial, hair styling, beard sculpt, manicure, & glow.", hindiDescription: "दूल्हे के लिए स्पेशल प्री-वेडिंग फेशियल व मेकओवर।" }),
  createMenItem({ id: "men_grey_coverage", title: "Sideburns & Mustache Touchup", hindiTitle: "मूंछ व साइडबर्न टचअप", price: "₹99", icon: "brush", description: "Quick 10-minute color touchup for temple grey hair & mustache.", hindiDescription: "सफेद मूंछों व साइडबर्न का 10 मिनट का कलर टचअप।" }),
  createMenItem({ id: "men_ear_piercing", title: "Gunshot Ear Piercing for Men", hindiTitle: "कान छिदवाना (गनशॉट)", price: "₹299", icon: "circle-double", description: "Pain-free sterile ear piercing with surgical steel stud.", hindiDescription: "स्टेरिल गन से कान छिदवाना व स्टड।" }),
  createMenItem({ id: "men_hair_straightening", title: "Permanent Hair Straightening", hindiTitle: "हेयर स्ट्रेटनिंग", price: "₹1,299", icon: "laser-pointer", description: "Permanent hair rebounding cream treatment for curly hair.", hindiDescription: "घुंघराले बालों को स्थायी रूप से सीधा करना।" }),
  createMenItem({ id: "men_scalp_scrub", title: "Scalp Exfoliation Scrub", hindiTitle: "स्कैल्प एक्सफोलिएशन स्क्रब", price: "₹299", icon: "water-percent", description: "Clearing buildup and dead skin cells from hair roots.", hindiDescription: "सिर की त्वचा की गहराई से सफाई।" }),
  createMenItem({ id: "men_fruit_facial", title: "Organic Fruit Facial", hindiTitle: "ऑर्गेनिक फ्रूट फेशियल", price: "₹399", icon: "food-apple-outline", description: "Natural papaya and orange fruit pack for sensitive skin.", hindiDescription: "पपीते व संतरे के अर्क से प्राकृतिक फ्रूट फेशियल।" }),
  createMenItem({ id: "men_underarm_wax", title: "Underarm Hair Removal Waxing", hindiTitle: "अंडरआर्म वैक्सिंग", price: "₹149", icon: "hand", description: "Hygienic underarm hair removal with Rica aloe vera wax.", hindiDescription: "अंडरआर्म्स के बालों की सफाई रिका वैक्स से।" }),
  createMenItem({ id: "men_body_massage", title: "Full Body Swedesish Therapy", hindiTitle: "फुल बॉडी स्वीडिश मालिश", price: "₹999", icon: "spa-outline", description: "60-minute relaxing full body oil therapy for muscle soreness.", hindiDescription: "60 मिनट की पूरे शरीर की रिलैक्सिंग मसाज।" }),
  createMenItem({ id: "men_foot_reflexology", title: "Foot Pressure Reflexology", hindiTitle: "फुट रिफ्लेक्सोलॉजी मसाज", price: "₹349", icon: "foot-print", description: "30-minute acupressure foot massage for blood circulation.", hindiDescription: "30 मिनट की पैरों की एक्यूप्रेशर मालिश।" }),
  createMenItem({ id: "men_skin_brightening", title: "Diamond Skin Brightening Facial", hindiTitle: "डायमंड स्किन ब्राइटनिंग", price: "₹699", icon: "diamond-stone", description: "Micro-dermabrasion diamond polish for glowing fair skin.", hindiDescription: "चेहरे की रंगत निखारने के लिए डायमंड पॉलिश फेशियल।" }),
  createMenItem({ id: "men_head_lice", title: "Lice Removal Scalp Wash", hindiTitle: "जूं हटाने का स्कैल्प वॉश", price: "₹249", icon: "ant", description: "Medicated anti-lice shampoo treatment & comb out.", hindiDescription: "मेडिकेटेड जूं नाशक शैम्पू ट्रीटमेंट।" }),
  createMenItem({ id: "men_blackhead_peel", title: "Nose Strip Blackhead Removal", hindiTitle: "नाक के ब्लैकहेड्स सफाई", price: "₹99", icon: "face-man-profile", description: "Steam extraction and pore strip for nose blackheads.", hindiDescription: "नाक के कीलों (ब्लैकहेड्स) की स्टीम सफाई।" }),
  createMenItem({ id: "men_beard_spa", title: "Beard Nourishing Spa & Steaming", hindiTitle: "बियर्ड स्पा व स्टीम", price: "₹249", icon: "beard", description: "Hot towel steam, argan oil conditioning, and comb styling.", hindiDescription: "दाढ़ी की गहरी सॉफ्टनिंग व अरगन ऑयल स्पा।" }),
  createMenItem({ id: "men_full_arms_wax", title: "Full Arms Hair Waxing", hindiTitle: "फुल आर्म्स वैक्सिंग", price: "₹299", icon: "arm-flex-outline", description: "Complete arms hair removal up to shoulders.", hindiDescription: "कंधे तक पूरे हाथों की रिका वैक्सिंग।" }),
  createMenItem({ id: "men_full_legs_wax", title: "Full Legs Hair Waxing", hindiTitle: "फुल लेग्स वैक्सिंग", price: "₹499", icon: "human-legs", description: "Smooth leg hair removal for athletes and bodybuilders.", hindiDescription: "पैरों की सफाई के लिए फुल लेग्स वैक्सिंग।" }),
  createMenItem({ id: "men_back_waxing", title: "Full Back Hair Removal Wax", hindiTitle: "बैक वैक्सिंग (पीठ सफाई)", price: "₹399", icon: "human", description: "Hygienic back hair removal with anti-irritation lotion.", hindiDescription: "पीठ के बालों की सफाई व लोशन लगाइ।" }),
  createMenItem({ id: "men_anti_acne_facial", title: "Neem & Tea Tree Anti-Acne Fix", hindiTitle: "एंटी-एक्ने पिंपल फेशियल", price: "₹499", icon: "medical-bag", description: "Targeted treatment for pimples, oiliness, and skin acne.", hindiDescription: "कील-मुहासों व तैलीय त्वचा का नीम फेशियल।" }),
  createMenItem({ id: "men_hair_highlights", title: "Men's Hair Color Streak Highlight", hindiTitle: "हेयर स्ट्रीक हाइलाइट्स", price: "₹499", icon: "palette", description: "Burgundy, blonde, or copper streak highlights for modern look.", hindiDescription: "बालों की फैशनेबल हाइलाइटिंग।" }),
  createMenItem({ id: "men_head_steam", title: "Scalp Oil Steaming & Wash", hindiTitle: "सिर में तेल व स्टीम", price: "₹149", icon: "cloud", description: "Hot hair steam after oiling to open hair follicles.", hindiDescription: "ऑयलिंग के बाद गर्म भाप (स्टीम)।" }),
  createMenItem({ id: "men_thread_tan", title: "Upper Lip & Chin Threading", hindiTitle: "अपर लिप व चिन थ्रेडिंग", price: "₹59", icon: "dots-horizontal", description: "Precision thread hair plucking for unwanted face hair.", hindiDescription: "चेहरे के छोटे धागे से बाल हटाना।" }),
  createMenItem({ id: "men_charcoal_pedicure", title: "Charcoal Detox Pedicure", hindiTitle: "चारकोल डिटॉक्स पेडीक्योर", price: "₹599", icon: "shoe-heel", description: "Detox foot soak, charcoal scrub, and heel callus shaver.", hindiDescription: "पैरों की गहराई से सफाई व चारकोल स्क्रब।" }),
  createMenItem({ id: "men_hand_reflex", title: "Hand & Wrist Acupressure", hindiTitle: "हैंड व कलाई मसाज", price: "₹199", icon: "hand-okay", description: "15-minute wrist and palm massage for laptop keyboard workers.", hindiDescription: "कंप्यूटर यूजर्स के लिए कलाई व हथेली मालिश।" }),
  createMenItem({ id: "men_tan_removal_arms", title: "Full Arms De-Tan Pack", hindiTitle: "हाथों का डी-टैन पैक", price: "₹249", icon: "weather-sunny", description: "Removing sun tan dark patches on arms.", hindiDescription: "हाथों पर धूप की कालिमा का डी-टैन।" }),
  createMenItem({ id: "men_beard_straightening", title: "Beard Smoothening Straighten", hindiTitle: "बियर्ड स्मूथनिंग व स्ट्रेट", price: "₹349", icon: "face-man-shaved", description: "Straightening curly stubborn beard hair for neat beard look.", hindiDescription: "टेढ़ी दाढ़ी के बालों को सीधा करना।" }),
  createMenItem({ id: "men_face_threading", title: "Full Face Threading Clean", hindiTitle: "फुल फेस थ्रेडिंग", price: "₹149", icon: "face-man", description: "Removing fine peach fuzz face hair with thread.", hindiDescription: "चेहरे के बारीक बालों की धागे से सफाई।" }),
  createMenItem({ id: "men_hair_fall_spa", title: "Anti-Hairfall Root Tonic Spa", hindiTitle: "एंटी-हेयरफॉल रूट टॉनिक", price: "₹549", icon: "leaf", description: "Root strengthening ampoule serum massage for thinning hair.", hindiDescription: "बालों का झड़ना रोकने वाला रूट टॉनिक स्पा।" }),
  createMenItem({ id: "men_eye_massage", title: "Anti-Dark Circle Eye Care", hindiTitle: "डार्क सर्कल आई मसाज", price: "₹249", icon: "eye", description: "Cooling cucumber eye gel massage for tired dark circle eyes.", hindiDescription: "आंखों के काले घेरों (डार्क सर्कल) की मालिश।" }),
  createMenItem({ id: "men_patch_color", title: "Grey Beard Patch Camouflage", hindiTitle: "सफेद दाढ़ी पैच कलर", price: "₹129", icon: "palette-outline", description: "Instant touch up for patchy grey beard spots.", hindiDescription: "दाढ़ी के बीच के सफेद धब्बों को छिपाने का कलर।" }),
  createMenItem({ id: "men_ear_hair_wax", title: "Nose & Ear Outer Edge Waxing", hindiTitle: "नाक व कान के बाल वैक्स", price: "₹99", icon: "ear-hearing", description: "Painless hard wax hair removal for nose top and ears.", hindiDescription: "कान व नाक के बाहरी बालों की हार्ड वैक्सिंग।" }),
  createMenItem({ id: "men_home_audit", title: "Complete Grooming Package Consultation", hindiTitle: "संपूर्ण ग्रूमिंग सलाह", price: "₹99", icon: "clipboard-account", description: "Skin type analysis, hairstyle advice, and routine suggestion.", hindiDescription: "स्किन व हेयर स्टाइल की एक्सपर्ट सलाह।" }),
];

export const homeMenSalonServices = menSalonServices.slice(0, 8);
export const allMenSalonServices = menSalonServices;
export default menSalonServices;
