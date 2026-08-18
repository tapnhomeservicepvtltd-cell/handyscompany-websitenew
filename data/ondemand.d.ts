import { ServiceItem } from "@/types/service";
export declare const ONDEMAND_THEME = "#F59E0B";
export declare const ONDEMAND_PRIMARY_COLOR = "#D97706";
export declare const onDemandServices: ServiceItem[];
export declare const onDemandDetailsList: {
    id: string;
    title: string;
    price: string;
    description: string;
    includes: string[];
    faqs: {
        question: string;
        answer: string;
    }[];
}[];
export declare const onDemandDetails: Record<string, any>;
