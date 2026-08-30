import { centralServerAPI } from "@/services/central/central.server-public&user";

//// Get Only Published Courses for public
// (ordered based on newest result)
export const PublicGetCourses_API = async (currentPageNum: number) => {
  console.log("PublicGetCourses_API ran");
  console.log(currentPageNum);
  const page = currentPageNum;
  const res = await centralServerAPI(`/public/courses/?page=${page}&limit=10`, {
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
