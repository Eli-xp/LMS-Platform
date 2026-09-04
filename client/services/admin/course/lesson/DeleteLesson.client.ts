import { deleteLessonSchemaType } from "@/schemas/course.schema";
import { centralClientAPI } from "@/services/central/central.client-public&user";

export const DeleteLesson = async ({
  chapterId,
  lessonId,
}: deleteLessonSchemaType) => {
  // only admin
  console.log(chapterId);
  console.log(lessonId);
  console.log("DeleteLesson Ran");
  // Request Validation
  const res = await centralClientAPI(`/admin/lesson/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      chapterId,
      lessonId,
    }),
  });
  console.log(res);

  return res?.status;
};
