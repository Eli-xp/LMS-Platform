import { centralServerAPI } from "@/services/central/central.server-public&user";

export const adminGetCourse = async (id: string) => {
  // Only admin API

  console.log("adminGetCourse ran");

  // Fetch
  console.log("adminDeleteCourse:: fetch started");
  const res = await centralServerAPI(`/admin/course/basic/${id}`, {
    method: "GET",
  });

  console.log(res);

  if (res.type === "auth-required") {
    return res;
  }

  if (!res.response.ok) {
    throw new Error(`Faild to Get Courses: ${res.response.status}`);
  }

  return { type: res.type, data: await res.response.json() };
};
