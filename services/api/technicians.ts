import { apiRequest } from './client';
import { Booking, PaginatedBookings } from './bookings';

export type TechnicianProfile = { userId: string; bio?: string | null; experienceYears: number; skills: string[]; isAvailable: boolean; isVerified: boolean; ratingAverage: number; totalJobs: number };

export const getMyTechnicianProfile = () => apiRequest<TechnicianProfile>('/technicians/me');
export const updateAvailability = (isAvailable: boolean) => apiRequest<TechnicianProfile>('/technicians/me/availability', { method: 'PATCH', body: { isAvailable } });
export const updateTechnicianProfile = (input: { bio?: string; experienceYears?: number; skills?: string[] }) => apiRequest<TechnicianProfile>('/technicians/me', { method: 'PUT', body: input });
export const updateMyLocation = (latitude: number, longitude: number) => apiRequest<TechnicianProfile>('/technicians/me/location', { method: 'PATCH', body: { latitude, longitude } });
export const getAssignedBookings = () => apiRequest<PaginatedBookings>('/bookings/assigned?page=1&limit=30');
export const updateAssignedBookingStatus = (id: string, status: 'IN_PROGRESS' | 'COMPLETED', note?: string) => apiRequest<Booking>(`/bookings/${id}/status`, { method: 'PATCH', body: { status, note } });
