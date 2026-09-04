import { centralClientAPI } from "@/services/central/central.client-public&user";

export const adminPutLesson = async ({ changedValuesforserver, id }) => {
  // only admin

  console.log(changedValuesforserver);
  console.log(id);

  // Request Validation
  const res = await centralClientAPI(`/admin/lesson/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(changedValuesforserver),
  });
  console.log(res);

  const data = await res?.json();
  console.log(data);

  return data;
};
