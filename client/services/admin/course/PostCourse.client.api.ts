import { courseCreateSchema } from "@/schemas/course.schema";
import { centralClientAPI } from "@/services/central/central.client-public&user";
import z from "zod";

export const adminPostCourse = async (
  file: z.infer<typeof courseCreateSchema>,
) => {
  // only admin

  console.log(file);
  // Request Validation
  const res = await centralClientAPI("/admin/course/create", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(file),
  });

  console.log(res);

  const data = await res?.json();
  return data;
};
