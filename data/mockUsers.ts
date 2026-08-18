// data/mockUsers.ts
// Production-grade Mock User Dataset: 100 Admins, 100 Customers, 100 Technicians (Total 300 Users)

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
  // Technician specific optional fields
  skill?: string;
  experienceYears?: number;
  ratingAverage?: number;
  totalJobs?: number;
  isAvailable?: boolean;
}

const FIRST_NAMES_MALE = [
  "Amit", "Rahul", "Vikram", "Sanjay", "Deepak", "Sunil", "Rajesh", "Manoj", "Rohan", "Alok",
  "Pankaj", "Vikas", "Suresh", "Ramesh", "Anand", "Dharmendra", "Gautam", "Harish", "Jitendra", "Kiran",
  "Mahesh", "Nilesh", "Omkar", "Praveen", "Rakesh", "Satish", "Tarun", "Umesh", "Vijay", "Yash"
];

const FIRST_NAMES_FEMALE = [
  "Pooja", "Sunita", "Priya", "Neha", "Anita", "Kavita", "Suman", "Meena", "Ritu", "Aarti",
  "Shweta", "Anjali", "Jyoti", "Divya", "Swati", "Nisha", "Kiran", "Reena", "Manju", "Seema",
  "Rekha", "Babita", "Sangeeta", "Lata", "Usha", "Rani", "Geeta", "Chanda", "Sushma", "Laxmi"
];

const LAST_NAMES = [
  "Sharma", "Verma", "Kumar", "Singh", "Yadav", "Gupta", "Mishra", "Pandey", "Rajput", "Patel",
  "Jha", "Choudhary", "Thakur", "Sinha", "Prasad", "Das", "Roy", "Banerjee", "Mukherjee", "Nair"
];

const CITIES = [
  "Gaya", "Patna", "Delhi", "Mumbai", "Bangalore", "Pune", "Kolkata", "Jaipur", "Lucknow", "Ahmedabad"
];

const SKILLS = [
  "Electrical", "Plumbing", "Carpenter", "Appliance Repair", "Deep Cleaning",
  "Pest Control", "Maid & Helper", "Men Salon", "Women Salon", "Painting", "Installation"
];

// Helper to generate padded number strings like "001", "042", "100"
const pad = (n: number) => String(n).padStart(3, "0");

// 1. GENERATE 100 ADMINS
export const mockAdmins: MockUser[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const firstName = FIRST_NAMES_MALE[i % FIRST_NAMES_MALE.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];
  return {
    id: `admin-${pad(num)}`,
    fullName: `${firstName} ${lastName} (Admin)`,
    phoneNumber: `+9199000${pad(num)}`,
    email: `admin${pad(num)}@handyscompany.com`,
    role: "ADMIN",
    city: CITIES[i % CITIES.length],
    state: "India",
    isActive: true,
    isVerified: true,
  };
});

// 2. GENERATE 100 CUSTOMERS
export const mockCustomers: MockUser[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const isFemale = i % 2 === 0;
  const firstName = isFemale
    ? FIRST_NAMES_FEMALE[(i / 2) % FIRST_NAMES_FEMALE.length]
    : FIRST_NAMES_MALE[Math.floor(i / 2) % FIRST_NAMES_MALE.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];
  return {
    id: `customer-${pad(num)}`,
    fullName: `${firstName} ${lastName}`,
    phoneNumber: `+9198000${pad(num)}`,
    email: `customer${pad(num)}@example.com`,
    role: "CUSTOMER",
    city: CITIES[i % CITIES.length],
    state: "India",
    isActive: true,
    isVerified: true,
  };
});

// 3. GENERATE 100 TECHNICIANS
export const mockTechnicians: MockUser[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const skill = SKILLS[i % SKILLS.length];
  const isFemaleSkill = skill === "Women Salon" || skill === "Maid & Helper";
  const firstName = isFemaleSkill
    ? FIRST_NAMES_FEMALE[i % FIRST_NAMES_FEMALE.length]
    : FIRST_NAMES_MALE[i % FIRST_NAMES_MALE.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];

  return {
    id: `tech-${pad(num)}`,
    fullName: `${firstName} ${lastName}`,
    phoneNumber: `+9197000${pad(num)}`,
    email: `tech.${skill.toLowerCase().replace(/[^a-z]/g, "")}${pad(num)}@handyscompany.com`,
    role: "TECHNICIAN",
    city: CITIES[i % CITIES.length],
    state: "India",
    isActive: true,
    isVerified: true,
    skill: skill,
    experienceYears: 3 + (i % 12),
    ratingAverage: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
    totalJobs: 50 + i * 8,
    isAvailable: i % 5 !== 0, // 80% available
  };
});

// All 300 Users combined
export const allMockUsers: MockUser[] = [
  ...mockAdmins,
  ...mockCustomers,
  ...mockTechnicians,
];

export default allMockUsers;
