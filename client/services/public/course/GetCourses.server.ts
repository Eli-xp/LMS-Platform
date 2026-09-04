import { centralServerAPI } from "@/services/central/central.server-public&user";

//// Get Only Published Courses for public
// (ordered based on newest result)
export const PublicGetCourses_API = async ({
  currentPageNum,
  limit,
}: {
  currentPageNum: number;
  limit: number;
}) => {
  console.log("PublicGetCourses_API ran");
  console.log(currentPageNum);
  const page = currentPageNum;
  const res = await centralServerAPI(
    `/public/courses/?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

  console.log(res);

  const data = await res.json();
  console.log(data);

  return data;
};
