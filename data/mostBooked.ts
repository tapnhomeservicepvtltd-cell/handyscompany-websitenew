import { ServiceItem } from "@/types/service";

export const mostBookedServices: ServiceItem[] = [
  {
    id: "book_1",
    title: "Electrician",
    hindiTitle: "इलेक्ट्रीशियन",
    icon: "flash",
    color: "#00A651",
    route: "/service/electrician",
    price: "₹49 Visit",
    popular: true,
    category: "electrical"
  },

  {
    id: "book_2",
    title: "Plumber",
    hindiTitle: "प्लंबर",
    icon: "pipe-wrench",
    color: "#00A651",
    route: "/service/plumber",
    price: "₹49 Visit",
    popular: true,
    category: "plumbing"
  },

  {
    id: "book_3",
    title: "Bathroom Cleaning",
    hindiTitle: "बाथरूम",
    icon: "shower",
    color: "#00A651",
    route: "/service/bathroom-cleaning",
    price: "₹399",
    category: "cleaning"
  },

  {
    id: "book_4",
    title: "Haircut",
    hindiTitle: "हेयरकट",
    icon: "content-cut",
    color: "#2563EB",
    route: "/service/haircut",
    price: "₹149",
    category: "men-salon"
  },

  {
    id: "book_5",
    title: "Mobile Repair",
    hindiTitle: "मोबाइल",
    icon: "cellphone",
    color: "#8B5CF6",
    route: "/service/mobile-repair",
    price: "₹49 Visit",
    category: "electronics"
  },

  {
    id: "book_6",
    title: "Full Time Maid",
    hindiTitle: "फुल टाइम मेड",
    icon: "account-heart",
    color: "#16A34A",
    route: "/service/full-time-maid",
    price: "₹9,999",
    category: "maid"
  },

  {
    id: "book_7",
    title: "Pest Control",
    hindiTitle: "पेस्ट कंट्रोल",
    icon: "bug",
    color: "#F97316",
    route: "/service/pest-control",
    price: "₹499",
    category: "pest-control"
  },

  {
    id: "book_8",
    title: "Interior Painting",
    hindiTitle: "पेंटिंग",
    icon: "roller",
    color: "#F59E0B",
    route: "/service/interior-painting",
    price: "₹999",
    category: "painting"
  },

];