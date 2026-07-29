import { z } from "zod";

// Bangladesh mobile format: +880 followed by 1, then 3-9, then 8 more digits
const bdPhoneRegex = /^\+8801[3-9]\d{8}$/;
// Local format used in the phone-entry step: 01XXXXXXXXX (11 digits)
const bdLocalPhoneRegex = /^01\d{9}$/;

export const DIVISIONS = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Tangail",
    "Manikganj",
    "Munshiganj",
    "Rajbari",
    "Madaripur",
    "Shariatpur",
    "Gopalganj",
    "Faridpur",
    "Kishoreganj",
    "Narsingdi",
  ],
  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Cumilla",
    "Feni",
    "Noakhali",
    "Lakshmipur",
    "Chandpur",
    "Brahmanbaria",
    "Rangamati",
    "Bandarban",
    "Khagrachhari",
  ],
  Rajshahi: [
    "Rajshahi",
    "Bogura",
    "Pabna",
    "Sirajganj",
    "Natore",
    "Naogaon",
    "Chapainawabganj",
    "Joypurhat",
  ],
  Khulna: [
    "Khulna",
    "Jashore",
    "Satkhira",
    "Bagerhat",
    "Chuadanga",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Jhenaidah",
  ],
  Barishal: ["Barishal", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
} as const;

export type Division = keyof typeof DIVISIONS;

export const ROLES = ["tenant", "landlord"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
};

// Note: the field is spelled "divison" (not "division") to match the API
// contract given in the request payload. Rename here if the backend fixes
// the typo.
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").transform((s) => s.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number")
    .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
  phone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid BD number, e.g. +8801XXXXXXXXX"),
  role: z.enum(["tenant", "landlord"], {
    message: "Select tenant or landlord",
  }),
  divison: z.string().min(1, "Select a division"),
  district: z.string().min(1, "Select a district"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// ---- Multi-step register wizard schemas (2 steps: phone, then details) ----
// Step 1: phone number (local 11-digit format, matches the "01XXXXXXXXX" placeholder)
export const phoneStepSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(bdLocalPhoneRegex, "Enter a valid 11-digit BD number, e.g. 01XXXXXXXXX"),
});
export type PhoneStepData = z.infer<typeof phoneStepSchema>;

// Step 2: profile details (everything except phone, which was collected in step 1)
export const detailsStepSchema = registerSchema.omit({ phone: true });
export type DetailsStepData = z.infer<typeof detailsStepSchema>;

// Converts local "01XXXXXXXXX" to the API's "+8801XXXXXXXXX" format
export function toInternationalBdPhone(localPhone: string): string {
  return `+880${localPhone.replace(/^0/, "")}`;
}

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").transform((s) => s.toLowerCase()),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;