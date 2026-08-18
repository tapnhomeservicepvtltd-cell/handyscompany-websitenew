"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMaidServices = exports.homeMaidServices = exports.maidServices = exports.maidDetails = exports.maidDetailsList = void 0;
const createMaidItem = (config) => ({
    rating: 4.8,
    reviewsCount: 520,
    duration: "Flexible",
    visitCharge: 49,
    labourFree: true,
    membershipEligible: true,
    subscriptionPlan: "699 Membership",
    visitType: "Home Visit",
    materialIncluded: false,
    emergencyAvailable: true,
    labourCharge: "FREE",
    library: "MaterialCommunityIcons",
    color: "#E11D48",
    route: `/service/${config.id}`,
    category: "maid",
    icon: config.icon || "account-supervisor",
    includes: [
        { title: "Aadhaar Verified Maid", icon: "shield-check" },
        { title: "Police Verification", icon: "badge-account" },
        { title: "Free Replacement", icon: "refresh" }
    ],
    benefits: [
        { title: "Punctual & Trained", icon: "clock-check-outline" },
        { title: "Background Checked", icon: "shield-account" }
    ],
    brandsUsed: ["HandysCompany Verified Maids"],
    ...config,
});
exports.maidDetailsList = [
    createMaidItem({ id: "full-time-maid", title: "24-Hour Live-in Maid", hindiTitle: "24 घंटे फुल-टाइम मेड", price: "₹12,000/mo", icon: "account-clock", description: "Full-time residential live-in maid for cooking, cleaning, and house chores.", hindiDescription: "24 घंटे घर में रहकर खाना पकाने, सफाई व गृहकार्य करने वाली मेड।" }),
    createMaidItem({ id: "part-time-maid", title: "Part-Time Daily Maid (2-4 Hrs)", hindiTitle: "पार्ट-टाइम डेली मेड", price: "₹2,500/mo", icon: "clock-outline", description: "Daily 2-4 hours visit for dusting, utensil washing, and floor mopping.", hindiDescription: "रोजाना 2-4 घंटे की झाड़ू-पोछा व बर्तन सफाई मेड।" }),
    createMaidItem({ id: "cook-service", title: "Home Cook / Chef (Veg & Non-Veg)", hindiTitle: "घर का रसोइया (कुक)", price: "₹3,500/mo", icon: "chef-hat", description: "Experienced North/South Indian cook for breakfast, lunch, and dinner.", hindiDescription: "सुबह-शाम का नाश्ता व खाना पकाने वाला रसोइया।" }),
    createMaidItem({ id: "baby-sitter", title: "Nanny & Babysitter Service", hindiTitle: "बेबी सिटर व नैनी", price: "₹6,000/mo", icon: "baby-face-outline", description: "Trained child caretaker for newborn infants and toddlers.", hindiDescription: "छोटे बच्चों की देखभाल के लिए प्रशिक्षित नैनी।" }),
    createMaidItem({ id: "elderly-care", title: "Elderly Care Assistant", hindiTitle: "बुजुर्ग देखभाल सहायक", price: "₹8,000/mo", icon: "human-cane", description: "Compassionate caregiver for senior citizens' daily routine & meds.", hindiDescription: "बुजुर्गों की दैनिक देखभाल व दवाई देने के लिए केयरगिवर।" }),
    createMaidItem({ id: "utensil-cleaner", title: "Utensil Washing Maid", hindiTitle: "बर्तन धोना मेड", price: "₹1,500/mo", icon: "water-pump", description: "Daily dishwashing, sink cleaning, and counter wipedown.", hindiDescription: "रोजाना बर्तन धोना व सिंक की सफाई।" }),
    createMaidItem({ id: "dusting-mopping", title: "Floor Mopping & Dusting Maid", hindiTitle: "झाड़ू-पोछा मेड", price: "₹1,800/mo", icon: "broom", description: "Daily floor sweeping, damp mopping, and furniture dusting.", hindiDescription: "रोजाना झाड़ू, पोछा और फर्नीचर की डस्टिंग।" }),
    createMaidItem({ id: "patient-care", title: "Patient Caretaker (24 Hrs)", hindiTitle: "मरीज केयरटेकर (24 घंटे)", price: "₹14,000/mo", icon: "heart-pulse", description: "Bedridden patient hygiene, feeding, mobility assistance, & vitals.", hindiDescription: "मरीज की 24 घंटे देखभाल व फीडिंग असिस्टेंट।" }),
    createMaidItem({ id: "maid_one_day_cook", title: "Party Cook / Event Chef", hindiTitle: "वन डे पार्टी कुक", price: "₹999/day", icon: "silverware-fork-knife", description: "One-day professional chef for home parties and family functions.", hindiDescription: "पार्टी व गेट-टुगेदर के लिए एक दिन का शेफ।" }),
    createMaidItem({ id: "maid_deep_cleaner", title: "One-Time Emergency Maid", hindiTitle: "वन टाइम इमरजेंसी मेड", price: "₹399/visit", icon: "flash", description: "On-demand single day maid visit for instant house cleaning.", hindiDescription: "अर्जेंट जरूरत के लिए एक दिन की सफाई मेड।" }),
    createMaidItem({ id: "maid_laundry_iron", title: "Cloth Washing & Ironing Maid", hindiTitle: "कपड़े धोना व प्रेस मेड", price: "₹2,200/mo", icon: "tshirt-crew", description: "Washing machine cloth laundering, folding, and steam ironing.", hindiDescription: "कपड़े धोना, सुखाना, तह लगाना व प्रेस करना।" }),
    createMaidItem({ id: "maid_jharu_pocha", title: "Morning Only Jharu-Pocha", hindiTitle: "सुबह का झाड़ू-पोछा", price: "₹1,400/mo", icon: "weather-sunny", description: "Morning 8 AM to 10 AM fixed shift house mopping.", hindiDescription: "सुबह 8 से 10 बजे का फिक्स पोछा।" }),
    createMaidItem({ id: "maid_evening_cook", title: "Dinner Only Home Cook", hindiTitle: "शाम का खाना कुक", price: "₹2,000/mo", icon: "silverware", description: "Evening 6 PM to 8 PM cook for fresh dinner preparation.", hindiDescription: "शाम 6 से 8 बजे रात के खाने का रसोइया।" }),
    createMaidItem({ id: "maid_twins_nanny", title: "Twins & Special Child Nanny", hindiTitle: "जुड़वां बच्चों की नैनी", price: "₹9,000/mo", icon: "human-baby-changing", description: "Experienced double child caretaker for twin babies.", hindiDescription: "जुड़वां बच्चों की स्पेशल केयरगिवर।" }),
    createMaidItem({ id: "maid_post_natal", title: "Post-Natal Jappi Maid (Malish)", hindiTitle: "मालििश व जच्चा-बच्चा देखभाल", price: "₹10,000/mo", icon: "human-female-boy", description: "Traditional oil massage and care for mother & newborn after delivery.", hindiDescription: "डिलीवरी के बाद मां व शिशु की तेल मालिश व सेक।" }),
    createMaidItem({ id: "maid_kitchen_helper", title: "Kitchen Chopping & Prep Helper", hindiTitle: "किचन चॉपिंग व हेल्प मेड", price: "₹1,800/mo", icon: "food-apple", description: "Vegetable peeling, chopping, knead dough, and kitchen clean.", hindiDescription: "सब्जी काटना, आटा गूंदना व किचन सफाई हेल्प।" }),
    createMaidItem({ id: "maid_dog_walker", title: "Pet Care & Dog Walker", hindiTitle: "पेट डॉग वॉकर", price: "₹2,000/mo", icon: "dog", description: "Daily morning & evening 30 mins dog walking and pet feeding.", hindiDescription: "रोजाना सुबह-शाम कुत्ते को घुमाना व खाना देना।" }),
    createMaidItem({ id: "maid_gardener", title: "Home Gardener (Mali)", hindiTitle: "घर का माली (गार्डनर)", price: "₹1,500/mo", icon: "flower-poppy", description: "Alternate day plant watering, trimming, weeding, & fertilizer.", hindiDescription: "पौधों में पानी देना, छंटाई व खाद डालना।" }),
    createMaidItem({ id: "maid_home_nurse", title: "Qualified Female Home Nurse", hindiTitle: "फीमेल होम नर्स", price: "₹18,000/mo", icon: "needle", description: "GNM/ANM trained nurse for injections, dressing, & catheter care.", hindiDescription: "इंजेक्शन, ड्रेसिंग व ड्रिप के लिए होम नर्स।" }),
    createMaidItem({ id: "maid_driver_cum_helper", title: "Personal Driver cum Home Helper", hindiTitle: "पर्सनल ड्राइवर सह हेल्पर", price: "₹14,000/mo", icon: "car", description: "Full-time personal car driver and grocery shopping assistant.", hindiDescription: "कार ड्राइविंग व घर का सामान लाने वाला सहाय।" }),
    createMaidItem({ id: "maid_office_boy", title: "Office Pantry & Cleaning Peon", hindiTitle: "ऑफिस पेंट्री बॉय व सफाई", price: "₹8,000/mo", icon: "briefcase-account", description: "Tea/coffee serving, office dusting, and file movement helper.", hindiDescription: "ऑफिस में चाय-कॉफी व सफाई पेओन।" }),
    createMaidItem({ id: "maid_festival_clean", title: "Diwali / Festival Deep Clean Maid", hindiTitle: "त्योहारों की गहरी सफाई मेड", price: "₹699/visit", icon: "sparkles", description: "Full house deep cleaning assistance for Diwali and Chhath.", hindiDescription: "दिवाली व छठ पूजा की घर की गहरी सफाई।" }),
    createMaidItem({ id: "maid_cloth_ironing", title: "Daily Doorstep Ironing Man", hindiTitle: "डेली डोमेस्टिक प्रेस मैन", price: "₹1,200/mo", icon: "iron", description: "Daily collecting, steam pressing, and delivery of 100 clothes/month.", hindiDescription: "रोजाना कपड़े प्रेस करके देने वाला।" }),
    createMaidItem({ id: "maid_night_attendant", title: "Night Shift Patient Attendant", hindiTitle: "नाइट शिफ्ट मरीज अटेंडेंट", price: "₹9,000/mo", icon: "weather-night", description: "Overnight 9 PM to 7 AM patient watch and bathroom support.", hindiDescription: "रात 9 से सुबह 7 बजे की मरीज देखभाल।" }),
    createMaidItem({ id: "maid_physio_assistant", title: "Physiotherapy Exercise Helper", hindiTitle: "फिजियोथेरेपी एक्सरसाइज हेल्पर", price: "₹6,000/mo", icon: "run", description: "Assisting stroke/paralysis patients with daily joint movements.", hindiDescription: "मरीज को रोजाना स्ट्रेचिंग व वॉक में मदद।" }),
    createMaidItem({ id: "maid_vegetable_buyer", title: "Grocery & Subzi Shopper Maid", hindiTitle: "सब्जी व राशन की खरीदारी मेड", price: "₹1,200/mo", icon: "cart", description: "Daily fresh vegetable purchasing from market and bill accounting.", hindiDescription: "बाजार से ताजी सब्जी व दूध लाने वाली मेड।" }),
    createMaidItem({ id: "maid_south_cook", title: "South Indian Special Cook", hindiTitle: "साउथ इंडियन कुक", price: "₹4,000/mo", icon: "rice", description: "Authentic Dosa, Idli, Sambar, & Rasam preparation chef.", hindiDescription: "डोसा, इडली, सांभर व रसम बनाने वाला शेफ।" }),
    createMaidItem({ id: "maid_marwari_cook", title: "Pure Veg Jain & Marwari Cook", hindiTitle: "मारवाड़ी व जैन शुद्ध शाकाहारी कुक", price: "₹4,000/mo", icon: "leaf", description: "No onion, no garlic pure vegetarian Satvik food cook.", hindiDescription: "बिना प्याज-लहसुन का सात्विक मारवाड़ी खाना।" }),
    createMaidItem({ id: "maid_nonveg_specialist", title: "Non-Veg Mutton & Chicken Chef", hindiTitle: "नॉनवेज चिकन व मटन शेफ", price: "₹4,500/mo", icon: "food-drumstick", description: "Specialized chef for Biryani, Mutton curry, and Fish fry.", hindiDescription: "चिकन, मटन व मछली पकाने का माहिर शेफ।" }),
    createMaidItem({ id: "maid_bengali_cook", title: "Bengali Fish & Sweet Special Cook", hindiTitle: "बंगाली फिश कुक", price: "₹4,000/mo", icon: "fish", description: "Authentic Machher Jhol and Bengali cuisine specialist cook.", hindiDescription: "बंगाली माछेर झोल व खाना पकाने वाला रसोइया।" }),
    createMaidItem({ id: "maid_kid_drop_pickup", title: "School Bus Stop Drop & Pickup", hindiTitle: "स्कूल बस स्टॉप ड्रॉप व पिकअप", price: "₹1,500/mo", icon: "bus-school", description: "Safely dropping children to school bus and receiving back.", hindiDescription: "बच्चों को सुरक्षित बस स्टॉप ले जाना व लाना।" }),
    createMaidItem({ id: "maid_roti_maker", title: "Roti / Chapati Maker Maid Only", hindiTitle: "केवल रोटी बनाने वाली मेड", price: "₹1,200/mo", icon: "orbit", description: "Making 30-50 soft phulka rotis in morning and evening.", hindiDescription: "सुबह-शाम केवल गरम रोटियां बनाने वाली।" }),
    createMaidItem({ id: "maid_dish_dryer", title: "Dishwashing & Cupboard Stacking", hindiTitle: "बर्तन धोना व अलमारी में सजाना", price: "₹1,600/mo", icon: "cup-water", description: "Washing, drying with towel, and stacking utensils back in racks.", hindiDescription: "बर्तन धोकर सुखाकर रैक में सही लगाना।" }),
    createMaidItem({ id: "maid_bathroom_scrubber", title: "Daily Bathroom Scrubbing Maid", hindiTitle: "डेली बाथरूम धुलाई मेड", price: "₹1,500/mo", icon: "shower", description: "Daily scrubbing of tiles, commode, washbasin, and drains.", hindiDescription: "रोजाना बाथरूम की धुलाई व फिनिशिंग।" }),
    createMaidItem({ id: "maid_balcony_cleaner", title: "Balcony & Veranda Sweeper", hindiTitle: "बालकनी व गैलरी पोछा मेड", price: "₹1,000/mo", icon: "balcony", description: "Washing outdoor balcony floors and dusting outdoor chairs.", hindiDescription: "बाहरी बालकनी व गैलरी की रोज सफाई।" }),
    createMaidItem({ id: "maid_sofa_vacuum", title: "Weekly House Vacuuming Maid", hindiTitle: "वीकली वैक्यूम क्लीनिंग मेड", price: "₹1,500/mo", icon: "vacuum", description: "Sunday shift full house vacuuming of carpets and sofas.", hindiDescription: "रविवार को घर के सोफे व कारपेट की वैक्यूमिंग।" }),
    createMaidItem({ id: "maid_car_washer", title: "Daily Morning Car Washer Man", hindiTitle: "डेली सुबह कार धोने वाला", price: "₹800/mo", icon: "car-wash", description: "Wiping car windshield and daily body cloth wash.", hindiDescription: "रोजाना सुबह कार का शीशा व बॉडी पोछने वाला।" }),
    createMaidItem({ id: "maid_sick_care", title: "Temporary Sick Care Helper", hindiTitle: "बीमारी में कुछ दिनों की हेल्पर", price: "₹499/day", icon: "medical-bag", description: "Short-term 5-7 days maid assistance during family illness.", hindiDescription: "बीमारी के समय 5-7 दिनों की अस्थाई मेड।" }),
    createMaidItem({ id: "maid_bed_sheet_changer", title: "Bed Linen & Laundry Maid", hindiTitle: "बेडशीट बदलना व लॉन्ड्री मेड", price: "₹1,500/mo", icon: "bed-empty", description: "Weekly changing bedsheets, pillow covers, and towel laundry.", hindiDescription: "हर हफ्ते चादर बदलना व तौलिए धोना।" }),
    createMaidItem({ id: "maid_fridge_cleaner", title: "Weekly Fridge & Oven Cleaner", hindiTitle: "वीकली फ्रिज व ओवन सफाई", price: "₹1,200/mo", icon: "fridge", description: "Weekly cleaning expired items from fridge & microwave.", hindiDescription: "हफ्ते में एक बार फ्रिज व ओवन की सफाई।" }),
    createMaidItem({ id: "maid_joint_family", title: "Joint Family Multi-Task Maid", hindiTitle: "बडे परिवार की मल्टी-टास्क मेड", price: "₹6,000/mo", icon: "account-group", description: "Managing large household cleaning and multiple dish loads.", hindiDescription: "बड़े संयुक्त परिवार के काम के लिए मेड।" }),
    createMaidItem({ id: "maid_bachelor_flat", title: "Bachelor Flat All-in-One Helper", hindiTitle: "बैचलर फ्लैट ऑल-इन-वन मेड", price: "₹3,000/mo", icon: "account-heart", description: "Combined cooking, sweeping, mopping, & dishwashing for 3-4 guys.", hindiDescription: "बैचलर लड़कों के फ्लैट का खाना व सफाई।" }),
    createMaidItem({ id: "maid_house_sitting", title: "House Sitting & Pet Feeder", hindiTitle: "हाउस सिटिंग (घर की रखवाली)", price: "₹599/day", icon: "home-lock", description: "Caretaker staying during vacation to feed pets & water plants.", hindiDescription: "बाहर जाने पर घर की रखवाली व पेट्स को खाना।" }),
    createMaidItem({ id: "maid_terrace_cleaner", title: "Rooftop Terrace Sweeping Maid", hindiTitle: "छत झाड़ू-पोछा मेड", price: "₹1,000/mo", icon: "home-roof", description: "Cleaning roof dust, leaves, and water drains once a week.", hindiDescription: "छत की धूल व पत्तों की सफाई।" }),
    createMaidItem({ id: "maid_party_cleaner", title: "Post-Party Utensils & Hall Clean", hindiTitle: "पार्टी के बाद बर्तन व सफाई", price: "₹799/visit", icon: "party-popper", description: "Late night post-party dishwashing and hall mess cleanup.", hindiDescription: "पार्टी खत्म होने के बाद के बर्तन व हॉल सफाई।" }),
    createMaidItem({ id: "maid_iron_dryer", title: "Steam Iron & Wardrobe Stacker", hindiTitle: "कपड़े प्रेस करके अलमारी में लगाना", price: "₹1,800/mo", icon: "hanger", description: "Ironing clothes and neatly arranging in master bedroom wardrobe.", hindiDescription: "कपड़े प्रेस करके अलमारी में सेट करना।" }),
    createMaidItem({ id: "maid_shoe_polisher", title: "Daily Shoe Polishing Service", hindiTitle: "जूता पॉलिश करने वाला", price: "₹600/mo", icon: "shoe-formal", description: "Daily polishing leather shoes for school and office.", hindiDescription: "स्कूल व ऑफिस के चमड़े के जूतों की पॉलिश।" }),
    createMaidItem({ id: "maid_tea_snacks", title: "Evening High-Tea & Snacks Chef", hindiTitle: "शाम की चाय व स्नैक्स मेड", price: "₹1,500/mo", icon: "coffee-to-go", description: "Preparing evening tea, pakodas, & snacks at 5 PM daily.", hindiDescription: "रोजाना शाम 5 बजे चाय व नाश्ता बनाना।" }),
    createMaidItem({ id: "maid_dementia_care", title: "Dementia & Alzheimer Caregiver", hindiTitle: "डिमेंशिया पेशेंट केयरटेकर", price: "₹16,000/mo", icon: "brain", description: "Patient, soft-spoken caregiver for memory loss seniors.", hindiDescription: "अल्जाइमर व भूलने की बीमारी के मरीजों की संभाल।" }),
    createMaidItem({ id: "maid_home_audit", title: "Complete Maid Service Quality Audit", hindiTitle: "मेड सर्विस क्वालिटी चेकिंग", price: "₹199", icon: "clipboard-account", description: "Background check report verification & supervisor home audit.", hindiDescription: "मेड का पुलिस वेरिफिकेशन व काम की जांच।" }),
    createMaidItem({ id: "maid_8hr_all_rounder", title: "All-Rounder Maid (8-12 Hrs)", hindiTitle: "ऑल-राउंडर मेड (8-12 घंटे)", price: "₹8,500/mo", icon: "home-account", description: "8 to 12 hours shift for sweeping, mopping, utensils, and basic help.", hindiDescription: "दिन भर के सारे घर के काम के लिए ऑल-राउंडर मेड।" }),
    createMaidItem({ id: "maid_multi_cuisine_chef", title: "Multi-Cuisine Chef at Home", hindiTitle: "मल्टी-कुज़ीन शेफ", price: "₹6,000/mo", icon: "chef-hat", description: "Expert cook who can prepare Indian, Chinese, Continental, and Diet food.", hindiDescription: "इंडियन, चाइनीज और डाइट फूड बनाने वाला एक्सपर्ट शेफ।" }),
    createMaidItem({ id: "maid_educated_nanny", title: "Educated Nanny / Governess", hindiTitle: "एजुकेटेड नैनी / केयरटेकर", price: "₹12,000/mo", icon: "school", description: "Educated child caregiver who also helps with preschool learning and manners.", hindiDescription: "पढ़ी-लिखी नैनी जो बच्चे को स्कूल की बेसिक पढ़ाई भी करवाए।" }),
    createMaidItem({ id: "maid_house_manager", title: "House Manager / Caretaker", hindiTitle: "हाउस मैनेजर / केयरटेकर", price: "₹15,000/mo", icon: "briefcase-account-outline", description: "Supervisor who manages other maids, grocery shopping, and pays bills.", hindiDescription: "घर के सारे कामों और मेड्स को मैनेज करने वाला सुपरवाइजर।" }),
];
exports.maidDetails = exports.maidDetailsList.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});
exports.maidServices = exports.maidDetailsList;
exports.homeMaidServices = exports.maidDetailsList.slice(0, 8);
exports.allMaidServices = exports.maidDetailsList;
exports.default = exports.maidServices;
//# sourceMappingURL=maid.js.map