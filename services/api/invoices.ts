import { apiRequest } from './client';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: string | number;
  taxAmount: string | number;
  totalAmount: string | number;
  pdfUrl?: string | null;
  issuedAt: string;
  booking: {
    bookingNumber: string;
    scheduledAt: string;
    service?: { name: string };
    customer?: { fullName: string };
  };
};

export const getMyInvoices = () => apiRequest<Invoice[]>('/invoices/me');
export const getInvoiceById = (id: string) => apiRequest<Invoice>(`/invoices/${id}`);
export const getInvoicePdfUrl = (id: string) => {
  const baseUrl = (process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://10.0.2.2:3000').replace(/\/$/, '');
  return `${baseUrl}/api/v1/invoices/${id}/pdf`;
};

