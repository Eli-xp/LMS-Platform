import { centralServerAPI } from "@/services/central/central.server-public&user";
import { notFound } from "next/navigation";

export const adminGetCourses = async () => {
  // Only admin API

  console.log("adminGetCourses ran");

  const res = await centralServerAPI("/admin/courses", {
    method: "GET",
  });

  console.log(res);

  if (!res.response.ok) {
    return res;
  }

  if (!res.response.ok) {
    throw new Error(`Faild to Get Courses: ${res.response.status}`);
  }

  const data = await res.response.json();
  console.log(data);

  return { type: res.type, data: data };
};
