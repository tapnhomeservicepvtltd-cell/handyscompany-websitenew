"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pilgrimServices = exports.helperServices = exports.emergencyServices = exports.healthcareServices = exports.utilityServices = exports.shoppingServices = exports.petServices = exports.eventServices = exports.governmentServices = exports.businessServices = exports.courierServices = exports.rentalServices = exports.propertyServices = exports.commercialServices = exports.transportServices = exports.foodServices = exports.tourismServices = exports.religiousServices = void 0;
exports.religiousServices = [
    { slug: 'pind-daan-booking', name: 'Pind Daan Booking', nameHi: 'पिंड दान बुकिंग', basePrice: 501, icon: 'om' },
    { slug: 'verified-pandit-booking', name: 'Verified Pandit Booking', nameHi: 'वेरिफाइड पंडित बुकिंग', basePrice: 501, icon: 'account' },
    { slug: 'shradh-puja', name: 'Shradh Puja', nameHi: 'श्राद्ध पूजा', basePrice: 1100, icon: 'fire' },
    { slug: 'tripindi-shradh', name: 'Tripindi Shradh', nameHi: 'त्रिपिंडी श्राद्ध', basePrice: 2100, icon: 'fire' },
    { slug: 'tarpan-puja', name: 'Tarpan Puja', nameHi: 'तर्पण पूजा', basePrice: 501, icon: 'water' },
    { slug: 'vishnupad-puja', name: 'Vishnupad Puja', nameHi: 'विष्णुपद पूजा', basePrice: 501, icon: 'hands-pray' },
    { slug: 'falgu-river-puja', name: 'Falgu River Puja', nameHi: 'फल्गू नदी पूजा', basePrice: 251, icon: 'water' },
    { slug: 'brahmin-booking', name: 'Brahmin Booking', nameHi: 'ब्राह्मण बुकिंग', basePrice: 501, icon: 'account-group' },
    { slug: 'puja-samagri-delivery', name: 'Puja Samagri Delivery', nameHi: 'पूजा सामग्री डिलीवरी', basePrice: 100, icon: 'basket' },
    { slug: 'temple-assistant', name: 'Temple Assistant', nameHi: 'मंदिर सहायक', basePrice: 200, icon: 'hand-heart' },
];
exports.tourismServices = [
    { slug: 'local-tour-guide', name: 'Local Tour Guide', nameHi: 'लोकल टूर गाइड', basePrice: 500, icon: 'compass' },
    { slug: 'buddhist-tour-guide', name: 'Buddhist Tour Guide', nameHi: 'बुद्धिस्ट टूर गाइड', basePrice: 800, icon: 'compass-outline' },
    { slug: 'english-tour-guide', name: 'English Tour Guide', nameHi: 'इंग्लिश टूर गाइड', basePrice: 1000, icon: 'translate' },
    { slug: 'hindi-tour-guide', name: 'Hindi Tour Guide', nameHi: 'हिंदी टूर गाइड', basePrice: 500, icon: 'translate' },
    { slug: 'japanese-tour-guide', name: 'Japanese Tour Guide', nameHi: 'जापानी टूर गाइड', basePrice: 2000, icon: 'translate' },
    { slug: 'thai-tour-guide', name: 'Thai Tour Guide', nameHi: 'थाई टूर गाइड', basePrice: 2000, icon: 'translate' },
    { slug: 'korean-tour-guide', name: 'Korean Tour Guide', nameHi: 'कोरियन टूर गाइड', basePrice: 2000, icon: 'translate' },
    { slug: 'airport-pickup', name: 'Airport Pickup', nameHi: 'एयरपोर्ट पिकअप', basePrice: 400, icon: 'airplane' },
    { slug: 'railway-pickup', name: 'Railway Pickup', nameHi: 'रेलवे पिकअप', basePrice: 200, icon: 'train' },
    { slug: 'tour-package', name: 'Tour Package Booking', nameHi: 'टूर पैकेज बुकिंग', basePrice: 5000, icon: 'bag-suitcase' },
];
exports.foodServices = [
    { slug: 'daily-tiffin', name: 'Daily Tiffin Service', nameHi: 'डेली टिफिन सर्विस', basePrice: 80, icon: 'food' },
    { slug: 'home-cooked-food', name: 'Home Cooked Food', nameHi: 'घर का बना खाना', basePrice: 100, icon: 'pot-steam' },
    { slug: 'mess-membership', name: 'Mess Membership', nameHi: 'मेस मेंबरशिप', basePrice: 2500, icon: 'food-variant' },
    { slug: 'mess-booking', name: 'Mess Booking', nameHi: 'मेस बुकिंग', basePrice: 100, icon: 'silverware' },
    { slug: 'canteen-service', name: 'Canteen Service', nameHi: 'कैंटीन सर्विस', basePrice: 50, icon: 'storefront' },
    { slug: 'corporate-lunch', name: 'Corporate Lunch', nameHi: 'कॉर्पोरेट लंच', basePrice: 150, icon: 'briefcase' },
    { slug: 'breakfast-plan', name: 'Breakfast Plan', nameHi: 'ब्रेकफास्ट प्लान', basePrice: 60, icon: 'coffee' },
    { slug: 'lunch-plan', name: 'Lunch Plan', nameHi: 'लंच प्लान', basePrice: 100, icon: 'food' },
    { slug: 'dinner-plan', name: 'Dinner Plan', nameHi: 'डिनर प्लान', basePrice: 100, icon: 'food-turkey' },
    { slug: 'festival-food-service', name: 'Festival Food Service', nameHi: 'त्यौहार भोजन सेवा', basePrice: 500, icon: 'party-popper' },
];
exports.transportServices = [
    { slug: 'driver-on-demand', name: 'Driver On Demand', nameHi: 'ड्राइवर ऑन डिमांड', basePrice: 500, icon: 'steering' },
    { slug: 'chauffeur-service', name: 'Chauffeur Service', nameHi: 'शोफर सर्विस', basePrice: 800, icon: 'car-tie' },
    { slug: 'tempo-booking', name: 'Tempo Booking', nameHi: 'टेम्पो बुकिंग', basePrice: 600, icon: 'truck-fast' },
    { slug: 'mini-truck-booking', name: 'Mini Truck Booking', nameHi: 'मिनी ट्रक बुकिंग', basePrice: 800, icon: 'truck' },
    { slug: 'auto-booking', name: 'Auto Booking', nameHi: 'ऑटो बुकिंग', basePrice: 100, icon: 'rickshaw' },
    { slug: 'porter-service', name: 'Porter Service', nameHi: 'कुली सेवा', basePrice: 200, icon: 'carry-on-bag' },
];
exports.commercialServices = [
    { slug: 'office-maintenance', name: 'Office Maintenance', nameHi: 'ऑफिस मेंटेनेंस', basePrice: 999, icon: 'office-building' },
    { slug: 'hotel-maintenance', name: 'Hotel Maintenance', nameHi: 'होटल मेंटेनेंस', basePrice: 1499, icon: 'domain' },
    { slug: 'restaurant-maintenance', name: 'Restaurant Maintenance', nameHi: 'रेस्टोरेंट मेंटेनेंस', basePrice: 1299, icon: 'store' },
    { slug: 'shop-maintenance', name: 'Shop Maintenance', nameHi: 'शॉप मेंटेनेंस', basePrice: 499, icon: 'storefront' },
    { slug: 'mall-maintenance', name: 'Mall Maintenance', nameHi: 'मॉल मेंटेनेंस', basePrice: 2999, icon: 'shopping' },
    { slug: 'factory-maintenance', name: 'Factory Maintenance', nameHi: 'फैक्ट्री मेंटेनेंस', basePrice: 4999, icon: 'factory' },
    { slug: 'warehouse-maintenance', name: 'Warehouse Maintenance', nameHi: 'गोदाम मेंटेनेंस', basePrice: 1999, icon: 'warehouse' },
    { slug: 'school-maintenance', name: 'School Maintenance', nameHi: 'स्कूल मेंटेनेंस', basePrice: 1499, icon: 'school' },
    { slug: 'hostel-maintenance', name: 'Hostel Maintenance', nameHi: 'हॉस्टल मेंटेनेंस', basePrice: 999, icon: 'home-group' },
    { slug: 'pg-maintenance', name: 'PG Maintenance', nameHi: 'पीजी मेंटेनेंस', basePrice: 499, icon: 'bed' },
];
exports.propertyServices = [
    { slug: 'property-inspection', name: 'Property Inspection', nameHi: 'प्रॉपर्टी इंस्पेक्शन', basePrice: 299, icon: 'home-search' },
    { slug: 'house-watch-service', name: 'House Watch Service', nameHi: 'हाउस वॉच सर्विस', basePrice: 499, icon: 'eye' },
    { slug: 'tenant-verification', name: 'Tenant Verification', nameHi: 'किरायेदार वेरिफिकेशन', basePrice: 199, icon: 'account-check' },
    { slug: 'property-cleanup', name: 'Property Cleanup', nameHi: 'प्रॉपर्टी सफाई', basePrice: 999, icon: 'broom' },
    { slug: 'move-in-assistance', name: 'Move-in Assistance', nameHi: 'मूव-इन सहायता', basePrice: 499, icon: 'truck-delivery' },
    { slug: 'move-out-assistance', name: 'Move-out Assistance', nameHi: 'मूव-आउट सहायता', basePrice: 499, icon: 'truck-fast' },
];
exports.rentalServices = [
    { slug: 'ac-rental', name: 'AC Rental', nameHi: 'एसी रेंटल', basePrice: 1000, icon: 'air-conditioner' },
    { slug: 'cooler-rental', name: 'Cooler Rental', nameHi: 'कूलर रेंटल', basePrice: 500, icon: 'fan' },
    { slug: 'refrigerator-rental', name: 'Refrigerator Rental', nameHi: 'फ्रिज रेंटल', basePrice: 800, icon: 'fridge' },
    { slug: 'washing-machine-rental', name: 'Washing Machine Rental', nameHi: 'वाशिंग मशीन रेंटल', basePrice: 800, icon: 'washing-machine' },
    { slug: 'generator-rental', name: 'Generator Rental', nameHi: 'जेनरेटर रेंटल', basePrice: 1500, icon: 'engine-outline' },
    { slug: 'water-purifier-rental', name: 'Water Purifier Rental', nameHi: 'वाटर प्यूरीफायर रेंटल', basePrice: 400, icon: 'water' },
    { slug: 'wheelchair-rental', name: 'Wheelchair Rental', nameHi: 'व्हीलचेयर रेंटल', basePrice: 200, icon: 'wheelchair-accessibility' },
    { slug: 'event-chair-rental', name: 'Event Chair Rental', nameHi: 'इवेंट चेयर रेंटल', basePrice: 10, icon: 'chair-school' },
    { slug: 'tent-rental', name: 'Tent Rental', nameHi: 'टेंट रेंटल', basePrice: 1000, icon: 'tent' },
    { slug: 'speaker-rental', name: 'Speaker Rental', nameHi: 'स्पीकर रेंटल', basePrice: 1000, icon: 'speaker' },
];
exports.courierServices = [
    { slug: 'document-delivery', name: 'Document Delivery', nameHi: 'दस्तावेज़ डिलीवरी', basePrice: 50, icon: 'file-document' },
    { slug: 'parcel-delivery', name: 'Parcel Delivery', nameHi: 'पार्सल डिलीवरी', basePrice: 100, icon: 'package' },
    { slug: 'same-day-delivery', name: 'Same Day Delivery', nameHi: 'सेम डे डिलीवरी', basePrice: 200, icon: 'truck-fast' },
    { slug: 'bike-courier', name: 'Bike Courier', nameHi: 'बाइक कूरियर', basePrice: 100, icon: 'bike' },
    { slug: 'gift-delivery', name: 'Gift Delivery', nameHi: 'गिफ्ट डिलीवरी', basePrice: 150, icon: 'gift' },
    { slug: 'flower-delivery', name: 'Flower Delivery', nameHi: 'फ्लावर डिलीवरी', basePrice: 150, icon: 'flower' },
    { slug: 'cake-delivery', name: 'Cake Delivery', nameHi: 'केक डिलीवरी', basePrice: 150, icon: 'cake' },
];
exports.businessServices = [
    { slug: 'gst-consultant', name: 'GST Consultant', nameHi: 'जीएसटी कंसल्टेंट', basePrice: 1000, icon: 'finance' },
    { slug: 'ca-consultation', name: 'CA Consultation', nameHi: 'सीए कंसल्टेशन', basePrice: 1500, icon: 'account-tie' },
    { slug: 'legal-consultation', name: 'Legal Consultation', nameHi: 'लीगल कंसल्टेशन', basePrice: 2000, icon: 'scale-balance' },
    { slug: 'company-registration', name: 'Company Registration', nameHi: 'कंपनी रजिस्ट्रेशन', basePrice: 5000, icon: 'domain' },
    { slug: 'startup-consultation', name: 'Startup Consultation', nameHi: 'स्टार्टअप कंसल्टेशन', basePrice: 2500, icon: 'rocket' },
    { slug: 'digital-marketing', name: 'Digital Marketing', nameHi: 'डिजिटल मार्केटिंग', basePrice: 5000, icon: 'chart-line' },
    { slug: 'website-development', name: 'Website Development', nameHi: 'वेबसाइट डेवलपमेंट', basePrice: 10000, icon: 'web' },
    { slug: 'graphic-design', name: 'Graphic Design', nameHi: 'ग्राफिक डिज़ाइन', basePrice: 2000, icon: 'palette' },
    { slug: 'photography', name: 'Photography', nameHi: 'फोटोग्राफी', basePrice: 3000, icon: 'camera' },
    { slug: 'videography', name: 'Videography', nameHi: 'वीडियोग्राफी', basePrice: 5000, icon: 'video' },
];
exports.governmentServices = [
    { slug: 'document-printing', name: 'Document Printing', nameHi: 'डॉक्यूमेंट प्रिंटिंग', basePrice: 50, icon: 'printer' },
    { slug: 'photocopy-service', name: 'Photocopy Service', nameHi: 'फोटोकॉपी सर्विस', basePrice: 50, icon: 'file-document-multiple' },
    { slug: 'passport-photo', name: 'Passport Photo Service', nameHi: 'पासपोर्ट फोटो', basePrice: 100, icon: 'camera' },
    { slug: 'online-form-filling', name: 'Online Form Filling', nameHi: 'ऑनलाइन फॉर्म फिलिंग', basePrice: 100, icon: 'form-textbox' },
    { slug: 'government-service-assistance', name: 'Govt Service Assistance', nameHi: 'सरकारी सेवा सहायता', basePrice: 200, icon: 'bank' },
];
exports.eventServices = [
    { slug: 'event-setup-helper', name: 'Event Setup Helper', nameHi: 'इवेंट सेटअप हेल्पर', basePrice: 400, icon: 'party-popper' },
    { slug: 'lighting-install', name: 'Event Lighting Install', nameHi: 'लाइटिंग इंस्टॉलेशन', basePrice: 500, icon: 'string-lights' },
    { slug: 'stage-helper', name: 'Stage Setup Helper', nameHi: 'स्टेज हेल्पर', basePrice: 400, icon: 'podium' },
    { slug: 'tent-helper', name: 'Tent Setup Helper', nameHi: 'टेंट हेल्पर', basePrice: 400, icon: 'tent' },
    { slug: 'photographer-booking', name: 'Photographer Booking', nameHi: 'फोटोग्राफर बुकिंग', basePrice: 2000, icon: 'camera-iris' },
    { slug: 'videographer-booking', name: 'Videographer Booking', nameHi: 'वीडियोग्राफर बुकिंग', basePrice: 3000, icon: 'video' },
    { slug: 'decoration-helper', name: 'Decoration Helper', nameHi: 'डेकोरेशन हेल्पर', basePrice: 400, icon: 'balloon' },
];
exports.petServices = [
    { slug: 'pet-walking', name: 'Pet Walking', nameHi: 'पेट वॉकिंग', basePrice: 150, icon: 'dog-service' },
    { slug: 'pet-grooming', name: 'Pet Grooming', nameHi: 'पेट ग्रूमिंग', basePrice: 499, icon: 'paw' },
    { slug: 'pet-sitting', name: 'Pet Sitting', nameHi: 'पेट सिटिंग', basePrice: 299, icon: 'home-heart' },
    { slug: 'pet-training', name: 'Pet Training', nameHi: 'पेट ट्रेनिंग', basePrice: 999, icon: 'dog' },
];
exports.shoppingServices = [
    { slug: 'grocery-shopping', name: 'Grocery Shopping Helper', nameHi: 'किराना शॉपिंग हेल्पर', basePrice: 100, icon: 'cart' },
    { slug: 'hardware-shopping', name: 'Hardware Shopping Helper', nameHi: 'हार्डवेयर शॉपिंग हेल्पर', basePrice: 150, icon: 'tools' },
    { slug: 'construction-material-delivery', name: 'Construction Material Delivery', nameHi: 'निर्माण सामग्री डिलीवरी', basePrice: 200, icon: 'cement' },
];
exports.utilityServices = [
    { slug: 'wifi-installation', name: 'WiFi Installation', nameHi: 'वाईफाई इंस्टॉलेशन', basePrice: 500, icon: 'wifi' },
    { slug: 'internet-technician', name: 'Internet Technician', nameHi: 'इंटरनेट टेक्नीशियन', basePrice: 300, icon: 'router-network' },
    { slug: 'printer-installation', name: 'Printer Installation', nameHi: 'प्रिंटर इंस्टॉलेशन', basePrice: 400, icon: 'printer' },
    { slug: 'computer-setup', name: 'Computer Setup', nameHi: 'कंप्यूटर सेटअप', basePrice: 500, icon: 'laptop' },
    { slug: 'cctv-monitoring', name: 'CCTV Monitoring', nameHi: 'सीसीटीवी मॉनिटरिंग', basePrice: 1000, icon: 'cctv' },
    { slug: 'network-support', name: 'Network Support', nameHi: 'नेटवर्क सपोर्ट', basePrice: 500, icon: 'network' },
];
exports.healthcareServices = [
    { slug: 'doctor-home-visit', name: 'Doctor Home Visit', nameHi: 'डॉक्टर होम विज़िट', basePrice: 1000, icon: 'doctor' },
    { slug: 'nurse-home-visit', name: 'Nurse Home Visit', nameHi: 'नर्स होम विज़िट', basePrice: 800, icon: 'user-nurse' },
    { slug: 'physiotherapist', name: 'Physiotherapist', nameHi: 'फिजियोथेरेपिस्ट', basePrice: 700, icon: 'wheelchair' },
    { slug: 'blood-test-home', name: 'Blood Test Home', nameHi: 'ब्लड टेस्ट होम', basePrice: 500, icon: 'water' },
    { slug: 'ecg-home', name: 'ECG at Home', nameHi: 'घर पर ईसीजी', basePrice: 800, icon: 'heart-pulse' },
    { slug: 'oxygen-cylinder', name: 'Oxygen Cylinder', nameHi: 'ऑक्सीजन सिलेंडर', basePrice: 1500, icon: 'gas-cylinder' },
    { slug: 'wheelchair-rental', name: 'Wheelchair Rental', nameHi: 'व्हीलचेयर रेंटल', basePrice: 200, icon: 'wheelchair-accessibility' },
    { slug: 'medical-equipment-rental', name: 'Medical Equipment Rental', nameHi: 'चिकित्सा उपकरण रेंटल', basePrice: 500, icon: 'stethoscope' },
    { slug: 'ambulance-booking', name: 'Ambulance Booking', nameHi: 'एम्बुलेंस बुकिंग', basePrice: 1000, icon: 'ambulance' },
    { slug: 'medicine-delivery', name: 'Medicine Delivery', nameHi: 'दवा डिलीवरी', basePrice: 100, icon: 'pill' },
];
exports.emergencyServices = [
    { slug: '24x7-electrician', name: '24x7 Emergency Electrician', nameHi: '24x7 इमरजेंसी इलेक्ट्रीशियन', basePrice: 399, icon: 'lightning-bolt' },
    { slug: '24x7-plumber', name: '24x7 Emergency Plumber', nameHi: '24x7 इमरजेंसी प्लंबर', basePrice: 399, icon: 'water-pump' },
    { slug: '24x7-carpenter', name: '24x7 Emergency Carpenter', nameHi: '24x7 इमरजेंसी कारपेंटर', basePrice: 399, icon: 'saw-blade' },
    { slug: '24x7-locksmith', name: '24x7 Emergency Locksmith', nameHi: '24x7 लॉकस्मिथ', basePrice: 499, icon: 'lock-open' },
    { slug: '24x7-water-leakage', name: '24x7 Water Leakage Fix', nameHi: '24x7 वॉटर लीकेज फिक्स', basePrice: 499, icon: 'pipe-leak' },
    { slug: '24x7-power-failure', name: '24x7 Power Failure Fix', nameHi: '24x7 पावर फेल्योर फिक्स', basePrice: 499, icon: 'flash-alert' },
    { slug: '24x7-ac-breakdown', name: '24x7 AC Breakdown', nameHi: '24x7 एसी ब्रेकडाउन', basePrice: 599, icon: 'air-conditioner' },
    { slug: 'emergency-home-repair', name: 'Emergency Home Repair', nameHi: 'इमरजेंसी होम रिपेयर', basePrice: 499, icon: 'home-alert' },
    { slug: 'night-emergency-service', name: 'Night Emergency Helper', nameHi: 'नाइट इमरजेंसी हेल्पर', basePrice: 500, icon: 'weather-night' },
];
exports.helperServices = [
    { slug: 'helper-on-demand', name: 'Helper On Demand', nameHi: 'हेल्पर ऑन डिमांड', basePrice: 250, icon: 'hand-back-right' },
    { slug: 'construction-helper', name: 'Construction Helper', nameHi: 'कंस्ट्रक्शन हेल्पर', basePrice: 400, icon: 'hard-hat' },
    { slug: 'loading-helper', name: 'Loading Helper', nameHi: 'लोडिंग हेल्पर', basePrice: 300, icon: 'truck-loading' },
    { slug: 'unloading-helper', name: 'Unloading Helper', nameHi: 'अनलोडिंग हेल्पर', basePrice: 300, icon: 'truck-loading' },
    { slug: 'furniture-shifting-helper', name: 'Furniture Shifting', nameHi: 'फर्नीचर शिफ्टिंग', basePrice: 350, icon: 'sofa' },
    { slug: 'appliance-shifting-helper', name: 'Appliance Shifting', nameHi: 'अप्लायंस शिफ्टिंग', basePrice: 350, icon: 'washing-machine' },
    { slug: 'packing-helper', name: 'Packing Helper', nameHi: 'पैकिंग हेल्पर', basePrice: 250, icon: 'package-variant-closed' },
    { slug: 'unpacking-helper', name: 'Unpacking Helper', nameHi: 'अनपैकिंग हेल्पर', basePrice: 250, icon: 'package-variant' },
    { slug: 'house-shifting-helper', name: 'House Shifting Helper', nameHi: 'हाउस शिफ्टिंग', basePrice: 500, icon: 'home-export-outline' },
    { slug: 'office-shifting-helper', name: 'Office Shifting Helper', nameHi: 'ऑफिस शिफ्टिंग', basePrice: 600, icon: 'domain' },
];
exports.pilgrimServices = [
    { slug: 'hotel-booking', name: 'Hotel Booking Assistant', nameHi: 'होटल बुकिंग सहायक', basePrice: 150, icon: 'bed' },
    { slug: 'guest-house-booking', name: 'Guest House Booking', nameHi: 'गेस्ट हाउस बुकिंग', basePrice: 150, icon: 'home-city' },
    { slug: 'ashram-booking', name: 'Ashram Booking', nameHi: 'आश्रम बुकिंग', basePrice: 100, icon: 'meditation' },
    { slug: 'dharamshala-booking', name: 'Dharamshala Booking', nameHi: 'धर्मशाला बुकिंग', basePrice: 100, icon: 'home-group' },
    { slug: 'locker-service', name: 'Locker Service', nameHi: 'लॉकर सर्विस', basePrice: 50, icon: 'locker' },
    { slug: 'luggage-storage', name: 'Luggage Storage', nameHi: 'सामान स्टोरेज', basePrice: 100, icon: 'bag-personal' },
    { slug: 'pilgrim-assistant', name: 'Pilgrim Assistant', nameHi: 'तीर्थयात्री सहायक', basePrice: 400, icon: 'human-cane' },
    { slug: 'senior-citizen-assistance', name: 'Senior Citizen Assistance', nameHi: 'वरिष्ठ नागरिक सहायता', basePrice: 300, icon: 'human-wheelchair' },
];
//# sourceMappingURL=superApp.js.map