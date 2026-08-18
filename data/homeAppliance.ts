import { ServiceDetail } from "@/types/service";

const createApplianceService = (
  config: Partial<ServiceDetail> & Pick<ServiceDetail, "id" | "title" | "hindiTitle" | "price" | "description" | "hindiDescription">
): ServiceDetail => ({
  rating: 4.8,
  reviewsCount: 780,
  duration: "45-60 Mins",
  visitCharge: 49,
  labourFree: true,
  membershipEligible: true,
  subscriptionPlan: "699 Membership",
  visitType: "Home Visit",
  materialIncluded: false,
  emergencyAvailable: true,
  labourCharge: "FREE",
  library: "MaterialCommunityIcons",
  color: "#D97706",
  route: `/service/${config.id}`,
  category: "appliance",
  price: config.price || "₹399",
  includes: [
    { title: "Inspection", icon: "eye" },
    { title: "Component Testing", icon: "cog" },
    { title: "Final Validation", icon: "check-circle" }
  ],
  benefits: [
    { title: "Original Spare Parts", icon: "shield-check" },
    { title: "30 Days Warranty", icon: "certificate" }
  ],
  brandsUsed: ["LG", "Samsung", "Whirlpool", "Daikin", "Voltas", "IFB", "Kent", "Sony"],
  ...config,
});

