import { centralClientAPI } from "@/services/central/central.client-public&user";
import { centralServerAPI } from "@/services/central/central.server-public&user";

export const adminGetLesson = async (id: string) => {
  // only admin

  console.log(id);
  console.log(typeof id);
  // Request Validation
  const res = await centralServerAPI(`/admin/lesson/${id}`, {
    method: "GET",
  });

  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to Get lesson as admin:${res.status}`);
  }

  const data = await res.json();
  return data;
};
