import { centralServerAPI } from "@/services/central/central.server-public&user";

export const adminGetCourses = async (currentPageNum:number) => {
  // Only admin API

  console.log("adminGetCourses ran");
  console.log(currentPageNum);
  const page = currentPageNum;
  const res = await centralServerAPI(`/admin/courses/?page=${page}&limit=10`, {
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
