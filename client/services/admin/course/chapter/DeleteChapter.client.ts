import { deleteChapterSchemaType } from "@/schemas/course.schema";
import { centralClientAPI } from "@/services/central/central.client-public&user";

export const DeleteChapter = async ({
  chapterId,
  courseId,
}: deleteChapterSchemaType) => {
  // only admin
  console.log(chapterId);
  console.log(courseId);
  console.log("DeleteChapter Ran");

  // Request Validation
  const res = await centralClientAPI(`/admin/chapter/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      chapterId,
      courseId,
    }),
  });
  console.log(res);

  return res?.status;
};
