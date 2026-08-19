const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { courseCreateSchema } from "@/schemas/course.schema";
import z from "zod";

export const adminPostCourse = async (
  file: z.infer<typeof courseCreateSchema>,
) => {
  // only admin

  console.log(file);
  // Request Validation
  const res = await fetch(`${API_URL}/admin/course/create`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(file),
    credentials: "include",
  });

  console.log(res);
  if (!res.ok) {
    throw new Error(`Failed to post course as admin:${res.status}`);
  }

  const data = await res.json();
  return data;
};
