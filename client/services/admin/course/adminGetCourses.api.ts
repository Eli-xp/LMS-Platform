import { centralServerAPI } from "@/services/central/central.server-public&user";
import { notFound } from "next/navigation";

export const adminGetCourses = async () => {
  // Only admin API

  console.log("adminGetCourses ran");

  const res = await centralServerAPI("/admin/courses", {
    method: "GET",
  });

  console.log(res);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Faild to Get Courses: ${res.status}`);
  }

  const data = res.json();
  console.log(data);

  return data;
};
