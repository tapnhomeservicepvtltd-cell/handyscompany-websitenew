import { ServiceDetail } from "@/types/service";

const createCarpenterService = (
  config: Partial<ServiceDetail> & Pick<ServiceDetail, "id" | "title" | "hindiTitle" | "price" | "description" | "hindiDescription">
): ServiceDetail => ({
  rating: 4.8,
  reviewsCount: 520,
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
  color: "#B45309",
  route: `/service/${config.id}`,
  category: "carpenter",
  price: config.price || "₹249",
  includes: [
    { title: "Inspection", icon: "eye" },
    { title: "Precision Fitting", icon: "hammer" },
    { title: "Testing", icon: "check-circle" }
  ],
  benefits: [
    { title: "Sturdy & Durable", icon: "shield-check" },
    { title: "Skilled Carpenter", icon: "account-check" }
  ],
  brandsUsed: ["Fevicol", "Godrej", "Hettich", "Ebco", "Dorset"],
  ...config,
});

export const carpenterDetailsList: ServiceDetail[] = [
  createCarpenterService({ id: "furniture-repair", title: "Furniture Repair & Fix", hindiTitle: "फर्नीचर रिपेयर", icon: "table-furniture", price: "₹249", description: "Expert repair for broken chairs, tables, beds, and wooden furniture.", hindiDescription: "टूटी हुई कुर्सी, टेबल और लकड़ी के फर्नीचर की रिपेयर।" }),
  createCarpenterService({ id: "door-repair", title: "Door Lock & Hinge Fitting", hindiTitle: "दरवाजा और लॉक रिपेयर", icon: "door-closed", price: "₹199", description: "Installation and repair of door locks, hinges, latches, and frames.", hindiDescription: "दरवाजे के लॉक, कब्जे और फ्रेम की फिटिंग व रिपेयर।" }),
  createCarpenterService({ id: "wardrobe-repair", title: "Wardrobe & Almirah Repair", hindiTitle: "वॉर्डरोब और अलमारी रिपेयर", icon: "wardrobe", price: "₹299", description: "Repair of wardrobe shutters, drawers, hinges, and sliding tracks.", hindiDescription: "वॉर्डरोब के शटर, दराज और स्लाइडिंग ट्रैक की रिपेयर।" }),
  createCarpenterService({ id: "bed-repair", title: "Bed & Cot Frame Repair", hindiTitle: "बेड और कॉट रिपेयर", icon: "bed", price: "₹279", description: "Fixing loose joints, broken slats, storage hydraulic, and bed frames.", hindiDescription: "ढीले जॉइंट, टूटी स्लैट्स और हाइड्रोलिक की रिपेयर।" }),
  createCarpenterService({ id: "window-repair", title: "Window Frame & Latch Repair", hindiTitle: "खिड़की फ्रेम रिपेयर", icon: "window-closed-variant", price: "₹229", description: "Repair of wooden window frames, glass beads, and brass latches.", hindiDescription: "लकड़ी की खिड़की के फ्रेम और कुंडी की रिपेयर।" }),
  createCarpenterService({ id: "curtain-rod-fixing", title: "Curtain Rod Bracket Mounting", hindiTitle: "कर्टेन रॉड फिटिंग", icon: "curtains", price: "₹149", description: "Drilling and fixing curtain rods, double tracks, and wall brackets.", hindiDescription: "कर्टेन रॉड और ब्रैकेट की ड्रिलिंग व फिटिंग।" }),
  createCarpenterService({ id: "wood-polishing", title: "Furniture Touchup & Polish", hindiTitle: "फर्नीचर पॉलिश", icon: "brush", price: "₹399", description: "Melamine and PU lacquer polishing for wooden furniture shine.", hindiDescription: "लकड़ी के फर्नीचर की मेलामाइन और पीयू पॉलिश।" }),
  createCarpenterService({ id: "modular-furniture-assembly", title: "Flat-Pack Furniture Assembly", hindiTitle: "फ्लैट-पैक फर्नीचर असेंबली", price: "₹349", icon: "toolbox", description: "Assembly of IKEA, Pepperfry, & Urban Ladder knock-down furniture.", hindiDescription: "आईकेईए और ब्रांडेड मॉड्यूलर फर्नीचर की असेंबली।" }),
  createCarpenterService({ id: "carp_door_handle", title: "Main Door Handle & Mortise Lock", hindiTitle: "डोर हैंडल और मर्टिस लॉक", icon: "lock", price: "₹249", description: "Installing digital door locks, mortise handles, and deadbolts.", hindiDescription: "डिजिटल लॉक और मर्टिस हैंडल की इंस्टॉलेशन।" }),
  createCarpenterService({ id: "carp_wooden_shelf", title: "Wall Floating Shelf Mounting", hindiTitle: "वॉल फ्लोटिंग शेल्फ फिटिंग", icon: "bookshelf", price: "₹179", description: "Level drilling and sturdy wall mounting of floating wooden shelves.", hindiDescription: "दीवार पर फ्लोटिंग शेल्फ की मजबूत माउंटिंग।" }),
  createCarpenterService({ id: "carp_sliding_door", title: "Sliding Door Roller & Track", hindiTitle: "स्लाइडिंग डोर रोलर बदलना", icon: "arrow-left-right", price: "₹349", description: "Replacing worn out bottom rollers and top tracks of sliding doors.", hindiDescription: "स्लाइडिंग डोर के घिसे हुए रोलर और ट्रैक बदलना।" }),
  createCarpenterService({ id: "carp_kitchen_trolley", title: "Kitchen Drawer Channel Replace", hindiTitle: "किचन ट्रॉली चैनल बदलना", icon: "tray-full", price: "₹299", description: "Replacing rusted telescopic drawer channels in kitchen cabinets.", hindiDescription: "किचन ट्रॉली के जंग लगे टेलीस्कोपिक चैनल बदलना।" }),
  createCarpenterService({ id: "carp_sofa_repair", title: "Sofa Leg & Wooden Structure Fix", hindiTitle: "सोफा लेग और फ्रेम रिपेयर", icon: "sofa", price: "₹299", description: "Fixing broken wooden legs and loose internal frame of sofas.", hindiDescription: "सोफे के टूटे पाए और ढीले लकड़ी के ढांचे को कसना।" }),
  createCarpenterService({ id: "carp_door_trimming", title: "Door Floor Scraping & Trimming", hindiTitle: "दरवाजा घिसाई व ट्रिमिंग", icon: "saw-blade", price: "₹199", description: "Planing and trimming bottom edge of swelling doors rubbing carpet.", hindiDescription: "फर्श पर रगड़ खाने वाले दरवाजे की घिसाई।" }),
  createCarpenterService({ id: "carp_hydraulic_hinge", title: "Auto-Close Hydraulic Soft Hinge", hindiTitle: "ऑटो सॉफ्ट-क्लोज कब्जा", icon: "cog", price: "₹179", description: "Installing 3D soft-close hydraulic hinges on cabinet doors.", hindiDescription: "कैबिनेट दरवाजों पर सॉफ्ट-क्लोज हाइड्रोलिक कब्जे।" }),
  createCarpenterService({ id: "carp_shoe_rack", title: "Shoe Cabinet Assembly & Fix", hindiTitle: "शू रैक असेंबली व रिपेयर", icon: "shoe-heel", price: "₹249", description: "Assembling wooden shoe racks and fixing tilting drawer hinges.", hindiDescription: "शू रैक की असेंबली और टिल्टिंग ड्रॉअर की रिपेयर।" }),
  createCarpenterService({ id: "carp_wooden_partition", title: "Wooden Screen & Lattice Partition", hindiTitle: "लकड़ी का जाली पार्टीशन", icon: "grid-large", price: "₹499", description: "Installation of CNC wooden jali and decorative room dividers.", hindiDescription: "सीएनसी कटिंग लकड़ी की जाली व पार्टीशन फिटिंग।" }),
  createCarpenterService({ id: "carp_tv_unit", title: "TV Wall Cabinet Unit Mounting", hindiTitle: "टीवी कैबिनेट यूनिट माउंटिंग", icon: "television-play", price: "₹599", description: "Wall mounting modular TV wall units and back paneling.", hindiDescription: "टीवी कैबिनेट और बैक पैनल की वॉल माउंटिंग।" }),
  createCarpenterService({ id: "carp_door_stopper", title: "Magnetic Door Stopper Fitting", hindiTitle: "मैग्नेटिक डोर स्टॉपर", icon: "magnet", price: "₹99", description: "Floor/wall installation of heavy duty magnetic door stoppers.", hindiDescription: "दीवार या फर्श पर मैग्नेटिक डोर स्टॉपर लगाना।" }),
  createCarpenterService({ id: "carp_glass_shelf", title: "Glass Shelf & Mirror Bracket", hindiTitle: "ग्लास शेल्फ व मिरर ब्रैकेट", icon: "mirror", price: "₹199", description: "Installing toughened glass shelves with brass brackets.", hindiDescription: "ग्लास शेल्फ और वैनिटी मिरर ब्रैकेट की फिटिंग।" }),
  createCarpenterService({ id: "carp_peep_hole", title: "Door Eye Viewer & Safety Chain", hindiTitle: "डोर आई व्यूअर और सेफ़्टी चेन", icon: "eye", price: "₹149", description: "Drilling 180-degree wide angle door viewer lens and chain.", hindiDescription: "दरवाजे में 180 डिग्री आई लेंस और सेफ्टी चेन लगाना।" }),
  createCarpenterService({ id: "carp_latch_towerbolt", title: "Tower Bolt & Latch Replacement", hindiTitle: "टावर बोल्ट और कुंडी", icon: "lock-outline", price: "₹129", description: "Replacing brass & SS tower bolts, night latches, & kundi.", hindiDescription: "ब्रास व एसएस टावर बोल्ट और कुंडी की रिप्लेसमेंट।" }),
  createCarpenterService({ id: "carp_dining_table", title: "Dining Table Joint Tightening", hindiTitle: "डाइनिंग टेबल रिपेयर", icon: "table-chair", price: "₹299", description: "Tightening wobbly dining table legs and wooden joints.", hindiDescription: "डाइनिंग टेबल के हिलते पैरों और जॉइंट्स को कसना।" }),
  createCarpenterService({ id: "carp_modular_kitchen", title: "Modular Kitchen Cabinet Hinge Fix", hindiTitle: "मॉड्यूलर किचन कैबिनेट रिपेयर", icon: "countertop", price: "₹349", description: "Aligning sagging modular kitchen shutter doors and hinges.", hindiDescription: "किचन कैबिनेट के लटके पल्लों और कब्जों का अलाइनमेंट।" }),
  createCarpenterService({ id: "carp_bed_storage", title: "Bed Storage Hydraulic Lift Pump", hindiTitle: "बेड हाइड्रोलिक लिफ्ट पंप", icon: "gas-cylinder", price: "₹499", description: "Replacing weak gas spring hydraulic lifters on storage beds.", hindiDescription: "स्टोरेज बेड के कमजोर गैस स्प्रिंग हाइड्रोलिक पंप बदलना।" }),
  createCarpenterService({ id: "carp_mosquito_net", title: "Wooden Window Mesh Frame", hindiTitle: "लकड़ी की खिड़की मच्छर जाली", icon: "grid", price: "₹299", description: "Fixing wire mesh netting on wooden window frames.", hindiDescription: "लकड़ी की खिड़की के फ्रेम में मच्छर जाली लगाना।" }),
  createCarpenterService({ id: "carp_plywood_cutting", title: "Custom Plywood Board Cutting", hindiTitle: "प्लाईवुड बोर्ड कटिंग", icon: "saw-blade", price: "₹199", description: "On-site circular saw cutting of plywood sheets for shelves.", hindiDescription: "साइट पर प्लाईवुड बोर्ड की सटीक कटिंग।" }),
  createCarpenterService({ id: "carp_key_stand", title: "Wooden Key Holder & Coat Hanger", hindiTitle: "की स्टैंड व कोट हैंगर", icon: "hanger", price: "₹129", description: "Wall mounting decorative key racks and heavy coat hangers.", hindiDescription: "की स्टैंड और कोट हैंगर की वॉल फिटिंग।" }),
  createCarpenterService({ id: "carp_picture_frame", title: "Heavy Photo Frame Hanging", hindiTitle: "फोटो फ्रेम व पेंटिंग हैंगिंग", icon: "image-frame", price: "₹149", description: "Drilling wall anchors for heavy mirror & photo frame hanging.", hindiDescription: "भारी फोटो फ्रेम व शीशे के लिए ड्रिलिंग व हैंगिंग।" }),
  createCarpenterService({ id: "carp_wooden_flooring", title: "Laminate Wooden Flooring Fix", hindiTitle: "लकड़ी की फ़्लोरिंग रिपेयर", price: "₹599", icon: "floor-plan", description: "Repairing lifted edges and damaged planks in wooden flooring.", hindiDescription: "वुडन फ़्लोरिंग के उखड़े तख्तों की मरम्मत।" }),
  createCarpenterService({ id: "carp_skirting", title: "Wooden Skirting & Bead Profile", hindiTitle: "वुडन स्कर्टिंग बीडिंग", icon: "border-bottom", price: "₹249", description: "Nailing and gluing wall skirting wooden borders.", hindiDescription: "दीवार के नीचे वुडन स्कर्टिंग की बीडिंग लगाना।" }),
  createCarpenterService({ id: "carp_stud_wall", title: "Drywall Stud Timber Frame", hindiTitle: "ड्राईवॉल टिम्बर फ्रेम", icon: "wall", price: "₹699", description: "Erecting wooden stud timber frame for gyproc drywall.", hindiDescription: "ड्राईवॉल के लिए लकड़ी का टिम्बर फ्रेम बनाना।" }),
  createCarpenterService({ id: "carp_study_table", title: "Study Desk Assembly & Drawer", hindiTitle: "स्टडी टेबल रिपेयर", icon: "desk", price: "₹299", description: "Repairing keyboard trays, locks, and drawers of study tables.", hindiDescription: "स्टडी टेबल की कीबोर्ड ट्रे और दराज की रिपेयर।" }),
  createCarpenterService({ id: "carp_loft_shutter", title: "Overhead Loft Wooden Shutter", hindiTitle: "ओवरहेड लॉफ्ट शटर फिटिंग", icon: "cupboard", price: "₹399", description: "Alignment and hinge fixing of top overhead loft doors.", hindiDescription: "छत के पास लॉफ्ट के पल्लों और कब्जों की फिटिंग।" }),
  createCarpenterService({ id: "carp_veneer_repair", title: "Veneer & Laminate Sheet Glue", hindiTitle: "सनमाइका व विनियर चिपकाना", icon: "layers-triple", price: "₹249", description: "Re-gluing unpeeled laminate sunmica sheets on furniture.", hindiDescription: "उखड़ी हुई सनमाइका या विनियर शीट को वापस चिपकाना।" }),
  createCarpenterService({ id: "carp_staircase_railing", title: "Wooden Stair Handrail Refix", hindiTitle: "सीढ़ी की लकड़ी की रेलिंग", icon: "stairs", price: "₹399", description: "Tightening wobbly wooden balusters and staircase handrails.", hindiDescription: "सीढ़ियों की ढीली लकड़ी की हैंडरेल को मजबूत करना।" }),
  createCarpenterService({ id: "carp_foldable_table", title: "Wall Mounted Foldable Table", hindiTitle: "वॉल फोल्डेबल टेबल फिटिंग", icon: "table", price: "₹299", description: "Installing heavy duty drop-leaf foldable wall tables.", hindiDescription: "दीवार पर फोल्डेबल स्टडी टेबल की फिटिंग।" }),
  createCarpenterService({ id: "carp_dressing_table", title: "Dressing Mirror & Drawer Fix", hindiTitle: "ड्रेसिंग टेबल रिपेयर", icon: "dresser", price: "₹249", description: "Repairing mirror frame mounting and cosmetic drawers.", hindiDescription: "ड्रेसिंग टेबल के शीशे के फ्रेम और दराज की रिपेयर।" }),
  createCarpenterService({ id: "carp_temple_mandir", title: "Wooden Temple Wall Mount", hindiTitle: "वुडन मंदिर वॉल माउंट", icon: "temple-hindu", price: "₹299", description: "Mounting carved wooden mandir units securely on walls.", hindiDescription: "दीवार पर लकड़ी के मंदिर की मजबूत माउंटिंग।" }),
  createCarpenterService({ id: "carp_balcony_decking", title: "Balcony Wooden Deck Tiles", hindiTitle: "बालकनी वुडन डेक टाइल्स", icon: "view-module", price: "₹499", description: "Interlocking outdoor teakwood deck tiles for balcony floor.", hindiDescription: "बालकनी फर्श के लिए इंटरलॉकिंग वुडन डेक टाइल्स।" }),
  createCarpenterService({ id: "carp_cloth_drying", title: "Ceiling Cloth Drying Hanger", hindiTitle: "सीलिंग क्लॉथ ड्रेनर रैक", icon: "hanger", price: "₹349", description: "Installing pulley-operated 6-rod ceiling clothes dryer.", hindiDescription: "पुलकी चालित सीलिंग कपड़े सुखाने वाला हैंगर।" }),
  createCarpenterService({ id: "carp_pantry_pullout", title: "Kitchen Tall Pantry Pull-Out", hindiTitle: "किचन टॉल पेंट्री पुलआउट", icon: "fridge-industrial", price: "₹499", description: "Installing heavy duty vertical pantry pullout wire baskets.", hindiDescription: "किचन टॉल यूनिट में वर्टिकल पेंट्री पुलआउट लगाना।" }),
  createCarpenterService({ id: "carp_door_closer", title: "Hydraulic Overhead Door Closer", hindiTitle: "हाइड्रोलिक डोर क्लोजर", icon: "door", price: "₹249", description: "Adjusting speed & mounting automatic door closer arm.", hindiDescription: "दरवाजा अपने-आप बंद करने वाला हाइड्रोलिक डोर क्लोजर।" }),
  createCarpenterService({ id: "carp_pelmet_box", title: "Curtain Wooden Pelmet Box", hindiTitle: "कर्टेन वुडन पेल्मेट बॉक्स", icon: "window-open", price: "₹399", description: "Custom wooden pelmet box framing over window curtains.", hindiDescription: "पर्दों को ढकने वाला वुडन पेल्मेट बॉक्स।" }),
  createCarpenterService({ id: "carp_corner_shelf", title: "Bathroom Wooden/Acrylic Corner", hindiTitle: "बाथरूम कॉर्नर शेल्फ", icon: "shape-square-plus", price: "₹149", description: "Corner drilling and fitting waterproof acrylic/wood shelves.", hindiDescription: "बाथरूम कोने में वाटरप्रूफ शेल्फ लगाना।" }),
  createCarpenterService({ id: "carp_cushion_headboard", title: "Bed Headboard Cushion Refix", hindiTitle: "बेड हेडबोर्ड कुशन फिटिंग", icon: "bed-double", price: "₹499", description: "Mounting upholstered leatherette/fabric bed headboard.", hindiDescription: "बेड के सिरहाने पर कुशन हेडबोर्ड की फिटिंग।" }),
  createCarpenterService({ id: "carp_edge_banding", title: "PVC Edge Banding Tape Fix", hindiTitle: "पीवीसी एज बाइंडिंग टेप", icon: "tape-measure", price: "₹149", description: "Hot-melt gluing PVC edge tape on sharp cabinet edges.", hindiDescription: "प्लाईवुड के पैने किनारों पर पीवीसी टेप लगाना।" }),
  createCarpenterService({ id: "carp_door_buffer", title: "Rubber Door Wall Cushion Bumper", hindiTitle: "डोर वॉल बम्पर बफर", icon: "circle-small", price: "₹79", description: "Installing wall door bumpers to prevent handle wall dents.", hindiDescription: "दीवार को गड्ढों से बचाने के लिए डोर बम्पर बफर लगाना।" }),
  createCarpenterService({ id: "carp_shutter_realign", title: "Wardrobe Shutter Gap Alignment", hindiTitle: "अलमारी शटर अलाइनमेंट", icon: "tune", price: "₹199", description: "Eliminating gaps and crooked shutter alignment in almirahs.", hindiDescription: "अलमारी के टेढ़े पल्लों की गैप अलाइनमेंट।" }),
  createCarpenterService({ id: "carp_home_audit", title: "Complete Wooden Furniture Audit", hindiTitle: "संपूर्ण फर्नीचर ऑडिट", price: "₹399", icon: "clipboard-text", description: "Termite check, joint inspection, and lock health audit.", hindiDescription: "दीमक, जॉइंट्स व ताले की संपूर्ण जांच।" }),
];

export const carpenterDetails: Record<string, ServiceDetail> = carpenterDetailsList.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, ServiceDetail>);

export const carpenterServices = carpenterDetailsList;
export default carpenterServices;
