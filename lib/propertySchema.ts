import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters."),
  description: z.string().trim().min(20, "Description must be at least 20 characters."),
  rent: z.number().positive("Rent must be greater than 0."),
  categoriesId: z.number().int().positive("Choose a category."),
  bedrooms: z.number().int().min(1, "Bedrooms must be at least 1."),
  bathrooms: z.number().int().min(1, "Bathrooms must be at least 1."),
  size_sqft: z.number().positive("Size must be greater than 0."),
  floor: z.number().int().min(0, "Floor must be 0 or more."),
  availability: z.boolean(),
  available_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format.")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Enter a valid date."),
  address: z.string().trim().min(5, "Enter a valid address."),
  division: z.string().trim().min(2, "Enter a division."),
  images: z.string().url("Enter a valid image URL."),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
