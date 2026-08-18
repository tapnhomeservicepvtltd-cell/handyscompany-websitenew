import { ServiceItem } from "@/types/service";

export const PEST_THEME = "#00A651";

const createPestItem = (
  config: Partial<ServiceItem> & Pick<ServiceItem, "id" | "title" | "hindiTitle" | "price" | "description" | "hindiDescription">
): ServiceItem => ({
  rating: 4.8,
  reviewsCount: 540,
  duration: "45-60 Mins",
  visitCharge: 49,
  labourFree: true,
  membershipEligible: true,
  subscriptionPlan: "699 Membership",
  visitType: "Home Visit",
  materialIncluded: true,
  emergencyAvailable: true,
  labourCharge: "FREE",
  library: "MaterialCommunityIcons",
  color: PEST_THEME,
  route: `/service/${config.id}`,
  category: "pest-control",
  icon: config.icon || "shield-bug",
  includes: [
    { title: "Odourless Gel & Spray", icon: "spray" },
    { title: "Eco-Safe Bayer Chemicals", icon: "shield-check" },
    { title: "Government Approved", icon: "certificate" }
  ],
  benefits: [
    { title: "100% Safe for Kids & Pets", icon: "shield-check" },
    { title: "90 Days Warranty", icon: "clock-check-outline" }
  ],
  brandsUsed: ["Bayer Maxforce", "Syngenta", "UPL", "HandysCompany Approved"],
  ...config,
});

