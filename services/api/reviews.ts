import { apiRequest } from './client';

export const createReview = (bookingId: string, rating: number, comment?: string) => apiRequest('/reviews', { method: 'POST', body: { bookingId, rating, comment } });
