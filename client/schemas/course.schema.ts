import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"];
export const courseStatus = ["Draft", "Published", "Archived"];
export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "Artificial Intelligence",
  "Data Science",
  "Cyber Security",
  "UI/UX Design",
  "Digital Marketing",
  "Business & Entrepreneurship",
  "Programming Languages",
  "Personal Development",
];

// note: MongoDB wil create: createdAt, updatedAt
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Invalid Slug format" }),
  category: z.enum(courseCategories, { message: "Category is required" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small Description must be at least 3 characters long" })
    .max(200, {
      message: "Small Description must be at most 200 characters long",
    }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, {
    message: "Level is required",
  }),
  status: z.enum(courseStatus, {
    message: "Status is required",
  }),
});
