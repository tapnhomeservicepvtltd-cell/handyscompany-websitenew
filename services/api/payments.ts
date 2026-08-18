import { apiRequest } from './client';

export type RazorpayOrder = { orderId: string; amount: number; currency: string; bookingId: string };

export const createRazorpayOrder = (bookingId: string) => apiRequest<RazorpayOrder>('/payments/orders', { method: 'POST', body: { bookingId } });
export const payWithWallet = (bookingId: string) => apiRequest('/payments/pay-with-wallet', { method: 'POST', body: { bookingId } });
export const verifyRazorpayPayment = (input: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) => apiRequest('/payments/verify', { method: 'POST', body: input });
