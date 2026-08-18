import { apiRequest } from './client';

export type UserProfile = { id: string; fullName?: string | null; email?: string | null; phoneNumber: string; avatarUrl?: string | null; role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'; isVerified: boolean };

export const getMyProfile = () => apiRequest<UserProfile>('/users/me');
export const updateMyProfile = (input: { fullName?: string; email?: string }) => apiRequest<UserProfile>('/users/me', { method: 'PATCH', body: input });
