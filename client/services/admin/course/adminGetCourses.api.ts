import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminGetCourses = async () => {
  // Only admin API

  console.log("adminGetCourses ran");

  const cookieStore = await cookies();
  const accessToken = cookieStore.toString();

  const res = await fetch(`${API_URL}/admin/courses`, {
    headers: {
      Cookie: accessToken,
    },
    method: "GET",
  });

  // console.log(res);

  if (!res.ok) {
    throw new Error(`Faild to Get Courses: ${res.status}`);
  }

  const data = res.json();
  console.log(data);

  return data;
};