export const pestControlServices: ServiceItem[] = [
  createPestItem({ id: "pest_cockroach", title: "Cockroach Control Gel & Spray", hindiTitle: "कॉकरोच कंट्रोल जेल व स्प्रे", price: "₹499", icon: "shield-bug", description: "Bayer herbal gel treatment & pipe spray for complete cockroach eradication.", hindiDescription: "कॉकरोच खत्म करने के लिए बेयर हर्बल जेल और स्प्रे।" }),
  createPestItem({ id: "pest_termite", title: "Anti-Termite Drilling & Injection", hindiTitle: "दीमक की रोकथाम (एंटी-टर्माइट)", price: "₹999", icon: "bug-outline", description: "Wall drilling, chemical injection, & wooden furniture anti-termite protection.", hindiDescription: "दीवार ड्रिलिंग व केमिकल इंजेक्शन द्वारा दीमक का इलाज।" }),
  createPestItem({ id: "pest_bedbug", title: "Bed Bug Heat & Spray Treatment", hindiTitle: "खटमल रिमूवल ट्रीटमेंट", price: "₹699", icon: "bed", description: "2-session chemical spray treatment to eliminate bed bugs & eggs.", hindiDescription: "खटमल व उनके अंडों को खत्म करने के लिए 2-सेशन स्प्रे।" }),
  createPestItem({ id: "pest_mosquito", title: "Mosquito Fogging & Anti-Larval", hindiTitle: "मच्छर कंट्रोल व फॉगिंग", price: "₹599", icon: "virus-outline", description: "Outdoor thermal fogging and indoor anti-larval spray protection.", hindiDescription: "बाहरी थर्मल फॉगिंग व घर के अंदर एंटी-लार्वा स्प्रे।" }),
  createPestItem({ id: "pest_rodent", title: "Rat & Rodent Baiting & Sealing", hindiTitle: "चूहा भगाओ पेस्ट कंट्रोल", price: "₹449", icon: "rodent", description: "Sticky pads, cake baiting, and entry point mesh sealing for rats.", hindiDescription: "चूहों के लिए स्टिकी पैड, केक बेटिंग व नेट सीलिंग।" }),
  createPestItem({ id: "pest_ant", title: "Ant Control Syrupy Gel Solution", hindiTitle: "चींटी कंट्रोल सिरप जेल", price: "₹349", icon: "ant", description: "Odourless ant baiting gel to destroy black & red ant colonies.", hindiDescription: "लाल व काली चींटियों की बांबी खत्म करने वाला जेल।" }),
  createPestItem({ id: "pest_lizard", title: "Lizard Repellent Spray Treatment", hindiTitle: "छिपकली रिपेलेंट स्प्रे", price: "₹399", icon: "lizard", description: "Herbal non-lethal lizard repellent spray on walls & ceilings.", hindiDescription: "दीवारों व छतों पर छिपकली भगाने का हर्बल स्प्रे।" }),
  createPestItem({ id: "pest_spider", title: "Spider Web Clean & Chemical Spray", hindiTitle: "मकड़ी जाला व स्पाइडर स्प्रे", price: "₹349", icon: "spider", description: "High ceiling web removal and residual chemical spraying.", hindiDescription: "मकड़ी के जाले हटाना और केमिकल स्प्रे।" }),
  createPestItem({ id: "pest_fly", title: "Fly & Fruit Fly Trap Treatment", hindiTitle: "मक्खी व फ्रूट फ्लाई कंट्रोल", price: "₹399", icon: "fly", description: "Kitchen fruit fly traps and indoor space spray treatment.", hindiDescription: "किचन मक्खियों के लिए हर्बल ट्रैप व स्प्रे।" }),
  createPestItem({ id: "pest_wood_borer", title: "Wood Borer Powder Post Beetle", hindiTitle: "लकड़ी घुन (वुड बोरर) रिपेयर", price: "₹599", icon: "saw-blade", description: "Syringe oil chemical injection into wood borer hole dust.", hindiDescription: "लकड़ी में घुन के सुराखों में सिरिंज इंजेक्शन।" }),
  createPestItem({ id: "pest_silverfish", title: "Silverfish Wardrobe Treatment", hindiTitle: "सिल्वरफिश (किताब कीड़ा)", price: "₹349", icon: "bug", description: "Targeted spray for silverfish in books, wardrobes, & papers.", hindiDescription: "अलमारी व किताबों के सिल्वरफिश कीड़े का इलाज।" }),
  createPestItem({ id: "pest_wasp", title: "Wasp & Bee Hive Removal", hindiTitle: "ततैया व मधुमक्खी छत्ता हटाना", price: "₹699", icon: "hive", description: "Safe night removal of dangerous wasp & honeybee nests.", hindiDescription: "ततैया व मधुमक्खी के खतरनाक छत्ते को सुरक्षित हटाना।" }),
  createPestItem({ id: "pest_flea", title: "Pet Flea & Tick Fumigation", hindiTitle: "पालतू पिसू व टिक स्प्रे", price: "₹499", icon: "dog-side", description: "Anti-flea carpet & furniture spray safe for household pets.", hindiDescription: "कुत्ते-बिल्ली के पिसू (टिक) से मुक्ति दिलाने वाला स्प्रे।" }),
  createPestItem({ id: "pest_snake", title: "Carbolic Acid Snake Repellent", hindiTitle: "सांप भगाओ कारबोलिक स्प्रे", price: "₹799", icon: "snake", description: "Perimeter chemical boundary wall application for snakes.", hindiDescription: "सांपों को बाउंड्री से दूर रखने का कारबोलिक एसिड छिड़काव।" }),
  createPestItem({ id: "pest_pigeon", title: "Pigeon & Bird Spike Installation", hindiTitle: "कबूतर जाली व स्पाइक फिटिंग", price: "₹899", icon: "bird", description: "Polycarbonate bird spike and UV nylon safety net fitting.", hindiDescription: "बालकनी में कबूतर रोकने के लिए स्पाइक्स व सेफ्टी नेट।" }),
  createPestItem({ id: "pest_garden", title: "Garden Lawn Aphid & Caterpillar", hindiTitle: "गार्डन पौधे कीड़े स्प्रे", price: "₹449", icon: "flower", description: "Eco organic neem spray for garden plants, leaves, & soil.", hindiDescription: "पौधों व हरी पत्तियों के कीड़ों के लिए नीम स्प्रे।" }),
  createPestItem({ id: "pest_wood_mite", title: "Plywood Wood Mite Fumigation", hindiTitle: "प्लाईवुड घुन फ्यूमिगेशन", price: "₹549", icon: "layers", description: "Fumigation cover for raw plywood and unvarnished timber.", hindiDescription: "कच्चे प्लाईवुड व लकड़ी के लिए धुआं फ्यूमिगेशन।" }),
  createPestItem({ id: "pest_drain_fly", title: "Bathroom Drain Sewer Fly Control", hindiTitle: "नाली के मच्छर व मक्खी नाशक", price: "₹299", icon: "pipe", description: "Foam drain cleaner to kill sewer drain fly larvae.", hindiDescription: "नाली की मक्खी के लार्वा नष्ट करने वाला फोम।" }),
  createPestItem({ id: "pest_tick_carpet", title: "Carpet Mite Deep Sanitization", hindiTitle: "कारपेट दीमक व माइट सैनिटाइज", price: "₹399", icon: "rug", description: "Hot dry steam treatment for carpet dust mites.", hindiDescription: "कारपेट के अंदर सूक्ष्म कीड़ों की स्टीम सफाई।" }),
  createPestItem({ id: "pest_grain_weevil", title: "Kitchen Pantry Grain Weevil Fix", hindiTitle: "किचन अनाज घुन स्प्रे", price: "₹349", icon: "grain", description: "Herbal non-toxic fogging for rice, flour, & grain bugs.", hindiDescription: "अनाज, दाल व चावल के कीड़ों के लिए हर्बल फॉगिंग।" }),
  createPestItem({ id: "pest_scorpian", title: "Scorpion & Centipede Perimeter", hindiTitle: "बिच्छू व गोजर रिपेलेंट", price: "₹599", icon: "bug", description: "Dust formulation barrier for scorpions & centipedes.", hindiDescription: "बिच्छू व गोजर को दूर रखने वाला डस्ट पाउडर।" }),
  createPestItem({ id: "pest_cricket", title: "Night Mole Cricket Noise Fix", hindiTitle: "रात का झींगुर पेस्ट कंट्रोल", price: "₹349", icon: "volume-off", description: "Spray treatment for noisy nocturnal mole crickets.", hindiDescription: "रात में बोलने वाले झींगुर कीड़ों का स्प्रे।" }),
  createPestItem({ id: "pest_moth", title: "Cloth Moth & Cocoon Control", hindiTitle: "कपड़े काटने वाले कीड़े (मॉथ)", price: "₹399", icon: "hanger", description: "Pheromone traps & aerosol spray for wool cloth moths.", hindiDescription: "ऊनी कपड़े कुतरने वाले मॉथ कीड़े की रोकथाम।" }),
  createPestItem({ id: "pest_drain_cockroach", title: "Sewer Line Drain Cockroach Trap", hindiTitle: "सीवर लाइन कॉकरोच मेश", price: "₹349", icon: "pipe-wrench", description: "Installing one-way anti-cockroach drain traps in floors.", hindiDescription: "गटर से आने वाले कॉकरोच रोकने वाला वन-वे ड्रेन ट्रैप।" }),
  createPestItem({ id: "pest_commercial_kitchen", title: "Commercial Restaurant Kitchen Pest", hindiTitle: "रेस्टोरेंट किचन पेस्ट कंट्रोल", price: "₹1,299", icon: "silverware-fork-knife", description: "Monthly FSSAI compliant pest management for commercial food prep.", hindiDescription: "रेस्टोरेंट व होटल किचन के लिए एफएसएसएआई पेस्ट कंट्रोल।" }),
  createPestItem({ id: "pest_subterranean_termite", title: "Pre-Construction Soil Anti-Termite", hindiTitle: "मकान निर्माण पूर्व दीमक केमिकल", price: "₹1,999", icon: "home-floor", description: "Soil chemical trenching treatment before foundation casting.", hindiDescription: "मकान की नींव ढलाई से पहले मिट्टी में दीमक केमिकल।" }),
  createPestItem({ id: "pest_carpet_beetle", title: "Carpet Beetle Fabric Protection", hindiTitle: "कारपेट बीटल कीड़ा स्प्रे", price: "₹449", icon: "texture", description: "Targeted spray for carpet beetle larvae on wool and silk.", hindiDescription: "रेशमी व ऊनी धागे खाने वाले कारपेट बीटल का स्प्रे।" }),
  createPestItem({ id: "pest_bat_control", title: "Attic Bat Repellent & Netting", hindiTitle: "छत की चमगादड़ रिपेलेंट", price: "₹799", icon: "weather-night", description: "Ultrasound & netting solution to drive away attic bats.", hindiDescription: "अटारी व छत से चमगादड़ भगाने का अल्ट्रासाउंड।" }),
  createPestItem({ id: "pest_mole_trap", title: "Garden Mole & Burrow Baiting", hindiTitle: "गार्डन मिट्टी चूहा ट्रैप", price: "₹499", icon: "shovel", description: "Clearing underground garden burrows and plant root damage.", hindiDescription: "गार्डन की मिट्टी में बिल बनाने वाले चूहों का ट्रैप।" }),
  createPestItem({ id: "pest_office_fumigation", title: "Office Cabin Smoke Fumigation", hindiTitle: "ऑफिस केबिन धुआं सैनिटाइज", price: "₹899", icon: "office-building", description: "Cold fogging aerosol treatment for corporate offices.", hindiDescription: "ऑफिस केबिनों के लिए कोल्ड फॉगिंग एयरोसोल ट्रीटमेंट।" }),
  createPestItem({ id: "pest_bedbug_steam", title: "Thermal Hot Dry Steam Bedbug", hindiTitle: "हॉट स्टीम खटमल किलर", price: "₹799", icon: "fire", description: "180-degree hot steam extraction to instantly kill bedbug eggs.", hindiDescription: "180 डिग्री गर्म स्टीम से खटमल के अंडों का खात्मा।" }),
  createPestItem({ id: "pest_roach_bait_station", title: "Child-Safe Cockroach Bait Box", hindiTitle: "चाइल्ड सेफ कॉकरोच बॉक्स", price: "₹299", icon: "package-variant-closed", description: "Tamper-proof locked bait stations safe around infants.", hindiDescription: "छोटे बच्चों से सुरक्षित लॉक्ड कॉकरोच बेट स्टेशन।" }),
  createPestItem({ id: "pest_bird_net_balcony", title: "Transparent Balcony Bird Netting", hindiTitle: "बालकनी पारदर्शी कबूतर जाली", price: "₹1,199", icon: "grid", description: "High tensile Garware nylon bird net with SS hooks.", hindiDescription: "एसएस हुक के साथ नायलॉन कबूतर सेफ्टी नेट।" }),
  createPestItem({ id: "pest_rat_repellent_car", title: "Car Engine Rodent Spray", hindiTitle: "कार इंजन चूहा स्प्रे", price: "₹449", icon: "car", description: "Bitter coating spray to stop rats from chewing car engine wires.", hindiDescription: "कार इंजन की तारों को चूहों से बचाने वाला कड़वा स्प्रे।" }),
  createPestItem({ id: "pest_stink_bug", title: "Shield Stink Bug Window Spray", hindiTitle: "स्टिंक बग (बदबूदार कीड़ा)", price: "₹349", icon: "shield-alert", description: "Knockdown spray for green and brown stink bugs near lights.", hindiDescription: "रोशनी के पास आने वाले बदबूदार कीड़ों का स्प्रे।" }),
  createPestItem({ id: "pest_louse_treatment", title: "Head Louse Comb & Scalp Oil", hindiTitle: "जूं व लीख हर्बल ऑयल", price: "₹249", icon: "comb", description: "Natural neem lice oil and fine steel comb lice removal.", hindiDescription: "नेचुरल नीम जूं तेल और लीख निकालने वाली कंघी।" }),
  createPestItem({ id: "pest_house_fly_strip", title: "Sticky Fly Paper Ribbon Trap", hindiTitle: "चिपचिपा फ्लाई रिबन ट्रैप", price: "₹149", icon: "tape-measure", description: "Hanging yellow non-toxic sticky ribbon traps for houseflies.", hindiDescription: "मक्खियों को चिपकाने वाला पीला स्टिकी रिबन।" }),
  createPestItem({ id: "pest_wood_ant", title: "Carpenter Ant Wooden Nest Fix", hindiTitle: "लकड़ी की काली चींटी स्प्रे", price: "₹399", icon: "ant", description: "Injecting dust into wooden door frames for carpenter ants.", hindiDescription: "दरवाजों के अंदर घोंसला बनाने वाली काली चींटी।" }),
  createPestItem({ id: "pest_spider_repellent", title: "Natural Peppermint Spider Spray", hindiTitle: "पेपरमिंट स्पाइडर स्प्रे", price: "₹299", icon: "flower-tulip", description: "Organic peppermint oil spray to keep spiders away naturally.", hindiDescription: "पेपरमिंट ऑयल का प्राकृतिक मकड़ी रिपेलेंट स्प्रे।" }),
  createPestItem({ id: "pest_earwig_control", title: "Bathroom Earwig & Centipede", hindiTitle: "कानखजूरा व गोजर स्प्रे", price: "₹349", icon: "bug-check", description: "Crevice chemical dusting for moist bathroom earwigs.", hindiDescription: "बाथरूम की नालियों के कानखजूरे का इलाज।" }),
  createPestItem({ id: "pest_flea_yard", title: "Outdoor Yard Flea Soil Drench", hindiTitle: "गार्डन मिट्टी पिसू स्प्रे", price: "₹599", icon: "grass", description: "Liquid insecticide drenching for backyard grass fleas.", hindiDescription: "घास की मिट्टी में पिसू खत्म करने वाला स्प्रे।" }),
  createPestItem({ id: "pest_moth_ball", title: "Camphor Naphthalene Wardrobe Pouch", hindiTitle: "कपूर व नेफ़थलीन पाउच", price: "₹99", icon: "cube-outline", description: "Aromatic camphor insect repelling pouches for clothes.", hindiDescription: "कपड़ों को कीड़ों से बचाने वाले प्राकृतिक कपूर पाउच।" }),
  createPestItem({ id: "pest_wasp_trap", title: "Yellowjacket Wasp Attractant Trap", hindiTitle: "पीली ततैया लिक्विड ट्रैप", price: "₹249", icon: "cup-water", description: "Hanging outdoor wasp attractant liquid traps.", hindiDescription: "गार्डन के लिए पीली ततैया आकर्षित करने वाला ट्रैप।" }),
  createPestItem({ id: "pest_termite_bait", title: "In-Ground Termite Monitoring Bait", hindiTitle: "इन-ग्राउंड दीमक सेंसर बेट", price: "₹799", icon: "radar", description: "Installing cellulose bait stations around house perimeter.", hindiDescription: "मकान के चारों तरफ दीमक निगरानी बेट स्टेशन।" }),
  createPestItem({ id: "pest_mosquito_larvicide", title: "Stagnant Water Mosquito Abate", hindiTitle: "ठहरे पानी की मच्छर दवाई", price: "₹199", icon: "water-percent", description: "Eco-friendly larvicide granules for cooler & drain water.", hindiDescription: "कूलर व पानी के बर्तन के लिए मच्छर दवाई दाने।" }),
  createPestItem({ id: "pest_lizard_card", title: "Lizard Glue Sticky Trap Board", hindiTitle: "छिपकली स्टिकी ट्रैप बोर्ड", price: "₹149", icon: "card-outline", description: "Heavy duty adhesive glue boards for catching stray lizards.", hindiDescription: "छिपकली पकड़ने वाला हैवी स्टिकी पैड।" }),
  createPestItem({ id: "pest_roach_fogger", title: "Total Release Roach Insect Fogger", hindiTitle: "कॉकरोच धुआं बम फॉगर", price: "₹399", icon: "smoke-detector", description: "Aerosol fogger can to reach deep behind kitchen cabinets.", hindiDescription: "किचन की अलमारी के पीछे धुआं पहुंचाने वाला एयरोसोल।" }),
  createPestItem({ id: "pest_bird_repellent_gel", title: "Optical Bird Fire Gel Cup", hindiTitle: "कबूतर रिपेलेंट फायर जेल", price: "₹499", icon: "fire", description: "UV visual bird deterring optical gel dishes for parapet walls.", hindiDescription: "कबूतरों को दूर रखने वाली विजुअल जेल डिश।" }),
  createPestItem({ id: "pest_drain_screen", title: "Stainless Steel Anti-Pest Jali", hindiTitle: "स्टेनलेस स्टील एंटी-पेस्ट जाली", icon: "grid-large", price: "₹199", description: "Fitting 1mm micro-mesh SS covers on floor drain traps.", hindiDescription: "कीड़ों को नाली से ऊपर आने से रोकने वाली जाली।" }),
  createPestItem({ id: "pest_home_audit", title: "Complete Home Pest Inspection Audit", hindiTitle: "संपूर्ण पेस्ट कंट्रोल ऑडिट", price: "₹299", icon: "file-certificate", description: "Thermal imagery inspection for hidden termites, bedbugs, & entry points.", hindiDescription: "थर्मल कैमरे से दीमक, खटमल व चूहों के रास्तों की जांच।" }),
];

export const homePestControlServices = pestControlServices.slice(0, 8);
export const allPestControlServices = pestControlServices;
export default pestControlServices;
