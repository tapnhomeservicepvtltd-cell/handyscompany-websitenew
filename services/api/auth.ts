import { apiRequest } from './client';

export const requestOtp = (phoneNumber: string) =>
  apiRequest<{ success: boolean; message: string }>('/auth/request-otp', {
    method: 'POST',
    authenticated: false,
    body: { phoneNumber },
  });

export const verifyOtp = (phoneNumber: string, otp: string) =>
  apiRequest<{ accessToken: string; refreshToken: string; success: boolean }>('/auth/verify-otp', {
    method: 'POST',
    authenticated: false,
    body: { phoneNumber, otp },
  });
