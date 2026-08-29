import { centralClientAPI } from "@/services/central/central.client-public&user";

export const DeleteCourse = async ({ id }: { id: string }) => {
  // only admin
  console.log(id);
  console.log("DeleteCourse Ran");
  // Request Validation
  const res = await centralClientAPI(`/admin/course/${id}`, {
    method: "DELETE",
  });
  console.log(res);

  if (!res?.ok) {
    throw new Error(`Failed to edit course as admin:${res?.status}`);
  }

  return res.status;
};
