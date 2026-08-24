import { centralClientAPI } from "@/services/central/central.client-public&user";

export const adminEditCourse_basic = async (
  changedValuesforserver,
  course_id: string,
) => {
  // only admin

  console.log(changedValuesforserver);
  console.log(typeof course_id);
  const id = course_id;

  // Request Validation
  const res = await centralClientAPI(`/admin/courses/edit/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(changedValuesforserver),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error(`Failed to edit course as admin:${res.status}`);
  }

  const data = await res.json();
  console.log(data);

  return data;
};
