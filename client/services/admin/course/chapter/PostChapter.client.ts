import { centralClientAPI } from "@/services/central/central.client-public&user";
import { createChapterSchema } from "@/schemas/course.schema";
import z from "zod";

export const PostChapter = async (
  values: z.infer<typeof createChapterSchema>,
) => {
  // only admin

  console.log(values);

  // Request Validation
  const res = await centralClientAPI(`/admin/chapter/create`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res?.ok) {
    throw new Error(`Failed to edit course as admin:${res?.status}`);
  }

  return res.status;
};
