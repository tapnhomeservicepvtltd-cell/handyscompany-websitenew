import { apiRequest } from './client';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';

export type Booking = {
  id: string;
  bookingNumber: string;
  scheduledAt: string;
  status: BookingStatus;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  finalAmount: string | number;
  cancelReason?: string | null;
  service: { name: string };
  address: { addressLine1: string; city: string };
  technician?: { fullName: string; technicianProfile?: { currentLatitude?: number | null; currentLongitude?: number | null; updatedAt: string } | null } | null;
  statusHistory?: { id: string; status: BookingStatus; note?: string | null; createdAt: string }[];
  review?: { id: string; rating: number; comment?: string | null } | null;
};

export type PaginatedBookings = {
  items: Booking[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export function getMyBookings(page = 1, status?: BookingStatus) {
  const query = new URLSearchParams({ page: String(page), limit: '20', ...(status ? { status } : {}) });
  return apiRequest<PaginatedBookings>(`/bookings/me?${query.toString()}`);
}

export function getBooking(id: string) {
  return apiRequest<Booking>(`/bookings/${id}`);
}

export function cancelBooking(id: string, cancelReason: string) {
  return apiRequest<Booking>(`/bookings/${id}/cancel`, { method: 'PATCH', body: { cancelReason } });
}

export function createBooking(input: { serviceId: string; addressId: string; scheduledAt: string; couponCode?: string; notes?: string }) {
  return apiRequest<Booking>('/bookings', { method: 'POST', body: input });
}

export function rescheduleBooking(id: string, scheduledAt: string, reason?: string) {
  return apiRequest<Booking>(`/bookings/${id}/reschedule`, { method: 'PATCH', body: { scheduledAt, reason } });
}
