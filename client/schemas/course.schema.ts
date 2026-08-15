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

// note: MongoDB wil create=> id, createdAt, updatedAt

//  /admin/courses/create File Upload
export const fileKey = z.object({
  originalName: z.string().min(1, { error: "Invalid File Name" }),
  contentType: z.string().min(1, { error: "Invalid File Type" }),
  size: z.number().min(1, { error: "Invalid File Size" }),
});

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),
  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: "Invalid Slug format" }),
  category: z.enum(courseCategories, { error: "Category is required" }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long" }),
  smallDescription: z
    .string()
    .min(3, { error: "Small Description must be at least 3 characters long" })
    .max(200, {
      error: "Small Description must be at most 200 characters long",
    }),
  fileKey: fileKey,
  price: z.coerce.number().min(1, { error: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, {
    error: "Level is required",
  }),
  status: z.enum(courseStatus, {
    error: "Status is required",
  }),
  // id: z.string().min(3, { error: "id must be at least 3 characters long" }),
});

// /admin/courses
export const adminGetCourses = courseSchema.pick({
  // id: true,
  title: true,
  smallDescription: true,
  duration: true,
  level: true,
  status: true,
  price: true,
  fileKey: true,
  slug: true,
});
