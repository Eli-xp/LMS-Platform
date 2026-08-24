import { centralServerAPI } from "@/services/central/central.server-public&user";

export const adminGetCourse_basic = async (id: string) => {
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

export const adminGetCourse_structure = async (courseId: string) => {
  // only admin

  console.log(courseId);
  console.log(typeof courseId);
  const id = courseId;

  // Request Validation
  const res = await centralServerAPI(`/admin/course/structure/${id}`, {
    method: "GET",
  });
  console.log(res);
  if (!res.response.ok) {
    throw new Error(`Failed to edit course as admin:${res.status}`);
  }

  return { type: res.type, data: await res.response.json() };
};
