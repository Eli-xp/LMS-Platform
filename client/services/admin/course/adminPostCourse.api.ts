// Create The Course & Generate Pre-signed link url
// expected output:: {message:string, uploadUrl:stirng}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { courseSchema } from "@/schemas/course.schema";
import z from "zod";

export const adminPostCourse = async (file: z.infer<typeof courseSchema>) => {
  // only admin

  // Request Validation
  const res = await fetch(`${API_URL}/admin/course/create`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(file),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to post course as admin:${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const adminPostCourseVerification = async ({
  createCourseRes,
  file,
}) => {
  // only admin

  console.log(file);
  console.log(createCourseRes);
  const fileds = createCourseRes.fields;
  const formData = new FormData();
  Object.entries(fileds).forEach(([key, value]) => {
    formData.append(key, value as string);
    console.log(formData);
  });
  formData.append("file", file);

  console.log(formData);

  // Request Validation
  const res = await fetch(`${createCourseRes.url}`, {
    method: "POST",
    body: formData,
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to post course as admin:${res.status}`);
  }

  return res;
};
