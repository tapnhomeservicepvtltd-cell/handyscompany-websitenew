// data/legalData.ts
// Enterprise Legal, Policy & Support Data for HandysCompany (TapnHome Service Private Limited)

export interface PolicySection {
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
}

export interface LegalDocument {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
  lastUpdated: string;
  summaryEn: string;
  summaryHi: string;
  sections: PolicySection[];
}

export interface FaqItem {
  id: string;
  category: 'Booking' | 'Payments' | 'Membership' | 'Warranty' | 'Refund' | 'Coupons' | 'Technicians' | 'Invoices' | 'Safety' | 'Support';
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

export const companyDetails = {
  name: 'TapnHome Service Private Limited',
  brand: 'HandysCompany',
  website: 'https://handyscompany.in',
  phone: '+91 731500023',
  email: 'info@handyscompany.in',
  supportHours: 'Monday - Sunday: 08:00 AM - 09:00 PM IST',
  emergencySupport: '24/7 Priority Emergency SOS Dispatch',
  corporateOffice: 'Heights Tower, 4th Floor, AP Colony, Main Road, Gaya, Bihar - 823001, India',
};

// ─── 30+ FAQ CENTER DATA ────────────────────────────────────────────────────────
export const faqsList: FaqItem[] = [
  // Booking (3)
  {
    id: 'faq-1',
    category: 'Booking',
    questionEn: 'How do I book a home service on HandysCompany?',
    questionHi: 'HandyCompany पर होम सर्विस कैसे बुक करें?',
    answerEn: 'Select your service category (Electrical, Plumbing, AC Repair, Cleaning, etc.), choose your required service or variant, select a convenient date and time slot, add your address, and confirm payment via UPI, Wallet, or Cash on Delivery.',
    answerHi: 'अपनी सर्विस कैटेगरी चुनें (इलेक्ट्रिकल, प्लंबिंग, एसी रिपेयर आदि), तारीख व समय चुनें, पता दर्ज करें और पेमेंट या कैश ऑन डिलीवरी से बुक करें।',
  },
  {
    id: 'faq-2',
    category: 'Booking',
    questionEn: 'Can I reschedule or cancel my booking?',
    questionHi: 'क्या मैं अपनी बुकिंग रीशेड्यूल या कैंसिल कर सकता हूं?',
    answerEn: 'Yes, you can reschedule or cancel your booking for free up to 2 hours before the scheduled time slot via the My Bookings section.',
    answerHi: 'हां, आप अपनी बुकिंग को तय समय से 2 घंटे पहले तक मुफ्त में रीशेड्यूल या कैंसिल कर सकते हैं।',
  },
  {
    id: 'faq-3',
    category: 'Booking',
    questionEn: 'How quickly does a technician arrive for emergency bookings?',
    questionHi: 'इमरजेंसी बुकिंग में तकनीशियन कितनी देर में पहुंचता है?',
    answerEn: 'Our automated GPS dispatch matches the nearest active technician within 15-30 minutes for emergency dispatches.',
    answerHi: 'हमारा जीपीएस ऑटो-डिस्पैच सिस्टम 15-30 मिनट के भीतर निकटतम तकनीशियन को आपके स्थान पर भेजता है।',
  },

  // Payments (3)
  {
    id: 'faq-4',
    category: 'Payments',
    questionEn: 'What payment modes are accepted?',
    questionHi: 'भुगतान के कौन-कौन से तरीके स्वीकार किए जाते हैं?',
    answerEn: 'We accept Razorpay UPI (GPay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, HandysCompany Wallet, and Cash on Delivery (COD).',
    answerHi: 'हम यूपीआई, क्रेडिट/डेबिट कार्ड, नेट बैंकिंग, हैंडीकंपनी वॉलेट और कैश ऑन डिलीवरी (COD) स्वीकार करते हैं।',
  },
  {
    id: 'faq-5',
    category: 'Payments',
    questionEn: 'Are there any hidden charges beyond the displayed rate card?',
    questionHi: 'क्या ऐप में दिख रही दरों के अलावा कोई छुपा हुआ शुल्क है?',
    answerEn: 'No! All prices shown are fixed and transparent as per our official Rate Card. Spare parts or additional scope requested at the doorstep are quoted upfront before starting work.',
    answerHi: 'बिल्कुल नहीं! सभी दरें फिक्स और पारदर्शी हैं। अतिरिक्त काम या स्पेयर पार्ट्स का कोटेशन काम शुरू होने से पहले दिया जाता है।',
  },
  {
    id: 'faq-6',
    category: 'Payments',
    questionEn: 'How does the HandysCompany Wallet work?',
    questionHi: 'हैंडीकंपनी वॉलेट कैसे काम करता है?',
    answerEn: 'HandysCompany Wallet holds your cashback rewards, instant booking cancellation refunds, and promotional credits for one-tap express checkouts.',
    answerHi: 'वॉलेट में आपका कैशबैक, तुरंत रिफंड और प्रोमो कोड क्रेडिट रहता है, जिससे आप एक क्लिक में पेमेंट कर सकते हैं।',
  },

  // Membership (3)
  {
    id: 'faq-7',
    category: 'Membership',
    questionEn: 'What is the ₹699 Unlimited Membership Plan?',
    questionHi: '₹699 अनलिमिटेड मेंबरशिप प्लान क्या है?',
    answerEn: 'The ₹699 Unlimited Membership gives you 6 months of UNLIMITED FREE LABOUR on all eligible home repairs like Electrical, Plumbing, and Appliance fixes.',
    answerHi: '₹699 मेंबरशिप से आपको 6 महीने तक इलेक्ट्रिकल, प्लंबिंग और अप्लायंस रिपेयर की सभी लेबर सर्विस बिल्कुल मुफ्त मिलती है।',
  },
  {
    id: 'faq-8',
    category: 'Membership',
    questionEn: 'Can I purchase membership directly at my doorstep through the technician?',
    questionHi: 'क्या मैं घर आए तकनीशियन से सीधे मेंबरशिप खरीद सकता हूं?',
    answerEn: 'Yes! Technicians are equipped to register customer memberships directly at your doorstep during any service visit.',
    answerHi: 'हां! घर आए तकनीशियन से आप सीधे ₹699 की मेंबरशिप एक्टिवेट करवा सकते हैं।',
  },
  {
    id: 'faq-9',
    category: 'Membership',
    questionEn: 'Can I cancel my membership for a refund?',
    questionHi: 'क्या मैं मेंबरशिप कैंसिल करके रिफंड ले सकता हूं?',
    answerEn: 'You can request a 100% full refund within 7 days of purchase provided no free labor service bookings have been availed under the membership.',
    answerHi: 'खरीद के 7 दिनों के भीतर आप 100% रिफंड पा सकते हैं, बशर्ते आपने मेंबरशिप के तहत कोई फ्री सर्विस न ली हो।',
  },

  // Warranty (3)
  {
    id: 'faq-10',
    category: 'Warranty',
    questionEn: 'What is the 15-Day Free Re-visit Service Warranty?',
    questionHi: '15 दिनों की फ्री सर्विस वारंटी क्या है?',
    answerEn: 'Every completed repair job carries a 15 Days Warranty. If the same issue recurs within 15 days, a technician visits and resolves it free of cost.',
    answerHi: 'प्रत्येक रिपेयर जॉब पर 15 दिन की वारंटी मिलती है। 15 दिन में वही खराबी दोबारा आने पर मुफ़्त रिपेयर किया जाता है।',
  },
  {
    id: 'faq-11',
    category: 'Warranty',
    questionEn: 'How do I claim a service warranty?',
    questionHi: 'वारंटी क्लेम कैसे करें?',
    answerEn: 'Go to My Bookings ➔ Select the completed job ➔ Click "Claim 15-Day Warranty Re-visit" to schedule a free inspection.',
    answerHi: 'माइ बुकिंग्स ➔ पूर्ण जॉब पर जाएं ➔ "क्लेम 15-डे वारंटी" पर क्लिक करके फ्री विजिट शेड्यूल करें।',
  },
  {
    id: 'faq-12',
    category: 'Warranty',
    questionEn: 'Does the warranty cover spare parts?',
    questionHi: 'क्या वारंटी में स्पेयर पार्ट्स शामिल हैं?',
    answerEn: 'Warranty covers labor and workmanship. Original spare parts carry manufacturer warranty as per brand terms.',
    answerHi: 'वारंटी लेबर और काम की गुणवत्ता को कवर करती है। स्पेयर पार्ट्स पर संबंधित ब्रांड की वारंटी लागू होती है।',
  },

  // Refund (3)
  {
    id: 'faq-13',
    category: 'Refund',
    questionEn: 'How long does a booking refund take?',
    questionHi: 'बुकिंग रिफंड में कितना समय लगता है?',
    answerEn: 'Pre-dispatch cancellation refunds are credited instantly to your Wallet within 2 hours or to original payment mode within 24-48 hours.',
    answerHi: 'कैंसिलेशन रिफंड वॉलेट में 2 घंटे के भीतर और बैंक/यूपीआई में 24-48 घंटे के भीतर जमा हो जाता है।',
  },
  {
    id: 'faq-14',
    category: 'Refund',
    questionEn: 'What if a technician fails to arrive (No Show)?',
    questionHi: 'यदि तकनीशियन नहीं पहुंचता है तो क्या होगा?',
    answerEn: 'If a technician fails to arrive within the time window, 100% of your money is refunded along with a ₹100 apology credit in your Wallet.',
    answerHi: 'तकनीशियन न पहुंचने पर 100% रिफंड के साथ आपके वॉलेट में ₹100 का हर्जाना क्रेडिट किया जाता है।',
  },
  {
    id: 'faq-15',
    category: 'Refund',
    questionEn: 'What happens if I am charged twice for a single booking?',
    questionHi: 'यदि एक ही बुकिंग के लिए दो बार पैसे कट जाएं तो क्या होगा?',
    answerEn: 'Any duplicate charges detected are automatically reconciled and refunded to your original payment mode within 24 business hours.',
    answerHi: 'दोबारा कटे हुए पैसे 24 घंटे के भीतर आपके खाते में स्वतः रिफंड कर दिए जाते हैं।',
  },

  // Coupons (3)
  {
    id: 'faq-16',
    category: 'Coupons',
    questionEn: 'How do I apply coupon codes?',
    questionHi: 'कूपन कोड कैसे लागू करें?',
    answerEn: 'At the booking review screen, click "Apply Coupon", select your coupon code (e.g. WELCOME100), and enjoy instant discount.',
    answerHi: 'बुकिंग रिव्यू स्क्रीन पर "अप्लाई कूपन" पर क्लिक करें और कोड (जैसे WELCOME100) चुनकर तुरंत डिस्काउंट पाएं।',
  },
  {
    id: 'faq-17',
    category: 'Coupons',
    questionEn: 'Can I combine coupons with membership discounts?',
    questionHi: 'क्या मेंबरशिप के साथ कूपन का उपयोग किया जा सकता है?',
    answerEn: 'Yes! Members can apply valid discount coupons on top of their free labor membership benefits.',
    answerHi: 'हां! मेंबरशिप धारक फ्री लेबर के साथ भी अतिरिक्त कूपन कोड का लाभ उठा सकते हैं।',
  },
  {
    id: 'faq-18',
    category: 'Coupons',
    questionEn: 'Why is my coupon code not working?',
    questionHi: 'मेरा कूपन कोड काम क्यों नहीं कर रहा है?',
    answerEn: 'Ensure your cart total satisfies the minimum order value required by the coupon or check if the coupon has expired.',
    answerHi: 'जांचें कि आपकी बुकिंग कूपन की न्यूनतम राशि शर्त को पूरा करती है या कूपन की तारीख समाप्त तो नहीं हो गई।',
  },

  // Technicians (3)
  {
    id: 'faq-19',
    category: 'Technicians',
    questionEn: 'Are HandysCompany technicians background checked?',
    questionHi: 'क्या हैंडीकंपनी के तकनीशियन वेरिफाइड हैं?',
    answerEn: 'Yes! 100% of our technicians undergo identity verification, government ID check, police background check, and technical skill qualification tests.',
    answerHi: 'जी हां! हमारे 100% तकनीशियन आधार कार्ड सत्यापन, पुलिस वेरिफिकेशन और स्किल टेस्ट के बाद ही काम पर रखे जाते हैं।',
  },
  {
    id: 'faq-20',
    category: 'Technicians',
    questionEn: 'How do I track my assigned technician in real time?',
    questionHi: 'मैं अपने तकनीशियन की लाइव लोकेशन कैसे ट्रैक कर सकता हूं?',
    answerEn: 'Once a technician is en-route, click "Track Technician" in My Bookings to view live GPS navigation on the interactive map.',
    answerHi: 'माइ बुकिंग्स में "ट्रैक तकनीशियन" पर क्लिक करके मैप पर उनकी लाइव जीपीएस लोकेशन देखें।',
  },
  {
    id: 'faq-21',
    category: 'Technicians',
    questionEn: 'Can I request a specific technician for future jobs?',
    questionHi: 'क्या मैं पसंदीदा तकनीशियन को दोबारा बुला सकता हूं?',
    answerEn: 'Yes, after a job is completed, you can rate the technician 5 stars and add them to your Preferred Technicians list.',
    answerHi: 'हां, जॉब पूरी होने पर तकनीशियन को 5-स्टार रेटिंग देकर उन्हें अपनी पसंदीदा लिस्ट में जोड़ सकते हैं।',
  },

  // Invoices (3)
  {
    id: 'faq-22',
    category: 'Invoices',
    questionEn: 'How do I download tax GST invoices for my service?',
    questionHi: 'सर्विस का टैक्स जीएसटी बिल कैसे डाउनलोड करें?',
    answerEn: 'Go to Profile ➔ Invoices ➔ Select any completed job to download official PDF tax invoices.',
    answerHi: 'प्रोफाइल ➔ इनवॉइस पर जाएं और अपनी पूर्ण बुकिंग की पीडीएफ इनवॉइस डाउनलोड करें।',
  },
  {
    id: 'faq-23',
    category: 'Invoices',
    questionEn: 'Can I get a GST business invoice with my company GSTIN?',
    questionHi: 'क्या कंपनी जीएसटी नंबर के साथ बिल मिल सकता है?',
    answerEn: 'Yes! Add your Business Name and GSTIN during checkout to receive official B2B GST tax invoices.',
    answerHi: 'जी हां! चेकआउट के समय अपनी कंपनी का जीएसटी नंबर डालकर B2B बिल प्राप्त करें।',
  },
  {
    id: 'faq-24',
    category: 'Invoices',
    questionEn: 'Is GST included in the service prices?',
    questionHi: 'क्या कीमतों में जीएसटी शामिल है?',
    answerEn: 'Yes, all displayed prices are inclusive of applicable GST taxes.',
    answerHi: 'हां, ऐप में दिखाई गई सभी दरों में जीएसटी शामिल है।',
  },

  // Safety (3)
  {
    id: 'faq-25',
    category: 'Safety',
    questionEn: 'What safety measures do technicians follow at my home?',
    questionHi: 'तकनीशियन सुरक्षा के क्या नियम अपनाते हैं?',
    answerEn: 'Technicians carry valid ID cards, wear official uniforms, follow safety protocols, and use sanitized tool kits.',
    answerHi: 'तकनीशियन आधिकारिक आईडी कार्ड, यूनिफॉर्म पहनते हैं और सुरक्षा प्रोटोकॉल का पालन करते हैं।',
  },
  {
    id: 'faq-26',
    category: 'Safety',
    questionEn: 'What if there is damage to my property during service execution?',
    questionHi: 'यदि सर्विस के दौरान सामान को कोई नुकसान हो जाए तो क्या होगा?',
    answerEn: 'HandysCompany provides a Property Damage Cover up to ₹10,000 for verified accidental damages occurring during service execution.',
    answerHi: 'हैंडीकंपनी सर्विस के दौरान किसी भी आकस्मिक नुकसान के लिए ₹10,000 तक का प्रॉपर्टी डैमेज कवर प्रदान करती है।',
  },
  {
    id: 'faq-27',
    category: 'Safety',
    questionEn: 'Is my personal data and mobile number shared safely?',
    questionHi: 'क्या मेरा नंबर और जानकारी सुरक्षित है?',
    answerEn: 'Your number is masked using encrypted call relay channels to ensure technician calls never reveal your private mobile number.',
    answerHi: 'आपका नंबर एन्क्रिप्टेड कॉल रिले से सुरक्षित रहता है, जिससे तकनीशियन को आपका प्राइवेट नंबर नहीं दिखता।',
  },

  // Support (3)
  {
    id: 'faq-28',
    category: 'Support',
    questionEn: 'How can I contact HandysCompany customer support?',
    questionHi: 'हैंडीकंपनी कस्टमर सपोर्ट से संपर्क कैसे करें?',
    answerEn: 'Call us directly at +91 731500023 or email info@handyscompany.in. You can also chat live in the app via Support Center.',
    answerHi: '+91 731500023 पर कॉल करें या info@handyscompany.in पर ईमेल करें। ऐप चैट सपोर्ट भी उपलब्ध है।',
  },
  {
    id: 'faq-29',
    category: 'Support',
    questionEn: 'What are customer support operating hours?',
    questionHi: 'कस्टमर सपोर्ट का समय क्या है?',
    answerEn: 'Support desk operates Monday to Sunday from 08:00 AM to 09:00 PM IST with 24/7 emergency dispatch coverage.',
    answerHi: 'कस्टमर सपोर्ट सोमवार से रविवार सुबह 08:00 से रात 09:00 बजे तक उपलब्ध है।',
  },
  {
    id: 'faq-30',
    category: 'Support',
    questionEn: 'Where is HandysCompany corporate headquarters located?',
    questionHi: 'हैंडीकंपनी का मुख्य कार्यालय कहां स्थित है?',
    answerEn: 'TapnHome Service Private Limited, Heights Tower, 4th Floor, AP Colony, Main Road, Gaya, Bihar - 823001, India.',
    answerHi: 'टैपनहोम सर्विस प्राइवेट लिमिटेड, हाइट्स टावर, चौथा तला, एपी कॉलोनी, गया, बिहार - 823001।',
  },
];
