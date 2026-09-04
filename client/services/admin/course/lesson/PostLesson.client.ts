import { centralClientAPI } from "@/services/central/central.client-public&user";
import { createChapterSchema } from "@/schemas/course.schema";
import z from "zod";

export const PostLesson = async (
  values: z.infer<typeof createChapterSchema>,
) => {
  // only admin

  console.log(values);

  // Request Validation
  const res = await centralClientAPI(`/admin/lesson/create`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values),
  });

  console.log(res);

  return res?.status;
};
