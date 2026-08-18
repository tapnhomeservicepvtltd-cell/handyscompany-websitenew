// data/companyLegalPages.ts
// Official Urban Company / Amazon Class Enterprise Legal & Policy Suite for HandysCompany

export interface LegalDocument {
  title: string;
  slug: string;
  lastUpdated: string;
  effectiveDate: string;
  summary: string;
  content: string;
}

export const companyEntityInfo = {
  brandName: 'HandysCompany',
  legalEntityName: 'TapnHome Service Private Limited',
  cin: 'U74999BR2026PTC054321',
  gstin: '10AAACH1234F1Z8',
  supportPhone: '+91 731500023',
  supportEmail: 'info@handyscompany.in',
  websiteUrl: 'https://handyscompany.in',
  corporateOffice: 'Heights Tower, 4th Floor, Main Road, AP Colony, Gaya, Bihar - 823001, India',
};

export const companyLegalPages: Record<string, LegalDocument> = {
  privacyPolicy: {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    lastUpdated: 'July 26, 2026',
    effectiveDate: 'May 1, 2025',
    summary:
      'This Privacy Policy outlines how TapnHome Service Private Limited ("HandysCompany", "We", "Us") collects, processes, encrypts, and protects customer and technician personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and global privacy standards.',
    content: `
# HANDYSCOMPANY PRIVACY POLICY
**Legal Entity**: TapnHome Service Private Limited  
**Brand**: HandysCompany  
**Website**: https://handyscompany.in  
**Support Email**: info@handyscompany.in | Phone: +91 731500023  

---

### 1. INTRODUCTION & SCOPE
TapnHome Service Private Limited ("Company", "HandysCompany", "We", "Us") operates the website https://handyscompany.in and the HandysCompany mobile applications for iOS and Android. We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy governs the collection, storage, usage, processing, and disclosure of information collected when you access or use our platform, avail doorstep home services, or communicate with our support team.

---

### 2. DATA WE COLLECT
We collect personal information necessary to deliver doorstep home maintenance and repair services effectively:
- **Account Identification**: Full Name, Mobile Phone Number, Email Address, Gender, and Profile Avatar.
- **Service Address Details**: Door/Flat Number, Building Name, Street Address, Landmark, City, State, and Postal Code.
- **Geolocation Data**: Precise real-time GPS location coordinates collected from customer devices during service dispatch booking and from technician devices during active en-route job assignments.
- **Financial & Payment Metadata**: Payment transaction references, payment mode (UPI, Wallet, Credit/Debit Card, Net Banking), invoice amounts, and transaction status. We do NOT store full credit/debit card numbers or CVVs; all payment processing is handled via PCI-DSS compliant payment gateways (Razorpay).
- **Communication Logs**: In-app support chat messages, customer support call recordings, rating feedback, and service reviews.
- **Technical Telemetry**: Device model, OS version, IP address, push notification tokens (Firebase FCM), app usage telemetry, and crash reports.

---

### 3. HOW WE USE YOUR DATA
We process your data strictly for legitimate operational purposes:
1. **Service Dispatch & Execution**: Matching nearby verified field technicians to customer service locations and streaming live GPS tracking coordinates during dispatch.
2. **Account Management & Authentication**: Authenticating users via 6-digit One Time Passwords (OTP) and managing JWT session authorization.
3. **Transaction Settlement**: Processing payments, issuing GST tax invoices, managing refund requests, and executing technician wallet payouts.
4. **Platform Safety & Quality Audit**: Verification of technician identity against government photo IDs, police verification checks, and monitoring customer review scores.
5. **Customer Support**: Resolving service complaints, tracking warranty re-visit requests, and managing 699 Unlimited Membership benefits.

---

### 4. ZERO 3RD-PARTY DATA SELLING GUARANTEE
HandysCompany operates on a strict **Zero Data Monetization Policy**. We do NOT sell, rent, lease, or trade your personal data, contact information, or location logs to third-party data brokers or marketing agencies.

---

### 5. DATA SHARING WITH AUTHORIZED ENTITIES
Your information is shared only under strict operational boundaries:
- **Assigned Field Technicians**: Customers’ delivery address, phone number, and selected service items are shared with the specific technician assigned to perform the doorstep job.
- **Payment Gateway Providers**: Transaction details are shared securely with PCI-DSS certified gateway partners (Razorpay) to process payments.
- **Regulatory & Legal Compliance**: We may disclose information if required by law, subpoena, court order, or government authority pursuant to legal proceedings under Indian law.

---

### 6. SECURITY & ENCRYPTION STANDARDS
- **In-Transit Encryption**: All data transmitted between mobile applications, web portals, and backend servers is encrypted using Transport Layer Security (TLS/SSL 256-bit).
- **At-Rest Storage Encryption**: Database clusters are encrypted using AES-256 standards hosted within isolated Virtual Private Clouds (VPC) on AWS RDS.
- **Access Controls**: Access to user data is strictly controlled via Role-Based Access Controls (RBAC) and monitored through audit logging.

---

### 7. YOUR DPDP ACT RIGHTS & DATA ERASURE
Under the Digital Personal Data Protection Act, 2023 (DPDP Act), users possess the following rights:
- **Right to Access**: Request a summary of personal data stored on our servers.
- **Right to Correction**: Update inaccurate or outdated profile details directly via the app settings.
- **Right to Erasure (Right to Be Forgotten)**: Request complete deletion of your account and personal data by emailing info@handyscompany.in.

---

### 8. CONTACT US & DATA PROTECTION OFFICER
For any privacy inquiries or grievances, contact our Data Protection Officer:
**TapnHome Service Private Limited**  
Attn: Privacy & Data Protection Officer  
Heights Tower, 4th Floor, AP Colony, Gaya, Bihar - 823001, India  
**Email**: info@handyscompany.in | **Phone**: +91 731500023 | **Website**: https://handyscompany.in
`,
  },

  termsAndConditions: {
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    lastUpdated: 'July 26, 2026',
    effectiveDate: 'May 1, 2025',
    summary:
      'These Terms & Conditions govern the contractual relationship between customers, technicians, and TapnHome Service Private Limited ("HandysCompany") regarding platform access, booking execution, pricing, cancellation, and platform usage.',
    content: `
# HANDYSCOMPANY TERMS & CONDITIONS OF SERVICE
**Legal Entity**: TapnHome Service Private Limited  
**Brand**: HandysCompany | **Website**: https://handyscompany.in  
**Support**: +91 731500023 | **Email**: info@handyscompany.in  

---

### 1. ACCEPTANCE OF TERMS
By downloading the HandysCompany Mobile App, accessing https://handyscompany.in, or scheduling a doorstep service, you ("User", "Customer") enter into a legally binding agreement with TapnHome Service Private Limited ("HandysCompany", "Company", "We"). If you do not agree to these Terms, you must refrain from using the platform.

---

### 2. PLATFORM OVERVIEW & MARKETPLACE MODEL
HandysCompany operates an on-demand technology platform connecting customers seeking home maintenance, repair, cleaning, salon, and installation services with background-verified independent technicians and franchise service partners. HandysCompany acts as the technology facilitator, rate card manager, and service warranty guarantor.

---

### 3. BOOKING EXECUTION & STANDARD RATE CARDS
- **Fixed Upfront Rate Cards**: Base labor charges for all 550+ services are displayed on the app prior to booking confirmation.
- **Spare Parts & Extra Scope**: Any replacement spare parts or additional work requested by the customer at the doorstep will be quoted transparently as per the official Rate Card prior to work initiation.
- **Payment Obligation**: Customers agree to pay the total invoice amount upon service completion via Cash on Delivery (COD), Razorpay, or HandysCompany Wallet.

---

### 4. CANCELLATION & DISPATCH POLICY
- **Free Cancellation**: Customers may cancel any scheduled booking free of charge up to 2 hours prior to the selected time slot.
- **Late Cancellation Fee**: If a booking is cancelled after an assigned technician is en-route or has reached the customer premises, a nominal inspection/dispatch fee of ₹99 will be charged.

---

### 5. 15-DAY FREE SERVICE WARRANTY
All completed repair and installation services include a **15-Day Free Re-visit Guarantee**. Should the identical issue reoccur within 15 calendar days from job completion, HandysCompany will dispatch a technician to inspect and rectify the fault at zero additional labor cost.

---

### 6. HANDYSCOMPANY ₹699 UNLIMITED MEMBERSHIP
- **Plan Terms**: Pay ₹699 once to receive 6 months of Unlimited Free Labour on all eligible home repair categories.
- **Doorstep Registration**: Technicians are authorized to register customers for the ₹699 Membership directly at their doorstep.
- **Non-Transferable**: Memberships are linked to the registered customer phone number and primary residential property address.

---

### 7. LIMITATION OF LIABILITY & GOVERNING LAW
To the maximum extent permitted by applicable Indian law, the maximum aggregate liability of TapnHome Service Private Limited for any claims arising out of service delivery shall not exceed the total amount paid by the customer for the specific booking. This agreement is governed by the laws of the Republic of India, with exclusive jurisdiction vested in the courts of Bihar, India.
`,
  },

  refundPolicy: {
    title: 'Refund & Cancellation Policy',
    slug: 'refund-policy',
    lastUpdated: 'July 26, 2026',
    effectiveDate: 'May 1, 2025',
    summary:
      'Official Refund & Cancellation Policy of TapnHome Service Private Limited detailing instant wallet refunds, 100% money-back guarantees, and membership refund conditions.',
    content: `
# HANDYSCOMPANY REFUND & CANCELLATION POLICY
**Legal Entity**: TapnHome Service Private Limited  
**Brand**: HandysCompany | **Website**: https://handyscompany.in  
**Support**: +91 731500023 | **Email**: info@handyscompany.in  

---

### 1. INSTANT PRE-DISPATCH CANCELLATION REFUND
If a customer cancels a prepaid service booking prior to technician dispatch, a **100% Full Refund** is initiated instantly. Refunds are credited directly to the customer's HandysCompany Wallet within 2 hours or to the original payment source within 3-5 business days.

---

### 2. 100% MONEY-BACK QUALITY GUARANTEE
If a service fails to meet quality standards and cannot be resolved through a free re-visit under our 15-Day Warranty Period, our Quality Audit Team will approve a **100% Refund** of the labor amount paid for the service.

---

### 3. MEMBERSHIP REFUND POLICY
Customers purchasing the ₹699 Unlimited 6-Months Membership can request a full refund within **7 days of purchase**, provided no free labor service bookings have been availed under the active membership.

---

### 4. REFUND TIMELINES & MODES
- **HandysCompany Wallet Credit**: Processed within 2 Hours.
- **UPI / Net Banking / Debit Card**: Processed within 24-48 Hours.
- **Credit Card Settlements**: 3-5 Business Days as per banking partner timelines.
`,
  },

  aboutUs: {
    title: 'About HandysCompany',
    slug: 'about-us',
    lastUpdated: 'July 26, 2026',
    effectiveDate: 'May 1, 2025',
    summary:
      'About TapnHome Service Private Limited and the vision powering HandysCompany — India’s premier doorstep home services network.',
    content: `
# ABOUT HANDYSCOMPANY
**Legal Entity**: TapnHome Service Private Limited  
**Brand Name**: HandysCompany  
**Website**: https://handyscompany.in | **Support**: +91 731500023  

---

### OUR MISSION
TapnHome Service Private Limited was founded to transform the fragmented home maintenance industry in India into a organized, transparent, and technology-driven ecosystem. Under the brand **HandysCompany**, we provide households and commercial establishments with instant access to background-checked, certified professionals across 550+ service categories.

---

### PLATFORM HIGHLIGHTS
- **550+ Production-Grade Services**: Electrical, Plumbing, Carpentry, Appliance Repair, Cleaning, Pest Control, Maid & Helper Services, Salon at Home, Painting, and Heavy Installation.
- **100% Verified Professionals**: Every field technician undergoes multi-step identity verification, criminal background checks, and practical skills testing.
- **HandysCompany ₹699 Membership**: Pioneering affordable home maintenance with 6 months of unlimited free labor services.
- **Dual Super Admin & City Franchise Architecture**: Real-time dispatch radar, city collection monitoring, and automated technician commission payouts.
`,
  },

  contactUs: {
    title: 'Contact Us & Support Policy',
    slug: 'contact-us',
    lastUpdated: 'July 26, 2026',
    effectiveDate: 'May 1, 2025',
    summary:
      'Official contact details, corporate headquarters address, customer care phone numbers, and emergency support channels for TapnHome Service Private Limited.',
    content: `
# CONTACT US & SUPPORT POLICY
**Brand**: HandysCompany  
**Legal Entity**: TapnHome Service Private Limited  
**Website**: https://handyscompany.in  

---

### CORPORATE HEADQUARTERS
**TapnHome Service Private Limited**  
Heights Tower, 4th Floor, Main Road, AP Colony,  
Gaya, Bihar - 823001, India  

---

### SUPPORT TOUCHPOINTS
- **Customer Care Phone**: +91 731500023
- **General Support Email**: info@handyscompany.in
- **Legal & Compliance**: legal@handyscompany.in
- **Official Website**: https://handyscompany.in
- **Operating Hours**: Monday to Sunday, 08:00 AM to 09:00 PM IST (Emergency Support 24/7 via Mobile App)
`,
  },
};
