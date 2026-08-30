import { centralServerAPI } from "@/services/central/central.server-public&user";

//// Get Single Course informaion for public
export const PublicGetSingleCourse_API = async (slug: string) => {
  console.log("PublicGetCourses_API ran");
  console.log(slug);
  const res = await centralServerAPI(`/public/course/${slug}`, {
    method: "GET",
  });

  console.log(res);

  if (!res.ok) {
    return res;
  }

  if (!res.ok) {
    throw new Error(`Faild to Get Courses: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);

  return data;
};
