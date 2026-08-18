import { apiRequest } from './client';
export type Evidence={id:string;imageUrl:string;thumbnailUrl?:string|null;latitude?:number|null;longitude?:number|null;timestamp:string;isApproved:boolean};
export const getEvidence=(bookingId:string)=>apiRequest<{beforePhotos:Evidence[];afterPhotos:Evidence[]}>(`/bookings/${bookingId}/evidence`);
export const approveEvidence=(bookingId:string)=>apiRequest(`/bookings/${bookingId}/evidence/approve`,{method:'POST'});
export const getJobCard=(bookingId:string)=>apiRequest<any>(`/bookings/${bookingId}/job-card`);
export const getWarranty=(bookingId:string)=>apiRequest<any>(`/warranties/booking/${bookingId}`);
export const claimWarranty=(bookingId:string,description:string)=>apiRequest(`/warranties/booking/${bookingId}/claims`,{method:'POST',body:{description}});
