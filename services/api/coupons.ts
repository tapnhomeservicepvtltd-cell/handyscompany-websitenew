import { apiRequest } from './client';
export type Coupon = { id:string; code:string; description?:string|null; discountType:'PERCENTAGE'|'FLAT'; discountValue:string|number; minOrderAmount?:string|number|null; validUntil:string };
export const getAvailableCoupons = () => apiRequest<Coupon[]>('/coupons/available');
export const previewCoupon = (code:string, orderAmount:number) => apiRequest<{code:string;discountAmount:number;finalAmount:number}>('/coupons/preview',{method:'POST',body:{code,orderAmount}});
