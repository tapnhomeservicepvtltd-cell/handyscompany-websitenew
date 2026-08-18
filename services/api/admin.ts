import { apiRequest } from './client';

export type AdminDashboard = { customers: number; technicians: number; verifiedTechnicians: number; bookings: number; pendingPayments: number; paidRevenue: number; bookingsByStatus: Record<string, number> };
export const getAdminDashboard = () => apiRequest<AdminDashboard>('/admin/dashboard');
