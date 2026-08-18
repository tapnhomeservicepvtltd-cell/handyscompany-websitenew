import { apiRequest } from './client';

// ─── Types ────────────────────────────────────────────────────────────────────

export type WalletTransactionType = 'CREDIT' | 'DEBIT';

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  amount: number;
  balanceAfter: number;
  reason: string;
  referenceType: string;
  referenceId: string;
  createdAt: string;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const getWalletBalance = () =>
  apiRequest<{ balance: number }>('/wallet/me');

export const getWalletTransactions = () =>
  apiRequest<WalletTransaction[]>('/wallet/me/transactions');
