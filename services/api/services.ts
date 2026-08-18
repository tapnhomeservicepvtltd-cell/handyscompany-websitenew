import { apiRequest } from './client';

export type ApiService = {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  description?: string | null;
  shortDescEn?: string | null;
  shortDescHi?: string | null;
  fullDescEn?: string | null;
  fullDescHi?: string | null;
  basePrice: string | number;
  startingPrice?: string | number;
  discountPercentage?: string | number;
  labourCharge?: string | number;
  materialCharge?: string | number;
  durationMin: number;
  warrantyDays?: number;
  rating?: string | number;
  reviewCount?: number;
  totalBookings?: number;
  tags?: string[];
  cancellationPolicy?: string | null;
  minAdvanceBookingHours?: number;
  benefitsEn?: string[];
  benefitsHi?: string[];
  featuresEn?: string[];
  featuresHi?: string[];
  whatsIncludedEn?: string[];
  whatsIncludedHi?: string[];
  whatsNotIncludedEn?: string[];
  whatsNotIncludedHi?: string[];
  faqs?: Array<{ question: string; answer: string }> | null;
  termsEn?: string[];
  termsHi?: string[];
  imageUrl?: string | null;
  bannerUrl?: string | null;
  gallery?: string[];
  seoKeywords?: string[];
  category?: { id: string; name: string; slug: string };
};

export type ServiceSearchResult = ApiService & { category: { id: string; name: string; slug: string } };

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetServicesParams {
  search?: string;
  categorySlug?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const getServices = async (params?: GetServicesParams): Promise<PaginatedResponse<ServiceSearchResult>> => {
  const queryParams = [];
  if (params?.search) queryParams.push(`search=${encodeURIComponent(params.search)}`);
  if (params?.categorySlug) queryParams.push(`categorySlug=${encodeURIComponent(params.categorySlug)}`);
  if (params?.featured !== undefined) queryParams.push(`featured=${params.featured}`);
  if (params?.page) queryParams.push(`page=${params.page}`);
  if (params?.limit) queryParams.push(`limit=${params.limit}`);

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  const endpoint = `/api/v1/services${queryString}`;

  return await apiRequest<PaginatedResponse<ServiceSearchResult>>(endpoint, { authenticated: false });
};

export const getCategories = async () => {
  return await apiRequest<any[]>('/api/v1/services/categories', { authenticated: false });
};

export const getHomeCategories = async () => {
  try {
    return await apiRequest<{ homeServiceLimit: number; categories: any[] }>('/api/v1/services/home-categories', { authenticated: false });
  } catch (error) {
    return { homeServiceLimit: 8, categories: [] };
  }
};

export const getCategoryById = async (id: string) => {
  try {
    return await apiRequest<any>(`/api/v1/services/categories/${encodeURIComponent(id)}`, { authenticated: false });
  } catch (error) {
    return null;
  }
};

export const getServiceProblems = async (serviceId: string, all = false) => {
  return await apiRequest<{ serviceProblemLimit: number; problems: any[] }>(
    `/api/v1/services/${encodeURIComponent(serviceId)}/problems?all=${all}`, 
    { authenticated: false }
  );
};

export const getProblemVariants = async (problemTypeId: string) => {
  try {
    return await apiRequest<any>(`/services/problems/${encodeURIComponent(problemTypeId)}/variants`, { authenticated: false });
  } catch (error) {
    return null;
  }
};

export const getTranslations = async (lang = 'en') => {
  try {
    return await apiRequest<Record<string, string>>(`/translations?lang=${lang}`, { authenticated: false });
  } catch (error) {
    return {};
  }
};

export const getServiceById = async (id: string) => {
  return await apiRequest<ApiService>(`/api/v1/services/${encodeURIComponent(id)}`, { authenticated: false });
};

export const getServiceBySlug = async (slug: string) => {
  return await apiRequest<ApiService>(`/api/v1/services/slug/${encodeURIComponent(slug)}`, { authenticated: false });
};

// Legacy searchServices kept for backwards compatibility if needed elsewhere
export const searchServices = async (q: string) => {
  return await getServices({ search: q, page: 1, limit: 30 });
};
