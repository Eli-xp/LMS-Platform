import { centralServerAPI } from "@/services/central/central.server-public&user";

export const adminGetCourses = async (currentPageNum: number) => {
  // Only admin API

  console.log("adminGetCourses ran");
  console.log(currentPageNum);
  const page = currentPageNum;
  const res = await centralServerAPI(`/admin/courses/?page=${page}&limit=10`, {
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
