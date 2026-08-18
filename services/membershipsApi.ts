import { apiRequest } from './api/client';

export type PropertyType = { id: string; name: string; slug: string; groupName: string };
export type MembershipPlan = {
  id: string;
  name: string;
  slug: string;
  price: string | number | null;
  isContactSales: boolean;
  durationMonths: number;
  visitCharge: string | number;
  propertyType: PropertyType;
  benefits: { id: string; title: string }[];
};

export type CustomerMembership = {
  id: string;
  status: string;
  amountPaid: number;
  paymentReference?: string | null;
  notes?: string | null;
  startsAt: string;
  expiresAt: string;
  plan: {
    id: string;
    name: string;
    slug: string;
    price: string | number | null;
    durationMonths: number;
    propertyType: PropertyType;
  };
};

export const membershipsApi = {
  propertyTypes: () => apiRequest<PropertyType[]>('/memberships/property-types', { authenticated: false }),
  plans: (propertyTypeId?: string) =>
    apiRequest<MembershipPlan[]>(`/memberships/plans${propertyTypeId ? `?propertyTypeId=${encodeURIComponent(propertyTypeId)}` : ''}`, {
      authenticated: false,
    }),
  purchase: (planId: string, paymentReference: string, notes?: string, referralCode?: string) =>
    apiRequest<CustomerMembership>('/memberships/purchase', {
      method: 'POST',
      body: { planId, paymentReference, notes, referralCode },
    }),
  myMemberships: () => apiRequest<CustomerMembership[]>('/memberships/me'),
};
