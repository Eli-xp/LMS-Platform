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

  const data = await res.json();
  console.log(data);

  return data;
};
