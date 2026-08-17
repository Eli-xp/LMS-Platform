// import { requireAdmin } from "@/services/auth/requireAdmin.api";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminDeleteCourse = async (id: string) => {
  // Only admin API
  // requireAdmin()

  console.log("adminDeleteCourse ran");

  // Get token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.toString();
  console.log(accessToken);

  // Fetch
  console.log("adminDeleteCourse:: fetch started");
  const res = await fetch(`${API_URL}/admin/courses/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: accessToken,
    },
  });

  console.log(res);

  if (!res.ok) {
    throw new Error(`Faild to Get Courses: ${res.status}`);
  }

  const data = res.json();
  console.log(data);

  return data;
};
