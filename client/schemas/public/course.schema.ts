import z from "zod";

// enum
export const courseLevels = ["Beginner", "Intermediate", "Advanced"];
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

// /courses/page/[coursesPage]
export const PublicGetCourses_EachCourse = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),
  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: "Invalid Slug format" }),
  category: z.enum(courseCategories, { error: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { error: "Small Description must be at least 3 characters long" })
    .max(200, {
      error: "Small Description must be at most 200 characters long",
    }),
  thumbnail: z.object({
    viewUrl: z.string().min(1, { error: "Invalid viewUrl" }),
  }),
  price: z.coerce.number().min(1, { error: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, {
    error: "Level is required",
  }),

  _id: z
    .string()
    .min(3, { error: "id must be at least 3 characters long" })
    .optional(),
});
export const PublicGetCourses = z.object({
  courses: z.array(PublicGetCourses_EachCourse),
  courseCount: z.number(),
  pageCount: z.number(),
});

// /courses/[slug]
export const PublicGetSingleCourseType = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),
  category: z.enum(courseCategories, { error: "Category is required" }),
  description: z.string().min(3, { error: "short description" }),
  smallDescription: z
    .string()
    .min(3, { error: "Small Description must be at least 3 characters long" })
    .max(200, {
      error: "Small Description must be at most 200 characters long",
    }),
  thumbnail: z.string().min(1, { error: "Invalid viewUrl" }),
  price: z.coerce.number().min(1, { error: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, {
    error: "Level is required",
  }),

  _id: z.string().min(3, { error: "id must be at least 3 characters long" }),

  chapters: z.array(
    z.object({
      title: z
        .string()
        .min(3, { error: "Title must be at least 3 characters long" }),

      chapterId: z
        .string()
        .min(3, { error: "Chapter ID must be at least 3 characters long" }),

      lessons: z.array(
        z.object({
          title: z
            .string()
            .min(3, { error: "Title must be at least 3 characters long" }),

          lessonId: z
            .string()
            .min(3, { error: "Lesson ID must be at least 3 characters long" }),
        }),
      ),
    }),
  ),
});

export type PublicGetCourseType = z.infer<typeof PublicGetCourses>;
export type PublicGetCourses_EachCourseType = z.infer<
  typeof PublicGetCourses_EachCourse
>;
export type PublicGetSingleCourseType = z.infer<
  typeof PublicGetSingleCourseType
>;
