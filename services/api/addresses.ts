import { apiRequest } from './client';

export type Address = {
  id: string;
  label: 'HOME' | 'WORK' | 'OTHER';
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
};

export type CreateAddressInput = Omit<Address, 'id'>;

export const getAddresses = () => apiRequest<Address[]>('/addresses');
export const createAddress = (input: CreateAddressInput) => apiRequest<Address>('/addresses', { method: 'POST', body: input });
