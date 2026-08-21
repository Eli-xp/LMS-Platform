import { centralServerAPI } from "@/services/central/central.server-public&user";
import { notFound } from "next/navigation";

export const adminGetCourse = async (id: string) => {
  // Only admin API

  console.log("adminGetCourse ran");

  // Fetch
  console.log("adminDeleteCourse:: fetch started");
  const res = await centralServerAPI(`/admin/courses/${id}`, {
    method: "GET",
  });

  console.log(res);

  if (!res.ok) {
    throw new Error(`Faild to Get Courses: ${res.status}`);
  }

  if (res.status === 404) {
    console.log(res.status);
    return notFound();
  }

  const data = await res.json();
  console.log(data);

  return data;
};
