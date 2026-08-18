export interface MockUser {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
    city: string;
    state: string;
    isActive: boolean;
    isVerified: boolean;
    avatarUrl?: string;
    skill?: string;
    experienceYears?: number;
    ratingAverage?: number;
    totalJobs?: number;
    isAvailable?: boolean;
}
export declare const mockAdmins: MockUser[];
export declare const mockCustomers: MockUser[];
export declare const mockTechnicians: MockUser[];
export declare const allMockUsers: MockUser[];
export default allMockUsers;