export const applianceDetailsList: ServiceDetail[] = [
  createApplianceService({ id: "ac-repair", title: "Air Conditioner Service & Gas Fill", hindiTitle: "एसी सर्विस व गैस चार्जिंग", icon: "air-conditioner", price: "₹499", description: "Foam jet service, gas charging, and cooling check for split & window AC.", hindiDescription: "स्प्लिट व विंडो एसी की फोम जेट सर्विस व गैस चार्जिंग।" }),
  createApplianceService({ id: "refrigerator-repair", title: "Refrigerator Cooling & Compressor", hindiTitle: "फ्रिज कूलिंग व कंप्रेसर रिपेयर", icon: "fridge-outline", price: "₹399", description: "Fixing cooling loss, gas leak, thermostat, and relay compressor faults.", hindiDescription: "फ्रिज की कूलिंग, गैस लीक और कंप्रेसर की रिपेयर।" }),
  createApplianceService({ id: "wm-repair", title: "Washing Machine Drum & Motor", hindiTitle: "वाशिंग मशीन ड्रम व मोटर", icon: "washing-machine", price: "₹349", description: "Spin motor, drain pump, belt, and PCB board repair for top & front load.", hindiDescription: "वाशिंग मशीन की स्पिन मोटर, ड्रेन पंप व पीसीबी बोर्ड।" }),
  createApplianceService({ id: "ro-repair", title: "RO Water Purifier Filter Service", hindiTitle: "आरो वॉटर प्यूरीफायर सर्विस", icon: "water-filter", price: "₹299", description: "Membrane, sediment filter replacement, and TDS water testing.", hindiDescription: "मेंब्रेन, सेडीमेंट फिल्टर रिप्लेसमेंट और टीडीएस जांच।" }),
  createApplianceService({ id: "led-tv-repair", title: "LED / Smart TV Display & Backlight", hindiTitle: "एलईडी टीवी डिस्प्ले व बैकलाइट", icon: "television", price: "₹499", description: "Fixing sound ok but no display, LED backlight strip change, and PCB.", hindiDescription: "साउंड ओके पर डिस्प्ले नहीं, बैकलाइट स्ट्रिप और पीसीबी।" }),
  createApplianceService({ id: "geyser-repair", title: "Geyser Element & Thermostat", hindiTitle: "गीजर हीटिंग एलिमेंट व थर्मोस्टेट", price: "₹299", description: "Replacing coil element, thermostat switch, and descaling storage tank.", hindiDescription: "हीटिंग एलिमेंट कोइल, थर्मोस्टेट और टैंक डीस्केलिंग।" }),
  createApplianceService({ id: "microwave-repair", title: "Microwave Magnetron & Heating", hindiTitle: "माइक्रोवेव मैग्नेट्रॉन व हीटिंग", price: "₹349", description: "Fixing no heating, spark inside, touch pad, and turntable motor.", hindiDescription: "माइक्रोवेव में हीटिंग न होना, स्पार्क और टचपैड रिपेयर।" }),
  createApplianceService({ id: "chimney-repair", title: "Kitchen Chimney Deep Clean & Motor", hindiTitle: "किचन चिमनी डीप क्लीन व मोटर", icon: "fan", price: "₹499", description: "Baffle filter degreasing, motor suction check, and ducting repair.", hindiDescription: "फिल्टर ग्रीस सफाई, मोटर सक्शन और डक्ट पाइप।" }),
  createApplianceService({ id: "mixer-grinder-repair", title: "Mixer Grinder Motor & Coupler", hindiTitle: "मिक्सर ग्राइंडर मोटर व कपलर", icon: "blender", price: "₹199", description: "Overload switch, motor armature carbon, jar blade, and coupler fix.", hindiDescription: "ओवरलोड स्विच, मोटर कार्बन, जार ब्लेड और कपलर।" }),
  createApplianceService({ id: "air-cooler-repair", title: "Air Cooler Water Pump & Pad", hindiTitle: "एयर कूलर पंप व हनीकॉम्ब पैड", icon: "air-filter", price: "₹249", description: "Replacing submersible pump, honeycomb cooling pads, and swing motor.", hindiDescription: "सबमर्सिबल पंप, हनीकॉम्ब पैड और स्विंग मोटर।" }),
  createApplianceService({ id: "appl_dishwasher", title: "Dishwasher Salt & Spray Arm Fix", hindiTitle: "डिशवॉशर स्प्रे आर्म व पंप", icon: "dishwasher", price: "₹449", description: "Cleaning spray arms, fixing drain pump error codes, and heating.", hindiDescription: "स्प्रे आर्म की सफाई, ड्रेन पंप और हीटिंग एरर।" }),
  createApplianceService({ id: "appl_water_dispenser", title: "Water Dispenser Cold Tank Fix", hindiTitle: "वाटर डिस्पेंसर कूलिंग रिपेयर", icon: "cup-water", price: "₹349", description: "Hot & cold water dispenser compressor gas fill and tap repair.", hindiDescription: "हॉट व कोल्ड वाटर डिस्पेंसर गैस चार्जिंग व नल।" }),
  createApplianceService({ id: "appl_air_purifier", title: "Air Purifier HEPA Filter Replace", hindiTitle: "एयर प्यूरीफायर हेपा फिल्टर", icon: "air-purifier", price: "₹299", description: "HEPA & carbon filter replacement and air quality sensor calibration.", hindiDescription: "हेपा और कार्बन फिल्टर रिप्लेसमेंट और सेंसर।" }),
  createApplianceService({ id: "appl_induction", title: "Induction Cooktop Glass & Coil", hindiTitle: "इंडक्शन चूल्हा ग्लास व कॉइल", icon: "stove", price: "₹249", description: "E0/E9 error code fix, IGBT transistor, and ceramic top glass replace.", hindiDescription: "E0/E9 एरर कोड रिपेयर, आईजीबीटी और टॉप ग्लास।" }),
  createApplianceService({ id: "appl_gas_stove", title: "Gas Stove Burner & Valve Clean", hindiTitle: "गैस स्टोव बर्नर व वाल्व सफाई", icon: "fire", price: "₹199", description: "Brass burner jet cleaning, nozzle unclogging, & auto-ignition fix.", hindiDescription: "ब्रास बर्नर जेट की सफाई, नोजल और ऑटो-इग्निशन।" }),
  createApplianceService({ id: "appl_gas_hob", title: "Built-in Gas Hob Glass & Spark", hindiTitle: "बिल्ट-इन गैस हॉब स्पार्क रिपेयर", icon: "stove", price: "₹399", description: "Replacing pulse generator sparker, valve knobs, and glass top.", hindiDescription: "पल्स जनरेटर स्पार्कर, वाल्व नॉब और टॉप ग्लास।" }),
  createApplianceService({ id: "appl_vacuum_cleaner", title: "Vacuum Cleaner Suction & Hose", hindiTitle: "वैक्यूम क्लीनर सक्शन व मोटर", icon: "vacuum", price: "₹299", description: "Motor carbon brush, flexible hose pipe, and dust bag fix.", hindiDescription: "मोटर कार्बन ब्रश, होस पाइप और डस्ट बैग रिपेयर।" }),
  createApplianceService({ id: "appl_cloth_dryer", title: "Tumble Clothes Dryer Belt & Heat", hindiTitle: "कपड़े सुखाने वाला ड्रायर हीटिंग", icon: "tshirt-crew", price: "₹449", description: "Replacing drum drive belt, heating element, and lint filter.", hindiDescription: "ड्रम ड्राइव बेल्ट, हीटिंग एलिमेंट और लिंट फिल्टर।" }),
  createApplianceService({ id: "appl_deep_freezer", title: "Commercial Deep Freezer Gas Fill", hindiTitle: "कमर्शियल दीप फ्रीजर गैस रिपेयर", icon: "snowflake", price: "₹799", description: "Chest freezer gas charging, thermostat, and door gasket seal.", hindiDescription: "चेस्ट फ्रीजर गैस चार्जिंग, थर्मोस्टेट व डोर रबर सील।" }),
  createApplianceService({ id: "appl_water_cooler", title: "Commercial Water Cooler Service", hindiTitle: "कमर्शियल वॉटर कूलर रिपेयर", icon: "water-pump", price: "₹699", description: "Stainless steel water cooler condenser coil cleaning & compressor.", hindiDescription: "स्टेनलेस स्टील वाटर कूलर कंडेनसर कॉइल व कंप्रेसर।" }),
  createApplianceService({ id: "appl_iron_press", title: "Steam Iron Box Soleplate & Cord", hindiTitle: "स्टीम आयरन प्रेस हीटिंग एलिमेंट", icon: "iron", price: "₹149", description: "Replacing non-stick soleplate, thermal fuse, and 3-core cable.", hindiDescription: "नॉन-स्टिक सोलप्लेट, थर्मल फ्यूज व केबल रिप्लेसमेंट।" }),
  createApplianceService({ id: "appl_room_heater", title: "Room Oil Heater & Blower Coil", hindiTitle: "रूम हीटर व ऑयल रेडिएटर", icon: "radiator", price: "₹249", description: "OFR oil radiator element, fan blower motor, and tip-over switch.", hindiDescription: "ऑयल रेडिएटर एलिमेंट, फैन ब्लोअर और स्विच।" }),
  createApplianceService({ id: "appl_sewing_machine", title: "Electric Sewing Machine Motor", hindiTitle: "इलेक्ट्रिक सिलाई मशीन मोटर", icon: "needle", price: "₹299", description: "Motor carbon brush replacement, foot pedal speed controller, and oiling.", hindiDescription: "सिलाई मशीन मोटर, फुट पैडल और ऑयलिंग।" }),
  createApplianceService({ id: "appl_attacakki", title: "Domestic Flour Mill Atta Chakki", hindiTitle: "आटा चक्की मोटर व जाली", icon: "grain", price: "₹399", description: "Motor capacitor, cutter blade, stainless steel jali, and sensor.", hindiDescription: "आटा चक्की मोटर, कटर ब्लेड और एसएस जाली।" }),
  createApplianceService({ id: "appl_food_processor", title: "Food Processor Motor & Jar", hindiTitle: "फूड प्रोसेसर मोटर रिपेयर", icon: "silverware-fork-knife", price: "₹299", description: "Fixing multi-utility jar lock gear, slicer disc, and drive shaft.", hindiDescription: "जार लॉक गियर, स्लाइसर डिस्क और ड्राइव शाफ्ट।" }),
  createApplianceService({ id: "appl_juicer", title: "Cold Press Slow Juicer Strainer", hindiTitle: "स्लो जूसर स्ट्रेनर व गियर", icon: "fruit-citrus", price: "₹249", description: "Clearing clogged fine mesh strainer and auger gear box.", hindiDescription: "जूसर स्ट्रेनर mesh और ऑगर गियर बॉक्स रिपेयर।" }),
  createApplianceService({ id: "appl_hand_blender", title: "Hand Blender Motor Shaft & Blade", hindiTitle: "हैंड ब्लेंडर मोटर व ब्लेड", icon: "blender-software", price: "₹149", description: "Replacing plastic drive gear, stainless steel stem, and switch.", hindiDescription: "प्लास्टिक ड्राइव गियर, स्टेम व स्विच बदलना।" }),
  createApplianceService({ id: "appl_coffee_maker", title: "Espresso Coffee Machine Pump", hindiTitle: "कॉफी मेकर पंप व हीटर", icon: "coffee-maker", price: "₹399", description: "Descaling boiler element, 15-bar pressure pump, and steam wand.", hindiDescription: "बॉयलर एलिमेंट, 15-बार पंप और स्टीम वांड।" }),
  createApplianceService({ id: "appl_electric_kettle", title: "Electric Tea Kettle Base & Switch", hindiTitle: "इलेक्ट्रिक केतली बेस व स्विच", icon: "kettle", price: "₹129", description: "Replacing auto shut-off thermostat, base connector, and element.", hindiDescription: "ऑटो कट-ऑफ थर्मोस्टेट और बेस कनेक्टर।" }),
  createApplianceService({ id: "appl_air_fryer", title: "Air Fryer Heating Element & Fan", hindiTitle: "एयर फ्रायर हीटिंग व फैन", icon: "food", price: "₹349", description: "Replacing coil heating tube, convection fan motor, and timer.", hindiDescription: "कोइल हीटिंग ट्यूब, फैन मोटर और डिजिटल टाइमर।" }),
  createApplianceService({ id: "appl_pop_toaster", title: "Pop-Up Bread Toaster Latch", hindiTitle: "पॉप-अप ब्रेड टोस्टर रिपेयर", icon: "toaster", price: "₹149", description: "Fixing spring release latch, heating mica sheet, and dial.", hindiDescription: "स्प्रिंग रिलीज लैच, हीटिंग मीका शीट व डायल।" }),
  createApplianceService({ id: "appl_sandwich_maker", title: "Sandwich Grill Maker Plate", hindiTitle: "सैंडविच ग्रिल मेकर हीटिंग", icon: "sandwich", price: "₹179", description: "Replacing thermostat fuse and Teflon non-stick plate element.", hindiDescription: "थर्मोस्टेट फ्यूज व टेफ्लॉन प्लेट हीटिंग।" }),
  createApplianceService({ id: "appl_dry_iron", title: "Dry Press Thermostat Dial Fix", hindiTitle: "ड्राई आयरन प्रेस रिपेयर", icon: "iron-board", price: "₹119", description: "Replacing bi-metallic strip thermostat and heat indicator bulb.", hindiDescription: "बाय-मेटेलिक थर्मोस्टेट व इंडिकेटर बल्ब बदलना।" }),
  createApplianceService({ id: "appl_hand_mixer", title: "Electric Hand Beater & Whisker", hindiTitle: "हैंड बीटर और व्हिस्कर", icon: "bowling", price: "₹149", description: "Replacing beaters ejector gear, speed control switch, and motor.", hindiDescription: "बीटर्स इजेक्टर गियर व स्पीड स्विच।" }),
  createApplianceService({ id: "appl_electric_cooker", title: "Electric Rice Cooker Magnetic Switch", hindiTitle: "इलेक्ट्रिक राइस कुकर स्विच", icon: "rice", price: "₹199", description: "Replacing warm/cook magnetic sensor switch and heating plate.", hindiDescription: "मैग्नेटिक सेंसर स्विच व हीटिंग प्लेट।" }),
  createApplianceService({ id: "appl_wet_grinder", title: "Tilting Tabletop Wet Grinder", hindiTitle: "टेबलटॉप वेट ग्राइंडर बेल्ट", icon: "circle-double", price: "₹249", description: "Replacing V-belt drive, granite roller stones, and motor.", hindiDescription: "वी-बेल्ट ड्राइव, ग्रेनाइट स्टोन व मोटर।" }),
  createApplianceService({ id: "appl_voltage_stabilizer", title: "TV & AC Voltage Stabilizer PCB", hindiTitle: "स्टेबलाइजर पीसीबी व रिले", icon: "flash", price: "₹249", description: "Fixing high voltage cut off relay, transformer, and circuit board.", hindiDescription: "हाई वोल्टेज कट ऑफ रिले और सर्किट बोर्ड।" }),
  createApplianceService({ id: "appl_cassette_ac", title: "Cassette AC Ceiling Service", hindiTitle: "कैसेट एसी सर्विस व गैस", icon: "air-conditioner", price: "₹899", description: "4-way ceiling cassette AC pump down, filter clean, & gas topup.", hindiDescription: "4-वे सीलिंग कैसेट एसी की सर्विस व गैस।" }),
  createApplianceService({ id: "appl_tower_fan", title: "Digital Tower Fan Blower Fix", hindiTitle: "डिजिटल टावर फैन रिपेयर", icon: "fan", price: "₹249", description: "Cross flow cylindrical blower cleaning, remote PCB, and swing motor.", hindiDescription: "सिलिंड्रिकल ब्लोअर, रिमोट पीसीबी व मोटर।" }),
  createApplianceService({ id: "appl_dehumidifier", title: "Home Air Dehumidifier Drain", hindiTitle: "होम डिह्यूमिडिफायर रिपेयर", icon: "water-off", price: "₹499", description: "Compressor cooling coil, water collection tank sensor, and fan.", hindiDescription: "कूलिंग कॉइल, टैंक सेंसर व फैन रिपेयर।" }),
  createApplianceService({ id: "appl_voltage_inverter", title: "Pure Sine Wave Inverter PCB Repair", hindiTitle: "साइन वेव इनवर्टर पीसीबी", icon: "battery-charging", price: "₹449", description: "Replacing MOSFET transistors, cooling fan, and transformer charging.", hindiDescription: "मोसफेट ट्रांजिस्टर, कूलिंग फैन व ट्रांसफार्मर।" }),
  createApplianceService({ id: "appl_soundbar", title: "TV Soundbar & Woofer Repair", hindiTitle: "साउंडबार व सबवूफर रिपेयर", icon: "speaker", price: "₹399", description: "Fixing Bluetooth connectivity, power supply board, and speaker driver.", hindiDescription: "ब्लूटूथ कनेक्टिविटी, पावर सप्लाई बोर्ड व ड्राइवर।" }),
  createApplianceService({ id: "appl_projector", title: "Home Theater Projector Lamp Fix", hindiTitle: "प्रोजेक्टर लैंप व रिपेयर", icon: "projector", price: "₹699", description: "Replacing projector DLP lamp, optical engine dust cleaning, & fan.", hindiDescription: "प्रोजेक्टर लैंप, ऑप्टिकल इंजन क्लीनिंग व फैन।" }),
  createApplianceService({ id: "appl_water_softener_appl", title: "Appliance Inline Scale Filter", hindiTitle: "वाशिंग मशीन स्केल फिल्टर", icon: "filter-outline", price: "₹199", description: "Installing polyphosphate descaled inline filter for washing machines.", hindiDescription: "वाशिंग मशीन व डिशवॉशर के लिए स्केल फिल्टर।" }),
  createApplianceService({ id: "appl_hair_dryer", title: "Salon Hair Dryer Heating & Cord", hindiTitle: "हेयर ड्रायर हीटिंग एलिमेंट", icon: "hair-dryer", price: "₹149", description: "Replacing mica heating wire, thermal cut-off, and heavy flex cord.", hindiDescription: "मीका हीटिंग वायर और फ्लेक्स केबल।" }),
  createApplianceService({ id: "appl_cloth_steamer", title: "Garment Steamer Boiler & Hose", hindiTitle: "गारमेंट स्टीमर बॉयलर रिपेयर", icon: "iron-board", price: "₹349", description: "Descaling boiler pump, steam nozzle hose pipe, & thermostat.", hindiDescription: "बॉयलर पंप, स्टीम नोजल होस व थर्मोस्टेट।" }),
  createApplianceService({ id: "appl_insect_killer", title: "UV Fly Insect Killer Tube & Grid", hindiTitle: "यूवी इंसेक्ट किलर ट्यूब", icon: "bug", price: "₹199", description: "Replacing 15W UV blue tubes and high voltage transformer grid.", hindiDescription: "यूवी ब्लू ट्यूब और हाई वोल्टेज ट्रांसफार्मर।" }),
  createApplianceService({ id: "appl_electric_tandoor", title: "Electric Tandoor Element & Tray", hindiTitle: "इलेक्ट्रिक तंदूर हीटिंग", icon: "stove", price: "₹299", description: "Replacing heavy heating coil element and tray slide rail.", hindiDescription: "हैवी हीटिंग कोइल एलिमेंट और ट्रे रेल।" }),
  createApplianceService({ id: "appl_dishwasher_rack", title: "Dishwasher Nylon Basket Rack Fix", hindiTitle: "डिशवॉशर बास्केट रैक रिपेयर", icon: "tray", price: "₹249", description: "Fixing roller wheels and anti-rust nylon coating on dishwasher racks.", hindiDescription: "रोलर व्हील्स व एंटी-रस्ट कोटिंग बास्केट।" }),
  createApplianceService({ id: "appl_appliance_audit", title: "Whole House Appliance Safety Audit", hindiTitle: "संपूर्ण अप्लायंस सेफ्टी जांच", icon: "clipboard-check", price: "₹399", description: "Power consumption, earth leakage, and motor health audit for all home appliances.", hindiDescription: "घर के सभी अप्लायंसेज की पावर व सुरक्षा जांच।" }),
];

export const applianceDetails: Record<string, ServiceDetail> = applianceDetailsList.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, ServiceDetail>);

export const applianceServices = applianceDetailsList;
export default applianceServices;
