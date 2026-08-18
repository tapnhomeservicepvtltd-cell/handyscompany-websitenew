// data/business.ts
// Official Business, Legal, Enterprise SaaS SLA & Legal Policies for HandysCompany Technologies Pvt Ltd

export interface BusinessDetails {
  companyName: string;
  tradeName: string;
  cin: string;
  gstin: string;
  pan: string;
  supportPhone: string;
  tollFree: string;
  supportEmail: string;
  legalEmail: string;
  privacyEmail: string;
  corporateOffice: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  aboutUs: {
    title: string;
    tagline: string;
    description: string;
    highlights: string[];
  };
  saasSla: {
    uptimeGuarantee: string;
    responseSla: string;
    supportSla: string;
    maintenanceWindow: string;
  };
  privacyPolicy: {
    lastUpdated: string;
    overview: string;
    sections: { title: string; content: string }[];
  };
  termsAndConditions: {
    lastUpdated: string;
    overview: string;
    sections: { title: string; content: string }[];
  };
  refundPolicy: {
    lastUpdated: string;
    overview: string;
    refundWindowHours: number;
    rules: { title: string; detail: string }[];
  };
  enterpriseGovernance: {
    dataProtectionAct: string;
    liabilityCap: string;
    jurisdiction: string;
    sections: { title: string; content: string }[];
  };
}

