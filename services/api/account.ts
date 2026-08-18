import { apiRequest } from './client';

export type WalletTransaction = { id: string; type: 'CREDIT' | 'DEBIT'; amount: string | number; balanceAfter: string | number; reason: string; createdAt: string };
export type Notification = { id: string; title: string; body: string; isRead: boolean; createdAt: string };

export const getWalletBalance = () => apiRequest<{ balance: string | number }>('/wallet/me');
export const getWalletTransactions = () => apiRequest<WalletTransaction[]>('/wallet/me/transactions');
export const getNotifications = () => apiRequest<Notification[]>('/notifications');
export const markNotificationRead = (id: string) => apiRequest<Notification>(`/notifications/${id}/read`, { method: 'PATCH' });
export const markAllNotificationsRead = () => apiRequest('/notifications/read-all', { method: 'PATCH' });
