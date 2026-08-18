"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleaningServices = exports.cleaningDetails = exports.cleaningServicesList = void 0;
const createCleaningItem = (config) => ({
    rating: 4.8,
    reviewsCount: 620,
    duration: "2-3 Hours",
    visitCharge: 49,
    labourFree: true,
    membershipEligible: true,
    subscriptionPlan: "699 Membership",
    visitType: "Home Visit",
    materialIncluded: true,
    emergencyAvailable: true,
    labourCharge: "FREE",
    library: "MaterialCommunityIcons",
    color: "#00A651",
    route: `/service/${config.id}`,
    category: "cleaning",
    icon: config.icon || "broom",
    includes: [
        { title: "Deep Scrubbing", icon: "broom" },
        { title: "Eco Chemicals", icon: "spray-bottle" },
        { title: "Sanitization", icon: "shield-check" }
    ],
    benefits: [
        { title: "99.9% Germ Free", icon: "shield-check" },
        { title: "Eco-Friendly Chemicals", icon: "leaf" }
    ],
    brandsUsed: ["Diversey", "Taski", "Karcher", "3M"],
    ...config,
});
exports.cleaningServicesList = [
    createCleaningItem({ id: "full-house-cleaning", title: "Full Home Deep Cleaning", hindiTitle: "पूरे घर की गहरी सफाई", price: "₹999", icon: "broom", description: "Deep cleaning of rooms, hall, kitchen, bathrooms, balcony, and windows.", hindiDescription: "कमरों, हॉल, किचन, बाथरूम, बालकनी व खिड़कियों की गहरी सफाई।" }),
    createCleaningItem({ id: "bathroom-cleaning", title: "Bathroom Tile & Hard Water Fix", hindiTitle: "बाथरूम टाइल्स व दाग सफाई", price: "₹399", icon: "shower", description: "Scrubbing floor tiles, removing limescale, mirror polish, & sanitization.", hindiDescription: "फर्श की रगड़ाई, खारे पानी के दाग और सैनिटाइजेशन।" }),
    createCleaningItem({ id: "kitchen-cleaning", title: "Kitchen Oil & Degreasing Clean", hindiTitle: "किचन तेल व ग्रीस सफाई", price: "₹499", icon: "countertop", description: "Degreasing chimney exterior, tiles, gas stove, slabs, and cabinets.", hindiDescription: "किचन चिमनी, टाइल्स, चूल्हा व कैबिनेट की डीग्रीजिंग।" }),
    createCleaningItem({ id: "sofa-cleaning", title: "Sofa Shampoo & Injection Clean", hindiTitle: "सोफा शैम्पू व वैक्यूम सफाई", price: "₹399", icon: "sofa", description: "Deep foam shampooing and extraction vacuuming for fabric sofas.", hindiDescription: "फैब्रिक सोफे की फोम शैम्पू व वैक्यूम सफाई।" }),
    createCleaningItem({ id: "carpet-cleaning", title: "Carpet & Rug Wash Service", hindiTitle: "कालीन व कारपेट धोना", price: "₹299", icon: "rug", description: "Stain removal, shampooing, and moisture extraction for carpets.", hindiDescription: "कारपेट के दाग धब्बे हटाना और शैम्पू वॉश।" }),
    createCleaningItem({ id: "mattress-cleaning", title: "Mattress Sanitization & Clean", hindiTitle: "गद्दे की सफाई व सैनिटाइजेशन", price: "₹349", icon: "bed", description: "Dust mite extraction, UV sanitization, & steam cleaning for mattresses.", hindiDescription: "धूल, धूल के कीड़ों की सफाई व गद्दे का सैनिटाइजेशन।" }),
    createCleaningItem({ id: "balcony-cleaning", title: "Balcony & Terrace Wash", hindiTitle: "बालकनी व छत की सफाई", price: "₹249", icon: "balcony", description: "High pressure jet washing for balcony tiles, railing, and drain.", hindiDescription: "हाई प्रेशर जेट वॉश बालकनी टाइल्स व रेलिंग।" }),
    createCleaningItem({ id: "window-cleaning", title: "Window Glass & Track Scrubbing", hindiTitle: "खिड़की कांच व ट्रैक सफाई", price: "₹199", icon: "window-maximize", description: "Glass streak-free cleaning and vacuuming dirt from window sliding tracks.", hindiDescription: "खिड़की के कांच की सफाई व ट्रैक वैक्यूमिंग।" }),
    createCleaningItem({ id: "clean_water_tank", title: "Water Tank Underground Clean", hindiTitle: "वाटर टैंक अंडरग्राउंड सफाई", price: "₹599", icon: "storage-tank", description: "Sludge removal, high pressure wall washing, and UV treatment.", hindiDescription: "टंकी के कीचड़ की सफाई और यूवी ट्रीटमेंट।" }),
    createCleaningItem({ id: "clean_fridge", title: "Refrigerator Interior Deep Clean", hindiTitle: "फ्रिज के अंदर की गहरी सफाई", price: "₹249", icon: "fridge", description: "Removing food odors, tray washing, and anti-bacterial wipedown.", hindiDescription: "फ्रिज की बदबू मिटाना, ट्रे वॉश व एंटी-बैक्टीरियल सफाई।" }),
    createCleaningItem({ id: "clean_chimney_filter", title: "Chimney Baffle Filter Degreasing", hindiTitle: "चिमनी फिल्टर की सफाई", price: "₹199", icon: "fan", description: "Caustic hot water dip for heavy oil carbon chimney filters.", hindiDescription: "तेल से सने चिमनी फिल्टर की गर्म पानी से सफाई।" }),
    createCleaningItem({ id: "clean_wooden_floor", title: "Wooden Floor Polish & Buffing", hindiTitle: "वुडन फ्लोर पॉलिश व बफिंग", price: "₹499", icon: "floor-plan", description: "Specialized non-abrasive polish for laminate and hardwood floors.", hindiDescription: "लकड़ी के फर्श की शाइनिंग पॉलिश व बफिंग।" }),
    createCleaningItem({ id: "clean_marble_polish", title: "Marble Floor Crystallization", hindiTitle: "मार्बल फ्लोर घिसाई व पॉलिश", price: "₹899", icon: "sparkles", description: "Diamond pad scrubbing and mirror shine crystallization for marble.", hindiDescription: "मार्बल फर्श की डायमंड बफिंग व मिरर शाइन पॉलिश।" }),
    createCleaningItem({ id: "clean_dining_chair", title: "Dining Chair Upholstery Clean", hindiTitle: "डाइनिंग चेयर कुशन सफाई", price: "₹199", icon: "chair-rolling", description: "Shampooing fabric/leatherette padded dining chair seats.", hindiDescription: "डाइनिंग चेयर कुशन की शैम्पू वॉश।" }),
    createCleaningItem({ id: "clean_curtain_steam", title: "Curtain Hanging Steam Clean", hindiTitle: "पर्दे की स्टीम सफाई", price: "₹299", icon: "curtains", description: "High temperature steam sanitization for hanging window drapes.", hindiDescription: "टांगे हुए पर्दों की स्टीम सैनिटाइजेशन।" }),
    createCleaningItem({ id: "clean_ceiling_fan", title: "Ceiling Fan & Lamp Dusting", hindiTitle: "सीलिंग फैन व झूमर की सफाई", price: "₹149", icon: "fan", description: "Wiping sticky dust grease from high ceiling fans and lamps.", hindiDescription: "ऊंचे सीलिंग पंखों और लैंप्स की चिकनाई साफ करना।" }),
    createCleaningItem({ id: "clean_empty_flat", title: "Move-in / Move-out House Clean", hindiTitle: "खाली मकान की गहरी सफाई", price: "₹1,199", icon: "home-city", description: "Complete empty apartment deep cleaning before moving in.", hindiDescription: "नए मकान में शिफ्ट होने से पहले पूरे फ्लैट की सफाई।" }),
    createCleaningItem({ id: "clean_post_renovation", title: "Post Renovation Dust & Paint Clean", hindiTitle: "रंग-रोगन के बाद सफाई", price: "₹1,499", icon: "construction", description: "Scraping cement, paint splashes, and construction dust removal.", hindiDescription: "पेंट के छींटे, सीमेंट और धूल की सफाई।" }),
    createCleaningItem({ id: "clean_car_seat", title: "Car Interior Seat Foam Wash", hindiTitle: "कार सीट फोम वॉश", price: "₹399", icon: "car-seat", description: "Fabric & leather car seat shampooing and dry extraction.", hindiDescription: "कार की सीटों की फोम वॉश व सूखी वैक्यूमिंग।" }),
    createCleaningItem({ id: "clean_grout_sealer", title: "Tile Grout Line Bleaching", hindiTitle: "टाइल्स ग्राउट लाइन सफाई", price: "₹299", icon: "border-all", description: "Removing black mold and yellow stains from tile joints.", hindiDescription: "टाइल्स के जोड़ों की काली फफूंद व पीले दागों की सफाई।" }),
    createCleaningItem({ id: "clean_microwave", title: "Microwave Oven Deodorize Clean", hindiTitle: "माइक्रोवेव ओवन सफाई", price: "₹149", icon: "microwave", description: "Removing burnt food grease & steaming lemon deodorization.", hindiDescription: "जले हुए खाने की चिकनाई व बदबू हटाना।" }),
    createCleaningItem({ id: "clean_washbasin", title: "Washbasin & Counter Stain Clean", hindiTitle: "वॉशबेसिन व काउंटर दाग सफाई", price: "₹129", icon: "toilet-seat", description: "Removing yellow water marks and restoring ceramic shine.", hindiDescription: "सिरेमिक बेसिन के पीले निशानों की सफाई।" }),
    createCleaningItem({ id: "clean_leather_sofa", title: "Leather Sofa Conditioning", hindiTitle: "लेदर सोफा कंडीशनिंग", price: "₹499", icon: "sofa", description: "Cream conditioning and shine polish for genuine & faux leather.", hindiDescription: "लेदर सोफे की क्रीम कंडीशनिंग व पॉलिश।" }),
    createCleaningItem({ id: "clean_ac_service", title: "AC Outer & Indoor Foam Clean", hindiTitle: "एसी फोम वॉश सफाई", price: "₹349", icon: "air-conditioner", description: "High pressure jet pump foam cleaning for AC cooling coils.", hindiDescription: "एसी कूलिंग कॉइल की जेट पंप फोम वॉश।" }),
    createCleaningItem({ id: "clean_glass_facade", title: "Glass Facade Outdoor Clean", hindiTitle: "कांच की बाहरी दीवार सफाई", price: "₹699", icon: "office-building", description: "Safety belt outdoor glass facade wiping for villas and shops.", hindiDescription: "दुकानों व मकानों के बाहरी कांच की सफाई।" }),
    createCleaningItem({ id: "clean_shoe_rack", title: "Shoe Cabinet Deodorize Wash", hindiTitle: "शू रैक बदबू सफाई", price: "₹149", icon: "shoe-formal", description: "Disinfecting shoe shelves and spray deodorizing.", hindiDescription: "शू रैक के खानों का डिसइन्फेक्शन व डियोड्रेंट स्प्रे।" }),
    createCleaningItem({ id: "clean_puppy_mess", title: "Pet Stain & Odor Elimination", hindiTitle: "पेट दाग व बदबू न्यूट्रलाइज", price: "₹299", icon: "dog-side", description: "Enzymatic carpet/sofa cleaning for pet accidents.", hindiDescription: "पालतू जानवरों के दाग व गंध की सफाई।" }),
    createCleaningItem({ id: "clean_staircase", title: "Staircase & Railing Scrubbing", hindiTitle: "सीढ़ी व रेलिंग की सफाई", price: "₹249", icon: "stairs", description: "Dusting handrails and scrubbing granite/marble stairs.", hindiDescription: "सीढ़ियों के पत्थरों की रगड़ाई व रेलिंग पोछा।" }),
    createCleaningItem({ id: "clean_storeroom", title: "Store Room De-clutter & Dusting", hindiTitle: "स्टोर रूम सफाई व वैक्यूम", price: "₹299", icon: "archive", description: "Organizing store room boxes and heavy cobweb removal.", hindiDescription: "स्टोर रूम के जाले साफ करना व डिब्बों की डस्टिंग।" }),
    createCleaningItem({ id: "clean_pooja_room", title: "Pooja Room Brass & Marble Clean", hindiTitle: "पूजा घर पीतल व मार्बल सफाई", price: "₹199", icon: "temple-hindu", description: "Eco pitambari brass idol polish and marble temple cleaning.", hindiDescription: "पीतल की मूर्तियों की चमक व मंदिर की सफाई।" }),
    createCleaningItem({ id: "clean_wardrobe_inside", title: "Inside Wardrobe Shelf Wipedown", hindiTitle: "अलमारी के अंदर के खानों की सफाई", price: "₹249", icon: "wardrobe", description: "Vacuuming dust and wiping shelf liners in empty wardrobes.", hindiDescription: "अलमारी के अंदर धूल की वैक्यूमिंग व सफाई।" }),
    createCleaningItem({ id: "clean_geyser_tank", title: "Geyser Water Scale Descaling", hindiTitle: "गीजर टैंक डिस्केलिंग", price: "₹299", icon: "water-boiler", description: "Chemical descaling of hard water minerals inside geyser.", hindiDescription: "गीजर के अंदर जमे खारे पानी के पपड़ी की सफाई।" }),
    createCleaningItem({ id: "clean_wall_washing", title: "Painted Wall Spot Cleaning", hindiTitle: "दीवार के दाग-धब्बे सफाई", price: "₹249", icon: "wall", description: "Gentle non-paint peeling pencil mark & fingerprint removal.", hindiDescription: "दीवार के पेंसिल व उंगलियों के निशान साफ करना।" }),
    createCleaningItem({ id: "clean_chandelier_crystal", title: "Crystal Chandelier Hand Polish", hindiTitle: "क्रिस्टल झूमर की बारीक सफाई", price: "₹499", icon: "glass-wine", description: "Individual crystal drop wiping with anti-static solution.", hindiDescription: "झूमर के क्रिस्टल्स की स्पेशल स्पार्कल सफाई।" }),
    createCleaningItem({ id: "clean_switchboard", title: "Switchboard Dirt & Fingerprint Clean", hindiTitle: "स्विचबोर्ड ग्रीस सफाई", price: "₹99", icon: "power-plug", description: "Dry solvent cleaning of sticky greasy light switches.", hindiDescription: "स्विचबोर्ड के काले जिद्दी निशानों की सुखी सफाई।" }),
    createCleaningItem({ id: "clean_door_polishing", title: "Main Door Wax & Dusting", hindiTitle: "मेन डोर वैक्स व सफाई", price: "₹149", icon: "door", description: "Polishing teak main door surface and frame wipedown.", hindiDescription: "लकड़ी के मुख्य दरवाजे पर वैक्स शाइन।" }),
    createCleaningItem({ id: "clean_blinds", title: "Venetian Window Blinds Clean", hindiTitle: "विंडो ब्लाइंड्स की सफाई", price: "₹199", icon: "blinds", description: "Slatted window blinds dust wiping and cord cleaning.", hindiDescription: "खिड़की के पर्दों (ब्लाइंड्स) की डस्टिंग।" }),
    createCleaningItem({ id: "clean_kitchen_cabinet", title: "Kitchen Outer Cabinet Wipedown", hindiTitle: "किचन शटर पोछा सफाई", price: "₹249", icon: "cupboard", description: "Wiping laminate kitchen shutters and glass doors.", hindiDescription: "किचन अलमारियों के बाहरी पल्लों की सफाई।" }),
    createCleaningItem({ id: "clean_exhaust_fan", title: "Exhaust Fan Blade Oil Scraping", hindiTitle: "एग्जॉस्ट फैन की ग्रीस सफाई", price: "₹149", icon: "fan", description: "Degreasing sticky black oil on kitchen exhaust fan blades.", hindiDescription: "एग्जॉस्ट पंखे के ब्लेडों से गाढ़ा तेल हटाना।" }),
    createCleaningItem({ id: "clean_ro_casing", title: "RO Outer Body Shine Clean", hindiTitle: "आरो वॉटर फिल्टर बॉडी सफाई", price: "₹99", icon: "water-filter", description: "Wiping yellow stains from RO cover plastic body.", hindiDescription: "आरो मशीन की प्लास्टिक बॉडी की सफाई।" }),
    createCleaningItem({ id: "clean_drain_odor", title: "Bathroom Floor Drain Bio-Clean", hindiTitle: "बाथरूम नाली की गंध दूर करना", price: "₹149", icon: "pipe", description: "Enzymatic bio-cleaning to kill drain odor and hair clogs.", hindiDescription: "नाली की बदबू और बाल साफ करने वाला ट्रीटमेंट।" }),
    createCleaningItem({ id: "clean_mirror_glass", title: "Bathroom Mirror Streak-Free", hindiTitle: "शीशा व कांच की चमक सफाई", price: "₹79", icon: "mirror", description: "Removing water droplets and restoring mirror clarity.", hindiDescription: "शीशे के पानी के सफेद धब्बों की सफाई।" }),
    createCleaningItem({ id: "clean_tv_screen", title: "TV & Monitor Screen Safe Clean", hindiTitle: "टीवी स्क्रीन की सेफ सफाई", price: "₹99", icon: "television", description: "Anti-static microfiber wiping for LED screen dust.", hindiDescription: "एलईडी स्क्रीन की धूल की सुरक्षित सफाई।" }),
    createCleaningItem({ id: "clean_refrigerator_back", title: "Fridge Back Coil & Dusting", hindiTitle: "फ्रिज के पीछे की कॉइल सफाई", price: "₹149", icon: "fridge-bottom", description: "Vacuuming heat exchanger coils for energy saving.", hindiDescription: "फ्रिज के पीछे कंडेनसर जाली की वैक्यूमिंग।" }),
    createCleaningItem({ id: "clean_washing_machine_tub", title: "Washing Machine Tub Descale", hindiTitle: "वाशिंग मशीन टब डिस्केलिंग", price: "₹199", icon: "washing-machine", description: "Removing detergent lint scum and lime scale from washing drum.", hindiDescription: "वाशिंग मशीन ड्रम की सर्फ व पपड़ी सफाई।" }),
    createCleaningItem({ id: "clean_iron_grill", title: "Balcony Iron Grill Dusting", hindiTitle: "बालकनी लोहे की ग्रिल सफाई", price: "₹149", icon: "fence", description: "Dusting rusted iron grills and window safety bars.", hindiDescription: "लोहे की खिड़की ग्रिल की धूल साफ करना।" }),
    createCleaningItem({ id: "clean_garden_pots", title: "Veranda Plant Pot Area Wash", hindiTitle: "गार्डन गमला एरिया धोना", price: "₹199", icon: "flower-pot", description: "Scrubbing algae and mud stains under plant pots.", hindiDescription: "गमलों के नीचे जमी काई व मिट्टी की रगड़ाई।" }),
    createCleaningItem({ id: "clean_ceiling_cobwebs", title: "High Ceiling Cobweb Removal", hindiTitle: "ऊंचे जाले व मकड़ी सफाई", price: "₹149", icon: "spider-web", description: "Telescopic pole cobweb extraction from high roofs.", hindiDescription: "ऊंची छतों के मकड़ी के जाले हटाना।" }),
    createCleaningItem({ id: "clean_door_mat", title: "Coir & Rubber Door Mat Wash", hindiTitle: "डोरमैट व पायदान की सफाई", price: "₹99", icon: "mat", description: "High pressure dusting and washing of entrance door mats.", hindiDescription: "दरवाजे के पायदान की धुलाई।" }),
    createCleaningItem({ id: "clean_home_audit", title: "Whole House Hygiene Audit", hindiTitle: "संपूर्ण स्वच्छता जांच", price: "₹299", icon: "clipboard-check", description: "ATP swab test for germ levels in kitchen & bathroom.", hindiDescription: "कीटाणुओं के स्तर की संपूर्ण हाइजीन जांच।" }),
];
exports.cleaningDetails = exports.cleaningServicesList.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});
exports.cleaningServices = exports.cleaningServicesList;
exports.default = exports.cleaningServices;
//# sourceMappingURL=cleaning.js.map