export const handysCompanyBusinessInfo: BusinessDetails = {
  companyName: 'HandysCompany Technologies Private Limited',
  tradeName: 'HandysCompany',
  cin: 'U74999BR2026PTC054321',
  gstin: '10AAACH1234F1Z8',
  pan: 'AAACH1234F',
  supportPhone: '+91 99000 00000',
  tollFree: '1800-123-HANDY',
  supportEmail: 'support@handyscompany.com',
  legalEmail: 'legal@handyscompany.com',
  privacyEmail: 'dpo@handyscompany.com',

  corporateOffice: {
    addressLine1: 'Heights Tower, 4th Floor',
    addressLine2: 'Main Road, AP Colony',
    city: 'Gaya',
    state: 'Bihar',
    postalCode: '823001',
    country: 'India',
  },

  aboutUs: {
    title: 'About HandysCompany Enterprise Platform',
    tagline: 'India’s Premier On-Demand Home Services & Multi-Tenant Franchise Infrastructure',
    description:
      'HandysCompany Technologies operates an enterprise-grade multi-tenant platform powering home service dispatches, city franchise operations, and background-checked technician matching for 550+ doorstep repair and maintenance categories.',
    highlights: [
      '550+ Production-Grade Services across 11 Major Categories',
      '100% Background Checked & Police Verified Professional Technicians',
      'HandysCompany ₹699 Unlimited 6-Months Labour Membership Infrastructure',
      '15 Days Service Re-visit Warranty & Fixed Transparent Rate Cards',
    ],
  },

  saasSla: {
    uptimeGuarantee: '99.9% Monthly Platform Uptime SLA',
    responseSla: '< 15 Minutes Average Dispatch Match Response Time',
    supportSla: '24/7 Enterprise Support for City Admins & Corporate Accounts',
    maintenanceWindow: 'Sundays 02:00 AM - 04:00 AM IST (Off-Peak Hours)',
  },

  privacyPolicy: {
    lastUpdated: 'May 1, 2025',
    overview:
      'HandysCompany Technologies Pvt Ltd complies with the Digital Personal Data Protection Act 2023 (DPDP Act) and international data governance frameworks. Your personal data is encrypted at rest and in transit.',
    sections: [
      {
        title: '1. Data Collection & Telemetry',
        content:
          'We collect customer contact details, service delivery addresses, real-time GPS coordinates (during active dispatches), device tokens for push notifications, and transaction logs. We do NOT store CVVs or full credit card credentials.',
      },
      {
        title: '2. Encryption & TLS/SSL Standards',
        content:
          'All data transmissions are protected via TLS/SSL 256-bit encryption. Database clusters are secured with AES-256 at-rest encryption behind AWS VPC isolated subnets.',
      },
      {
        title: '3. Zero 3rd-Party Data Selling Policy',
        content:
          'HandysCompany enforces a strict Zero Data Monetization Policy. Customer information is never sold, leased, or rented to external marketing brokers or data aggregators.',
      },
      {
        title: '4. Right to Erasure & Data Portability',
        content:
          'Users have the right to request full account deletion and data export under DPDP regulations by contacting dpo@handyscompany.com.',
      },
    ],
  },

  termsAndConditions: {
    lastUpdated: 'May 1, 2025',
    overview:
      'These Enterprise Terms of Service govern all interactions on HandysCompany Mobile Applications, Web Portals, and API integrations.',
    sections: [
      {
        title: '1. Transparent Standardized Rate Cards',
        content:
          'All service prices on HandysCompany are calculated dynamically based on pre-approved Rate Cards. Any additional materials or spare parts required at the doorstep are quoted upfront before work commences.',
      },
      {
        title: '2. Customer Cancellation Policy',
        content:
          'Customers may cancel bookings free of charge up to 2 hours prior to the scheduled slot. Cancellations after a technician is en-route attract a nominal dispatch fee of ₹99.',
      },
      {
        title: '3. 15-Day Service Re-visit Guarantee',
        content:
          'Every completed service is backed by our 15 Days Service Warranty. Should the identical fault reoccur within 15 calendar days, HandysCompany dispatches a technician for a free re-inspection.',
      },
      {
        title: '4. Technician Code of Conduct & Safety',
        content:
          'All field technicians undergo mandatory background verification. HandysCompany enforces a Zero Tolerance Policy for safety violations, verbal misconduct, or unauthorized overcharging.',
      },
    ],
  },

  refundPolicy: {
    lastUpdated: 'May 1, 2025',
    overview:
      'HandysCompany operates an automated, transparent Refund Management Engine with instant wallet settlement.',
    refundWindowHours: 48,
    rules: [
      {
        title: 'Instant Pre-Dispatch Wallet Refunds',
        detail:
          'Cancellations initiated prior to technician dispatch trigger an instant 100% refund processed within 2 hours to the customer HandysCompany Wallet or original payment method.',
      },
      {
        title: 'Quality Failure 100% Money-Back Guarantee',
        detail:
          'If a service fails quality audits and cannot be rectified during the 15-day warranty window, a 100% money-back refund is credited to the customer account.',
      },
      {
        title: '7-Day Doorstep Membership Refund Terms',
        detail:
          'Customers purchasing the ₹699 Unlimited Membership may request a full refund within 7 calendar days, provided no free labour bookings have been utilized.',
      },
      {
        title: 'Failed Payment Resolution',
        detail:
          'Any payments debited during failed transaction attempts are automatically reversed by our Razorpay gateway reconciliation within 24-48 business hours.',
      },
    ],
  },

  enterpriseGovernance: {
    dataProtectionAct: 'Compliant with DPDP Act 2023 & ISO/IEC 27001 Security Controls',
    liabilityCap: 'Platform liability capped at total service booking amount paid by customer',
    jurisdiction: 'Governing Law: Republic of India • Exclusive Jurisdiction: Courts of Bihar, India',
    sections: [
      {
        title: '1. Multi-Tenant SLA & API Terms',
        content:
          'Franchise partners and City Admins accessing HandysCompany API agree to adhere to rate-limiting thresholds (max 1000 requests/min) and maintain localized technician verification standards.',
      },
      {
        title: '2. Intellectual Property Rights',
        content:
          'All software code, brand assets, UI designs, algorithms, and rate cards remain the exclusive intellectual property of HandysCompany Technologies Private Limited.',
      },
      {
        title: '3. Binding Arbitration Clause',
        content:
          'Any disputes arising from platform use shall be resolved through sole arbitrator proceedings conducted under the Arbitration and Conciliation Act, 1996 in Bihar, India.',
      },
    ],
  },
};
