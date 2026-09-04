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

  return { type: res.type, data: await res.json() };
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

  const data = await res.json();
  console.log(data);
  return data;
};
