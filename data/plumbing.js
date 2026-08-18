"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plumbingServices = exports.plumbingDetails = exports.plumbingDetailsList = void 0;
const createPlumbingService = (config) => ({
    rating: 4.8,
    reviewsCount: 650,
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
    color: "#2563EB",
    route: `/service/${config.id}`,
    category: "plumbing",
    price: config.price || "₹199",
    includes: [
        { title: "Inspection", icon: "eye" },
        { title: "Leakage Fix", icon: "wrench" },
        { title: "Testing", icon: "check-circle" }
    ],
    benefits: [
        { title: "Save Water", icon: "water" },
        { title: "15 Days Warranty", icon: "shield-check" }
    ],
    brandsUsed: ["Jaquar", "Hindware", "Cera", "Parryware", "Ashirvad"],
    ...config,
});
exports.plumbingDetailsList = [
    createPlumbingService({ id: "tap-repair", title: "Tap & Faucet Repair", hindiTitle: "नल और फौसेट रिपेयर", icon: "water-pump", price: "₹149", description: "Professional repair for all types of leaking or damaged taps.", hindiDescription: "हर तरह के टपकते या खराब नलों की प्रोफेशनल रिपेयर।" }),
    createPlumbingService({ id: "toilet-repair", title: "Toilet Flush & Tank Repair", hindiTitle: "टॉयलेट फ्लश रिपेयर", icon: "toilet", price: "₹249", description: "Fixing flush tanks, blockages, and commode leakage issues.", hindiDescription: "फ्लश टैंक, ब्लॉकेज और कमोड लीकेज की समस्याओं को ठीक करना।" }),
    createPlumbingService({ id: "shower-repair", title: "Shower & Diverter Repair", hindiTitle: "शावर और डायवर्टर रिपेयर", icon: "shower-head", price: "₹229", description: "Repair for shower heads, diverters, and bathroom pressure.", hindiDescription: "शावर हेड, डायवर्टर और बाथरूम प्रेशर की रिपेयर।" }),
    createPlumbingService({ id: "kitchen-sink-repair", title: "Kitchen Sink Drain Unclog", hindiTitle: "किचन सिंक ड्रेन अनक्लॉग", icon: "sink", price: "₹199", description: "Deep cleaning of drains and repair of sink leakages & traps.", hindiDescription: "नाली की गहरी सफाई और सिंक लीकेज/ट्रैप की रिपेयर।" }),
    createPlumbingService({ id: "pipe-leakage-repair", title: "Concealed Pipe Leakage Fix", hindiTitle: "कंसील्ड पाइप लीकेज रिपेयर", price: "₹349", icon: "pipe", description: "Fixing pipe cracks, joints, and hidden wall leakage problems.", hindiDescription: "पाइप की दरारें, जोड़ और छिपी हुई लीकेज को ठीक करना।" }),
    createPlumbingService({ id: "washbasin-repair", title: "Wash Basin Coupling Fix", hindiTitle: "वॉश बेसिन कपलिंग रिपेयर", price: "₹179", icon: "toilet-seat", description: "Repair of basin taps, waste coupling, and bottle traps.", hindiDescription: "बेसिन नल, वेस्ट कपलिंग और बोतल ट्रैप की रिपेयर।" }),
    createPlumbingService({ id: "tap-installation", title: "New Tap & Mixer Fitting", hindiTitle: "नया नल और मिक्सर फिटिंग", price: "₹199", icon: "water-pump", description: "New tap fitting and installation with leak-proof Teflon sealing.", hindiDescription: "लीक-प्रूफ टेफ्लॉन सीलिंग के साथ नया नल फिटिंग।" }),
    createPlumbingService({ id: "water-tank-cleaning", title: "Overhead Water Tank Clean", hindiTitle: "पानी की टंकी की सफाई", price: "₹499", icon: "storage-tank", description: "Complete vacuum cleaning and sanitization of water tanks.", hindiDescription: "पानी की टंकी की वैक्यूम सफाई और सैनिटाइजेशन।" }),
    createPlumbingService({ id: "mixer-installation", title: "Wall Mixer Tap Installation", hindiTitle: "वॉल मिक्सर इंस्टॉलेशन", price: "₹299", icon: "shower-head", description: "Installation of wall/deck mounted hot-cold mixers.", hindiDescription: "हॉट-कोल्ड मिक्सर नलों की सही फिटिंग और इंस्टॉलेशन।" }),
    createPlumbingService({ id: "flush-repair", title: "Flush Valve Replacement", hindiTitle: "फ्लश वाल्व रिप्लेसमेंट", price: "₹249", icon: "toilet", description: "Repair of flush tank mechanism, button, and siphons.", hindiDescription: "फ्लश टैंक मैकेनिज्म और बटन की रिप्लेसमेंट।" }),
    createPlumbingService({ id: "plumb_water_pump", title: "Water Motor Pump Fitting", hindiTitle: "पानी की मोटर पंप फिटिंग", icon: "water-pump", price: "₹449", description: "0.5HP to 2HP domestic water pump installation & wiring check.", hindiDescription: "0.5HP से 2HP पानी की मोटर का इंस्टॉलेशन।" }),
    createPlumbingService({ id: "plumb_gully_trap", title: "Gully Trap & Floor Drain Fix", hindiTitle: "गल्ली ट्रैप और ड्रेन रिपेयर", icon: "pipe-wrench", price: "₹299", description: "Clearing outdoor gully traps and balcony floor drain choke.", hindiDescription: "गार्डन व बालकनी के गल्ली ट्रैप की सफाई।" }),
    createPlumbingService({ id: "plumb_jet_spray", title: "Health Faucet & Jet Spray Fix", hindiTitle: "हेल्थ फॉसेट और जेट स्प्रे", icon: "shower", price: "₹149", description: "Installation & pipe replacement of toilet health faucets.", hindiDescription: "टॉयलेट हेल्थ फॉसेट और जेट स्प्रे की फिटिंग।" }),
    createPlumbingService({ id: "plumb_commode_fit", title: "Western Commode Installation", hindiTitle: "वेस्टर्न कमोड इंस्टॉलेशन", icon: "toilet", price: "₹699", description: "Floor or wall mounted commode seat installation with wax seal.", hindiDescription: "वैक्स सील के साथ वेस्टर्न कमोड सीट की इंस्टॉलेशन।" }),
    createPlumbingService({ id: "plumb_water_filter", title: "RO / UV Water Inlet Connection", hindiTitle: "आरओ पानी इनलेट कनेक्शन", icon: "filter", price: "₹149", description: "T-valve diverter fitting for RO water purifier inlet line.", hindiDescription: "आरो वॉटर प्यूरीफायर के लिए टी-वाल्व इनलेट कनेक्शन।" }),
    createPlumbingService({ id: "plumb_geyser_piping", title: "Geyser Inlet Outlet Piping", hindiTitle: "गीजर इनलेट-आउटलेट पाइपिंग", icon: "water-boiler", price: "₹299", description: "Braided hose pipe and angle valve installation for geysers.", hindiDescription: "गीजर के लिए फ्लेक्सिबल होस पाइप व एंगल वाल्व फिटिंग।" }),
    createPlumbingService({ id: "plumb_angle_valve", title: "Angle Valve Replacement", hindiTitle: "एंगल वाल्व रिप्लेसमेंट", icon: "wrench", price: "₹129", description: "Replacing rusted or leaking brass angle stop valves.", hindiDescription: "जंग लगे या टपकते ब्रास एंगल वाल्व की रिप्लेसमेंट।" }),
    createPlumbingService({ id: "plumb_drain_pipe", title: "Washing Machine Outlet Pipe", hindiTitle: "वाशिंग मशीन ड्रेन पाइप", icon: "washing-machine", price: "₹149", description: "Connecting and sealing washing machine drain hose pipe.", hindiDescription: "वाशिंग मशीन ड्रेन होस पाइप का कनेक्शन।" }),
    createPlumbingService({ id: "plumb_booster_pump", title: "Pressure Booster Pump Fitting", hindiTitle: "प्रेशर बूस्टर पंप फिटिंग", icon: "speedometer", price: "₹799", description: "Automatic pressure booster pump installation for rain showers.", hindiDescription: "रेन शावर के लिए ऑटोमैटिक प्रेशर बूस्टर पंप।" }),
    createPlumbingService({ id: "plumb_p trap", title: "P-Trap & S-Trap Odor Seal", hindiTitle: "पी-ट्रैप बदबूदार गैस सील", icon: "pipe", price: "₹249", description: "Anti-odor P-trap fitting to prevent sewer gas smells.", hindiDescription: "नाली की बदबू रोकने के लिए एंटी-ऑडोर पी-ट्रैप।" }),
    createPlumbingService({ id: "plumb_solar_piping", title: "Solar Heater CPVC Piping", hindiTitle: "सोलर हीटर सीपीवीसी पाइपिंग", icon: "solar-power", price: "₹899", description: "Hot water heavy gauge CPVC pipe line installation from roof.", hindiDescription: "छत से गर्म पानी की सीपीवीसी पाइप लाइन फिटिंग।" }),
    createPlumbingService({ id: "plumb_water_meter", title: "Main Water Meter Fitting", hindiTitle: "वाटर मीटर फिटिंग", icon: "counter", price: "₹349", description: "Commercial & residential main supply line water meter fitting.", hindiDescription: "मेन सप्लाई लाइन के लिए वाटर मीटर फिटिंग।" }),
    createPlumbingService({ id: "plumb_balcony_tap", title: "Balcony Washing Tap Point", hindiTitle: "बालकनी वाशिंग टैप पॉइंट", icon: "water-pump", price: "₹299", description: "Extending pipe line for balcony plant & cleaning tap.", hindiDescription: "बालकनी के पौधों व सफाई के लिए नया नल पॉइंट।" }),
    createPlumbingService({ id: "plumb_gutter_clean", title: "Roof Rain Gutter Unclogging", hindiTitle: "छत की नाली सफाई", icon: "home-roof", price: "₹399", description: "Clearing dried leaves and mud from rooftop rainwater pipes.", hindiDescription: "छत के बरसाती पानी के पाइपों की सफाई।" }),
    createPlumbingService({ id: "plumb_concealed_stopcock", title: "Concealed Stop Cock Repair", hindiTitle: "कंसील्ड स्टॉप कॉक रिपेयर", icon: "circle-slice-8", price: "₹249", description: "Replacing inner spindle of concealed bathroom main shutoff valves.", hindiDescription: "बाथरूम के कंसील्ड स्टॉप कॉक का स्पिंडल बदलना।" }),
    createPlumbingService({ id: "plumb_urinal_sensor", title: "Urinal Sensor & Push Flush", hindiTitle: "यूरिनल सेंसर और पुश फ्लश", icon: "human-male", price: "₹349", description: "Installing automatic sensor flush for commercial urinals.", hindiDescription: "यूरिनल के लिए ऑटोमैटिक सेंसर फ्लश इंस्टॉलेशन।" }),
    createPlumbingService({ id: "plumb_bathtub_waste", title: "Bathtub Drain & Overflow Fix", hindiTitle: "बाथटब ड्रेन और ओवरफ्लो", icon: "bathtub", price: "₹499", description: "Repairing leaking bathtub popup waste coupling & overflow.", hindiDescription: "बाथटब के पॉपअप वेस्ट ड्रेन की रिपेयर।" }),
    createPlumbingService({ id: "plumb_float_valve", title: "Water Tank Float Ball Valve", hindiTitle: "टैंक फ्लोट बॉल वाल्व", icon: "circle-small", price: "₹199", description: "Replacing overflowing tank brass/plastic float ball valves.", hindiDescription: "टंकी के पानी को ओवरफ्लो से रोकने वाला बॉल वाल्व बदलना।" }),
    createPlumbingService({ id: "plumb_pipe_insulation", title: "Hot Water Pipe Insulation", hindiTitle: "हॉट वाटर पाइप इंसुलेशन", icon: "layers", price: "₹299", description: "Thermal foam insulation wrapping on external hot water pipes.", hindiDescription: "गर्म पानी के पाइपों पर थर्मल फोम इंसुलेशन।" }),
    createPlumbingService({ id: "plumb_main_shutoff", title: "Main Water Line Valve Fix", hindiTitle: "मेन वॉटर लाइन वाल्व", icon: "pipe-leak", price: "₹299", description: "Replacing jammed gate valves and ball valves on main water riser.", hindiDescription: "मेन वॉटर लाइन के जाम गेट वाल्व की रिप्लेसमेंट।" }),
    createPlumbingService({ id: "plumb_water_softener", title: "Water Softener Plant Fitting", hindiTitle: "वाटर सॉफ्टनर प्लांट फिटिंग", icon: "water-softener", price: "₹999", description: "Hard water to soft water treatment plant inlet/outlet connection.", hindiDescription: "हार्ड वाटर के लिए वाटर सॉफ्टनर प्लांट कनेक्शन।" }),
    createPlumbingService({ id: "plumb_dish_drain", title: "Dishwasher Drain & Water Point", hindiTitle: "डिशवॉशर वाटर पॉइंट", icon: "dishwasher", price: "₹349", description: "Dual inlet valve & high drain point setup for dishwashers.", hindiDescription: "डिशवॉशर के लिए इनलेट वाल्व और ड्रेन पॉइंट सेटअप।" }),
    createPlumbingService({ id: "plumb_sump_pump", title: "Basement Submersible Sump Pump", hindiTitle: "बेसमेंट सबमर्सिबल पंप", icon: "water-pump", price: "₹699", description: "Drainage sump pump installation for rainwater basement clearing.", hindiDescription: "बेसमेंट जलभराव के लिए सबमर्सिबल ड्रेन पंप।" }),
    createPlumbingService({ id: "plumb_bidet_spray", title: "Wall Mounted Bidet Fitting", hindiTitle: "वॉल माउंटेड बिडेट फिटिंग", icon: "shower", price: "₹249", description: "Installing concealed bidet mixer and hand spray.", hindiDescription: "वॉल माउंटेड बिडेट मिक्सर और स्प्रे की फिटिंग।" }),
    createPlumbingService({ id: "plumb_cpvc_welding", title: "CPVC Pipe Solvent Welding", hindiTitle: "सीपीवीसी पाइप सॉल्वेंट वेल्डिंग", icon: "pipe", price: "₹199", description: "Jointing CPVC pipes using high pressure solvent cement.", hindiDescription: "हाई प्रेशर सीपीवीसी पाइप सॉल्वेंट जॉइंटिंग।" }),
    createPlumbingService({ id: "plumb_gi_threading", title: "GI Iron Pipe Threading & Joint", hindiTitle: "जीआई पाइप थ्रेडिंग जॉइंट", icon: "wrench", price: "₹399", description: "Thread cutting and Teflon sealant application on GI iron pipes.", hindiDescription: "लोहे के जीआई पाइपों पर थ्रेडिंग और टेफ्लॉन सीलिंग।" }),
    createPlumbingService({ id: "plumb_pvc_drainage", title: "4 Inch Soil Drainage Pipe", hindiTitle: "4 इंची सीवर पाइप लाइन", icon: "pipe-wrench", price: "₹499", description: "Laying underground 4 inch PVC waste sewer pipe lines.", hindiDescription: "4 इंची पीवीसी सीवर नाली पाइप बिछाना।" }),
    createPlumbingService({ id: "plumb_sink_coupler", title: "Kitchen Sink Waste Basket", hindiTitle: "किचन सिंक वेस्ट बास्केट", icon: "sink", price: "₹149", description: "Replacing stainless steel sink strainer and jali coupler.", hindiDescription: "स्टेनलेस स्टील सिंक जाली और कपलिंग बदलना।" }),
    createPlumbingService({ id: "plumb_pressure_test", title: "Piping Hydrostatic Pressure Test", hindiTitle: "पाइप हाइड्रोस्टेटिक टेस्ट", icon: "gauge", price: "₹499", description: "Pressure testing internal piping system before wall plastering.", hindiDescription: "दीवार प्लास्टर से पहले पाइपिंग प्रेशर टेस्ट।" }),
    createPlumbingService({ id: "plumb_anti_siphon", title: "Anti-Siphon Breaker Valve", hindiTitle: "एंटी-साइफन वाल्व फिटिंग", icon: "shield-check", price: "₹249", description: "Installing vacuum breaker to prevent backflow into fresh water.", hindiDescription: "पीने के पानी में गंदे पानी की बैकफ्लो रोकने वाला वाल्व।" }),
    createPlumbingService({ id: "plumb_garden_sprinkler", title: "Lawn Garden Sprinkler Piping", hindiTitle: "गार्डन स्प्रिंकलर पाइपिंग", icon: "water", price: "₹449", description: "Pop-up sprinkler head and subterranean water line fitting.", hindiDescription: "गार्डन लॉन के लिए स्प्रिंकलर पाइपिंग।" }),
    createPlumbingService({ id: "plumb_kitchen_purifier_tap", title: "Pure Water Dedicated Faucet", hindiTitle: "प्योर वाटर डेडिकेटेड नल", icon: "faucet", price: "₹199", description: "Drilling countertop and fitting dedicated purifier swan tap.", hindiDescription: "मार्बल काउंटरटॉप पर आरओ का अलग से नल लगाना।" }),
    createPlumbingService({ id: "plumb_expansion_joint", title: "Building Riser Expansion Joint", hindiTitle: "बिल्डिंग राइजर एक्सपेंशन जॉइंट", icon: "link", price: "₹599", description: "Installing flexible expansion loops on tall building water risers.", hindiDescription: "ऊंची इमारतों के वॉटर राइजर में एक्सपेंशन जॉइंट।" }),
    createPlumbingService({ id: "plumb_water_hammer", title: "Water Hammer Arrestor Fitting", hindiTitle: "वॉटर हैमर अरेस्टर फिटिंग", icon: "volume-high", price: "₹349", description: "Eliminating loud banging pipe noises with a water hammer arrestor.", hindiDescription: "पाइपों की खड़खड़ाहट दूर करने वाला वॉटर हैमर अरेस्टर।" }),
    createPlumbingService({ id: "plumb_grease_trap", title: "Kitchen Grease Trap Interceptor", hindiTitle: "किचन ग्रीस ट्रैप सफाई", icon: "oil", price: "₹499", description: "Installing oil and grease interceptors for commercial kitchens.", hindiDescription: "किचन ड्रेन में तेल व ग्रीस जमने से रोकने वाला ट्रैप।" }),
    createPlumbingService({ id: "plumb_drain_snake", title: "Motorized Drain Snake Cable Clean", hindiTitle: "मोटराइज्ड ड्रेन स्नेक सफाई", icon: "snake", price: "₹399", description: "Clearing deep pipe blockages using power driven drain snake.", hindiDescription: "पावर स्नेक केबल से गहरी नाली की रुकावट खोलना।" }),
    createPlumbingService({ id: "plumb_leak_detector", title: "Acoustic Leak Detection Inspection", hindiTitle: "अकौस्टिक लीकेज चेकिंग", icon: "stethoscope", price: "₹499", description: "Locating underground or hidden wall water leaks without breakage.", hindiDescription: "बिना तोड़ाफोड़ी के दीवार के अंदर लीकेज की सटीक पहचान।" }),
    createPlumbingService({ id: "plumb_brass_nipple", title: "Brass Extension Nipple Fix", hindiTitle: "ब्रास एक्सटेंशन निप्पल फिटिंग", icon: "wrench", price: "₹99", description: "Fitting brass extension nipples for deep tile fittings.", hindiDescription: "टाइल्स के अंदर दबे नलों के लिए ब्रास निप्पल।" }),
    createPlumbingService({ id: "plumb_check_valve", title: "Non Return Check Valve Fitting", hindiTitle: "नान रिटर्न चेक वाल्व", icon: "arrow-right-bold-hexagon-outline", price: "₹229", description: "Fitting horizontal/vertical non-return NRV valve on main line.", hindiDescription: "एक तरफ पानी बहने वाला नान रिटर्न वाल्व।" }),
    createPlumbingService({ id: "plumb_whole_home_audit", title: "Complete Plumbing System Check", hindiTitle: "संपूर्ण प्लंबिंग चेकिंग", icon: "clipboard-check-outline", price: "₹399", description: "Complete checkup of water pressure, leaks, valves, & drainage.", hindiDescription: "वॉटर प्रेशर, लीकेज और ड्रेनेज की संपूर्ण जांच।" }),
];
exports.plumbingDetails = exports.plumbingDetailsList.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});
exports.plumbingServices = exports.plumbingDetailsList;
exports.default = exports.plumbingServices;
//# sourceMappingURL=plumbing.js.map